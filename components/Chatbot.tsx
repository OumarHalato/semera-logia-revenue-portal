import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Send, X, Bot, Trash2, Bold, Italic, Underline,
  Eraser, Sparkles, Loader2, ExternalLink
} from 'lucide-react';
import { getGeminiChatStream } from '../services/geminiService.ts';
import { Message, ChatHistoryItem } from '../types.ts';

const STORAGE_KEY = 'semera_logia_chat_history';
const WELCOME_MESSAGE: Message = { 
  role: 'bot', 
  text: 'እንኳን ደህና መጡ! እኔ የሰመራ-ሎግያ ገቢዎች ፅ/ቤት የዲጂታል ረዳት ነኝ። በምን ልርዳዎት?' 
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [WELCOME_MESSAGE];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading, isTyping, isOpen]);

  const clearChat = () => {
    if (window.confirm('የውይይት ታሪክን መሰረዝ ይፈልጋሉ?')) {
      setMessages([WELCOME_MESSAGE]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  /**
   * Applies markdown-style formatting to the selected text in the textarea.
   * Supports bold (**), italic (_), and underline (<u>).
   */
  const applyStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (!inputRef.current) return;
    
    const { selectionStart, selectionEnd } = inputRef.current;
    const selectedText = input.substring(selectionStart, selectionEnd);
    
    let prefix = '', suffix = '';
    if (style === 'bold') { prefix = '**'; suffix = '**'; }
    else if (style === 'italic') { prefix = '_'; suffix = '_'; }
    else if (style === 'underline') { prefix = '<u>'; suffix = '</u>'; }

    const newText = 
      input.substring(0, selectionStart) + 
      prefix + selectedText + suffix + 
      input.substring(selectionEnd);
      
    setInput(newText);
    
    // Focus back to textarea and restore/adjust selection
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        if (selectedText) {
          // Keep the text (now wrapped) selected
          inputRef.current.setSelectionRange(
            selectionStart, 
            selectionEnd + prefix.length + suffix.length
          );
        } else {
          // Position cursor between the tags/symbols
          const newPos = selectionStart + prefix.length;
          inputRef.current.setSelectionRange(newPos, newPos);
        }
      }
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Keyboard shortcuts: Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+U (Underline)
    if (e.ctrlKey || e.metaKey) {
      if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        applyStyle('bold');
      } else if (e.key.toLowerCase() === 'i') {
        e.preventDefault();
        applyStyle('italic');
      } else if (e.key.toLowerCase() === 'u') {
        e.preventDefault();
        applyStyle('underline');
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /**
   * Parses the text and returns a React element with formatted parts.
   */
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|_.*?_|<u>.*?<\/u>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('_') && part.endsWith('_')) {
        return <em key={i} className="italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('<u>') && part.endsWith('</u>')) {
        return <u key={i} className="underline">{part.slice(3, -4)}</u>;
      }
      return part;
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input;
    setInput('');
    
    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = 'auto';

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);
    setIsTyping(true);

    const history: ChatHistoryItem[] = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    try {
      const stream = await getGeminiChatStream(userText, history);
      let fullText = '';
      let firstChunkReceived = false;
      const citations: { title: string; uri: string }[] = [];

      for await (const chunk of stream) {
        if (!firstChunkReceived) {
          setIsTyping(false);
          setMessages(prev => [...prev, { role: 'bot', text: '' }]);
          firstChunkReceived = true;
        }
        
        fullText += chunk.text || '';

        const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
          groundingChunks.forEach((c: any) => {
            if (c.web && c.web.uri && c.web.title) {
              if (!citations.find(cite => cite.uri === c.web.uri)) {
                citations.push({ title: c.web.title, uri: c.web.uri });
              }
            }
          });
        }

        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.role === 'bot') {
            updated[updated.length - 1] = { 
              ...lastMsg, 
              text: fullText,
              citations: citations.length > 0 ? [...citations] : undefined
            };
          }
          return updated;
        });
      }
    } catch (e) {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: 'ይቅርታ፣ ስህተት ተፈጥሯል። እባክዎን እንደገና ይሞክሩ።' }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-blue-600 p-4 rounded-full text-white shadow-xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center relative group"
        >
          <MessageSquare size={28} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></span>
        </button>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-80 sm:w-96 h-[600px] flex flex-col border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-8 duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white flex justify-between items-center rounded-t-[2.5rem]">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Bot size={24}/> 
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base tracking-tight leading-none mb-1">የግብር ረዳት</span>
                <span className="text-[10px] uppercase font-bold opacity-80 flex items-center gap-1">
                  <Sparkles size={10}/> AI Powered
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearChat} title="ታሪክን አጽዳ" className="p-2 hover:bg-white/20 rounded-xl transition-colors"><Trash2 size={18}/></button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors"><X size={20}/></button>
            </div>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50 dark:bg-slate-950/50 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-3xl text-sm max-w-[85%] shadow-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 border dark:border-slate-700 dark:text-slate-100 rounded-tl-none'
                }`}>
                  {renderFormattedText(m.text)}
                  {m.role === 'bot' && m.citations && m.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-wider">ምንጮች / Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {m.citations.map((cite, idx) => (
                          <a 
                            key={idx} 
                            href={cite.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-slate-900 rounded-md text-[10px] text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-slate-800 transition-colors border dark:border-slate-700"
                          >
                            <ExternalLink size={10} />
                            <span className="truncate max-w-[120px]">{cite.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-left-2">
                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 p-4 rounded-3xl rounded-tl-none flex flex-col gap-2 shadow-sm min-w-[140px]">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">መልስ በማዘጋጀት ላይ...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-[2.5rem]">
            {/* Formatting Toolbar */}
            <div className="flex items-center justify-between px-2 mb-3">
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
                <button 
                  onClick={() => applyStyle('bold')} 
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 transition-all active:scale-90" 
                  title="Bold (Ctrl+B)"
                >
                  <Bold size={16}/>
                </button>
                <button 
                  onClick={() => applyStyle('italic')} 
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 transition-all active:scale-90" 
                  title="Italic (Ctrl+I)"
                >
                  <Italic size={16}/>
                </button>
                <button 
                  onClick={() => applyStyle('underline')} 
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 transition-all active:scale-90" 
                  title="Underline (Ctrl+U)"
                >
                  <Underline size={16}/>
                </button>
              </div>
              <button 
                onClick={() => setInput('')} 
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 rounded-lg transition-all active:scale-90" 
                title="አጽዳ (Clear)"
              >
                <Eraser size={16}/>
              </button>
            </div>

            {/* Input Area */}
            <div className="flex items-end gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-[1.5rem] shadow-inner focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <textarea 
                ref={inputRef}
                rows={1}
                value={input}
                onChange={e => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
                }}
                onKeyDown={handleKeyDown}
                placeholder="መልዕክትዎን እዚህ ይጻፉ..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm resize-none py-1.5 px-2 dark:text-slate-100 placeholder:text-slate-400 max-h-32 custom-scrollbar"
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 flex items-center justify-center min-w-[44px]"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20}/>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};