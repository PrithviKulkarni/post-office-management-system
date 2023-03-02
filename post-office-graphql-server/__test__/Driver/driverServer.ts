import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import type { ListenOptions } from 'net';
import { typeDefs } from '../../src/graphs/typeDefs';
import utils from '../../src/library/helpers'
import Driver from '../../src/models/Driver';

const DriverList = [
  {
    "id": "637f83987bc5948d7a2137c5",
    "first_name": "Alvin",
    "last_name": "Seville",
    "username": "Alvin2022",
    "email": "AlvinSeville@gmail.com",
    "password": "d4eLjVHR"
  },
  {
    "id": "637f83987bc5948d7a2137c6",
    "first_name": "Theodore",
    "last_name": "Seville",
    "username": "Theodore2022",
    "email": "TheodoreSeville@gmail.com",
    "password": "x8eErNP2"
  },
  {
    "id": "637f83987bc5948d7a2137c7",
    "first_name": "Simon",
    "last_name": "Seville",
    "username": "Simon2022",
    "email": "SimonSeville@gmail.com",
    "password": "naHAeqb8"
  },
];

const resolvers = {

  Query: {
    getAllDrivers: async () => {
      return DriverList
    },
    getADriver: async (_parent: any, args: any, _context: any, _info: any) => {
      const driverId = args.driverId;
      const driverFound = DriverList.filter(driver => driver.id == driverId);
      let theDriver;
      if (driverFound[0]) {
        theDriver = driverFound[0];
      }
      return theDriver;
    }
  },

  Mutation: {
    createADriver: async (parent: any, args: any, context: any, info: any) => {
      const { first_name, last_name, username, email, password } = args.Driver;
      const passwordEncryp = utils.hashPassword(password);

      const newDriver = new Driver ({
        first_name,
        last_name,
        username,
        email,
        password: passwordEncryp
      });
      return newDriver;
    },

    updateADriver: async (parent: any, args: any, context: any, info: any) => {
      const driverId = args.driverId;
      const { first_name, last_name, email } = args.Driver;

      const updatedValues = DriverList.filter(
        (driver) => driver.id === driverId
      )[0];


      if (first_name !== undefined) {
        updatedValues.first_name = first_name;
      }

      if (last_name !== undefined) {
        updatedValues.last_name = last_name;
      }

      if (email !== undefined) {
        updatedValues.email = email;
      }
      DriverList.map(
        (driver) =>
          DriverList.find((driver) => {
            if (driver.id === driverId) return updatedValues;
          }) || driver
      );
      return updatedValues;

    },

    deleteADriver: async (parent: any, args: any, context: any, info: any) => {
      const driverId = args.driverId;

      DriverList.map(
        (driver) =>
          DriverList.find((driver) => {
            if (driver.id === driverId) return ;
          }) || driver
      );
      return { message: "Driver Deleted" };
    },
  }
};

export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    listen: listenOptions,
  });
  return { server, url };
};