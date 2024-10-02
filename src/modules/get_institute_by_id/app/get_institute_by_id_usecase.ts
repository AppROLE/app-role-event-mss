import { Institute } from "src/shared/domain/entities/institute";
import { IInstituteRepository } from "src/shared/domain/irepositories/institute_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class GetInstituteByIdUseCase {
    constructor(private readonly repo: IInstituteRepository) {}

    async execute(idInstitute: string): Promise<Institute> {
        const institute = await this.repo.getInstituteById(idInstitute)
        if (!institute) {
            throw new NoItemsFound("event");
        }
        return institute;
    }
}