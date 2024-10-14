import { District } from "src/shared/domain/entities/district";
import { IDistrictRepository } from "src/shared/domain/irepositories/district_repository_interface";
import { connectDB } from "../models";
import { IDistrict } from "../models/district_model";
import { DistrictMongoDTO } from "../dtos/district_mongo_dto";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class DistrictRepositoryMongo implements IDistrictRepository {
  async createDistrict(district: District): Promise<District> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const districtMongoClient = db.connections[0].db?.collection<IDistrict>("District");

      const dto = DistrictMongoDTO.fromEntity(district);
      const districtDoc = DistrictMongoDTO.toMongo(dto);

      await districtMongoClient?.insertOne(districtDoc);

      return district;
      
    } catch (error) {
      throw new Error(`Error creating district on MongoDB: ${error}`);
    }
  }

  async getDistrictById(districtId: string): Promise<District> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const districtMongoClient = db.connections[0].db?.collection<IDistrict>("District");

      console.log('District Repo Mongo, districtId:', districtId);

      const districtDoc = await districtMongoClient?.findOne({ _id: districtId });
      
      if (!districtDoc) throw new NoItemsFound('zona');

      const dto = DistrictMongoDTO.fromMongo(districtDoc);
      const district = DistrictMongoDTO.toEntity(dto);

      console.log('District Repo Mongo, district:', district);

      return district

    } catch (error) {
      throw new Error(`Error retrieving district from MongoDB: ${error}`);
    }
  }
}