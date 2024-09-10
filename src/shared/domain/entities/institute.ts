import { INSTITUTE_TYPE, toEnum } from "../enums/institute_type_enum";
import { EntityError } from "../../helpers/errors/domain_errors";

interface InstituteProps {
  institute_id?: string | undefined;
  name: string;
  logo_photo: string;
  description: string;
  institute_type: string;
  address?: string | undefined;
  price?: number | undefined;
  district_id?: string | undefined;
  photos_url?: string[] | undefined;
  events_id?: string[] | undefined;
}

export class Institute {
  private institute_id?: string;
  private name: string;
  private logo_photo: string;
  private description: string;
  private institute_type: INSTITUTE_TYPE;
  private address?: string;
  private price?: number;
  private district_id?: string;
  private photos_url?: string[];
  private events_id?: string[];

  constructor(props: InstituteProps) {
    this.validate(props);
    this.institute_id = props.institute_id || "";
    this.name = props.name;
    this.logo_photo = props.logo_photo;
    this.description = props.description;
    this.institute_type = toEnum(props.institute_type);
    this.address = props.address || "";
    this.price = props.price || 0;
    this.district_id = props.district_id || "";
    this.photos_url = props.photos_url || [];
    this.events_id = props.events_id || [];
  }

  // getters
  get instituteId(): string | undefined {
    return this.institute_id;
  }
  get instituteName(): string {
    return this.name;
  }
  get instituteLogoPhoto(): string {
    return this.logo_photo;
  }
  get instituteDescription(): string {
    return this.description;
  }
  get instituteInstituteType(): INSTITUTE_TYPE {
    return this.institute_type;
  }
  get instituteAddress(): string | undefined {
    return this.address;
  }
  get institutePrice(): number | undefined {
    return this.price;
  }
  get instituteDistrictId(): string | undefined {
    return this.district_id;
  }
  get institutePhotosUrl(): string[] | undefined {
    return this.photos_url;
  }
  get instituteEventsId(): string[] | undefined {
    return this.events_id;
  }
  // setters
  set instituteId(id: string) {
    this.institute_id = id;
  }
  set instituteName(name: string) {
    this.validateName(name);
    this.name = name;
  }
  set instituteLogoPhoto(logo_photo: string) {
    this.logo_photo = logo_photo;
  }
  set instituteDescription(description: string) {
    this.description = description;
  }
  set instituteInstituteType(institute_type: string) {
    this.institute_type = toEnum(institute_type);
  }
  set instituteAddress(address: string) {
    this.address = address;
  }
  set institutePrice(price: number) {
    this.price = price;
  }
  set instituteDistrictId(district_id: string) {
    this.district_id = district_id;
  }
  set institutePhotosUrl(photos_url: string[]) {
    this.photos_url = photos_url;
  }
  set instituteEventsId(events_id: string[]) {
    this.events_id = events_id;
  }

  // methods
  private validate(props: InstituteProps): void {
    this.validateName(props.name);
    this.validateInstituteType(props.institute_type);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 3) {
      throw new EntityError("Nome deve conter pelo menos 3 caracteres");
    }
  }

  private validateInstituteType(institute_type: string): void {
    try {
      toEnum(institute_type);
    } catch (error) {
      throw new EntityError("Tipo de instituto inválido");
    }
  }
}