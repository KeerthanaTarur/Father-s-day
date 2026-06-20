"use client";

import React, { useState, useEffect, useRef } from "react";

// --- Dad Type Blueprints from your template ---
const dadTypes = {
  space: {
    label: "Space Dad",
    pun: "Stares at the stars, knows everything about the Apollo missions, and breaks out the telescope if it’s clear.",
    color: "#D0E1FD",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
  },
  tech: {
    label: "Tech Dad",
    pun: "Has 47 browser tabs open, running a server rack in the closet, yet calls you to fix the printer.",
    color: "#FFD9CE",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400",
  },
  fishing: {
    label: "Fishing Dad",
    pun: "Wakes up at 4:00 AM to freeze on a lake. Tells stories about 'the big one' that got away.",
    color: "#AFC49C",
    img: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=400",
  },
  super: {
    label: "Super Dad",
    pun: "Wears a literal or metaphorical cape. Master of grocery loading and one-trip car unloads.",
    color: "#FCE19C",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
  },
  sporty: {
    label: "Sporty Dad",
    pun: "Coaches from the couch, analyzes playbooks, and shouts at the TV like the referee can hear him.",
    color: "#E5E1F4",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
  },
  sea: {
    label: "Captain Dad",
    pun: "Wears boat shoes everywhere, drops nautical puns constantly, and loves tying complex knots.",
    color: "#CBE8F7",
    img: "https://images.unsplash.com/photo-1505705694340-019e1e335916?w=400",
  },
};

const defaultJokes = [
  { q: "What do you call a fake noodle?", a: "An impasta." },
  { q: "What do you call a bear with no teeth?", a: "A gummy bear." },
  { q: "What do you call a cow with no legs?", a: "Ground beef." },
  { q: "What do you call a can opener that doesn't work?", a: "A can't opener." },
  { q: "What do you call a sleeping dinosaur?", a: "A dino-snore." },
  { q: "What do you call cheese that isn't yours?", a: "Nacho cheese." },
];

const dadReplies = [
  "Ask your mother, I'm fixing the lawnmower right now.",
  "Did you turn it off and turn it back on again?",
  "Hi Hungry, I'm Dad.",
  "Money doesn't grow on trees, you know.",
  "Don't touch the thermostat! It's set perfectly.",
  "Go ask your mom, she's the boss.",
  "When I was your age, I walked uphill both ways in the snow.",
  "Are you tracking mud into my clean kitchen?",
];

export default function FathersDayPage() {
  const [screen, setScreen] = useState<"captcha" | "jokes" | "chuckleNo" | "chuckleYes" | "dadType" | "result" | "dadChat" | "favoriteChild">("captcha");
  const [verifying, setVerifying] = useState(false);
  const [verifiedText, setVerifiedText] = useState("");
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [flippedJokes, setFlippedJokes] = useState<Record<number, boolean>>({});
  const [selectedType, setSelectedType] = useState<keyof typeof dadTypes>("tech");
  
  // Chat States
  const [messages, setMessages] = useState<{ sender: "dad" | "user"; text: string }[]>([
    { sender: "dad", text: "Ask your mother, I'm fixing the lawnmower right now." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatLogsRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat box
  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCaptchaClick = () => {
    if (captchaChecked) return;
    setCaptchaChecked(true);
    setVerifying(true);
    setVerifiedText("⏳ verifying dad-ness…");
    setTimeout(() => {
      setVerifiedText("✅ confirmed. proceed.");
      setTimeout(() => setScreen("jokes"), 600);
    }, 1100);
  };

  const toggleJokeFlip = (index: number) => {
    setFlippedJokes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    setTimeout(() => {
      const randomReply = dadReplies[Math.floor(Math.random() * dadReplies.length)];
      setMessages((prev) => [...prev, { sender: "dad", text: randomReply }]);
    }, 800);
  };

  return (
    <main className="min-height-screen w-full flex items-center justify-center font-quicksand text-[#2B2B3D] select-none">
      
      {/* SCREEN 1: CAPTCHA */}
      {screen === "captcha" && (
        <div className="flex flex-col items-center gap-6 text-center max-w-[560px]">
          <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1 rotate-[-1.5deg]">
            verification required
          </span>
          <h1 className="font-caveat font-bold text-6xl leading-none">are you a dad?</h1>
          <p className="max-w-[380px] text-sm font-semibold opacity-80">
            we need to confirm before letting you through. standard procedure.
          </p>
          <div className="bg-white border-[2.5px] border-[#2B2B3D] rounded-2xl shadow-[6px_6px_0_rgba(43,43,61,0.12)] p-8 relative w-[380px] max-w-[90vw]">
            <div 
              onClick={handleCaptchaClick}
              className={`flex items-center gap-4 border-2 border-[#2B2B3D] rounded-xl p-4 bg-white cursor-pointer select-none transition-colors ${captchaChecked ? "bg-[#AFC49C]" : ""}`}
            >
              <div className="w-8 h-8 border-[2.5px] border-[#2B2B3D] rounded-md flex items-center justify-center bg-white flex-shrink-0">
                {captchaChecked && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12.5L9.5 18L20 6" stroke="#2B2B3D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className="text-left font-bold text-sm leading-tight">
                i solemnly swear i am a dad<br/><span className="text-xs opacity-60">(or dad-adjacent)</span>
              </div>
            </div>
            
            <div className="mt-4 min-h-[1.5rem] font-bold text-sm text-[#D66A50]">
              {verifiedText}
            </div>
            
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="text-xs opacity-40 font-bold uppercase tracking-wider">or</div>
              <button 
                className="w-full bg-transparent text-[#2B2B3D] font-bold text-sm py-2 px-4 rounded-full border-2 border-dashed border-[#2B2B3D]"
                onClick={() => setScreen("dadChat")}
              >
                Or talk to dad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 2: JOKES GAUNTLET */}
      {screen === "jokes" && (
        <div className="w-full flex flex-col items-center py-12">
          <div className="flex flex-col items-center gap-4 text-center mb-4">
            <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1 rotate-[-1.5deg]">
              dad joke gauntlet
            </span>
            <h1 className="font-caveat font-bold text-5xl">scroll if you dare</h1>
            <p className="text-xs font-bold opacity-60">← scroll sideways · tap a circle to reveal the punchline →</p>
          </div>

          <div className="w-full flex items-center gap-12 overflow-x-auto px-[8vw] py-8 snap-x snap-mandatory">
            {defaultJokes.map((joke, idx) => (
              <div key={idx} className="flex flex-col items-center flex-shrink-0 snap-center">
                <div 
                  onClick={() => toggleJokeFlip(idx)}
                  className="w-[220px] h-[220px] cursor-pointer relative style-preserve-3d transition-transform duration-500"
                  style={{ transform: flippedJokes[idx] ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  {/* Front */}
                  <div className="absolute inset-0 rounded-full border-3 border-[#2B2B3D] bg-[#FCE19C] flex items-center justify-center p-6 text-center font-bold text-sm backface-hidden shadow-[4px_4px_0_rgba(43,43,61,0.1)]">
                    What do you call {joke.q.replace("What do you call ", "")}
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 rounded-full border-3 border-[#2B2B3D] bg-[#AFC49C] flex items-center justify-center p-6 text-center font-bold text-sm backface-hidden shadow-[4px_4px_0_rgba(43,43,61,0.1)] rotate-y-180">
                    {joke.a}
                  </div>
                </div>
                <span className="text-xs font-bold opacity-40 mt-3">tap to reveal</span>
              </div>
            ))}

            {/* End Card of Slider */}
            <div className="flex-shrink-0 snap-center bg-white border-[2.5px] border-[#2B2B3D] rounded-2xl shadow-[5px_5px_0_rgba(43,43,61,0.12)] p-8 w-[280px]">
              <h2 className="font-caveat font-bold text-3xl mb-4">did that make you chuckle?</h2>
              <div className="flex flex-col gap-3">
                <button 
                  className="bg-[#E8836B] text-white font-bold py-3 px-4 rounded-full border-2 border-[#2B2B3D] shadow-[3px_3px_0_#2B2B3D] active:translate-y-0.5"
                  onClick={() => setScreen("chuckleYes")}
                >
                  bahahaha who wouldn't
                </button>
                <button 
                  className="bg-transparent text-[#2B2B3D] font-bold py-2 px-4 rounded-full border-2 border-dashed border-[#2B2B3D]"
                  onClick={() => setScreen("chuckleNo")}
                >
                  no, these are lame
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 3a: CHUCKLE NO */}
      {screen === "chuckleNo" && (
        <div className="flex flex-col items-center gap-6 text-center max-w-[560px]">
          <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1 rotate-[-1.5deg]">
            plot twist
          </span>
          <h1 className="font-caveat font-bold text-5xl leading-tight">you aren't a dad if<br/>you don't like dad jokes</h1>
          <button 
            className="bg-[#E8836B] text-white font-bold py-3 px-6 rounded-full border-2 border-[#2B2B3D] shadow-[4px_4px_0_#2B2B3D]"
            onClick={() => setScreen("jokes")}
          >
            okay fine, let me try again
          </button>
        </div>
      )}

      {/* SCREEN 3b: CHUCKLE YES */}
      {screen === "chuckleYes" && (
        <div className="flex flex-col items-center gap-6 text-center max-w-[560px]">
          <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1 rotate-[-1.5deg]">
            verification complete
          </span>
          <div className="font-caveat font-bold text-5xl text-[#E8836B] border-[5px] border-[#E8836B] rounded-xl px-6 py-2 rotate-[-4deg] inline-block tracking-wide">
            CONFIRMED DAD
          </div>
          <p className="font-semibold text-sm opacity-75">the certification is official. mostly.</p>
          <button 
            className="bg-[#E8836B] text-white font-bold py-3 px-8 rounded-full border-2 border-[#2B2B3D] shadow-[4px_4px_0_#2B2B3D]"
            onClick={() => setScreen("dadType")}
          >
            continue
          </button>
        </div>
      )}

      {/* SCREEN 4: DAD TYPES GRID */}
      {screen === "dadType" && (
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1 rotate-[-1.5deg]">
              final round
            </span>
            <h1 className="font-caveat font-bold text-5xl">what kind of dad are you?</h1>
            <p className="text-sm font-semibold opacity-70">pick the one that hits closest to home</p>
          </div>
          <div className="grid grid-columns-3 max-sm:grid-columns-2 gap-4 max-w-[680px] px-4 w-full">
            {Object.keys(dadTypes).map((key) => {
              const t = dadTypes[key as keyof typeof dadTypes];
              return (
                <div 
                  key={key}
                  onClick={() => {
                    setSelectedType(key as keyof typeof dadTypes);
                    setScreen("result");
                  }}
                  className="bg-white border-[2.5px] border-[#2B2B3D] rounded-2xl p-3 flex flex-col items-center gap-2 shadow-[4px_4px_0_rgba(43,43,61,0.15)] cursor-pointer hover:-translate-y-1 transition-transform"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-[#2B2B3D]">
                    <img src={t.img} alt={t.label} className="w-full h-full object-cover"/>
                  </div>
                  <span className="font-bold text-sm">{t.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SCREEN 5: RESULTS SCREEN */}
      {screen === "result" && (
        <div 
          className="w-full min-height-screen flex flex-col items-center justify-center p-8 transition-colors duration-500"
          style={{ backgroundColor: dadTypes[selectedType].color }}
        >
          <div className="flex flex-col items-center gap-4 text-center max-w-[500px]">
            <span className="font-bold tracking-widest uppercase text-sm text-[#2B2B3D] opacity-75">
              {dadTypes[selectedType].label}
            </span>
            <div className="w-[180px] h-[180px] bg-white rounded-full border-3 border-[#2B2B3D] overflow-hidden shadow-md">
              <img src={dadTypes[selectedType].img} alt="Dad type" className="w-full h-full object-cover"/>
            </div>
            <p className="font-caveat font-bold text-3xl leading-tight mt-2 px-4">
              "{dadTypes[selectedType].pun}"
            </p>
            
            <div className="flex flex-col gap-3 w-full max-w-[300px] mt-4">
              <button 
                className="bg-[#E8836B] text-white font-bold py-3 px-6 rounded-full border-2 border-[#2B2B3D] shadow-[4px_4px_0_#2B2B3D]"
                onClick={() => setScreen("favoriteChild")}
              >
                Start beef at home
              </button>
              <button 
                className="bg-white text-[#2B2B3D] font-bold py-2 px-4 rounded-full border-2 border-dashed border-[#2B2B3D]"
                onClick={() => setScreen("dadType")}
              >
                ↺ pick a different type
              </button>
            </div>
            <p className="text-xs font-bold opacity-50 mt-4">📲 screenshot this and send it straight to dad</p>
          </div>
        </div>
      )}

      {/* SCREEN 6: DAD CHAT HOTLINE */}
      {screen === "dadChat" && (
        <div className="flex flex-col items-center gap-4 max-w-full px-4">
          <div className="text-center">
            <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1">
              interactive line
            </span>
            <h1 className="font-caveat font-bold text-5xl mt-1">Dad Hotline</h1>
            <p className="text-xs font-semibold opacity-70">He's responding between yard chores.</p>
          </div>

          <div className="w-[440px] max-w-[92vw] h-[380px] bg-white border-[2.5px] border-[#2B2B3D] rounded-2xl flex flex-col overflow-hidden shadow-[5px_5px_0_rgba(43,43,61,0.1)]">
            <div className="bg-[#FCE19C] border-b-[2.5px] border-[#2B2B3D] p-3 font-bold flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-[#2B2B3D]"></div>
              <span>Dad (Online)</span>
            </div>
            <div ref={chatLogsRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[#FAF6F0]">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm font-semibold border-2 border-[#2B2B3D] shadow-[2px_2px_0_#2B2B3D] ${
                    m.sender === "dad" ? "bg-[#FFD9CE] self-start rounded-bl-none" : "bg-[#AFC49C] self-end rounded-br-none"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="flex border-top-[2.5px] border-[#2B2B3D] bg-white">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Type a message..." 
                className="flex-1 p-3 outline-none font-semibold text-sm"
              />
              <button onClick={handleSendChat} className="bg-[#E8836B] text-white font-bold px-5 border-l-[2.5px] border-[#2B2B3D]">
                Send
              </button>
            </div>
          </div>
          <button className="bg-transparent text-[#2B2B3D] font-bold text-xs py-2 px-4 rounded-full border-2 border-dashed border-[#2B2B3D]" onClick={() => setScreen("captcha")}>
            ← Go Back
          </button>
        </div>
      )}

      {/* SCREEN 7: FAVORITE CHILD PROCLAIMER */}
      {screen === "favoriteChild" && (
        <div className="flex flex-col items-center gap-4 text-center max-w-[420px] px-4">
          <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1">
            family data dashboard
          </span>
          <h1 className="font-caveat font-bold text-5xl leading-tight">Favorite Child<br/>Proclaimer</h1>
          <p className="text-sm font-semibold opacity-70">The mathematical verification profile has spoken.</p>
          
          <div className="bg-white border-[2.5px] border-[#2B2B3D] p-4 pb-10 shadow-[6px_6px_0_rgba(43,43,61,0.12)] rotate-[2deg] my-4 w-full">
            <div className="w-full aspect-[4/3] bg-[#EEEADF] border-2 border-dashed border-[#2B2B3D] flex items-center justify-center font-bold text-md text-[#D66A50]">
              <span>[ Insert Winner Photo Here ]</span>
            </div>
            <h2 className="font-caveat font-bold text-4xl mt-4 text-[#2B2B3D]">The Favourite Child</h2>
          </div>

          <p className="font-caveat font-bold text-2xl text-[#D66A50]">"Don't tell your siblings, but it's true."</p>
          
          <button 
            className="mt-4 bg-transparent text-[#2B2B3D] font-bold text-xs py-2 px-4 rounded-full border-2 border-dashed border-[#2B2B3D]"
            onClick={() => setScreen("dadType")}
          >
            ↺ Back to Dad Quiz
          </button>
        </div>
      )}

    </main>
  );
}