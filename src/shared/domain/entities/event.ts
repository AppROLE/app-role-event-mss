import { EntityError } from "../../helpers/errors/domain_errors";
import { STATUS } from "../../domain/enums/status_enum";
import { FEATURE } from "../enums/feature_enum";
import { CATEGORY } from "../enums/category_enum";
import { MUSIC_TYPE } from "../enums/music_type_enum";
import { PACKAGE_TYPE } from "../enums/package_type_enum";

interface EventProps {
  eventId?: string;
  name: string;
  description: string;
  address: string;
  price: number;
  ageRange: string;
  eventDate: Date; // e.g., new Date('2023-10-01T00:00:00Z')
  districtId: string;
  instituteId: string;
  eventStatus: STATUS;
  musicType?: MUSIC_TYPE[];
  menuLink?: string;
  galeryLink?: string[];
  bannerUrl?: string;
  features?: FEATURE[];
  packageType?: PACKAGE_TYPE[];
  category?: CATEGORY;
  ticketUrl?: string;
}

export class Event {
  private eventId?: string;
  private name: string;
  private description: string;
  private bannerUrl?: string;
  private address: string;
  private price: number;
  private ageRange: string;
  private eventDate: Date;
  private districtId: string;
  private instituteId: string;
  private eventStatus: STATUS;
  private musicType?: MUSIC_TYPE[];
  private menu_link?: string;
  private galery_link?: string[];
  private features_list: string[];
  private packageType?: PACKAGE_TYPE[];
  private category?: CATEGORY;
  private ticketUrl?: string;

  constructor(props: EventProps) {
    this.validate(props);

    if (props.eventId != undefined) {
      this.eventId = props.eventId;
    }
    this.name = props.name;
    this.description = props.description;
    this.address = props.address;
    this.price = props.price;
    this.ageRange = props.ageRange;
    this.eventDate = props.eventDate;
    this.districtId = props.districtId;
    this.instituteId = props.instituteId;
    this.eventStatus = props.eventStatus;
    this.musicType = props.musicType;
    this.menu_link = props.menuLink;
    this.galery_link = props.galeryLink;
    this.bannerUrl = props.bannerUrl;
    this.features_list = props.features || [];
    this.packageType = props.packageType || [];
    this.category = props.category;
    this.ticketUrl = props.ticketUrl;
  }

  get getEventId(): string | undefined {
    return this.eventId;
  }

  get getEventName(): string {
    return this.name;
  }

  get getEventStatus(): STATUS {
    return this.eventStatus;
  }

  get getEventDescription(): string {
    return this.description;
  }

  get getEventBannerUrl(): string | undefined {
    return this.bannerUrl;
  }

  get getEventAddress(): string {
    return this.address;
  }

  get getEventPrice(): number {
    return this.price;
  }

  get getEventAgeRange(): string {
    return this.ageRange;
  }

  get getEventDate(): Date {
    return this.eventDate;
  }

  get getEventDistrictId(): string {
    return this.districtId;
  }

  get getInstituteId(): string {
    return this.instituteId;
  }

  get getFeatures(): string[] {
    return this.features_list;
  }

  get getPackageType(): PACKAGE_TYPE[] | undefined {
    return this.packageType;
  }

  get getCategoryType(): CATEGORY | undefined {
    return this.category;
  }

  get getMusicType(): MUSIC_TYPE[] | undefined {
    return this.musicType;
  }

  get getMenuLink(): string | undefined {
    return this.menu_link;
  }

  get getGaleryLink(): string[] | undefined {
    return this.galery_link;
  }

  get getTicketUrl(): string | undefined {
    return this.ticketUrl;
  }

  set setEventName(name: string) {
    this.validateName(name);
    this.name = name;
  }

  set setEventDescription(description: string) {
    this.validateDescription(description);
    this.description = description;
  }

  set setEventBannerUrl(bannerUrl: string) {
    this.bannerUrl = bannerUrl;
  }

  set setEventAddress(address: string) {
    this.validateAddress(address);
    this.address = address;
  }

  set setEventPrice(price: number) {
    this.validatePrice(price);
    this.price = price;
  }

  set setEventAgeRange(ageRange: string) {
    this.validateAgeRange(ageRange);
    this.ageRange = ageRange;
  }

  set setEventDate(eventDate: Date) {
    this.validateEventDate(eventDate);
    this.eventDate = eventDate;
  }

  set setEventDistrictId(districtId: string) {
    this.validateDistrictId(districtId);
    this.districtId = districtId;
  }

  set setInstituteId(instituteId: string) {
    this.validateInstituteId(instituteId);
    this.instituteId = instituteId;
  }

  set setEventStatus(eventStatus: STATUS) {
    this.validateEventStatus(eventStatus);
    this.eventStatus = eventStatus;
  }

  set setFeatures(features: string[]) {
    this.features_list = features;
  }

  set setPackageType(packageType: PACKAGE_TYPE[]) {
    packageType.forEach((type) => {
      this.validatePackageType(type);
    });
    this.packageType = packageType;
  }

  set setMusicType(musicType: MUSIC_TYPE[]) {
    this.validateMusicType(musicType);
    this.musicType = musicType;
  }

  set setMenuLink(menuLink: string) {
    this.validateMenuLink(menuLink);
    this.menu_link = menuLink;
  }

  set setGaleryLink(galeryLink: string[]) {
    this.galery_link = galeryLink;
  }

  set setCategoryType(category: CATEGORY) {
    this.validateCategory(category);
    this.category = category;
  }

  set setTicketUrl(ticketUrl: string) {
    this.ticketUrl = ticketUrl;
  }

  private validate(props: EventProps): void {
    this.validateName(props.name);
    this.validateDescription(props.description);
    this.validateAddress(props.address);
    this.validatePrice(props.price);
    this.validateAgeRange(props.ageRange);
    this.validateEventDate(props.eventDate);
    this.validateDistrictId(props.districtId);
    this.validateInstituteId(props.instituteId);
    this.validateEventStatus(props.eventStatus);

    if (props.musicType) {
      this.validateMusicType(props.musicType);
    }
    if (props.menuLink) {
      this.validateMenuLink(props.menuLink);
    }
    if (props.packageType) {
      props.packageType.forEach((type) => {
        this.validatePackageType(type);
      });
    }
    if (props.category) {
      this.validateCategory(props.category);
    }
    if (props.ticketUrl) {
      this.validateTicketUrl(props.ticketUrl);
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0 || name.trim().length > 100) {
      throw new EntityError("Invalid event name");
    }
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length > 500) {
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

  private validateAgeRange(ageRange: string): void {
    if (!ageRange || ageRange.trim().length === 0) {
      throw new EntityError("Age range must be a non-empty string");
    }
  }

  private validateEventDate(eventDate: Date | string): void {
    if (typeof eventDate === "string") {
      eventDate = new Date(eventDate);
    }
    if (!(eventDate instanceof Date) || isNaN(eventDate.getTime())) {
      throw new EntityError("Invalid event date");
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

  private validateMusicType(musicType: MUSIC_TYPE[]): void {
    musicType.forEach((type) => {
      if (!Object.values(MUSIC_TYPE).includes(type)) {
        throw new EntityError("Invalid music type");
      }
    });
  }

  private validatePackageType(packageType: PACKAGE_TYPE): void {
    if (!Object.values(PACKAGE_TYPE).includes(packageType)) {
      throw new EntityError("Invalid package type");
    }
  }

  private validateMenuLink(menuLink: string): void {
    if (!menuLink || menuLink.trim().length === 0) {
      throw new EntityError("Invalid menu link");
    }
  }

  private validateTicketUrl(ticketUrl: string): void {
    if (!ticketUrl || ticketUrl.trim().length === 0) {
      throw new EntityError("Invalid ticket URL");
    }
  }

  private validateCategory(category: CATEGORY): void {
    if (!Object.values(CATEGORY).includes(category)) {
      throw new EntityError("Invalid category");
    }
  }
}
