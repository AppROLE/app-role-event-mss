import eventModel, { IEvent as EventDocument } from "../models/event.model";
import { Event } from "../../../domain/entities/event";
import { STATUS } from "../../../domain/enums/status_enum";

export interface EventMongoDTOProps {
  _id: string;
  institute_id: string;
  name: string;
  banner_url: string | undefined;
  address: string;
  price: number;
  description: string;
  age_range: string;
  event_date: Date;
  district_id: string;
  features: string[];
  music_type: string[];
  menu_link: string;
  galery_link: string[];
  package_type?: string[];
  category?: string;
}

export class EventMongoDTO {
  private _id: string;
  private institute_id: string;
  private name: string;
  private banner_url: string;
  private address: string;
  private price: number;
  private description: string;
  private age_range: string;
  private event_date: Date;
  private district_id: string;
  private features: string[];
  private music_type: string[];
  private menu_link: string;
  private galery_link: string[];
  private package_type: string[];
  private category?: string;

  constructor(props: EventMongoDTOProps) {
    this._id = props._id;
    this.institute_id = props.institute_id;
    this.name = props.name;
    this.banner_url = props.banner_url || "";
    this.address = props.address;
    this.price = props.price;
    this.description = props.description;
    this.age_range = props.age_range;
    this.event_date = props.event_date;
    this.district_id = props.district_id;
    this.features = props.features;
    this.music_type = props.music_type;
    this.menu_link = props.menu_link;
    this.galery_link = props.galery_link;
    this.package_type = props.package_type || [];
    this.category = props.category;
  }

  static fromMongo(eventDoc: EventDocument): EventMongoDTO {
    const eventObject = eventDoc.toObject();

    return new EventMongoDTO({
      _id: eventObject._id,
      institute_id: eventObject.institute_id,
      name: eventObject.name,
      banner_url: eventObject.banner_url,
      address: eventObject.address,
      price: eventObject.price,
      description: eventObject.description,
      age_range: eventObject.age_range,
      event_date: eventObject.event_date,
      district_id: eventObject.district_id,
      features: eventObject.features,
      music_type: eventObject.music_type,
      menu_link: eventObject.menu_link,
      galery_link: eventObject.galery_link,
      package_type: eventObject.package_type,
      category: eventObject.category,
    });
  }

  static toEntity(eventMongoDTO: EventMongoDTO): Event {
    return new Event({
      name: eventMongoDTO.name,
      description: eventMongoDTO.description,
      address: eventMongoDTO.address,
      price: eventMongoDTO.price,
      ageRange: eventMongoDTO.age_range,
      eventDate: eventMongoDTO.event_date,
      districtId: eventMongoDTO.district_id,
      instituteId: eventMongoDTO.institute_id,
      eventStatus: STATUS.ACTIVE,
      bannerUrl: eventMongoDTO.banner_url,
    });
  }

  static fromEntity(event: Event): EventMongoDTO {
    return new EventMongoDTO({
      _id: event.getEventId as string,
      institute_id: event.getInstituteId,
      name: event.getEventName,
      banner_url: event.getEventBannerUrl,
      address: event.getEventAddress,
      price: event.getEventPrice,
      description: event.getEventDescription,
      age_range: event.getEventAgeRange,
      event_date: event.getEventDate,
      district_id: event.getEventDistrictId,
      features: event.getFeatures,
      music_type: event.getMusicType || [],
      menu_link: event.getMenuLink || "",
      galery_link: event.getGaleryLink || [],
      package_type: event.getPackageType || [],
      category: event.getCategoryType,
    });
  }

  static toMongo(eventMongoDTO: EventMongoDTO): EventDocument {
    const eventDocument = new eventModel({
      _id: eventMongoDTO._id,
      institute_id: eventMongoDTO.institute_id,
      name: eventMongoDTO.name,
      banner_url: eventMongoDTO.banner_url,
      address: eventMongoDTO.address,
      price: eventMongoDTO.price,
      description: eventMongoDTO.description,
      age_range: eventMongoDTO.age_range,
      event_date: eventMongoDTO.event_date,
      district_id: eventMongoDTO.district_id,
      features: eventMongoDTO.features,
      music_type: eventMongoDTO.music_type,
      menu_link: eventMongoDTO.menu_link,
      galery_link: eventMongoDTO.galery_link,
      package_type: eventMongoDTO.package_type,
      category: eventMongoDTO.category,
      created_at: new Date(),
    });

    return eventDocument as EventDocument;
  }
}
