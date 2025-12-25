
import React, { useState, useRef, useEffect } from 'react';
import { Message, MessageRole } from '../types';
import { getChatResponse } from '../services/geminiService';

interface ChatInterfaceProps {
  language: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am HealthBuddy. How can I help you today? You can ask me about symptoms, vaccines, or local health tips.',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const { text, sources } = await getChatResponse(input, messages, language);

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: text,
      timestamp: Date.now(),
      sources
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  const suggestions = [
    "What are common symptoms of malaria?",
    "When should my baby get the first polio vaccine?",
    "How to prevent dengue at home?",
    "Are there any outbreaks in my area?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto w-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                {msg.content}
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Information Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map((src, i) => (
                      <a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                        <i className="fas fa-link text-[10px]"></i> {src.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-sm animate-pulse flex gap-1">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {messages.length < 3 && !isLoading && (
        <div className="px-4 pb-2">
          <p className="text-xs text-slate-500 mb-2 px-1">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button 
                key={i} 
                onClick={() => setInput(s)}
                className="text-xs bg-white border border-slate-200 text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your health query..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-emerald-600 text-white rounded-xl px-5 py-3 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          Disclaimer: AI advice is for informational purposes. Consult a doctor for medical diagnosis.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
