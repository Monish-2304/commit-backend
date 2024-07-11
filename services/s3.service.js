import {
    S3Client,
    DeleteObjectsCommand,
    PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS,
    },
});

export const generatePreSignedUrls = async (files) => {
    return Promise.all(
        files.map(async ({ fileName, fileType }) => {
            const s3Params = {
                Bucket: process.env.AWS_BUCKET,
                Key: fileName,
                ContentType: fileType,
            };
            const command = new PutObjectCommand(s3Params);
            const url = await getSignedUrl(s3Client, command, {
                expiresIn: 180,
            });
            return { url, fileName, expires: 180 };
        })
    );
};

export const deleteFileFromS3 = async (fileNames) => {
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Delete: {
            Objects: fileNames.map((fileName) => ({ Key: fileName })),
        },
    };
    const command = new DeleteObjectsCommand(params);
    return s3Client.send(command);
};
