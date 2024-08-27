import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IEvent extends Document {
  _id: string;
  institute_id: string;
  name: string;
  banner_url: string;
  address: string;
  price: number;
  description: string;
  age_range: string;
  event_date: Date;
  district_id: string;
  features: string[];
}

const EventSchema: Schema = new Schema<IEvent>({
  _id: { type: String, default: uuidv4 },
  institute_id: { type: String, ref: "Institute", required: true },
  name: { type: String, required: true },
  banner_url: { type: String },
  address: { type: String, required: true },
  price: { type: Number },
  description: { type: String },
  age_range: { type: String },
  event_date: { type: Date, required: true },
  district_id: { type: String, required: true },
  features: [{ type: String, ref: "Feature" }],
});

export default mongoose.model<IEvent>("Event", EventSchema);