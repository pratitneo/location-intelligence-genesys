import { useState, useRef, useEffect } from 'react';
import chatCss from './chatbot.module.scss';
import { sendMessage } from '../../utils/auth';
import BotIcon from '../../assets/Chatbot.svg';
import ReactMarkdown from 'react-markdown';

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
    </svg>
);

const SendIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white"/>
    </svg>
);

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: 'user', text: 'Where should I open a new store  Mumbai?' },
    { from: 'bot', text: 'Top Location: Bandra West\nAvg. weekend footfall: 12,000+\nHigh-income density: 42%\nClose to malls, cafes, and premium housing' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendMessage({
        query: input,
        history_json: [], // simplified for now
      });

      if (response && response.result && response.result.text) {
        const botMessage = { from: 'bot', text: response.result.text };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      const errorMessage = { from: 'bot', text: 'Sorry, something went wrong.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={chatCss.chatBot}>
      <div className={chatCss.messages}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`${chatCss.messageContainer} ${chatCss[msg.from]}`}>
            <div className={`${chatCss.icon} ${msg.from === 'user' ? chatCss.userIcon : chatCss.botIcon}`}>
              {msg.from === 'user' ? <UserIcon /> : <img src={BotIcon} alt="Bot" />}
            </div>
            <div className={`${chatCss.message} ${chatCss[msg.from]}`}>
              {msg.from === 'bot' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className={`${chatCss.messageContainer} ${chatCss.bot}`}>
            <div className={`${chatCss.icon} ${chatCss.botIcon}`}>
                <img src={BotIcon} alt="Bot" />
            </div>
            <div className={`${chatCss.message} ${chatCss.bot}`}>Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className={chatCss.inputArea}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask Ai..."
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;