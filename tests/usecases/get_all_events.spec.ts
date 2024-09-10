import { describe, it, expect } from "vitest";
import { IEventRepository } from "../../src/shared/domain/irepositories/event_repository_interface";
import { GetAllEventsUseCase } from "../../src/modules/get_all_events/app/get_all_events_usecase";
import { EventRepositoryMock } from "../../src/shared/infra/mocks/event_repository_mock";

describe("GetAllEventsUseCase", () => {
  it("should return all events from the repository", async () => {
    const mockRepo: IEventRepository = new EventRepositoryMock();
    const useCase = new GetAllEventsUseCase(mockRepo);

    const events = await useCase.execute();

    expect(events).toHaveLength(3);
  });
});
