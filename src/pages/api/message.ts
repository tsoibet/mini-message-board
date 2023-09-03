import connectToDb from '@/utils/database';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const db = await connectToDb();
      const result = await db.collection('messages').find().sort({ "added": -1 }).limit(10).toArray();
      return res.status(200).json(result);
    } catch(error) {
      return res.status(500).json((error as Error).message);
    }
  } else if (req.method === 'POST') {
    try {
      const message = req.body.message.trim();
      const user = req.body.user;
      if (!message || message.length > 240 || !user || user.length > 20) {
        console.log("Invalid input");
        return res.status(400).json("Invalid input");
      }
      const newMessage = {
        text: message,
        user: user,
        added: Date.now()
      };
      const db = await connectToDb();
      const result = await db.collection('messages').insertOne(newMessage);
      return res.status(201).json(result.insertedId);
    } catch(error) {
      return res.status(500).json((error as Error).message);
    }
  }
}
