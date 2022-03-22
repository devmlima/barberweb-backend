import { User } from './../models/user.model';
import { CutsMade } from './../models/cutsMade.model';
import { Request, Response } from "express";

class DashboardController {
    async cutsAll(request: Request, response: Response): Promise<Response> {
        try {
            const userLogged: any = request.headers.userLogged;
            const isAdmin: any = request.headers.admin;

            const where: any = {};
            if (!isAdmin) {
                where.usuarioId = userLogged.id;
            }

            const cuts = await CutsMade.count({ where } as any);

            return response.status(200).json(cuts);
        } catch (e) {
            return response.status(500).send("Ocorreu um erro, tente novamente!");
        }
    }

    async faturamentAll(request: Request, response: Response): Promise<Response> {
        try {
            const userLogged: any = request.headers.userLogged;
            const isAdmin: any = request.headers.admin;

            const where: any = {};
            if (!isAdmin) {
                where.usuarioId = userLogged.id;
            }

            const cuts = await CutsMade.findAll({ where } as any);
            const values = cuts.map(cut => {
                if (!isNaN(+cut.valor)) {
                    return +cut.valor;
                } else {
                    return 0;
                }
            });

            const some = values.reduce((ac, el) => ac += el);
            return response.status(200).json(`R$ ${some.toFixed(2)}`);
        } catch (e) {
            return response.status(500).send("Ocorreu um erro, tente novamente!");
        }
    }

    async userMonth(request: Request, response: Response): Promise<Response> {
        try {
            const userLogged: any = request.headers.userLogged;
            const cuts = await CutsMade.findAll();
            const users = await User.findAll({ where: { empresaId: userLogged.empresaId } as any });

            let count = 0;
            let nameUser = '';

            for (const user of users) {
                const map = cuts.filter(cut => cut.usuarioId === user.id);
                if (!count || count < map.length) {
                    count = map.length;
                    nameUser = user.nome;
                }
            }
            return response.status(200).json(nameUser);
        } catch (e) {
            return response.status(500).send("Ocorreu um erro, tente novamente!");
        }
    }

    async faturamentForUser(request: Request, response: Response): Promise<Response> {
        try {
            const userLogged: any = request.headers.userLogged;
            const cuts = await CutsMade.findAll({});
            const users = await User.findAll({ where: { empresaId: userLogged.empresaId } as any });
            const isAdmin: any = request.headers.admin;

            const obj: any = { labels: [], data: [] };
            for (const user of users) {
                const values = cuts.filter(cut => cut.usuarioId === user.id);
                let some: any = 0;

                if (values.length > 0) {
                    some = values.map(v => +v.valor).reduce((ac, el) => ac += el);
                }

                if (!some) {
                    continue;
                } else if (isAdmin) {
                    obj.labels.push(user.nome);
                    obj.data.push(some.toFixed(2));
                } else {
                    if (user.id === userLogged.id) {
                        obj.labels.push(user.nome);
                        obj.data.push(some.toFixed(2));
                    }
                }
            }
            return response.status(200).json(obj);
        } catch (e) {
            return response.status(500).send("Ocorreu um erro, tente novamente!");
        }
    }

    async faturamentLastSevenDays(request: Request, response: Response): Promise<Response> {
        try {
            const userLogged: any = request.headers.userLogged;
            const cuts = await CutsMade.findAll({});
            const users = await User.findAll({ where: { empresaId: userLogged.empresaId } as any });

            const obj: any = { labels: [], data: [] };
            for (const user of users) {
                const values = cuts.filter(cut => cut.usuarioId === user.id);
                const some = values.map(v => v.valor).reduce((ac, el) => ac += el);
                const isAdmin: any = request.headers.admin;

                if (isAdmin) {
                    obj.labels.push(user.nome);
                    obj.data.push(some);
                } else {
                    if (user.id === userLogged.id) {
                        obj.labels.push(user.nome);
                        obj.data.push(some);
                    }
                }
            }
            return response.status(200).json(obj);
        } catch (e) {
            return response.status(500).send("Ocorreu um erro, tente novamente!");
        }
    }
}

export default new DashboardController();
