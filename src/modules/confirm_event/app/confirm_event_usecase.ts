import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { IPresenceRepository } from "src/shared/domain/irepositories/presence_repository_interface";
import { NoItemsFound, UserAlreadyConfirmedEvent } from "src/shared/helpers/errors/usecase_errors";

export class ConfirmEventUseCase {
  constructor(
    private readonly eventRepo: IEventRepository,
    private readonly presenceRepo: IPresenceRepository
  ) {}

  async execute(eventId: string, username: string, nickname: string, profilePhoto?: string, promoterCode?: string) {
    console.log("ConfirmEventUseCase -> execute -> eventId", eventId)
    console.log("ConfirmEventUseCase -> execute -> username", username)
    console.log("ConfirmEventUseCase -> execute -> nickname", nickname)
    console.log("ConfirmEventUseCase -> execute -> profilePhoto", profilePhoto)
    console.log("ConfirmEventUseCase -> execute -> promoterCode", promoterCode)
    
    const event = await this.eventRepo.getEventById(eventId);

    if (!event) throw new NoItemsFound("eventId");

    const alreadyConfirmed = await this.presenceRepo.getPresenceByEventAndUser(eventId, username);

    if (alreadyConfirmed) throw new UserAlreadyConfirmedEvent()

    await this.presenceRepo.confirmPresence(
      eventId,
      username,
      nickname,
      profilePhoto,
      promoterCode
    );
  }
}