import { describe, it, expect } from "vitest";
import { DeleteEventByIdUseCase } from "../../src/modules/delete_event_by_id/app/delete_event_by_id_usecase";
import { EventRepositoryMock } from "../../src/shared/infra/mocks/event_repository_mock";
import { NoItemsFound } from "../../src/shared/helpers/errors/usecase_errors";
import { IEventRepository } from "../../src/shared/domain/irepositories/event_repository_interface";
import { EventMock } from "../../src/shared/domain/mocks/event_mock";

describe("DeleteEventByIdUseCase", () => {
  it("should delete an event by ID", async () => {
    const mockRepo: IEventRepository = new EventRepositoryMock();
    const usecase = new DeleteEventByIdUseCase(mockRepo);
    const mock = new EventMock();
    const event = mock.events[0];
    console.log("EVENTO ID A SER DELETADO: ", event.getEventId);

    const eventId = "1";
    await usecase.execute(eventId);

    await expect(mockRepo.getEventById(eventId)).rejects.toThrow(
      new NoItemsFound("event")
    );
  });

  it("should throw NoItemsFound if event is not found", async () => {
    const mockRepo: IEventRepository = new EventRepositoryMock();
    const usecase = new DeleteEventByIdUseCase(mockRepo);

    const eventId = "999"; 

    await expect(usecase.execute(eventId)).rejects.toThrow(
      "Nenhum item foi encontrado para event"
    );
  });
});
