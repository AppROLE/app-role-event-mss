import { InstituteMock } from "src/shared/domain/mocks/institute_mock";
import { Institute } from "../../domain/entities/institute";
import { IInstituteRepository } from "../../domain/irepositories/institute_repository_interface";

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
}
