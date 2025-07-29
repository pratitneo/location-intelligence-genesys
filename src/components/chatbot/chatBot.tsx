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

// Utility function to format chatbot response
const formatChatbotResponse = (response: string): string => {
  // Check if response contains hex_id patterns
  const hexIdMatches = response.match(/hex_id\s*=\s*"([^"]+)"/g);
  
  if (hexIdMatches) {
    // Format the response with proper markdown
    let formattedResponse = response
      // Replace all hex_id = "..." patterns with bold hex IDs
      .replace(/hex_id\s*=\s*"([^"]+)"/g, (match, hexId) => {
        return `**Hex ID:** \`${hexId}\``;
      })
      // Add line breaks for better readability
      .replace(/([.!?])\s+/g, '$1\n\n')
      // Add line breaks before questions (no bold)
      .replace(/(Would you like|Shall we)/g, '\n\n$1')
      // Add emphasis to key information
      .replace(/(high population|family-centric spending|dense footfall|ideal for|consistent footfall|strong customer base|accessibility|banking services|business demographics|commercial activity)/g, '*$1*')
      // Add code formatting for hex IDs
      .replace(/`([^`]+)`/g, '`$1`');
    
    // If there are multiple hex IDs, format them as a list
    if (hexIdMatches.length > 1) {
      // Extract all hex IDs
      const hexIds = hexIdMatches.map(match => {
        const hexId = match.match(/hex_id\s*=\s*"([^"]+)"/)?.[1];
        return hexId;
      }).filter(Boolean);
      
      // Replace the hex IDs section with a formatted list
      const hexIdsSection = hexIds.map(hexId => `- **Hex ID:** \`${hexId}\``).join('\n');
      
      // Find the section with hex IDs and replace it
      const hexSectionRegex = /hex_id\s*=\s*"[^"]+"(?:\s*,\s*hex_id\s*=\s*"[^"]+")*/;
      formattedResponse = formattedResponse.replace(hexSectionRegex, hexIdsSection);
    }
    
    return formattedResponse;
  }
  
  // For other responses, just add basic formatting
  return response
    .replace(/([.!?])\s+/g, '$1\n\n')
    .replace(/(Would you like|Shall we)/g, '\n\n$1');
};

// Test function to demonstrate formatting (temporary)
const testMultipleHexIds = () => {
  const testResponse = `Response from chatbot: Based on Mumbai's household density, consumer spending patterns, and retail foot traffic, the best zones for your bank are:

hex_id = "8a608b0a62b7fff", hex_id = "8a608b0b1067fff", hex_id = "8a608b0a6adffff", hex_id = "8a608b0b115ffff", hex_id = "8a608b0a604ffff"

These zones reflect high population and consistent footfall, indicating a strong customer base and accessibility for banking services.

Would you like a breakdown of spending and footfall for each hex?
Shall we rerun this with custom weights for business demographics and commercial activity?`;
  
  return formatChatbotResponse(testResponse);
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: 'user', text: 'Hello' },
    { from: 'bot', text: 'Hello! How can I assist you today with site selection or location analysis?' }
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
      console.log('Response from chatbot:', response);
      if (response && response.result) {
        console.log('Response from chatbot:', response.result);
        // Format the response before displaying
        const formattedResponse = formatChatbotResponse(response.result);
        const botMessage = { from: 'bot', text: formattedResponse };
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