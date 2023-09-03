import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbname = "messageBoard";

async function connectToDb() {
  if (!uri) {
    console.log("MONGODB_URI is not set.");
    throw new Error("MONGODB_URI is not set.")
  }
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbname);
    return db;
  } catch(error) {
    console.log((error as Error).message);
    throw new Error("Failed to connect to database.")
  }
} 

export default connectToDb;

export interface Message {
  _id: string;
  text: string;
  user: string;
  added: number;
}
