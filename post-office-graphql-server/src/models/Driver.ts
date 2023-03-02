import mongoose, { Document, Schema } from "mongoose";

export interface IDriver {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

export interface IDriversModel extends IDriver, Document {}
const DriversSchema: Schema = new Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IDriversModel>("drivers", DriversSchema);
