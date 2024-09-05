import { Event } from "../entities/event";

export interface IEventRepository {
  createEvent(user: Event): Promise<Event>;
}
