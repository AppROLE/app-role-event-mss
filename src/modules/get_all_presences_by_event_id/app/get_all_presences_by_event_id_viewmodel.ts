import { Presence } from "src/shared/domain/entities/presence"

export class PresenceViewmodel {
  private id: string
  private userId: string
  private eventId: string
  private username: string
  private nickname: string
  private profilePhoto?: string
  private checkedInAt?: Date

  constructor(presence: Presence) {
    this.id = presence.id
    this.userId = presence.userId
    this.eventId = presence.eventId
    this.username = presence.username
    this.nickname = presence.nickname
    this.profilePhoto = presence.profilePhoto
    this.checkedInAt = presence.checkedInAt
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      eventId: this.eventId,
      username: this.username,
      nickname: this.nickname,
      profilePhoto: this.profilePhoto,
      checkedInAt: this.checkedInAt
    }
  }

}

export class getAllPresencesByEventIdViewmodel {
  private presences: PresenceViewmodel[]

  constructor(presences: Presence[]) {
    this.presences = presences.map(presence => new PresenceViewmodel(presence))
  }

  toJSON() {
    return {
      presences: this.presences.map(presence => presence.toJSON()),
      message: 'Presenças encontradas com sucesso'
    }
  }
}