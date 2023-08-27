export interface Message {
  text: string;
  user: string;
  added: number;
}

export const messages: Message[] = [
  {
    text: "Hi there!",
    user: "Amando",
    added: Date.now()
  }, {
    text: "Hello world!",
    user: "Charles",
    added: Date.now()
  }
];

