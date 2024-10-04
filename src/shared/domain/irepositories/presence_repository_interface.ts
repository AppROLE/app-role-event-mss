import { Presence } from "../entities/presence";

export interface IPresenceRepository {
  getAllPresences(eventId: string): Promise<Presence[]>;
}