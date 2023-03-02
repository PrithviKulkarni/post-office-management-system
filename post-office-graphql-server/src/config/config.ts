import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = `mongodb://127.0.0.1:27017/PostOfficeManagementSystem`;

const SERVER_HOST = process.env.SERVER_HOST || "127.0.0.1";
const SERVER_PORT = process.env.SERVER_PORT || 4899;

export const config = {
  mongo: { url: MONGO_URL },
  server: { hostname: SERVER_HOST, port: SERVER_PORT },
};
