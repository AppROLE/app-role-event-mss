import { connectDB } from "../models";
import { IPhrase } from "../models/phrase.model";
import { IPhraseRepository } from "../../../domain/irepositories/phrase_repository_interface";

export class PhraseRepositoryMongo implements IPhraseRepository {
    async getPhrase(): Promise<IPhrase | null> {
      try {
        const db = await connectDB();
        db.connections[0].on("error", () => {
          console.error.bind(console, "connection error:");
          throw new Error("Error connecting to MongoDB");
        });
  
        const phraseMongoClient = db.connections[0].db?.collection<IPhrase>("Phrase");
  
        const randomPhrase = await phraseMongoClient
          ?.aggregate([{ $sample: { size: 1 } }])
          .toArray();
  
        return randomPhrase ? randomPhrase[0] as IPhrase : null;
      } catch (error) {
        throw new Error(`Error retrieving random phrase from MongoDB: ${error}`);
      }
    }
  }
  