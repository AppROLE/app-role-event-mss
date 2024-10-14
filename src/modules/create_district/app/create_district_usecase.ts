import { District } from "src/shared/domain/entities/district";
import { IDistrictRepository } from "src/shared/domain/irepositories/district_repository_interface";

export class CreateDistrictUseCase {
  constructor(private readonly districtRepo: IDistrictRepository) {}

  async execute(name: string, neighborhoods: string[]) {
    const districtEntity = new District({
      name,
      neighborhoods
    })

    const district = await this.districtRepo.createDistrict(districtEntity);

    return district;
  }
}