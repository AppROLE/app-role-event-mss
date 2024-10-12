import { S3 } from "aws-sdk";
import { IFileRepository } from "src/shared/domain/irepositories/file_repository_interface";

export class FileRepositoryS3 implements IFileRepository {
  s3BucketName: string;

  constructor(s3BucketName: string) {
    this.s3BucketName = s3BucketName;
  }

  async uploadEventPhoto(
    imageNameKey: string,
    eventPhoto: Buffer,
    mimetype: string
  ): Promise<void> {
    try {
      const s3 = new S3();
      console.log("s3BucketName: ", this.s3BucketName);
      const params: S3.PutObjectRequest = {
        Bucket: this.s3BucketName,
        Key: imageNameKey,
        Body: eventPhoto,
        ContentType: mimetype,
      };

      await s3.putObject(params).promise();
    } catch (error: any) {
      throw new Error(
        `FileRepositoryS3, Error on uploadEventPhoto: ${error.message}`
      );
    }
  }

  async uploadEventGalleryPhoto(
    eventName: string,
    imageNameKey: string,
    eventPhoto: Buffer,
    mimetype: string
  ): Promise<void> {
    try {
      const s3 = new S3();
      console.log("s3BucketName: ", this.s3BucketName);
      const params: S3.PutObjectRequest = {
        Bucket: this.s3BucketName,
        Key: `${eventName}/gallery/${imageNameKey}`,
        Body: eventPhoto,
        ContentType: mimetype,
      };

      await s3.putObject(params).promise();
    } catch (error: any) {
      throw new Error(
        `FileRepositoryS3, Error on uploadEventPhoto: ${error.message}`
      );
    }
  }
}
