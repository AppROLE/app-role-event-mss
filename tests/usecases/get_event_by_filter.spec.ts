import { describe, it, expect } from "vitest";
import { IEventRepository } from "../../src/shared/domain/irepositories/event_repository_interface";
import { GetEventsByFilterUseCase } from "../../src/modules/get_all_events_by_filter/app/get_all_events_by_filter_usecase";
import { EventRepositoryMock } from "../../src/shared/infra/mocks/event_repository_mock";
import { NoItemsFound } from "../../src/shared/helpers/errors/usecase_errors";

describe("GetEventsByFilterUseCase", () => {
  it("should return events based on the given filter (name)", async () => {
    const mockRepo: IEventRepository = new EventRepositoryMock();
    const useCase = new GetEventsByFilterUseCase(mockRepo);

    const filter = {
      name: "Vila Mix Festival",
    };

    const events = await useCase.execute(filter);

    expect(events).toHaveLength(1);
    expect(events[0].getEventName).toBe("Vila Mix Festival");
  });

  it("should return events based on the given filter (price)", async () => {
    const mockRepo: IEventRepository = new EventRepositoryMock();
    const useCase = new GetEventsByFilterUseCase(mockRepo);

    const filter = {
      price: 1,
    };

    const events = await useCase.execute(filter);

    expect(events).toHaveLength(3);
    expect(events[0].getEventName).toBe("Galleria Night");
  });

  it("should return events based on the given filter (event_date)", async () => {
    const mockRepo: IEventRepository = new EventRepositoryMock();
    const useCase = new GetEventsByFilterUseCase(mockRepo);

    const filter = {
      event_date: new Date("2025-11-20").toISOString(),
    };

    const events = await useCase.execute(filter);

    expect(events).toHaveLength(1);
    expect(events[0].getEventName).toBe("Modular");
  });

//   it("should throw NoItemsFound error if no events match the filter", async () => {
//     const mockRepo: IEventRepository = new EventRepositoryMock();
//     const useCase = new GetEventsByFilterUseCase(mockRepo);

//     const filter = {
//       name: "Evento Não Existente",
//     };
//     await expect(useCase.execute(filter)).rejects.toThrow(NoItemsFound);
//   });

  it("should return all events when no filter is provided", async () => {
    const mockRepo: IEventRepository = new EventRepositoryMock();
    const useCase = new GetEventsByFilterUseCase(mockRepo);

    const events = await useCase.execute({});

    expect(events).toHaveLength(3);
  });
});
