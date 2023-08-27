import { Message, messages } from '@/dataStore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Message[] | Message>
) {
  if (req.method === 'GET') {
    const sortedslicedMessages = messages.slice(-10).sort((a, b) => b.added - a.added);
    res.status(200).json(sortedslicedMessages);
  } else if (req.method === 'POST') {
    console.log(req.body)
    const message = req.body.message;
    const user = req.body.user;
    const newMessage = {
      text: message,
      user: user,
      added: Date.now()
    };
    messages.push(newMessage);
    const sortedslicedMessages = messages.slice(-10).sort((a, b) => b.added - a.added);
    res.status(200).json(sortedslicedMessages);
  }
}