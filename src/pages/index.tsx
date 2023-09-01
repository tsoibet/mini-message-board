import { useEffect, useState } from 'react';
import { Message } from '@/dataStore';
import styles from '@/styles/index.module.css';

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
    <div className={styles.main}>
      <h1 className={styles.heading}>Mini Message Board</h1>
      <form className={styles.form} onSubmit={async (event) => {
          event.preventDefault();
          await addMessage();
        }}>
        <div className={styles.inputs}>
          <label className={styles.label} htmlFor='name'>
            Name
          </label>
          <input className={styles.input} id='name' type='text' maxLength={20} autoComplete="off" placeholder="Name" onChange={(event) => setNameInput(event.target.value)} value={nameInput}/>
          <label className={styles.label} htmlFor='message'>
            Message
          </label>
          <textarea className={styles.input} id='message' rows={4} cols={60} maxLength={240} placeholder='Message' onChange={(event) => setMessageInput(event.target.value)} value={messageInput} required/>
        </div>
        <button className={styles.button} type="submit" disabled={isLoading}>Send</button>
        <div className={styles.error}>
          {errMsg}
        </div>
      </form>
      <div className={styles.messages}>
        {messages.map(message => {
          return (
            <div className={styles.message} key={message._id}>
              <p className={styles.user}>{message.user}</p>
              <p className={styles.messageText}>{message.text}</p>
              <p className={styles.datetime}>{new Date(message.added).toLocaleString()}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

