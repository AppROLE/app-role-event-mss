export interface IFileRepository {
  uploadEventPhoto(imageNameKey: string, eventPhoto: Buffer, mimetype: string): Promise<void>;
  uploadEventGalleryPhoto(eventName: string, imageNameKey: string, eventPhoto: Buffer, mimetype: string): Promise<void>;
  deleteEventPhotoByEventName(filename: string): Promise<void>;
}
