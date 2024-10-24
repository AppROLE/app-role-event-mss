import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { IFileRepository } from "src/shared/domain/irepositories/file_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class DeleteEventByIdUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly fileRepository: IFileRepository
  ) {}

  async execute(eventId: string): Promise<void> {
    const event = await this.eventRepository.getEventById(eventId);
    if (!event) {
      throw new NoItemsFound("event");
    }

    await this.fileRepository.deleteEventPhotoByEventId(eventId);

    await this.eventRepository.deleteEventById(eventId);

    await this.fileRepository.deleteGallery(eventId);
  }
}
