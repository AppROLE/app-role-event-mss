import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class DeleteEventByIdUseCase {
  constructor(private readonly repo: IEventRepository) {}

  async execute(eventId: string): Promise<void> {
    const event = await this.repo.getEventById(eventId);
    if (!event) {
      throw new NoItemsFound("event");
    }

    await this.repo.deleteEventById(eventId);
  }
}
