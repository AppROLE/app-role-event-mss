import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";
import { Event } from "../../domain/entities/event";
import { IEventRepository } from "../../domain/irepositories/event_repository_interface";
import { EventMock } from "../../domain/mocks/event_mock";

export class EventRepositoryMock implements IEventRepository {
  private events: Event[];

  constructor() {
    const eventMock = new EventMock();
    this.events = eventMock.events;
  }

  async createEvent(event: Event): Promise<Event> {
    this.events.push(event);
    return event;
  }

  async getAllEvents(): Promise<Event[]> {
    return [...this.events];
  }

  async getEventById(eventId: string): Promise<Event> {
    const event = this.events.find((event) => event.getEventId === eventId);
    if (!event) {
      throw new NoItemsFound("event");
    }
    return event;
  }

  async deleteEventById(eventId: string): Promise<void> {
    const eventIndex = this.events.findIndex(
      (event) => event.getEventId === eventId
    );
    if (eventIndex === -1) {
      throw new NoItemsFound("event");
    }
    this.events.splice(eventIndex, 1);
  }
}
