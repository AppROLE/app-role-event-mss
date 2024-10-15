import { Event } from "src/shared/domain/entities/event";
import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { IPresenceRepository } from "src/shared/domain/irepositories/presence_repository_interface";
import { getUpcomingWeekdays } from "src/shared/utils/date_utils";

export class GetTopEventsUseCase {
  constructor(
    private readonly eventRepo: IEventRepository,
    private readonly presenceRepo: IPresenceRepository
  ) {}

  async execute(): Promise<any> {
    const { nextThursday, nextFriday, nextSaturday } = getUpcomingWeekdays();
    const dates = [nextThursday, nextFriday, nextSaturday];
    const dateLabels = ["Thursday", "Friday", "Saturday"]; 

    const events = await this.eventRepo.getEventsByUpcomingDates(dates);

    console.log("GetTopEventsUseCase -> execute -> events", events)

    const eventsByDate = dates.map((date, index) => {
      const eventsForDate = events.filter((event: Event) => event.getEventDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10));

      if (eventsForDate.length === 0) {
        return { date: dateLabels[index], events: [] };
      }

      return {
        date: dateLabels[index],
        events: eventsForDate.map(event => ({
          eventId: event.getEventId,
          name: event.getEventName,
          presenceCount: 0 
        }))
      };
    });

    const eventIds = events.map(event => event.getEventId).filter((id): id is string => id !== undefined);

    const presencesCount = await this.presenceRepo.countPresencesByEvent(eventIds);

    eventsByDate.forEach(day => {
      day.events = day.events.map(event => ({
        ...event,
        presenceCount: presencesCount.find(p => p.eventId === event.eventId)?.count || 0
      }));
    });

    return eventsByDate;
  }
}
