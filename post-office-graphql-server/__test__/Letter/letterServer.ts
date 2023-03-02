import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import type { ListenOptions } from "net"; // Schema definition
import { typeDefs } from "../../src/graphs/typeDefs";
import Letter from "../../src/models/Letter";

export const LetterList = [
  {
    address: "Flat 6, Rushwood House, Hartland Road, Addlestone",
    delivered: false,
    delivery_class: "Second Class",
    dispatched: "Thu Jun 16 2022 11:00:00 GMT+0100 (British Summer Time)",
    id: "637f711e6e49317fc888fb5b",
  },
  {
    address: "52 High Street, St Martins",
    delivered: false,
    delivery_class: "Second Class",
    dispatched: "Mon Jul 18 2022 11:00:00 GMT+0100 (British Summer Time)",
    id: "637f711e6e49317fc888fb5c",
  },
  {
    address: "7 Lilac Terrace, Bacup",
    delivered: true,
    delivery_class: "First Class",
    dispatched: "Sun Aug 14 2022 11:00:00 GMT+0100 (British Summer Time)",
    id: "637f711e6e49317fc888fb5d",
  },
  {
    address: "74 Norlington Road, London",
    delivered: false,
    delivery_class: "First Class",
    dispatched: "Sat Jun 18 2022 11:00:00 GMT+0100 (British Summer Time)",
    id: "637f711e6e49317fc888fb5e",
  },
  {
    address: "3 St Lukes Cottages, London Road, Swanley",
    delivered: true,
    delivery_class: "Second Class",
    dispatched: "Wed May 18 2022 11:00:00 GMT+0100 (British Summer Time)",
    id: "637f711e6e49317fc888fb5f",
  },
  {
    address: "5 Waller Street, Leamington Spa",
    delivered: false,
    delivery_class: "First Class",
    dispatched: "Tue Aug 23 2022 11:00:00 GMT+0100 (British Summer Time)",
    id: "637f711e6e49317fc888fb60",
  },
  {
    address: "1 Shannon Close, Brighouse",
    delivered: true,
    delivery_class: "Second Class",
    dispatched: "Thu Aug 25 2022 11:00:00 GMT+0100 (British Summer Time)",
    id: "637f711e6e49317fc888fb61",
  },
  {
    address: "18 St Stephens Road, Canterbury",
    delivered: false,
    delivery_class: "First Class",
    dispatched: "Thu Feb 24 2022 10:00:00 GMT+0000 (Greenwich Mean Time)",
    id: "637f711e6e49317fc888fb62",
  },
  {
    address: "32 Coltsfoot Path, Romford",
    delivered: true,
    delivery_class: "Second Class",
    dispatched: "Mon Jun 06 2022 11:00:00 GMT+0100 (British Summer Time)",
    id: "637f711e6e49317fc888fb63",
  },
];
const resolvers = {
  Query: {
    getAllLetters: async () => {
      return LetterList;
    },

    getALetter: async (_parent: any, args: any, _context: any, _info: any) => {
      const letterId = args.letterId;
      const letterFound = LetterList.filter((letter) => letter.id === letterId);
      return letterFound[0];
    },
  },
  Letter: {
    dispatched: (letter: any) => new Date(letter.dispatched).toString(),
  },
  Mutation: {
    createALetter: async (parent: any, args: any, context: any, info: any) => {
      const { address, delivery_class } = args.Letter;
      const dispatched = new Date();
      const delivered = false;

      const newLetter = new Letter({
        address,
        delivery_class,
        delivered,
        dispatched,
      });
      return newLetter;
    },

    updateALetter: async (parent: any, args: any, context: any, info: any) => {
      const letterId = args.letterId;
      const { address, delivery_class, delivered, dispatched } = args.Letter;
      const letterToUpdate = LetterList.filter(
        (letter) => letter.id === letterId
      )[0];
      console.log(letterToUpdate);
      if (address !== undefined && address !== null && address !== "") {
        letterToUpdate.address = address;
      }

      if (
        delivery_class !== undefined &&
        delivery_class !== null &&
        delivery_class !== ""
      ) {
        letterToUpdate.delivery_class = delivery_class;
      }

      if (delivered !== undefined && delivered !== null && delivered !== "") {
        letterToUpdate.delivered = delivered;
      }

      if (
        dispatched !== undefined &&
        dispatched !== null &&
        dispatched !== ""
      ) {
        letterToUpdate.dispatched = dispatched;
      }

      LetterList.map(
        (letter) =>
          LetterList.find((letter) => {
            if (letter.id === letterId) return letterToUpdate;
          }) || letter
      );
      return letterToUpdate;
    },

    deleteALetter: async (parent: any, args: any, context: any, info: any) => {
      const letterId = args.letterId;
      LetterList.map(
        (letter) =>
          LetterList.find((letter) => {
            if (letter.id === letterId) return ;
          }) || letter
      );
      return { message: "Letter Deleted" };
    },
  },
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
  }); // return the server instance and the url the server is listening on
  return { server, url };
};
