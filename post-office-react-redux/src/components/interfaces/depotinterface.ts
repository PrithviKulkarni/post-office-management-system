export interface Depot {
    id: string;
    city: string;
    workers: number;
    services: [{service: string}];
  
    
  }
  
  export const defaultDepot: Depot = {
    id: "",
    city: "",
    workers: 0,
    services: [{service: ""}]
  };