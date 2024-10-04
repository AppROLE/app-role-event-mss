import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IPresence extends Document {
  _id: string;
  user_id: string;
  event_id: string;
  username: string;
  nickname: string;
  profile_photo: string;
  promoter_code: string;
  checked_in_at: Date;
}

const PresenceSchema: Schema = new Schema<IPresence>({
  _id: { type: String, default: uuidv4 },
  user_id: { type: String, ref: "User", required: true },
  event_id: { type: String, ref: "Event", required: true },
  username: { type: String, required: true },
  nickname: { type: String, required: true },
  profile_photo: { type: String, required: false },
  promoter_code: { type: String },
  checked_in_at: { type: Date, default: Date.now },
});

PresenceSchema.index({ user_id: 1, event_id: 1 });

export default mongoose.model<IPresence>("Presence", PresenceSchema);
