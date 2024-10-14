import { District } from "src/shared/domain/entities/district";
import districtModel, { IDistrict } from "../models/district_model";

export interface DistrictMongoDTOProps {
  districtId: string;
  name: string;
  neighborhoods: string[];
}

export class DistrictMongoDTO {
  private districtId: string;
  private name: string;
  private neighborhoods: string[];

  constructor(props: DistrictMongoDTOProps) {
    this.districtId = props.districtId;
    this.name = props.name;
    this.neighborhoods = props.neighborhoods;
  }

  static fromMongo(districtDoc: any): DistrictMongoDTO {
    return new DistrictMongoDTO({
      districtId: districtDoc._id,
      name: districtDoc.name,
      neighborhoods: districtDoc.neighborhoods,
    });
  }

  static toMongo(district: DistrictMongoDTO): IDistrict {
    return new districtModel({
      districtId: district.districtId,
      name: district.name,
      neighborhoods: district.neighborhoods,
    });
  }

  static toEntity(districtDto: DistrictMongoDTO): District {
    return new District({
      districtId: districtDto.districtId,
      name: districtDto.name,
      neighborhoods: districtDto.neighborhoods,
    });
  }

  static fromEntity(district: District): DistrictMongoDTO {
    return new DistrictMongoDTO({
      districtId: district.districtId || '',
      name: district.name,
      neighborhoods: district.neighborhoods,
    });
  }
}