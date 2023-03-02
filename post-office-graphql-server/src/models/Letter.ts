import mongoose, { Document, Schema } from "mongoose";

export interface ILetter {
  address: string;
  delivery_class: string;
  delivered: boolean;
  dispatched: Date;
}

export interface ILetterModel extends ILetter, Document {}

const LetterSchema: Schema = new Schema(
  {
    address: { type: String, require: true },
    delivery_class: { type: String, require: true },
    delivered: { type: Boolean, require: true },
    dispatched: { type: Date, require: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ILetterModel>("Letter", LetterSchema);
