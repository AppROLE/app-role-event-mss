import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IFeature extends Document {
  _id: string;
  name: string;
}

const FeatureSchema: Schema = new Schema<IFeature>({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
});

export default mongoose.model<IFeature>("Feature", FeatureSchema);
