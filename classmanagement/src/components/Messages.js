import React, { useState, useEffect } from 'react';

function MessageForm() {
  const [recipientId, setRecipientId] = useState('');
  const [content, setContent] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

//   Fetch Messages
  const fetchMessages = async () => {
    try {
      const response = await fetch('/messages');
      if (response.ok) {
        const messagesData = await response.json();
        setMessages(messagesData);
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: recipientId,
          content: content,
        }),
      });
      if (response.ok) {
        setMessageSent(true);
        setRecipientId('');
        setContent('');
        fetchMessages();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('An error occurred while sending the message.');
    }
  };

  return (
    <div>
      <h2>Send Message</h2>
      {messageSent && <p>Message sent successfully!</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <p>Admin</p>
          
        </div>
        <div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Send</button>
      </form>

      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>Author:</strong> {message.author}, <strong>Content:</strong> {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageForm;
