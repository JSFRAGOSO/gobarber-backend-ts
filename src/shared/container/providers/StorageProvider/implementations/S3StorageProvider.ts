import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
    private client: S3;

    private bucket = uploadConfig.config.s3.bucket;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-1',
            accessKeyId: process.env.AWS_ACESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    public async saveFile(file: string): Promise<string> {
        const originalFile = path.resolve(uploadConfig.tempFolder, file);
        const fileContent = await fs.promises.readFile(originalFile);
        const ContentType = mime.getType(originalFile);

        if (!ContentType) throw new Error('File not found');

        await this.client
            .putObject({
                Bucket: this.bucket,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
            })
            .promise();

        await fs.promises.unlink(originalFile);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: this.bucket,
                Key: file,
            })
            .promise();
    }
}
