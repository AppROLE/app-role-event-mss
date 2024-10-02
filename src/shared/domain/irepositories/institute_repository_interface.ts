import { Institute } from "../entities/institute";

export interface IInstituteRepository {
  createInstitute(institute: Institute): Promise<Institute>;
  getInstituteById(instituteId: string): Promise<Institute>;
  deleteInstituteById(instituteId: string): Promise<void>;
}