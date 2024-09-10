import { IEvent } from "../models/event.model";
import { Event } from "../../../domain/entities/event";
import { EventMongoDTO } from "../dtos/event_mongo_dto";

import { v4 as uuidv4 } from "uuid";
import { connectDB } from "../models";
import { IEventRepository } from "../../../domain/irepositories/event_repository_interface";

export class EventRepositoryMongo implements IEventRepository {
  async createEvent(event: Event): Promise<Event> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const eventMongoClient =
        db.connections[0].db?.collection<IEvent>("Event");

      const dto = EventMongoDTO.fromEntity(event);
      const eventDoc = EventMongoDTO.toMongo(dto);

      eventDoc._id = uuidv4();

      const respMongo = await eventMongoClient?.insertOne(eventDoc);
      console.log("MONGO REPO EVENT RESPMONGO: ", respMongo);

      return event;
    } catch (error) {
      throw new Error(`Error creating event on MongoDB: ${error}`);
    }
  }

  getAllEvents(): Promise<Event[]> {
    throw new Error("Method not implemented.");
  }
}
