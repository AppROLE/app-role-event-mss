import { IInstitute } from "../models/institute.model";
import { Institute } from "../../../domain/entities/institute";
import { InstituteMongoDTO } from "../dtos/institute_mongo_dto";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "../models";
import { IInstituteRepository } from "../../../domain/irepositories/institute_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";
import { PARTNER_TYPE } from "src/shared/domain/enums/partner_type_enum";

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

  async getInstituteById(instituteId: string): Promise<Institute> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const instituteMongoClient =
        db.connections[0].db?.collection<IInstitute>("Institute");

      // const instituteDoc = await instituteMongoClient?.findOne({ _id: instituteId });
      const instituteDocs = await instituteMongoClient?.aggregate([
        {
          $match: { _id: instituteId }  // Filtra o instituto pelo ID
        },
        {
          $lookup: {
            from: "Event",        // Coleção de eventos
            localField: "events",  // Campo que contém os IDs dos eventos no documento de instituto
            foreignField: "_id",   // Campo na coleção de eventos que corresponde ao ID dos eventos
            as: "eventsDetails"    // Nome do campo que conterá os detalhes dos eventos
          }
        }
      ]).toArray();
      
      const instituteDoc = instituteDocs ? instituteDocs[0] : null;
      if (!instituteDoc) {
        throw new NoItemsFound("institute");
      }

      return InstituteMongoDTO.toEntity(InstituteMongoDTO.fromMongo(instituteDoc));
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        throw new NoItemsFound(error.message);
      }
      throw new Error(`Error creating institute on MongoDB: ${error}`);
    }
  }

  async getAllInstitutes(): Promise<Institute[]> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });
  
      const instituteMongoClient =
        db.connections[0].db?.collection<IInstitute>("Institute");
  
      const institutes = (await instituteMongoClient?.find().toArray()) as IInstitute[];
      console.log(institutes);
  
      if (!Array.isArray(institutes) || institutes.length === 0) {
        throw new NoItemsFound("institutes");
      }
  
      return institutes.map((instituteDoc) =>
        InstituteMongoDTO.toEntity(InstituteMongoDTO.fromMongo(instituteDoc))
      );
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        throw new NoItemsFound(error.message);
      }
      throw new Error(`Error retrieving institutes from MongoDB: ${error}`);
    }
  }  

  async deleteInstituteById(instituteId: string): Promise<void> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const instituteMongoClient =
        db.connections[0].db?.collection<IInstitute>("Institute");

      const result = await instituteMongoClient?.deleteOne({ _id: instituteId });
      if (!result?.deletedCount) {
        throw new NoItemsFound("institute");
      }
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        throw new NoItemsFound(error.message);
      }
      throw new Error(`Error creating institute on MongoDB: ${error}`);
    }
  }

  async getAllInstitutesByPartnerType(partnerType: PARTNER_TYPE): Promise<Institute[]> {
    try {
      const db = await connectDB();
      db.connections[0].on("error", () => {
        console.error.bind(console, "connection error:");
        throw new Error("Error connecting to MongoDB");
      });

      const instituteMongoClient = db.connections[0].db?.collection<IInstitute>("Institute");

      const institutes = (await instituteMongoClient?.find({
        partner_type: partnerType
      }).toArray()) as IInstitute[];
      // console.log(institutes);
  
      if (!Array.isArray(institutes) || institutes.length === 0) {
        throw new NoItemsFound("institutes");
      }
      
      return institutes.map((institute) =>
        InstituteMongoDTO.toEntity(InstituteMongoDTO.fromMongo(institute))
      );
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        throw new NoItemsFound(error.message);
      }
      throw new Error(`Error getting institute on Mongo: ${error}`)
    }
  }

  async updateInstitutePhoto(name: string, institutePhoto: string): Promise<string> {
    try {
      const db = await connectDB();
      db.connections[0].on('error', () => {
        console.error.bind(console, 'connection error:')
        throw new Error('Error connecting to MongoDB');
      });

      const instituteMongoClient = db.connections[0].db?.collection<IInstitute>('Institute');

      const instituteDoc = await instituteMongoClient?.findOne({ name });

      if (!instituteDoc) {
        throw new NoItemsFound('name');
      }

      instituteDoc.logo_photo = institutePhoto;

      const respMongo = await instituteMongoClient?.updateOne({ name }, { $set: instituteDoc });
      console.log('MONGO REPO USER RESPMONGO: ', respMongo);

      return institutePhoto;

    } catch (error) {
      throw new Error(`Error updating profile photo on MongoDB: ${error}`);
    }
  }

  async updateInstitute(institute: Institute): Promise<void> {
    try {
      const db = await connectDB();
      db.connections[0].on('error', () => {
        console.error('connection error:');
        throw new Error('Error connecting to MongoDB');
      });
  
      const instituteMongoClient = db.connections[0].db?.collection<IInstitute>('Institute');
  
      // Verificar se o documento do instituto existe
      const instituteDoc = await instituteMongoClient?.findOne({ _id: institute.instituteId });
  
      if (!instituteDoc) {
        throw new NoItemsFound('institute');
      }
  
      // Criação do objeto de atualizações, apenas com os campos que foram enviados
      const updateData: Partial<Institute> = {};
  
      if (institute.instituteDescription) {
        updateData.instituteDescription = institute.instituteDescription;
      }
      if (institute.instituteInstituteType) {
        updateData.instituteInstituteType = institute.instituteInstituteType;
      }
      if (institute.institutePartnerType) {
        updateData.institutePartnerType = institute.institutePartnerType;
      }
      if (institute.instituteName) {
        updateData.instituteName = institute.instituteName;
      }
      if (institute.instituteAddress) {
        updateData.instituteAddress = institute.instituteAddress;
      }
      if (institute.instituteDistrictId) {
        updateData.instituteDistrictId = institute.instituteDistrictId;
      }
      if (institute.institutePrice) {
        updateData.institutePrice = institute.institutePrice;
      }
      if (institute.institutePhone) {
        updateData.institutePhone = institute.institutePhone;
      }
  
      // Atualizando o documento no MongoDB
      const result = await instituteMongoClient?.updateOne(
        { _id: institute.instituteId },
        { $set: updateData }
      );
  
      if (result?.modifiedCount === 0) {
        throw new Error('No institute was updated');
      }
    } catch (error: any) {
      throw new Error(`Error updating institute on MongoDB: ${error.message}`);
    }
  }
  
}
