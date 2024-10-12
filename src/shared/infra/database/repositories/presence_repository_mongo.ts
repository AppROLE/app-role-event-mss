import { Presence } from "src/shared/domain/entities/presence";
import { IPresence } from "../models/presence.model";
import { Model } from "mongoose";
import { IPresenceRepository } from "src/shared/domain/irepositories/presence_repository_interface";
import { connectDB } from "../models";
import { PresenceMongoDTO } from "../dtos/presence_mongo_dto";

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
        eventId: presenceDoc.event_id,
        username: presenceDoc.username,
        nickname: presenceDoc.nickname,
        profilePhoto: presenceDoc.profile_photo,
        promoterCode: presenceDoc.promoter_code,
        checkedInAt: presenceDoc.checked_in_at || new Date()
      });
    });
  }

  async confirmPresence(
    eventId: string,
    username: string,
    nickname: string,
    profilePhoto?: string,
    promoterCode?: string
  ): Promise<void> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      })

      const presenceMongoClient = db.connections[0].db?.collection<IPresence>("Presence");

      console.log("PresenceRepositoryMongo -> confirmPresence -> eventId", eventId)
      console.log("PresenceRepositoryMongo -> confirmPresence -> username", username)
      console.log("PresenceRepositoryMongo -> confirmPresence -> nickname", nickname)
      console.log("PresenceRepositoryMongo -> confirmPresence -> profilePhoto", profilePhoto)
      console.log("PresenceRepositoryMongo -> confirmPresence -> promoterCode", promoterCode)

      const entityPresence = new Presence({
        eventId,
        username,
        nickname,
        profilePhoto,
        promoterCode,
        checkedInAt: new Date()
      });

      const dto = PresenceMongoDTO.fromEntity(entityPresence);

      const presenceDocFromDto = PresenceMongoDTO.toMongo(dto)

      await presenceMongoClient?.insertOne(presenceDocFromDto);

    } catch (error) {
      console.error(error);
      throw new Error("Error confirming presence");
    }
  }
}