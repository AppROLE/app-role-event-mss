import { toEnumPartnerType } from "src/shared/domain/enums/partner_type_enum";
import { Institute } from "../../../domain/entities/institute";
import { INSTITUTE_TYPE } from "../../../domain/enums/institute_type_enum";
import instituteModel, { IInstitute as InstituteDocument } from "../models/institute.model";

export interface InstituteMongoDTOProps {
  _id: string;
  name: string;
  logo_photo: string;
  description: string;
  institute_type: string;
  partner_type: string;
  address: string;
  price: number;
  district_id: string;
  photos: { url: string }[];
  events: {
    _id: string;
    name: string;
    banner_url: string;
    address: string;
    price: number;
    description: string;
    age_range: string;
    event_date: Date;
    features: { name: string }[];
  }[];
}

export class InstituteMongoDTO {
  private _id: string;
  private name: string;
  private logo_photo: string;
  private description: string;
  private institute_type: string;
  private partner_type: string;
  private address: string;
  private price: number;
  private district_id: string;
  private photos: { url: string }[];
  private events: {
    _id: string;
    name: string;
    banner_url: string;
    address: string;
    price: number;
    description: string;
    age_range: string;
    event_date: Date;
    features: { name: string }[];
  }[];

  constructor(props: InstituteMongoDTOProps) {
    this._id = props._id;
    this.name = props.name;
    this.logo_photo = props.logo_photo;
    this.description = props.description;
    this.institute_type = props.institute_type;
    this.partner_type = props.partner_type;
    this.address = props.address;
    this.price = props.price;
    this.district_id = props.district_id;
    this.photos = props.photos;
    this.events = props.events;
  }

  static toEntity(instituteMongoDTO: InstituteMongoDTO): Institute {
    return new Institute({
      institute_id: instituteMongoDTO._id,
      partner_type: toEnumPartnerType(instituteMongoDTO.partner_type),
      name: instituteMongoDTO.name,
      logo_photo: instituteMongoDTO.logo_photo,
      description: instituteMongoDTO.description,
      institute_type: instituteMongoDTO.institute_type as INSTITUTE_TYPE,
      address: instituteMongoDTO.address,
      price: instituteMongoDTO.price,
      district_id: instituteMongoDTO.district_id,
      photos_url: instituteMongoDTO.photos.map(photo => photo.url),
      events_id: instituteMongoDTO.events.map(event => event._id)
    });
  }

  static fromEntity(institute: Institute): InstituteMongoDTO {
    return new InstituteMongoDTO({
      _id: institute.instituteId || '',
      name: institute.instituteName,
      logo_photo: institute.instituteLogoPhoto || '',
      description: institute.instituteDescription,
      institute_type: institute.instituteInstituteType,
      partner_type: institute.institutePartnerType,
      address: institute.instituteAddress || '',
      price: institute.institutePrice || 0,
      district_id: institute.instituteDistrictId || '',
      photos: institute.institutePhotosUrl?.map(url => ({ url })) || [],
      events: institute.instituteEventsId?.map(eventId => ({
        _id: eventId,
        name: '',
        banner_url: '',
        address: '',
        price: 0,
        description: '',
        age_range: '',
        event_date: new Date(),
        features: []
      })) || []
    });
  }

  static toMongo(instituteMongoDTO: InstituteMongoDTO): InstituteDocument {
    const instituteDocument = new instituteModel({
      _id: instituteMongoDTO._id,
      name: instituteMongoDTO.name,
      logo_photo: instituteMongoDTO.logo_photo,
      description: instituteMongoDTO.description,
      institute_type: instituteMongoDTO.institute_type,
      address: instituteMongoDTO.address,
      price: instituteMongoDTO.price,
      district_id: instituteMongoDTO.district_id,
      photos: instituteMongoDTO.photos,
      events: instituteMongoDTO.events
    });

    return instituteDocument as InstituteDocument;
  }

  static fromMongo(institute: any): InstituteMongoDTO {
    return new InstituteMongoDTO({
      _id: institute.instituteId || '',
      name: institute.instituteName,
      logo_photo: institute.instituteLogoPhoto || '',
      description: institute.instituteDescription,
      institute_type: institute.instituteInstituteType,
      partner_type: institute.institutePartnerType,
      address: institute.instituteAddress || '',
      price: institute.institutePrice || 0,
      district_id: institute.instituteDistrictId || '',
      photos: institute.institutePhotosUrl || [],
      events: institute.instituteEventsId || []
    })
  }
}
