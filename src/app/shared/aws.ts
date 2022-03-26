
import * as AWSSDK from 'aws-sdk';
AWSSDK.config.region = 'us-east-1';

export const AWS = AWSSDK;

export const savePDFS3 = async (buffer, type, name, bucket) => {
    const url = `https://barberweb.s3.amazonaws.com/${name}`;
    const s3 = new AWS.S3(createConnectionString());

    const data = {
        Bucket: bucket,
        Key: name,
        Body: buffer,
        ContentType: `application/${type}`
    };

    await s3.putObject(data).promise();
    return await getBucketFileSignedUrl(
        { Bucket: data.Bucket, Key: data.Key, Expires: 10 },
        s3
    );
}


const getBucketFileSignedUrl = async (awsS3Model, s3) => {
    let fileUrl = '';

    try {
        fileUrl = await s3.getSignedUrlPromise('getObject', awsS3Model);
    } catch (ex) {
        console.log(ex)
    }

    return fileUrl;
}

const createConnectionString = () => {
    return {
        region: process.env.region,
        accessKeyId: process.env.access_key_id,
        secretAccessKey: process.env.secret_access_key,
    };
}
