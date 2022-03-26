
import * as AWSSDK from 'aws-sdk';
AWSSDK.config.region = 'us-east-1';

export const AWS = AWSSDK;

export const savePDFS3 = async (pdfBuffer) => {
    const nomePdf = `comprovante-pagamento-${new Date().getMilliseconds()}.pdf`;
    const urlPDF = `https://barberweb.s3.amazonaws.com/${nomePdf}`;
    const s3 = new AWS.S3(createConnectionString());

    const data = {
        Bucket: 'barberweb',
        Key: nomePdf,
        Body: pdfBuffer,
        ContentType: 'application/pdf'
    };

    await s3.putObject(data).promise();
    return urlPDF;
}

const createConnectionString = () => {
    return {
        region: process.env.region,
        accessKeyId: process.env.access_key_id,
        secretAccessKey: process.env.secret_access_key,
    };
}
