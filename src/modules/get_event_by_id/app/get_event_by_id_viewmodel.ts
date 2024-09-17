import { Event } from "../../../shared/domain/entities/event";

export class GetEventByIdViewModel {
  private eventId?: string;
  private name: string;
  private bannerUrl?: string;
  private address: string;
  private price: number;
  private description: string;
  private ageRange: string;
  private eventDate: Date;
  private districtId: string;
  private instituteId: string;
  private features: string[];
  private musicType?: string[];
  private menuLink?: string;
  private galeryLink?: string[];
  private packageType?: string[];
  private category?: string;

  constructor(event: Event) {
    this.eventId = event.getEventId;
    this.name = event.getEventName;
    this.bannerUrl = event.getEventBannerUrl;
    this.address = event.getEventAddress;
    this.price = event.getEventPrice;
    this.description = event.getEventDescription;
    this.ageRange = event.getEventAgeRange;
    this.eventDate = event.getEventDate;
    this.districtId = event.getEventDistrictId;
    this.instituteId = event.getInstituteId;
    this.features = event.getFeatures;
    this.musicType = event.getMusicType;
    this.menuLink = event.getMenuLink;
    this.galeryLink = event.getGaleryLink;
    this.packageType = event.getPackageType;
    this.category = event.getCategoryType;
  }

  toJSON() {
    return {
      eventId: this.eventId,
      name: this.name,
      bannerUrl: this.bannerUrl,
      address: this.address,
      price: this.price,
      description: this.description,
      ageRange: this.ageRange,
      eventDate: this.eventDate,
      districtId: this.districtId,
      instituteId: this.instituteId,
      features: this.features,
      musicType: this.musicType,
      menuLink: this.menuLink,
      galeryLink: this.galeryLink,
      packageType: this.packageType,
      category: this.category,
    };
  }
}