import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { IPresenceRepository } from "src/shared/domain/irepositories/presence_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class ConfirmEventUseCase {
  constructor(
    private readonly eventRepo: IEventRepository,
    private readonly presenceRepo: IPresenceRepository
  ) {}

  async execute(eventId: string, username: string, nickname: string, profilePhoto?: string, promoterCode?: string) {
    const event = await this.eventRepo.getEventById(eventId);

    if (!event) throw new NoItemsFound("eventId");

    await this.presenceRepo.confirmPresence(
      eventId,
      username,
      nickname,
      profilePhoto,
      promoterCode
    );
  }
}