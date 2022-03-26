import { Request, Response } from "express";
import { writeFileSync } from 'fs';
import { get } from "lodash";
import { tmpdir } from 'os';
import PdfPrinter from 'pdfmake';
import { Op } from "../../database";
import { CutsMade, ICutsMade } from "../models/cutsMade.model";
import { Client } from './../models/client.model';
import { Schedule } from './../models/schedule.model';
import { Service } from './../models/service.model';
import { User } from './../models/user.model';
import { savePDFS3 } from './../shared/aws';

class CutsMadeController {
  async find(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;
    const userLogged: any = request.headers.userLogged;
    const where: any = {};

    where.empresaId = userLogged.empresaId;

    if (query && query.id) {
      where.id = query.id;
    }

    if (query && query.descricao) {
      where.descricao = { [Op.iLike]: `%${query.descricao}%` };
    }

    try {
      const cutsMade = await CutsMade.findAll({
        where,
        limit: 30,
        include: [Client, Service, User],
        order: [['dataAlteracao', 'desc']]
      } as any);
      return response.json(cutsMade);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const user = await CutsMade.findOne({ where: { id } as any });
      return response.json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: ICutsMade = request.body;
    const userLogged: any = request.headers.userLogged;

    try {
      await CutsMade.update(body, {
        where: { id: body.id, empresaId: userLogged.empresaId } as any,
      });
      return response.json(true);
    } catch (e) {
      return response.status(500).send("Erro ao atualizar registro");
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const cutsMade = await CutsMade.findOne({ where: { id: id } });
      cutsMade.destroy();
      return response.status(200).json(true);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;
    const userLogged: any = request.headers.userLogged;
    const param: ICutsMade = {
      descricao: '',
      empresaId: null,
      usuarioId: null,
      clienteId: null,
      servicoId: null,
      valor: null,
      formaPagamentoId: null,
      cancelado: false,
      hora: '',
      data: '',
    }


    try {
      body.empresaId = userLogged.empresaId;
      body.usuarioId = userLogged.id;
      body.formaPagamentoId = null;

      const obj = Object.assign(param, body);

      const instance = await CutsMade.create(obj as any);
      await Schedule.update({ confirmado: true } as any, { where: { id: body.agendamentoId } });
      return response.status(200).json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao criar registro");
    }
  }

  async print(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body;

      const fonts = {
        Helvetica: {
          normal: "Helvetica",
          bold: "Helvetica-Bold",
          italics: "Helvetica-Oblique",
        },
      };

      const docDefinition = {
        content: [
          {
            text: 'Comprovante de pagamento',
            style: 'header',
            alignment: 'center'
          },
          {
            text: [
              `${body.date}`
            ],
            style: 'date',
            bold: false,
            alignment: 'center'
          },
          {
            text: [
              'Valor'
            ],
            style: 'valueHeader',
            bold: false,
          },
          {
            text: [
              `${body.valor}`
            ],
            style: 'valueRow',
            bold: true,
          },
          {
            text: [
              'Pagador'
            ],
            style: 'valueHeader',
            bold: false,
          },
          {
            text: [
              `${body.pagador}`
            ],
            style: 'valueRow',
            bold: true,
          },
          {
            text: [
              'Serviço'
            ],
            style: 'valueHeader',
            bold: false,
          },
          {
            text: [
              `${body.servico}`
            ],
            style: 'valueRow',
            bold: true,
          },
          {
            text: [],
            style: 'divider'
          },
          {
            text: [
              'Assinatura'
            ],
            style: 'ass',
            bold: false,
          },
          {
            text: [
              '______________________________________'
            ],
            style: 'assRow',
            bold: false,
          },
        ],
        defaultStyle: { font: "Helvetica" },
        styles: {
          header: {
            fontSize: 48,
            bold: true,
            alignment: 'justify',
            color: '#4F4F4F'
          },
          date: {
            fontSize: 20,
            alignment: 'justify',
            color: '#4F4F4F',
            margin: 6,
          },
          valueHeader: {
            fontSize: 20,
            color: '#4F4F4F',
            margin: 8,
            alignment: 'left',
          },
          valueRow: {
            fontSize: 20,
            bold: true,
            color: '#202021',
            margin: 8,
            alignment: 'left',
          },
          divider: {
            margin: 32,
          },
          ass: {
            fontSize: 8,
            bold: false,
            alignment: 'center',
            color: '#202021',
          },
          assRow: {
            fontSize: 8,
            bold: false,
            alignment: 'center',
            color: '#202021',
            margin: 10,
          }
        }
      };

      const url = await gerarPdfRelatorio(docDefinition, fonts)
      return response.status(200).json(url);
    } catch (e) {
      return response.status(500).send("Erro ao realizar a impressão");
    }
  }
}

export default new CutsMadeController();


export async function gerarPdfRelatorio(docDefinition, fonts: any) {
  return new Promise((resolve, reject) => {

    try {
      const printer = new PdfPrinter(fonts);
      const pdfDoc = printer.createPdfKitDocument(docDefinition);

      const chunks = [];
      let result: Buffer;

      pdfDoc.on('data', (chunk) => {
        chunks.push(chunk);
      });

      pdfDoc.on('end', async function () {
        result = Buffer.concat(chunks);
        const url = await savePDFS3(result);
        const tmpFile = tmpdir() + "/comprovante-pagamento" + "-" + ".pdf";
        writeFileSync(tmpFile, result);
        resolve(url);
      });

      pdfDoc.end();

    } catch (err) {
      reject(err);
    }

  })
}
