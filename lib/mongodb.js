require("dotenv").config()
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
let connectionInstance;
let db;

export async function init() {

  if (!connectionInstance) {
    await client.connect();
    console.log("Connected successfully to server");
    connectionInstance = client;
  }

  if (!db) {
    db = connectionInstance.db(process.env.DB_NAME)
  }
  return {connectionInstance, db};
}