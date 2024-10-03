import { Event } from "src/shared/domain/entities/event";
import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class GetEventsByFilterUseCase {
  constructor(private readonly repo: IEventRepository) {}

  async execute(filter: any): Promise<Event[]> {
    const events = await this.repo.getEventsByFilter(filter);
    if (!events || events.length === 0) {
      throw new NoItemsFound("eventos");
    }
    return events;
  }
}
