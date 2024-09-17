import { IEvent } from "../models/event.model";
import { Event } from "../../../domain/entities/event";
import { EventMongoDTO } from "../dtos/event_mongo_dto";

import { connectDB } from "../models";
import { IEventRepository } from "../../../domain/irepositories/event_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";
import { v4 as uuidv4 } from "uuid";

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

  async getAllEvents(): Promise<Event[]> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const eventMongoClient =
        db.connections[0].db?.collection<IEvent>("Event");

      const events = (await eventMongoClient?.find().toArray()) as IEvent[];
      if (!events || events.length === 0) {
        throw new NoItemsFound("events");
      }

      return events.map((eventDoc) =>
        EventMongoDTO.toEntity(EventMongoDTO.fromMongo(eventDoc))
      );
    } catch (error) {
      throw new Error(`Error retrieving events from MongoDB: ${error}`);
    }
  }

  async getEventById(eventId: string): Promise<Event> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const eventMongoClient =
        db.connections[0].db?.collection<IEvent>("Event");

      const eventDoc = await eventMongoClient?.findOne({ _id: eventId });
      if (!eventDoc) {
        throw new NoItemsFound("event");
      }

      return EventMongoDTO.toEntity(EventMongoDTO.fromMongo(eventDoc));
    } catch (error) {
      throw new Error(`Error retrieving event by ID from MongoDB: ${error}`);
    }
  }
}
