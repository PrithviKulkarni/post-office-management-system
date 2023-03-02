import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import type { ListenOptions } from 'net' // Schema definition
import { typeDefs } from '../../src/graphs/typeDefs'
import Depot from '../../src/models/Depot'

const DepotList = [
  {
    "id": "637f6f4fa8193b1f3dd44d70",
    "city": "Nottingham",
    "workers": 31,
    "services": [{"service": "a"},{"service":"b"}]
  },
];

const resolvers = {
  Query: {
    getAllDepots: async () => {
      return DepotList
    },

    getADepot: async (_parent: any, args: any, _context: any, _info: any) => {
      const depotId = args.depotId
      const depotDB = DepotList.filter(depot => depot.id == depotId);
        let theDepot;
        if (depotDB[0]) {
          theDepot = depotDB[0];
        }
        return theDepot;
      }
  },
  Mutation: {
    createADepot: async (parent: any, args: any, context: any, info: any) => {
      const { city, workers } = args.Depot

      const newDepot = new Depot({
        city,
        workers
      })
      return newDepot
    },

    updateADepot: async (parent: any, args: any, context: any, info: any) => {
      const depotId = args.depotId
      const { city, workers } = args.Depot

      const updatedValues =  DepotList.filter(
        (depot) => depot.id === depotId
      )[0];



      if (city !== undefined) {
        updatedValues.city = city
      } 

      if (workers !== undefined) {
        updatedValues.workers = workers
      } 
      DepotList.map(
        (depot) =>
          DepotList.find((depot) => {
            if (depot.id === depotId) return updatedValues;
          }) || depot
      );
      return updatedValues
      
    },

    deleteADepot: async (parent: any, args: any, context: any, info: any) => {
      const depotId = args.depotId
      DepotList.map(
        (depot) =>
          DepotList.find((depot) => {
            if (depot.id === depotId) return ;
          }) || depot
      );
      return { message: "Depot Deleted" };
    },
  }
}

export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  const { url } = await startStandaloneServer(server, {
    listen: listenOptions
  })
  return { server, url }
}
