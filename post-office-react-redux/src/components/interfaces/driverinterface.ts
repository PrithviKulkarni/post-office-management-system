export interface Driver {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;

    
  }
  
  export const defaultDriver: Driver = {
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  };