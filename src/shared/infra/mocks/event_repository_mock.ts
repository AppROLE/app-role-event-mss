import { Event } from "../../domain/entities/event";
import { IEventRepository } from "../../domain/irepositories/event_repository_interface";
import { EventMock } from "../../domain/mocks/event_mock";

export class EventRepositoryMock implements IEventRepository {
  private events: Event[];

  constructor() {
    const eventMock = new EventMock();
    this.events = eventMock.events;
  }

  createEvent(event: Event): Promise<Event> {
    this.events.push(event);
    return Promise.resolve(event);
  }

  async getAllEvents(): Promise<Event[]> {
    return [...this.events];
  }
}
