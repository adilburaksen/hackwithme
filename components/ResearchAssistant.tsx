import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { streamResearchResponse } from '../services/geminiService';

const ResearchAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Ask me about the research notes or engineering logs.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setMessages(prev => [...prev, { role: 'model', text: '', isThinking: true }]);

    let fullResponse = '';
    
    await streamResearchResponse(userText, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => {
            const newArr = [...prev];
            const lastMsg = newArr[newArr.length - 1];
            if (lastMsg.role === 'model') {
                lastMsg.text = fullResponse;
                lastMsg.isThinking = false;
            }
            return newArr;
        });
    });

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[40vh] sm:h-[450px] border border-[#333] bg-[#151515] p-3 sm:p-4 font-mono text-xs sm:text-sm shadow-2xl shadow-black/50">
      <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 mb-4 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
              {msg.role === 'user' ? 'YOU' : 'GHOST'}
            </span>
            <div className={`max-w-[90%] sm:max-w-[85%] leading-relaxed break-words whitespace-pre-wrap ${
              msg.role === 'user' 
                ? 'text-white' 
                : 'text-subtext'
            }`}>
              {msg.isThinking ? (
                <span className="animate-pulse">_</span>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-[#333] pt-3 flex gap-2 items-center">
        <span className="text-subtext animate-pulse">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="query..."
          className="flex-1 bg-transparent text-white focus:outline-none placeholder-neutral-800 h-10"
          autoFocus
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="text-subtext hover:text-white disabled:opacity-20 transition-colors uppercase text-[10px] tracking-widest border border-neutral-800 px-3 py-1 hover:border-neutral-600"
        >
          RET
        </button>
      </form>
    </div>
  );
};

export default ResearchAssistant;