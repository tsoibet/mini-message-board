import { useEffect, useState } from 'react';
import { Message } from '@/dataStore';

export default function Home () {

  const [messages, setMessages] = useState<Message[]>([]);

  async function getMessages() {
    try {
      const res = await fetch('./api/message');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const [nameInput, setNameInput] = useState<string>("");
  const [messageInput, setMessageInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  async function addMessage() {
    setIsLoading(true);
    setErrMsg("");
    const userName = nameInput ? nameInput : "Anonymous user";
    try {
      const res = await fetch('./api/message', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userName,
          message: messageInput
        })
      });
      if (!res.ok) {
        throw new Error('Failed to add message. Please try again.')
      }
      getMessages();
      setMessageInput("");
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main">
      <h1 className="heading">Mini Message Board</h1>
      <form className="form" onSubmit={async (event) => {
          event.preventDefault();
          await addMessage();
        }}>
        <div className="inputs">
          <label className="label" htmlFor='name'>
            Name
          </label>
          <input className="input" id='name' type='text' maxLength={20} autoComplete="off" placeholder="Name" onChange={(event) => setNameInput(event.target.value)} value={nameInput}/>
          <label className="label" htmlFor='message'>
            Message
          </label>
          <textarea className="input" id='message' rows={4} cols={55} maxLength={240} placeholder='Message' onChange={(event) => setMessageInput(event.target.value)} value={messageInput} required/>
        </div>
        <button className="button" type="submit" disabled={isLoading}>Send</button>
        <div className="error">
          {errMsg}
        </div>
      </form>
      <div className="messages">
        {messages.map(message => {
          return (
            <div className="message" key={message._id}>
              <div className="user">
                {message.user}
              </div>
              <div className="messageText">
                {message.text}
              </div>
              <div className="datetime">
                {new Date(message.added).toLocaleString()}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

