// s3 bucket implementation
import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import config from 'config';

const s3 = new S3Client({
    region: config.get('storage.region'),
    credentials: {
        accessKeyId: config.get('storage.accessKeyId'),
        secretAccessKey: config.get('storage.secretId'),
    },
});

const BUCKET = config.get('storage.bucket_name');

export default {
    upload: async (file: Express.Multer.File, filename: string) => {
        const key = `${filename}-${uuid()}`;

        await s3.send(
            new PutObjectCommand({
                Bucket: BUCKET as string,
                Key: key,
                Body: file!.buffer,
            })
        );

        return key;
    },

    delete: async (key: string) => {
        await s3.send(
            new DeleteObjectCommand({
                Bucket: BUCKET as string,
                Key: key,
            })
        );
    },
};
