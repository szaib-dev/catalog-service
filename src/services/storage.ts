// s3 bucket implementation
import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import config from 'config';

const REGION = config.get('storage.region') as string
const BUCKET = config.get('storage.bucket_name') as string;

const s3 = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: config.get('storage.accessKeyId'),
        secretAccessKey: config.get('storage.secretId'),
    },
});



export default {
    upload: async (file: Express.Multer.File, fname: string) => {
        // remove spaces from original file name
        const fileNameWithoutSpaces = fname.toLowerCase().split(" ").join("-")
        const filename = `${uuid()}-${fileNameWithoutSpaces}`;

        await s3.send(
            new PutObjectCommand({
                Bucket: BUCKET,
                Key: filename,
                Body: file!.buffer,
            })
        );

        const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${filename}`

        return url;
    },

    delete: async (key: string) => {

        const url = key.split(".com/")[1]

        await s3.send(
            new DeleteObjectCommand({
                Bucket: BUCKET as string,
                Key: url,
            })
        );
    },
};
