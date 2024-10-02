import { InstituteMock } from "src/shared/domain/mocks/institute_mock";
import { Institute } from "../../domain/entities/institute";
import { IInstituteRepository } from "../../domain/irepositories/institute_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class InstituteRepositoryMock implements IInstituteRepository {
  private institutes: Institute[];

  constructor() {
    const instituteMock = new InstituteMock();
    this.institutes = instituteMock.institutes;
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
}
