import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { IFileRepository } from "src/shared/domain/irepositories/file_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class DeleteEventPhotoUseCase {
  constructor(
    private readonly fileRepository: IFileRepository,
    private readonly eventRepository: IEventRepository
  ) {}

  async execute(eventId: string): Promise<void> {
    const event = await this.eventRepository.getEventById(eventId);
    if (!event) {
      throw new NoItemsFound("event");
    }
    await this.fileRepository.deleteEventPhotoByEventId(eventId);

    await this.eventRepository.updateEvent(eventId, {
      event_photo_link: "",
    });
  }
}
