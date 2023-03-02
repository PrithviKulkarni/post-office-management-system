import mongoose, { Document, Schema } from "mongoose";


export interface IParcel{
    parcel_no: number;
    parcel_weight: number;
    status: string;
    estimated_delivery_days: number;

}

export interface IParcelModel extends IParcel, Document{}

const ParcelSchema: Schema = new Schema(
    {  
        parcel_no: {type: Number, require: true},
        parcel_weight: {type: Number, require: true},
        status: {type: String, require: true},
        estimated_delivery_days: {type:Number, require: true}
    },
    {
        versionKey: false,
    }
)

export default mongoose.model<IParcelModel>("parcel", ParcelSchema)

