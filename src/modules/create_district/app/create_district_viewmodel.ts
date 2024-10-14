export class CreateDistrictViewmodel {
  districtId?: string;
  name: string;
  neighborhoods: string[];

  constructor(
    name: string,
    neighborhoods: string[],
    districtId?: string
  ) {
    this.name = name;
    this.neighborhoods = neighborhoods;
    this.districtId = districtId;
  }

  toJSON() {
    return {
      district: {
        districtId: this.districtId,
        name: this.name,
        neighborhoods: this.neighborhoods,
      },
      message: 'Zona criada com sucesso'
    }
  }
}