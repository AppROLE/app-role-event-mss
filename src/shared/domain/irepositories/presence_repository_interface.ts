import { Presence } from "../entities/presence";

export interface IPresenceRepository {
  getAllPresences(eventId: string): Promise<Presence[]>;
  confirmPresence(
    eventId: string,
    username: string,
    nickname: string,
    profilePhoto?: string,
    promoterCode?: string
  ): Promise<void>;
}