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
        ACL: "public-read",
      };
      console.log("Mimetype da imagem:", mimetype);
      console.log("Nome da imagem:", imageNameKey);
      console.log("Bucket da imagem:", this.s3BucketName);
      console.log("Tamanho do buffer do arquivo:", eventPhoto.length);

      await s3.putObject(params).promise();
    } catch (error: any) {
      throw new Error(
        `FileRepositoryS3, Error on uploadEventPhoto: ${error.message}`
      );
    }
  }
}
