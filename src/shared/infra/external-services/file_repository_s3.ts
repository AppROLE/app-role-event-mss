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

  async uploadInstitutePhoto(
    imageNameKey: string,
    institutePhoto: Buffer,
    mimetype: string
  ): Promise<string> {
    try {
      const s3 = new S3();
      console.log("s3BucketName: ", this.s3BucketName);
      const params: S3.PutObjectRequest = {
        Bucket: this.s3BucketName,
        Key: imageNameKey,
        Body: institutePhoto,
        ContentType: mimetype,
      };
      console.log("params: ", params);
      await s3.putObject(params).promise();
      console.log(`https://${this.s3BucketName}.s3.amazonaws.com/${imageNameKey}`)
      return `https://${this.s3BucketName}.s3.amazonaws.com/${imageNameKey}`;
    } catch (error: any) {
      throw new Error(
        `FileRepositoryS3, Error on uploadInstitutePhoto: ${error.message}`
      );
    }
  }
}
