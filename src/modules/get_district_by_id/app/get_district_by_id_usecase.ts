import { IDistrictRepository } from "src/shared/domain/irepositories/district_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class GetDistrictByIdUseCase {
  constructor(private readonly districtRepo: IDistrictRepository) {}

  async execute(districtId: string) {
    const district = await this.districtRepo.getDistrictById(districtId);

    if (!district) throw new NoItemsFound('zona');

    return district;
  }
}