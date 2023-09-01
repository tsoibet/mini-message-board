import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbname = "messageBoard";

async function connectToDb() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbname);
  return db;
} 

export default connectToDb;

export interface Message {
  _id: string;
  text: string;
  user: string;
  added: number;
}
