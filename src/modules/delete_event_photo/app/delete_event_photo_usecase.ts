import { IFileRepository } from "src/shared/domain/irepositories/file_repository_interface";

export class DeleteEventPhotoUseCase {
  constructor(private readonly fileRepository: IFileRepository) {}

  async execute(filename: string): Promise<void> {
    await this.fileRepository.deleteEventPhotoByEventName(filename);
  }
}
