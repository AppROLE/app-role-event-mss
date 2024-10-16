import { Event } from "../entities/event";

export interface IEventRepository {
  createEvent(event: Event): Promise<Event>;
  getAllEvents(): Promise<Event[]>;
  getEventsByFilter(filter: any): Promise<Event[]>;
  getEventById(eventId: string): Promise<Event>;
  deleteEventById(eventId: string): Promise<void>;
  updateEventPhoto(eventId: string, profilePhoto: string): Promise<string>;
  updateGalleryArray(evenetId: string, imageKey: string): Promise<void>;
  countGalleryEvent(eventId: string): Promise<Number>;
  getEventsByUpcomingDates(dates: Date[]): Promise<Event[]>;
  createReview(
    star: number,
    review: string,
    reviewedAt: Date,
    eventId: string,
    username: string
  ): Promise<void>;
  getAllConfirmedEvents(username: string): Promise<Event[]>;
}
