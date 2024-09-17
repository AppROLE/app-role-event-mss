import { describe, it, expect } from "vitest";
import { GetEventByIdUseCase } from "../../src/modules/get_event_by_id/app/get_event_by_id_usecase";
import { EventRepositoryMock } from "../../src/shared/infra/mocks/event_repository_mock";
import { NoItemsFound } from "../../src/shared/helpers/errors/usecase_errors";
import { IEventRepository } from "../../src/shared/domain/irepositories/event_repository_interface";
import { EventMock } from "../../src/shared/domain/mocks/event_mock";

describe("GetEventByIdUseCase", () => {
  it("should return an event by ID", async () => {
    const mockRepo: IEventRepository = new EventRepositoryMock();
    const usecase = new GetEventByIdUseCase(mockRepo);
    const mock = new EventMock();
    const event = mock.events[0];
    console.log("EVENTO: ", event);

    const eventId = "1";
    const result = await usecase.execute(eventId);

    expect(result.getEventId).toBe("1");
    expect(result.getEventName).toBe("Galleria Night");
    expect(result.getEventDescription).toBe(
      "Galleria club. A melhor balada de São Paulo. Venha curtir com a gente!"
    );
    expect(result.getEventAddress).toBe("987 Club St, Downtown");
    expect(result.getEventPrice).toBe(80.0);
    expect(result.getEventAgeRange).toBe("21+");
    expect(result.getEventDate).toEqual(new Date("2025-09-15"));
    expect(result.getEventDistrictId).toBe("1");
    expect(result.getInstituteId).toBe("1");
    expect(result.getEventStatus).toBe("ACTIVE");
    expect(result.getEventBannerUrl).toBe(
      "https://example.com/galleria_night.jpg"
    );
  });

  it("should throw NoItemsFound if event is not found", async () => {
    const mockRepo: IEventRepository = new EventRepositoryMock();
    const usecase = new GetEventByIdUseCase(mockRepo);

    const eventId = "999"; 

    await expect(usecase.execute(eventId)).rejects.toThrow(
      "Nenhum item foi encontrado para event"
    );
  });
});
