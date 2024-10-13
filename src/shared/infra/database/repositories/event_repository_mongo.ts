import { IEvent } from "../models/event.model";
import { Event } from "../../../domain/entities/event";
import { EventMongoDTO } from "../dtos/event_mongo_dto";

import { connectDB } from "../models";
import { IEventRepository } from "../../../domain/irepositories/event_repository_interface";
import {
  FailedToAddToGallery,
  NoItemsFound,
} from "../../../../../src/shared/helpers/errors/usecase_errors";
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

  async getEventsByFilter(filter: any): Promise<Event[]> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Erro ao conectar ao MongoDB");
      });

      const eventMongoClient =
        db.connections[0].db?.collection<IEvent>("Event");

      const query: any = {};

      if (filter.name) query.name = filter.name;
      if (filter.price) query.price = Number(filter.price);
      if (filter.address) query.address = filter.address;
      if (filter.age_range) query.age_range = filter.age_range;
      if (filter.event_date)
        query.event_date = { $gte: new Date(filter.event_date) };
      if (filter.district_id) query.district_id = filter.district_id;
      if (filter.institute_id) query.institute_id = filter.institute_id;
      if (filter.music_type) query.music_type = { $in: filter.music_type };
      if (filter.features) query.features = { $in: filter.features };
      if (filter.category) query.category = filter.category;
      if (filter.package_type)
        query.package_type = { $in: filter.package_type };
      if (filter.ticket_url) query.ticket_url = filter.ticket_url;

      const eventDocs = (await eventMongoClient
        ?.find(query)
        .toArray()) as IEvent[];

      if (!eventDocs || eventDocs.length === 0) {
        throw new NoItemsFound("evento");
      }

      return eventDocs.map((eventDoc) =>
        EventMongoDTO.toEntity(EventMongoDTO.fromMongo(eventDoc))
      );
    } catch (error) {
      throw new Error(`Erro ao buscar eventos com filtro no MongoDB: ${error}`);
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
        throw new NoItemsFound("evento");
      }
      console.log("eventDocAQUI: ", eventDoc);

      return EventMongoDTO.toEntity(EventMongoDTO.fromMongo(eventDoc));
    } catch (error) {
      throw new Error(`Error retrieving event by ID from MongoDB: ${error}`);
    }
  }

  async deleteEventById(eventId: string): Promise<void> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const eventMongoClient =
        db.connections[0].db?.collection<IEvent>("Event");

      const result = await eventMongoClient?.deleteOne({ _id: eventId });
      if (!result?.deletedCount) {
        throw new NoItemsFound("event");
      }
    } catch (error) {
      throw new Error(`Error deleting event from MongoDB: ${error}`);
    }
  }

  async updateEventPhoto(eventId: string, eventPhoto: string): Promise<string> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const eventMongoClient =
        db.connections[0].db?.collection<IEvent>("Event");

      const result = await eventMongoClient?.updateOne(
        { _id: eventId },
        { $set: { event_photo_link: eventPhoto } }
      );

      if (!result?.modifiedCount) {
        throw new NoItemsFound("event");
      }

      return eventPhoto;
    } catch (error) {
      throw new Error(`Error updating event photo on MongoDB: ${error}`);
    }
  }

  async updateGalleryArray(eventId: string, imageKey: string): Promise<void> {
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

      if (!eventDoc.galery_link) {
        await eventMongoClient?.updateOne(
          { _id: eventId },
          { $set: { galery_link: [] } }
        );
      }

      const result = await eventMongoClient?.updateOne(
        { _id: eventId },
        { $push: { galery_link: imageKey } }
      );

      if (!result?.modifiedCount) {
        throw new FailedToAddToGallery("event");
      }
    } catch (error) {
      throw new Error(`Error updating event gallery on MongoDB: ${error}`);
    }
  }

  async countGalleryEvent(eventId: string): Promise<Number> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const eventMongoClient =
        db.connections[0].db?.collection<IEvent>("Event");

      const eventDocC = await eventMongoClient?.findOne({ _id: eventId });
      console.log("EVENT ID AQUI TMB PORRA", eventId);
      console.log("eventDocaQUIII: ", eventDocC);

      const eventDoc = await eventMongoClient?.findOne({ _id: eventId });
      if (!eventDoc) {
        throw new NoItemsFound("event");
      }

      return eventDoc.galery_link ? eventDoc.galery_link.length : 0;
    } catch (error) {
      throw new Error(`Error counting event gallery on MongoDB: ${error}`);
    }
  }
}
