import { District } from "../entities/district";

export interface IDistrictRepository {
  getDistrictById(districtId: string): Promise<District>;
  createDistrict(district: District): Promise<District>;
}