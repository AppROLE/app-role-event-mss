import { Event } from "../../domain/entities/event";
import { IEventRepository } from "../../domain/irepositories/event_repository_interface";

export class EventRepositoryMock implements IEventRepository {
  private events: Event[] = [];

  createEvent(event: Event): Promise<Event> {
    this.events.push(event);
    return Promise.resolve(event);
  }
}
