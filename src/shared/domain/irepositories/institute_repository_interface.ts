import { Institute } from "../entities/institute";

export interface IInstituteRepository {
  createInstitute(institute: Institute): Promise<Institute>;
}