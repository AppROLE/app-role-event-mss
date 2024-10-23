import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { IFileRepository } from "src/shared/domain/irepositories/file_repository_interface";
import { galleryEmpty, NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class DeleteGalleryEventUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly fileRepository: IFileRepository
  ) {}

  async execute(eventId: string) {
    console.log("ESTOU NO USECASE - EVENT ID PORRA: ", eventId);
    const event = await this.eventRepository.getEventById(eventId);
    if (!event) {
      throw new NoItemsFound("evento");
    }
    console.log("EVENTO: ", event);
    console.log("ACHEI O EVENTO - ESTOU NO USECASE: ", event);
    if (!event?.getGaleryLink || event.getGaleryLink.length === 0) {
      throw new galleryEmpty();
    }
    await this.fileRepository.deleteGallery(eventId);

    await this.eventRepository.updateEvent(eventId, {
      galery_link: [],
    });
  }
}
