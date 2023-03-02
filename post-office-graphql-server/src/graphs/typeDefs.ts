import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Letter {
    id: ID
    address: String!
    delivery_class: String!
    delivered: Boolean
    dispatched: String
  }

  type Driver {
    id: ID
    first_name: String
    last_name: String
    username: String
    email: String
    password: String
  }

  type Depot {
    id: ID
    city: String!
    workers: Int!
    services: [Services]
  }

  type Services {
    service: String
  }

  type Parcel {
    id: ID
    parcel_no: Int
    parcel_weight: Int
    status: String!
    estimated_delivery_days: Int 
  }

  type Query {
    getALetter(letterId: String): Letter
    getAllLetters: [Letter]

    getAllParcels: [Parcel]
    getAParcel(parcelId: String): Parcel
    getADriver(driverId: String): Driver
    getAllDrivers: [Driver]

    getADepot(depotId: String): Depot
    getAllDepots: [Depot]
  }

  type DbResponse {
    message: String
    error: String
  }

  input LetterInput {
    address: String!
    delivery_class: String!
    delivered: Boolean
    dispatched: String
  }

  input DriverInput {
    first_name: String
    last_name: String
    username: String
    email: String
    password: String
  }

  input DepotInput {
    city: String!
    workers: Int!
  }

  input ParcelInput{
    parcel_no: Int
    parcel_weight: Int
    status: String
    estimated_delivery_days: Int 
  }

  type Mutation {
    createALetter(Letter: LetterInput): Letter
    updateALetter(letterId: String, Letter: LetterInput): Letter
    deleteALetter(letterId: String): DbResponse

    createAParcel(Parcel: ParcelInput): Parcel
    updateAParcel(parcelId: String, Parcel: ParcelInput): Parcel
    deleteAParcel(parcelId: String): DbResponse
   
    createADriver(Driver: DriverInput): Driver
    updateADriver(driverId: String, Driver: DriverInput): Driver
    deleteADriver(driverId: String): DbResponse

    createADepot(Depot: DepotInput): Depot
    updateADepot(depotId: String, Depot: DepotInput): Depot
    deleteADepot(depotId: String): DbResponse
  }
`;

export { typeDefs };

