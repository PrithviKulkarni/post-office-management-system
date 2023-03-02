import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ListenOptions } from 'net'
import { typeDefs } from '../../src/graphs/typeDefs'
import Parcel from '../../src/models/Parcel'

const ParcelList = [
  {
    id: '637fbb41a10e8bed1c2d11ac',
    parcel_no: 1,
    parcel_weight: 5
  },

  {
    id: '637fbb4aa10e8bed1c2d11ad',
    parcel_no: 2,
    parcel_weight: 2
  },
  {
    id: '637fbb4aa10e8bed1c2d11ae',
    parcel_no: 3,
    parcel_weight: 3
  }
]

const resolvers = {
  Query: {
    getAllParcels: async () => {
      return ParcelList
    },
    getAParcel: async (_parent: any, args: any, _context: any, _info: any) => {
      const parcel_Id = args.parcelId
      const parcelFound = ParcelList.filter(parcel => parcel.id == parcel_Id)
      let theParcel
      if (parcelFound[0]) {
        theParcel = parcelFound[0]
      }
      return theParcel
    }
  },

  Mutation: {
    createAParcel: async (parent: any, args: any, context: any, info: any) => {
      const { parcel_no, parcel_weight } = args.Parcel

      const newParcel = new Parcel({
        parcel_no,
        parcel_weight
      })
      return newParcel
    },

    updateAParcel: async (parent: any, args: any, context: any, info: any) => {
      const parcelId = args.parcelId
      const { parcel_weight } = args.Parcel
      const updParcel = ParcelList.filter(parcel => parcel.id === parcelId)[0]

      console.log('this is the updated parcel?? ', updParcel)

      if (
        parcel_weight !== undefined &&
        parcel_weight !== null &&
        parcel_weight !== ''
      ) {
        updParcel.parcel_weight = parcel_weight
      }

      ParcelList.map(
        parcel =>
          ParcelList.find(parcel => {
            if (parcel.id === parcelId) return updParcel
          }) || parcel
      )
      return updParcel
    },

    deleteAParcel: async (parent: any, args: any, context: any, info: any) => {
      const parcelId = args.parcelId
      ParcelList.map(
        parcel =>
          ParcelList.find(parcel => {
            if (parcel.id === parcelId) return
          }) || parcel
      )
      return { message: 'Parcel Deleted' }
    }
  }
}

export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  const { url } = await startStandaloneServer(server, { listen: listenOptions }) // return the server instance and the url the server is listening on
  return { server, url }
}
