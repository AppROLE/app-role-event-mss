import { Presence } from "src/shared/domain/entities/presence";
import MPresence, { IPresence as PresenceDocument } from "../models/presence.model";

export interface PresenceMongoDTOProps {
  _id?: string;
  eventId: string;
  username: string;
  nickname: string
  profilePhoto: string | undefined;
  promoterCode: string | undefined;
  checkedInAt: Date;
}

export class PresenceMongoDTO {
  private _id?: string;
  private _eventId: string;
  private _username: string;
  private _nickname: string;
  private _profilePhoto?: string;
  private _promoterCode?: string;
  private _checkedInAt: Date;

  constructor(props: PresenceMongoDTOProps) {
    this._id = props._id;
    this._eventId = props.eventId;
    this._username = props.username;
    this._nickname = props.nickname;
    this._profilePhoto = props.profilePhoto;
    this._promoterCode = props.promoterCode;
    this._checkedInAt = props.checkedInAt;
  }

  static fromMongo(presencDoc: any): PresenceMongoDTO {
    return new PresenceMongoDTO({
      _id: presencDoc._id,
      eventId: presencDoc.event_id,
      username: presencDoc.username,
      nickname: presencDoc.nickname,
      profilePhoto: presencDoc.profile_photo,
      promoterCode: presencDoc.promoter_code,
      checkedInAt: presencDoc.checked_in_at
    });
  }

  static toEntity(presenceMongoDTO: PresenceMongoDTO): Presence {
    return new Presence({
      id: presenceMongoDTO._id,
      eventId: presenceMongoDTO._eventId,
      username: presenceMongoDTO._username,
      nickname: presenceMongoDTO._nickname,
      profilePhoto: presenceMongoDTO._profilePhoto,
      promoterCode: presenceMongoDTO._promoterCode,
      checkedInAt: presenceMongoDTO._checkedInAt
    });
  }

  static fromEntity(presence: Presence): PresenceMongoDTO {
    return new PresenceMongoDTO({
      _id: presence.id,
      eventId: presence.eventId,
      username: presence.username,
      nickname: presence.nickname,
      profilePhoto: presence.profilePhoto,
      promoterCode: presence.promoterCode,
      checkedInAt: presence.checkedInAt
    });
  }

  static toMongo(presenceMongoDTO: PresenceMongoDTO): PresenceDocument {
    const presenceModel = new MPresence({
      _id: presenceMongoDTO._id,
      event_id: presenceMongoDTO._eventId,
      username: presenceMongoDTO._username,
      nickname: presenceMongoDTO._nickname,
      profile_photo: presenceMongoDTO._profilePhoto,
      promoter_code: presenceMongoDTO._promoterCode,
      checked_in_at: presenceMongoDTO._checkedInAt
    })

    return presenceModel;
  }
}