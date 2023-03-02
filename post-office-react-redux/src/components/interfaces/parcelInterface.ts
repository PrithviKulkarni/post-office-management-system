export interface Parcel {
    id: string;
    parcel_no: number;
    parcel_weight: number;
    status: string;
    estimated_delivery_days: number;
}


export const defaultParcel: Parcel = {
    id: "",
    parcel_no: 0,
    parcel_weight: 0,
    status: "",
    estimated_delivery_days: 0
}