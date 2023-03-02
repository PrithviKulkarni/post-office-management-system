import mongoose, { Document, Schema } from "mongoose";

export interface IDepot {
  city: string;
  workers: number;
  services: [{service: string}]
}

export interface IDepotModel extends IDepot, Document {}

const DepotSchema: Schema = new Schema(
  {
    city: { type: String, require: true },
    workers: { type: Number, require: true },
    services: [{service: {type:String, require: false}}],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IDepotModel>("Depot", DepotSchema);