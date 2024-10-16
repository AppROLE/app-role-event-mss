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
    try {
      console.log("ENTROU NO USECASE EXECUTE");

      const { nextThursday, nextFriday, nextSaturday } = getUpcomingWeekdays();
      const dates = [nextThursday, nextFriday, nextSaturday];
      const dateLabels = ["Thursday", "Friday", "Saturday"];

      console.log("DADOS DAS DATAS: ", dates);

      const events =
        (await this.eventRepo.getEventsByUpcomingDates(dates)) || [];

      console.log("EVENTOS RETORNADOS DO USECASE: ", events);

      const eventsByDate = dates.map((date, index) => {
        const eventsForDate = events.filter(
          (event: Event) =>
            event.getEventDate?.toISOString().slice(0, 10) ===
            date.toISOString().slice(0, 10)
        );

        console.log(`Eventos para ${dateLabels[index]}: `, eventsForDate);

        return {
          date: dateLabels[index],
          events:
            eventsForDate.length > 0
              ? eventsForDate.map((event) => ({
                  eventId: event.getEventId,
                  name: event.getEventName,
                  presenceCount: 0,
                }))
              : [],
        };
      });

      const eventIds = events
        .map((event) => event.getEventId)
        .filter((id): id is string => id !== undefined);

      console.log("EVENT IDs: ", eventIds);

      const presencesCount = await this.presenceRepo.countPresencesByEvent(
        eventIds
      );

      console.log("PRESENCES COUNT: ", presencesCount);

      eventsByDate.forEach((day) => {
        day.events = day.events.map((event) => ({
          ...event,
          presenceCount:
            presencesCount.find((p) => p.eventId === event.eventId)?.count || 0,
        }));

        console.log(`Eventos atualizados para ${day.date}: `, day.events);
      });

      const topEventsByDate = eventsByDate.map((day) => {
        const validEvents = day.events.filter(
          (event) => event.presenceCount > 0
        );
        if (validEvents.length === 0) {
          console.log(`Nenhum evento com presença para ${day.date}`);
          return { date: day.date, events: [] };
        }
        const topEvent = validEvents.reduce((prev, current) =>
          current.presenceCount > prev.presenceCount ? current : prev
        );
        console.log(`Evento com mais presença para ${day.date}: `, topEvent);
        return { date: day.date, events: [topEvent] };
      });

      console.log("TOP EVENTS BY DATE: ", topEventsByDate);

      return topEventsByDate;
    } catch (error: any) {
      console.error("Error in GetTopEventsUseCase:", error);
      throw new Error(`Error executing GetTopEventsUseCase: ${error.message}`);
    }
  }
}
