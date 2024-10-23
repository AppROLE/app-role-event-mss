import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { IFileRepository } from "src/shared/domain/irepositories/file_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class DeleteGalleryEventUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly fileRepository: IFileRepository
  ) {}

  async execute(eventId: string) {
    const event = await this.eventRepository.getEventById(eventId);
    if (!event) {
      throw new NoItemsFound("evento");
    }
    await this.fileRepository.deleteGallery(eventId);

    await this.eventRepository.updateEvent(eventId, {
      galery_link: "",
    });
  }
}
