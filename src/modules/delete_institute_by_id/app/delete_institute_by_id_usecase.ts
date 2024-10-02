import { IInstituteRepository } from "src/shared/domain/irepositories/institute_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class DeleteInstituteByIdUseCase {
  constructor(private readonly repo: IInstituteRepository) {}

  async execute(instituteId: string): Promise<void> {
    const institute = await this.repo.getInstituteById(instituteId);
    if (!institute) {
      throw new NoItemsFound("institute");
    }

    await this.repo.deleteInstituteById(instituteId);
  }
}
