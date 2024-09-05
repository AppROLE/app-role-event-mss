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
    });
  }

  static toEntity(eventMongoDTO: EventMongoDTO): unknown {
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
      _id: event.eventId as string,
      institute_id: event.instituteId,
      name: event.eventName,
      banner_url: event.eventBannerUrl,
      address: event.eventAddress,
      price: event.eventPrice,
      description: event.eventDescription,
      age_range: event.eventAgeRange,
      event_date: event.eventDate,
      district_id: event.eventDistrictId,
      features: [], //nao sei como arrumar essa merda
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
      created_at: new Date(),
    });

    return eventDocument as EventDocument;
  }
}
