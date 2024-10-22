import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { IPresenceRepository } from "src/shared/domain/irepositories/presence_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class UnConfirmEventUseCase {
  constructor(
    private readonly eventRepo: IEventRepository,
    private readonly presenceRepo: IPresenceRepository
  ) {}

  async execute(eventId: string, username: string) {
    const event = await this.eventRepo.getEventById(eventId);

    if (!event) throw new NoItemsFound("eventId");

    const presenceExists = await this.presenceRepo.getPresenceByEventAndUser(eventId, username);

    if (!presenceExists) throw new NoItemsFound("presence");

    await this.presenceRepo.unConfirmPresence(eventId, username);
  }
}