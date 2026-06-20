'use client';
import { useState } from 'react';

export default function DadChat() {
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hey kiddo! What can your old man help you with today? (Make sure you aren't leaving all the lights upstairs on!)" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'model', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', content: 'Hold on, the WiFi router must be acting up again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-paper border-[2.5px] border-ink rounded-3xl p-6 shadow-[6px_6px_0_rgba(43,43,61,1)] font-quicksand relative">
      <div className="absolute top-[-12px] left-6 bg-butter opacity-90 w-24 h-6 shadow-sm -rotate-2 border-x border-ink/20" />
      <h2 className="font-caveat text-4xl font-bold text-center mb-4 text-ink">Dad-Speak Chatbot</h2>
      
      <div className="h-80 overflow-y-auto mb-4 p-3 space-y-3 border-2 border-dashed border-ink/20 rounded-xl bg-cream/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 border-2 border-ink text-sm font-semibold tracking-wide ${m.role === 'user' ? 'bg-terracotta text-white shadow-[2px_2px_0_#2B2B3D]' : 'bg-butter text-ink shadow-[2px_2px_0_#2B2B3D]'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs font-bold text-terracotta dynamic animate-pulse">Dad is typing slow using index fingers...</div>}
      </div>

      <div className="flex gap-2">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask Dad for some advice or a pun..." 
          className="flex-1 px-4 py-2 text-sm border-2 border-ink rounded-full outline-none font-medium bg-cream/50 focus:bg-white"
        />
        <button onClick={sendMessage} className="bg-terracotta border-2 border-ink  px-5 py-2 rounded-full font-bold text-sm shadow-[2px_2px_0_#2B2B3D] hover:bg-terracotta-dark active:translate-y-0.5 transition-all">Send</button>
      </div>
    </div>
  );
}