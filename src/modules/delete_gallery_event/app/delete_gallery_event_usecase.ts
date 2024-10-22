import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { IFileRepository } from "src/shared/domain/irepositories/file_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class DeleteGalleryEventUseCase {
  constructor(
    private readonly eventRepo: IEventRepository,
    private readonly fileRepo: IFileRepository
  ) {}

  async execute(eventId: string) {
    const event = await this.eventRepo.getEventById(eventId);
    if (!event) {
      throw new NoItemsFound("evento");
    }
    await this.fileRepo.deleteGallery(eventId);
  }
}
