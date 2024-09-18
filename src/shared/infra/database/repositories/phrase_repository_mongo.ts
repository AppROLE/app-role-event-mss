import { connectDB } from "../models";
import { IPhrase } from "../models/phrase.model";
import { IPhraseRepository } from "../../../domain/irepositories/phrase_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

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

      if (!randomPhrase || randomPhrase.length === 0) {
        throw new NoItemsFound("phrase in db");
      }

      return randomPhrase[0] as IPhrase;
    } catch (error) {
      throw new Error(`Error retrieving random phrase from MongoDB: ${error}`);
    }
  }
}
