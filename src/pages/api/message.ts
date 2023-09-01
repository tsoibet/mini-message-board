import connectToDb, { Message } from '@/dataStore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Message[] | Message>
) {
  if (req.method === 'GET') {
    const db = await connectToDb();
    const result = await db.collection('messages').find().sort({ "added": -1 }).limit(10).toArray();
    res.status(200).json(result);
  } else if (req.method === 'POST') {
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
  }
}