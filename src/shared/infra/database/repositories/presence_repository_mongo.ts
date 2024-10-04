import { Presence } from "src/shared/domain/entities/presence";
import { IPresence } from "../models/presence.model";
import { Model } from "mongoose";
import { IPresenceRepository } from "src/shared/domain/irepositories/presence_repository_interface";
import { connectDB } from "../models";

export class PresenceRepositoryMongo implements IPresenceRepository {

  async getAllPresences(eventId: string): Promise<Presence[]> {
    const db = await connectDB();
    db.connections[0].on("error", () => {
      console.error.bind(console, "connection error:");
      throw new Error("Error connecting to MongoDB");
    })

    const presenceMongoClient = db.connections[0].db?.collection<IPresence>("Presence");

    const presences = await presenceMongoClient?.find({ event_id: eventId }).toArray();

    if (!presences || presences.length === 0) {
      return [];
    }

    return presences.map((presenceDoc) => {
      return new Presence({
        id: presenceDoc._id,
        userId: presenceDoc.user_id,
        eventId: presenceDoc.event_id,
        username: presenceDoc.username,
        nickname: presenceDoc.nickname,
        profilePhoto: presenceDoc.profile_photo,
        promoterCode: presenceDoc.promoter_code,
        checkedInAt: presenceDoc.checked_in_at
      });
    });
  }
}