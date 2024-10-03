export interface IFileRepository {
  uploadEventPhoto(
    imageNameKey: string,
    eventPhoto: Buffer,
    mimetype: string
  ): Promise<void>;
}
