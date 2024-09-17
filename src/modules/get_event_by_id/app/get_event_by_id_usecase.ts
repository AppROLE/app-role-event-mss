import { Event } from "src/shared/domain/entities/event";
import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class GetEventByIdUseCase {
  constructor(private readonly repo: IEventRepository) {}

  async execute(eventId: string): Promise<Event> {
    const event = await this.repo.getEventById(eventId);
    if (!event) {
      throw new NoItemsFound("event");
    }
    return event;
  }
}
