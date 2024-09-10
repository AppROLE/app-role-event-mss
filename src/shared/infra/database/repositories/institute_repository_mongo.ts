import { IInstitute } from "../models/institute.model";
import { Institute } from "../../../domain/entities/institute";
import { InstituteMongoDTO } from "../dtos/institute_mongo_dto";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "../models";
import { IInstituteRepository } from "../../../domain/irepositories/institute_repository_interface";

export class InstituteRepositoryMongo implements IInstituteRepository {
  async createInstitute(institute: Institute): Promise<Institute> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const instituteMongoClient =
        db.connections[0].db?.collection<IInstitute>("Institute");

      const dto = InstituteMongoDTO.fromEntity(institute);
      const instituteDoc = InstituteMongoDTO.toMongo(dto);

      instituteDoc._id = uuidv4();

      const respMongo = await instituteMongoClient?.insertOne(instituteDoc);
      console.log("MONGO REPO INSTITUTE RESPMONGO: ", respMongo);

      return institute;
    } catch (error) {
      throw new Error(`Error creating institute on MongoDB: ${error}`);
    }
  }
}
