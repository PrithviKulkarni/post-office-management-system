export interface Letter {
    id: string;
    address: string;
    delivery_class: string;
    delivered: boolean
    dispatched: Date;
  }
  
  export const defaultLetter: Letter = {
    id: "",
    address: "",
    delivery_class: "",
    delivered: false,
    dispatched: new Date()
  };
  