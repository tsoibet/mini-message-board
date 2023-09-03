import connectToDb, { Message } from '@/utils/database';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const db = await connectToDb();
      const result = await db.collection('messages').find().sort({ "added": -1 }).limit(10).toArray();
      res.status(200).json(result);
    } catch(error) {
      res.status(500).json((error as Error).message);
    }
  } else if (req.method === 'POST') {
    try {
      const message = req.body.message;
      const user = req.body.user;
      const newMessage = {
        text: message,
        user: user,
        added: Date.now()
      };
      const db = await connectToDb();
      const result = await db.collection('messages').insertOne(newMessage);
      res.status(201).json(result.insertedId);
    } catch(error) {
      res.status(500).json((error as Error).message);
    }
  }
}