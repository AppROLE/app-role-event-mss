import { EntityError } from "src/shared/helpers/errors/domain_errors";

interface DistrictProps {
  districtId?: string;
  name: string;
  neighborhoods: string[];
}

export class District {
  private _districtId?: string;
  private _name: string;
  private _neighborhoods: string[];

  constructor(props: DistrictProps) {
    this.validate(props);

    if (props.districtId != undefined) {
      this._districtId = props.districtId;
    }
    this._name = props.name;
    this._neighborhoods = props.neighborhoods;
  }

  private validate(props: DistrictProps) {
    if (!props.name) {
      throw new EntityError('nomeDaZona');
    }
    if (!props.neighborhoods) {
      throw new EntityError('bairros');
    }

    if (props.name.length < 3 || props.name.length > 50) {
      throw new EntityError('nomeDaZona');
    }

    props.neighborhoods.forEach(neighborhood => {
      if (neighborhood.length < 2 || neighborhood.length > 50) {
        throw new EntityError('bairros');
      }
    })
  }

  get districtId() {
    return this._districtId;
  }

  get name() {
    return this._name;
  }

  get neighborhoods() {
    return this._neighborhoods;
  }

  set setName(name: string) {
    this._name = name;
  }

  set setNeighborhoods(neighborhoods: string[]) {
    this._neighborhoods = neighborhoods;
  }
}