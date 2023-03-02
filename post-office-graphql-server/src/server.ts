import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { config } from "./config/config";
import { typeDefs } from "./graphs/typeDefs";
import { resolvers } from "./graphs/resolvers";
import cors from "cors";
const app = express();

/** connect to MongoDB */
mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log(" Connected to MongoDB");
    /** ONLY start the server if Connected to MongoDB */
    StartServer();
  })
  .catch((error) => {
    console.log(" ERROR UNABLE TO Connect to MongoDB");
  });

const StartServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  /** Change  graphql default path */
  apolloServer.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("Welcome to apollo server express");
  });
  app.use(cors);
  app.listen(config.server.port, () => {
    console.log(`  Server is running on port ${config.server.port}.`);
  });
};
