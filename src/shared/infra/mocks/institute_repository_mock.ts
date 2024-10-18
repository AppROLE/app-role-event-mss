import { InstituteMock } from "src/shared/domain/mocks/institute_mock";
import { Institute } from "../../domain/entities/institute";
import { IInstituteRepository } from "../../domain/irepositories/institute_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";
import { PARTNER_TYPE } from "src/shared/domain/enums/partner_type_enum";

export class InstituteRepositoryMock implements IInstituteRepository {
  private institutes: Institute[];

  constructor() {
    const instituteMock = new InstituteMock();
    this.institutes = instituteMock.institutes;
  }
  updateInstitutePhoto(name: string, institutePhoto: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  createInstitute(institute: Institute): Promise<Institute> {
    this.institutes.push(institute);
    return Promise.resolve(institute);
  }

  getInstituteById(instituteId: string): Promise<Institute> {
    const institute = this.institutes.find((institute) => institute.instituteId === instituteId);
    if (!institute) {
      throw new NoItemsFound("institute");
    }
    return Promise.resolve(institute);
  }

  async getAllInstitutes(): Promise<Institute[]> {
    return [...this.institutes];
  }

  async getAllInstitutesByPartnerType(partnerType: PARTNER_TYPE): Promise<Institute[]> {
    const institutes = this.institutes.filter((institute) => institute.institutePartnerType === partnerType);
    return institutes;
  }

  async deleteInstituteById(instituteId: string): Promise<void> {
    const eventIndex = this.institutes.findIndex(
      (institute) => institute.instituteId === instituteId
    );
    
    if (eventIndex === -1) {
      throw new NoItemsFound("event");
    }
  
    this.institutes.splice(eventIndex, 1);
    
    return Promise.resolve(); 
  }

  async updateInstitute(institute: Institute): Promise<void> {
    const instituteIndex = this.institutes.findIndex(
      (institute) => institute.instituteId === institute.instituteId
    );
    if (instituteIndex === -1) {
      throw new NoItemsFound("institute");
    }
    this.institutes[instituteIndex] = institute;
    return Promise.resolve();
  }
}
