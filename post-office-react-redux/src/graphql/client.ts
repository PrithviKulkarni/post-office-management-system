import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
//import { config } from "../config/config";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4556/graphql" }),
  cache: new InMemoryCache(),
});

export default client;
