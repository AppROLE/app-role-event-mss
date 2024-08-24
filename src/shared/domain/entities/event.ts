import { EntityError } from "../../helpers/errors/domain_errors";

enum STATUS {
  ACTIVE,
  INACTIVE,
  CANCELLED,
}

interface EventProps {
  eventName: string;
  eventDescription: string;
  address: string;
  price: number;
  ageRange: string[];
  eventDate: Date;
  eventInitHour: string;
  districtId: string;
  instituteId: string;
  eventStatus: STATUS;
  backgroundPhoto?: string;
  eventLogo?: string;
}

export class Event {
  private readonly event_id?: string;
  private readonly event_name: string;
  private readonly event_description: string;
  private readonly background_photo?: string;
  private readonly event_logo?: string;
  private readonly address: string;
  private readonly price: number;
  private readonly age_range: string[];
  private readonly event_date: Date;
  private readonly event_init_hour: string;
  private readonly district_id: string;
  private readonly institute_id: string;
  private readonly event_status: STATUS;

  constructor(props: EventProps) {
    this.validate(props);

    this.event_name = props.eventName;
    this.event_description = props.eventDescription;
    this.address = props.address;
    this.price = props.price;
    this.age_range = props.ageRange;
    this.event_date = props.eventDate;
    this.event_init_hour = props.eventInitHour;
    this.district_id = props.districtId;
    this.institute_id = props.instituteId;
    this.event_status = props.eventStatus;

    this.background_photo = props.backgroundPhoto;
    this.event_logo = props.eventLogo;
  }

  get eventId(): string | undefined {
    return this.event_id;
  }

  get eventName(): string {
    return this.event_name;
  }

  get eventStatus(): STATUS {
    return this.event_status;
  }

  get eventDescription(): string {
    return this.event_description;
  }

  get backgroundPhoto(): string | undefined {
    return this.background_photo;
  }

  get eventLogo(): string | undefined {
    return this.event_logo;
  }

  get addressValue(): string {
    return this.address;
  }

  get priceValue(): number {
    return this.price;
  }

  get ageRange(): string[] {
    return this.age_range;
  }

  get eventDate(): Date {
    return this.event_date;
  }

  get eventInitHour(): string {
    return this.event_init_hour;
  }

  get districtId(): string {
    return this.district_id;
  }

  get instituteId(): string {
    return this.institute_id;
  }

  private validate(props: EventProps): void {
    this.validateEventName(props.eventName);
    this.validateEventDescription(props.eventDescription);
    this.validateAddress(props.address);
    this.validatePrice(props.price);
    this.validateAgeRange(props.ageRange);
    this.validateEventDate(props.eventDate);
    this.validateEventInitHour(props.eventInitHour);
    this.validateDistrictId(props.districtId);
    this.validateInstituteId(props.instituteId);
    this.validateEventStatus(props.eventStatus);
  }

  private validateEventName(eventName: string): void {
    if (
      !eventName ||
      eventName.trim().length === 0 ||
      eventName.trim().length > 100
    ) {
      throw new EntityError("Invalid event name");
    }
  }

  private validateEventDescription(eventDescription: string): void {
    if (!eventDescription || eventDescription.trim().length > 500) {
      throw new EntityError("Invalid event description");
    }
  }

  private validateAddress(address: string): void {
    if (
      !address ||
      address.trim().length === 0 ||
      address.trim().length > 255
    ) {
      throw new EntityError("Invalid address");
    }
  }

  private validatePrice(price: number): void {
    if (price < 0) {
      throw new EntityError("Price cannot be negative");
    }
  }

  private validateAgeRange(ageRange: string[]): void {
    if (!Array.isArray(ageRange) || ageRange.length === 0) {
      throw new EntityError("Age range must be a non-empty array");
    }
  }

  private validateEventDate(eventDate: Date): void {
    if (!(eventDate instanceof Date) || isNaN(eventDate.getTime())) {
      throw new EntityError("Invalid event date");
    }
  }

  private validateEventInitHour(eventInitHour: string): void {
    if (!eventInitHour || !/^\d{2}:\d{2}$/.test(eventInitHour)) {
      throw new EntityError(
        "Invalid event initiation hour, must be in HH:MM format"
      );
    }
  }

  private validateDistrictId(districtId: string): void {
    if (!districtId || districtId.trim().length === 0) {
      throw new EntityError("Invalid district ID");
    }
  }

  private validateInstituteId(instituteId: string): void {
    if (!instituteId || instituteId.trim().length === 0) {
      throw new EntityError("Invalid institute ID");
    }
  }

  private validateEventStatus(eventStatus: STATUS): void {
    if (!Object.values(STATUS).includes(eventStatus)) {
      throw new EntityError("Invalid event status");
    }
  }
}
