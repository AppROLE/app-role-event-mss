// src/repositories/eventRepositoryMongo.ts
import { IEvent } from "../models/event.model"; // Importando o modelo de Evento
import { Event } from "../../../domain/entities/event"; // Importe da classe Event do domínio, se existir
import { EventMongoDTO } from "../dtos/event_mongo_dto"; // Importe do DTO adequado, se existir
import {
  DuplicatedItem,
  NoItemsFound,
} from "../../../helpers/errors/usecase_errors"; // Importe os erros necessários
import { v4 as uuidv4 } from "uuid"; // Importe a função uuidv4
import { connectDB } from "../models";

export class EventRepositoryMongo {
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
      const eventDoc = EventMongoDTO.toMongo(dto); // Converter o DTO para o formato adequado do MongoDB

      console.log("MONGO REPO EVENT DOC: ", eventDoc);

      eventDoc._id = uuidv4();

      const respMongo = await eventMongoClient?.insertOne(eventDoc);
      console.log("MONGO REPO EVENT RESPMONGO: ", respMongo);
      console.log("MONGO REPO EVENT CREATED: ", event);

      return event;
    } catch (error) {
      throw new Error(`Error creating event on MongoDB: ${error}`);
    } finally {
    }
  }
}
