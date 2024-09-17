import { Event } from "../entities/event";

export interface IEventRepository {
  createEvent(event: Event): Promise<Event>;
  getAllEvents(): Promise<Event[]>;
  getEventById(eventId: string): Promise<Event>;
  deleteEventById(eventId: string): Promise<void>;
}
