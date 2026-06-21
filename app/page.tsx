"use client";

import React, { useState, useEffect, useRef } from "react";

// --- Custom Dad Profiles Mapped to Your Uploaded Local Images ---
const dadTypes = [
  {
    id: "space",
    type: "Space Dad",
    image: "/space-dad.jpg",
    description: "Looks at the stars, quotes cosmos facts, thinks daylight savings is a cosmic anomaly.",
    color: "#D0E1FD"
  },
  {
    id: "tech",
    type: "Tech Dad",
    image: "/tech-dad.jpg",
    description: "Holds the phone 2 feet from his face with maximum brightness. Peers over reading glasses.",
    color: "#FFD9CE"
  },
  {
    id: "fishing",
    type: "Fishing Dad",
    image: "/fishing-dad.jpg",
    description: "Has 47 photos of the exact same fish. Wakes up at 4:00 AM on weekends 'for the peace'.",
    color: "#AFC49C"
  },
  {
    id: "super",
    type: "Super Dad",
    image: "/super-dad.jpg",
    description: "Wears the absolute wildest gear, tells everyone he's still got it, ultimate family legend.",
    color: "#FCE19C"
  },
  {
    id: "sports",
    type: "Sports Dad",
    image: "/sports-dad.png",
    description: "Sweats more than the players. Backseat coaches from the sidelines with maximum volume.",
    color: "#E5E1F4"
  },
  {
    id: "sea",
    type: "Sea Dad",
    image: "/sea-dad.jpg",
    description: "Captain of the grill, master of the fake pipe, tells tall tales about the neighborhood pond.",
    color: "#CBE8F7"
  }
];

const defaultJokes = [
  { q: "What do you call a fake noodle?", a: "AN IMPASTA!" },
  { q: "What do you call a bear with no teeth?", a: "A GUMMY BEAR!" },
  { q: "What do you call a cow with no legs?", a: "GROUND BEEF!" },
  { q: "What do you call a can opener that doesn't work?", a: "A CAN'T OPENER!" },
  { q: "What do you call a sleeping dinosaur?", a: "A DINO-SNORE!" },
  { q: "What do you call cheese that isn't yours?", a: "NACHO CHEESE!" },
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
  const [selectedIndex, setSelectedIndex] = useState(1);
  
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
    setVerifiedText("⏳ we won't take your words for it");
    
    setTimeout(() => {
      setVerifiedText("✅ let's put that to the test");
      setTimeout(() => setScreen("jokes"), 1000);
    }, 1500);
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
    <main className="min-h-screen w-full flex items-center justify-center font-quicksand text-[#2B2B3D] select-none bg-[#FAF6F0]">
      
      {/* SCREEN 1: CAPTCHA */}
      {screen === "captcha" && (
        <div className="flex flex-col items-center gap-6 text-center max-w-[560px] p-4">
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
                I solemnly swear I am dad<br/><span className="text-xs opacity-60">(or dad-adjacent)</span>
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
          <div className="flex flex-col items-center gap-4 text-center mb-4 px-4">
            <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1 rotate-[-1.5deg]">
              dad joke gauntlet
            </span>
            <h1 className="font-caveat font-bold text-5xl">scroll if you dare</h1>
            <p className="text-xs font-bold opacity-60">&larr; scroll sideways &middot; tap a circle to reveal the punchline &rarr;</p>
          </div>

          <div className="w-full flex items-center gap-12 overflow-x-auto px-[8vw] py-8 snap-x snap-mandatory">
            {defaultJokes.map((joke, idx) => (
              <div key={idx} className="flex flex-col items-center flex-shrink-0 snap-center">
                <div 
                  onClick={() => toggleJokeFlip(idx)}
                  className="w-[220px] h-[220px] cursor-pointer relative transition-transform duration-500"
                  style={{ 
                    transform: flippedJokes[idx] ? "rotateY(180deg)" : "rotateY(0deg)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Front: Question */}
                  <div 
                    className="absolute inset-0 rounded-full border-3 border-[#2B2B3D] bg-[#FCE19C] flex items-center justify-center p-6 text-center font-bold text-sm shadow-[4px_4px_0_rgba(43,43,61,0.1)]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {joke.q}
                  </div>
                  {/* Back: Answer */}
                  <div 
                    className="absolute inset-0 rounded-full border-3 border-[#2B2B3D] bg-[#AFC49C] flex items-center justify-center p-6 text-center font-bold text-sm shadow-[4px_4px_0_rgba(43,43,61,0.1)]"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
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
                  bahahaha who wouldn&apos;t
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
        <div className="flex flex-col items-center gap-6 text-center max-w-[560px] p-4">
          <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1 rotate-[-1.5deg]">
            plot twist
          </span>
          <h1 className="font-caveat font-bold text-5xl leading-tight">you aren&apos;t a dad if<br/>you don&apos;t like dad jokes</h1>
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
        <div className="flex flex-col items-center gap-6 text-center max-w-[560px] p-4">
          <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1 rotate-[-1.5deg]">
            verification complete
          </span>
          
          <div className="flex flex-col items-center justify-center py-6 w-full">
            <div className="font-caveat font-bold text-6xl text-[#E8836B] border-[5px] border-[#E8836B] rounded-xl px-8 py-3 rotate-[-4deg] inline-block tracking-wide bg-white/40 shadow-sm">
              CONFIRMED DAD
            </div>
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
        <div className="flex flex-col items-center gap-6 py-8 w-full">
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1 rotate-[-1.5deg]">
              final round
            </span>
            <h1 className="font-caveat font-bold text-5xl">what kind of dad are you?</h1>
            <p className="text-sm font-semibold opacity-70">pick the one that hits closest to home</p>
          </div>
          
          <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-4 max-w-[680px] px-4 w-full">
            {dadTypes.map((item, idx) => {
              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setScreen("result");
                  }}
                  className="bg-white border-[2.5px] border-[#2B2B3D] rounded-2xl p-3 flex flex-col items-center gap-2 shadow-[4px_4px_0_rgba(43,43,61,0.15)] cursor-pointer hover:-translate-y-1 transition-transform"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-[#2B2B3D]">
                    <img src={item.image} alt={item.type} className="w-full h-full object-cover"/>
                  </div>
                  <span className="font-bold text-sm">{item.type}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SCREEN 5: RESULTS SCREEN */}
      {screen === "result" && (
        <div 
          className="w-full min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-500"
          style={{ backgroundColor: dadTypes[selectedIndex].color }}
        >
          <div className="flex flex-col items-center gap-4 text-center max-w-[500px]">
            <span className="font-bold tracking-widest uppercase text-sm text-[#2B2B3D] opacity-75">
              {dadTypes[selectedIndex].type}
            </span>
            <div className="w-[180px] h-[180px] bg-white rounded-full border-3 border-[#2B2B3D] overflow-hidden shadow-md">
              <img src={dadTypes[selectedIndex].image} alt="Dad type profile" className="w-full h-full object-cover"/>
            </div>
            <p className="font-caveat font-bold text-3xl leading-tight mt-2 px-4">
              &ldquo;{dadTypes[selectedIndex].description}&rdquo;
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
                &leftturn; pick a different type
              </button>
            </div>
            <p className="text-xs font-bold opacity-50 mt-4">📲 screenshot this and send it straight to dad</p>
          </div>
        </div>
      )}

      {/* SCREEN 6: DAD CHAT HOTLINE */}
      {screen === "dadChat" && (
        <div className="flex flex-col items-center gap-4 max-w-full px-4 py-8">
          <div className="text-center">
            <span className="font-bold tracking-widest uppercase text-xs text-[#D66A50] border-2 border-dashed border-[#E8836B] bg-white rounded-full px-4 py-1">
              interactive line
            </span>
            <h1 className="font-caveat font-bold text-5xl mt-1">Dad Hotline</h1>
            <p className="text-xs font-semibold opacity-70">He&apos;s responding between yard chores.</p>
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
            <div className="flex border-t-[2.5px] border-[#2B2B3D] bg-white">
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
            &larr; Go Back
          </button>
        </div>
      )}

      {/* SCREEN 7: FAVORITE CHILD PROCLAIMER */}
      {screen === "favoriteChild" && (
        <div className="flex flex-col items-center gap-4 text-center max-w-[420px] px-4 py-8">
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

          <p className="font-caveat font-bold text-2xl text-[#D66A50]">&ldquo;Don&apos;t tell your siblings, but it&apos;s true.&rdquo;</p>
          
          <button 
            className="mt-4 bg-transparent text-[#2B2B3D] font-bold text-xs py-2 px-4 rounded-full border-2 border-dashed border-[#2B2B3D]"
            onClick={() => setScreen("dadType")}
          >
            &leftturn; Back to Dad Quiz
          </button>
        </div>
      )}

    </main>
  );
}