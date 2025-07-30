import { useState, useRef, useEffect } from 'react';
import chatCss from './chatbot.module.scss';
import { sendMessage } from '../../utils/auth';
import BotIcon from '../../assets/Chatbot.svg';
import ReactMarkdown from 'react-markdown';
import { useHexSelection } from '../../hooks/useHexSelection';
import { getGlobalMapInstance } from '../../utils/mapUtils';

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white" />
  </svg>
);

const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white" />
  </svg>
);

// Utility function to format chatbot response
const formatChatbotResponse = (response: string): string => {
  console.log('🔍 Formatting response:', response);
  
  // Check if response contains hex_id patterns
  const hexIdMatches = response.match(/hex_id\s*=\s*"([^"]+)"/g);
  console.log('🔍 Hex ID matches:', hexIdMatches);
  
  // Check if response contains numbered list patterns (like previous requests)
  const numberedListMatch = response.match(/(\d+\.\s*"[^"]+")/g);
  console.log('🔍 Numbered list matches:', numberedListMatch);
  
  // Check for standalone hex IDs (like "Hex ID **8a608b0b1067fff**:")
  const standaloneHexMatch = response.match(/Hex ID\s+\*\*([a-f0-9]{15})\*\*:/g);
  console.log('🔍 Standalone hex matches:', standaloneHexMatch);
  
  // Helper: replace quoted text with bold, but skip hex_id patterns
  const boldQuotedText = (text: string) =>
    text.replace(/("([^"]+)")/g, (match, p1, p2) => {
      // If this quoted text is part of a hex_id pattern, skip it
      if (/hex_id\s*=\s*"[^"]+"/.test(match)) return match;
      return `**${p2}**`;
    });

  // Handle numbered list responses (like previous requests)
  if (numberedListMatch) {
    let formattedResponse = response;
    
    // First, format the header
    formattedResponse = formattedResponse.replace(
      /(Here are all your previous requests in this conversation:)/, 
      '*$1*'
    );
    
    // Format numbered lists with proper markdown - ensure number and text stay together
    formattedResponse = formattedResponse.replace(/(\d+\.\s*)"([^"]+)"/g, '$1**$2**');
    
    // Add proper spacing and formatting
    formattedResponse = formattedResponse
      // Add line breaks after the header
      .replace(/(\*[^*]+\*:)/, '$1\n\n')
      // Ensure each numbered item is on its own line without breaking the number-text relationship
      .replace(/(\d+\.\s*\*\*[^*]+\*\*)/g, '\n$1')
      // Remove any extra line breaks that might have been created
      .replace(/\n\n+/g, '\n\n')
      // Ensure proper spacing after the header
      .replace(/(\*[^*]+\*:)\n\n/, '$1\n\n');
    
    console.log('🔍 Formatted numbered list response:', formattedResponse);
    return formattedResponse;
  }

  // Handle standalone hex ID responses (like "Hex ID **8a608b0b1067fff**:")
  if (standaloneHexMatch) {
    console.log('🔍 Processing standalone hex IDs');
    let formattedResponse = response
      // Replace standalone hex IDs with clickable links
      .replace(/Hex ID\s+\*\*([a-f0-9]{15})\*\*:/g, (match, hexId) => {
        console.log('🔍 Converting hex ID to link:', hexId);
        return `**Hex ID** [\`${hexId}\`](#hex-${hexId}):`;
      })
      // Add line breaks for better readability
      .replace(/([.!?])\s+/g, '$1\n\n')
      // Add line breaks before questions (no bold)
      .replace(/(Would you like|Shall we)/g, '\n\n$1');
    
    console.log('🔍 Formatted standalone hex response:', formattedResponse);
    return formattedResponse;
  }

  if (hexIdMatches) {
    console.log('🔍 Processing hex_id patterns');
    // Format the response with proper markdown
    let formattedResponse = response
      // Replace all hex_id = "..." patterns with clickable hex IDs
      .replace(/hex_id\s*=\s*"([^"]+)"/g, (match, hexId) => {
        console.log('🔍 Converting hex_id pattern to link:', hexId);
        return `**Hex ID:** [\`${hexId}\`](#hex-${hexId})`;
      })
      // Bold quoted text (after hex_id replacement)
      .replace(/("([^"]+)")/g, (match, p1, p2) => {
        // If this quoted text is part of a hex_id pattern, skip it
        if (/hex_id\s*=\s*\*\*Hex ID:\*\*/.test(match)) return match;
        return `**${p2}**`;
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
      const hexIdsSection = hexIds.map(hexId => `- **Hex ID:** [\`${hexId}\`](#hex-${hexId})`).join('\n');
      
      // Find the section with hex IDs and replace it
      const hexSectionRegex = /hex_id\s*=\s*"[^"]+"(?:\s*,\s*hex_id\s*=\s*"[^"]+")*/;
      formattedResponse = formattedResponse.replace(hexSectionRegex, hexIdsSection);
    }
    
    console.log('🔍 Formatted hex_id response:', formattedResponse);
    return formattedResponse;
  }
  
  // For other responses, just add basic formatting and bold quoted text
  let formattedResponse = boldQuotedText(response)
    .replace(/([.!?])\s+/g, '$1\n\n')
    .replace(/(Would you like|Shall we)/g, '\n\n$1');
  
  // Also detect and make standalone hex IDs clickable (those in code blocks)
  formattedResponse = formattedResponse.replace(
    /`([a-f0-9]{15})`/g, 
    (match, hexId) => {
      console.log('🔍 Converting standalone code hex ID to link:', hexId);
      return `[${match}](#hex-${hexId})`;
    }
  );
  
  console.log('🔍 Final formatted response:', formattedResponse);
  return formattedResponse;
};

// Test function to demonstrate formatting (temporary)
/* const testMultipleHexIds = () => {
  const testResponse = `Response from chatbot: Based on Mumbai's household density, consumer spending patterns, and retail foot traffic, the best zones for your bank are:

hex_id = "8a608b0a62b7fff", hex_id = "8a608b0b1067fff", hex_id = "8a608b0a6adffff", hex_id = "8a608b0b115ffff", hex_id = "8a608b0a604ffff"

These zones reflect high population and consistent footfall, indicating a strong customer base and accessibility for banking services.

Would you like a breakdown of spending and footfall for each hex?
Shall we rerun this with custom weights for business demographics and commercial activity?`;
  
  return formatChatbotResponse(testResponse);
}; */

// Test function for numbered list formatting
const testNumberedListFormatting = () => {
  const testResponse = `Here are all your previous requests in this conversation:

1. "give me list of hexes to open a bank"
2. "what's your name"
3. "give me last two request"
4. "give me top 10 hexes to open a bank"`;
  
  return formatChatbotResponse(testResponse);
};

// Test function for hex ID formatting
const testHexIdFormatting = () => {
  const testResponse = `Based on your analysis, here are the top hexes for opening a bank:

hex_id = "8a608b0a62b7fff", hex_id = "8a608b0b1067fff", hex_id = "8a608b0a6adffff"

These hexes show high population density and strong commercial activity.`;
  
  return formatChatbotResponse(testResponse);
};

const ChatBot = () => {
  const { selectHex, openSiteSelectionPanel } = useHexSelection();
  
  // Function to get map instance from global reference
  const getMapInstance = () => {
    return getGlobalMapInstance();
  };
  
  // Load messages from sessionStorage if available
  const getInitialMessages = () => {
    try {
      const stored = sessionStorage.getItem('chatbot_messages');
      if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore */ }
    return [
      { from: 'user', text: 'Hello' },
      { from: 'bot', text: 'Hello! How can I assist you today with site selection or location analysis?' }
    ];
  };

  const [messages, setMessages] = useState(getInitialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    try {
      sessionStorage.setItem('chatbot_messages', JSON.stringify(messages));
    } catch (e) { /* ignore */ }
  }, [messages]);

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
        console.log('Original response:', response.result);
        console.log('Formatted response:', formattedResponse);
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
              {msg.from === 'bot' ? (
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => {
                      console.log('🔗 Rendering link with href:', href, 'and children:', children);
                      // Check if this is a hex ID link
                      if (href && href.startsWith('#hex-')) {
                        const hexId = href.replace('#hex-', '');
                        console.log('🔗 Creating clickable hex button for:', hexId);
                        return (
                          <button
                            className={chatCss.hexLink}
                            onClick={() => {
                              console.log('🔗 Hex button clicked for:', hexId);
                              const mapInstance = getMapInstance();
                              selectHex(hexId, mapInstance);
                            }}
                            title={`Click to view hex ${hexId} on map`}
                          >
                            {children}
                          </button>
                        );
                      }
                      console.log('🔗 Rendering regular link');
                      return <a href={href}>{children}</a>;
                    },
                    code: ({ children, className }) => {
                      const codeContent = String(children);
                      console.log('🔗 Rendering code with content:', codeContent, 'and className:', className);
                      // Only make standalone code blocks clickable, not code inside links
                      if (/^[a-f0-9]{15}$/.test(codeContent) && !className?.includes('language-')) {
                        // Check if this code is inside a link by looking at the parent context
                        // For now, let's just render regular code to avoid nesting issues
                        console.log('🔗 Rendering hex code as regular code to avoid nesting');
                        return <code className={className}>{children}</code>;
                      }
                      console.log('🔗 Rendering regular code');
                      return <code className={className}>{children}</code>;
                    }
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
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