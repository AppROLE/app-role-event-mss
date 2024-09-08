import { EntityError } from "../../helpers/errors/domain_errors";
import { STATUS } from "../../domain/enums/status_enum";
import { MUSIC_TYPE } from "../enums/music_type_enum";
import { PACKAGE_TYPE } from "../enums/package_type_enum";
import { FEATURE } from "../enums/feature_enum";
import { CATEGORY } from "../enums/category_enum";

interface EventProps {
  name: string;
  description: string;
  address: string;
  price: number;
  ageRange: string;
  eventDate: Date;
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
}

export class Event {
  private event_id?: string;
  private name: string;
  private description: string;
  private banner_url?: string;
  private address: string;
  private price: number;
  private age_range: string;
  private event_date: Date;
  private district_id: string;
  private institute_id: string;
  private event_status: STATUS;
  private music_type?: MUSIC_TYPE[];
  private menu_link?: string;
  private galery_link?: string[];
  private features_list: string[];
  private package_type?: PACKAGE_TYPE[];
  private category?: CATEGORY;

  constructor(props: EventProps) {
    this.validate(props);

    this.name = props.name;
    this.description = props.description;
    this.address = props.address;
    this.price = props.price;
    this.age_range = props.ageRange;
    this.event_date = props.eventDate;
    this.district_id = props.districtId;
    this.institute_id = props.instituteId;
    this.event_status = props.eventStatus;
    this.music_type = props.musicType;
    this.menu_link = props.menuLink;
    this.galery_link = props.galeryLink;
    this.banner_url = props.bannerUrl;
    this.features_list = props.features || [];
    this.package_type = props.packageType || [];
    this.category = props.category;
  }

  get eventId(): string | undefined {
    return this.event_id;
  }

  get eventName(): string {
    return this.name;
  }

  get eventStatus(): STATUS {
    return this.event_status;
  }

  get eventDescription(): string {
    return this.description;
  }

  get eventBannerUrl(): string | undefined {
    return this.banner_url;
  }

  get eventAddress(): string {
    return this.address;
  }

  get eventPrice(): number {
    return this.price;
  }

  get eventAgeRange(): string {
    return this.age_range;
  }

  get eventDate(): Date {
    return this.event_date;
  }

  get eventDistrictId(): string {
    return this.district_id;
  }

  get instituteId(): string {
    return this.institute_id;
  }

  get features(): string[] {
    return this.features;
  }

  get packageType(): PACKAGE_TYPE[] | undefined {
    return this.package_type;
  }

  get categoryType(): CATEGORY | undefined {
    return this.category;
  }

  set eventName(name: string) {
    this.validateName(name);
    this.name = name;
  }

  set eventDescription(description: string) {
    this.validateDescription(description);
    this.description = description;
  }

  set eventBannerUrl(bannerUrl: string) {
    this.banner_url = bannerUrl;
  }

  set eventAddress(address: string) {
    this.validateAddress(address);
    this.address = address;
  }

  set eventPrice(price: number) {
    this.validatePrice(price);
    this.price = price;
  }

  set eventAgeRange(ageRange: string) {
    this.validateAgeRange(ageRange);
    this.age_range = ageRange;
  }

  set eventDate(eventDate: Date) {
    this.validateEventDate(eventDate);
    this.event_date = eventDate;
  }

  set eventDistrictId(districtId: string) {
    this.validateDistrictId(districtId);
    this.district_id = districtId;
  }

  set instituteId(instituteId: string) {
    this.validateInstituteId(instituteId);
    this.institute_id = instituteId;
  }

  set eventStatus(eventStatus: STATUS) {
    this.validateEventStatus(eventStatus);
    this.event_status = eventStatus;
  }

  set features(features: string[]) {
    this.features = features;
  }

  set packageType(packageType: PACKAGE_TYPE[]) {
    packageType.forEach((type) => {
      this.validatePackageType(type);
    });
    this.package_type = packageType;
  }

  set musicType(musicType: MUSIC_TYPE[]) {
    this.validateMusicType(musicType);
    this.music_type = musicType;
  }

  set menuLink(menuLink: string) {
    this.validateMenuLink(menuLink);
    this.menu_link = menuLink;
  }

  set galeryLink(galeryLink: string[]) {
    this.galery_link = galeryLink;
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

  private validateEventDate(eventDate: Date): void {
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
}
