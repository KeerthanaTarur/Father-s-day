"use client";

import React, { useState, useEffect, useRef } from "react";

// --- Custom Dad Profiles Mapped to Your Uploaded Local Images ---
const dadTypes = [
  {
    id: "space",
    type: "Space Dad",
    image: "/space-dad.jpg",
    description: "Looks at the stars, quotes cosmos facts, thinks daylight savings is a cosmic anomaly, and we love you for it.",
    color: "#D0E1FD"
  },
  {
    id: "tech",
    type: "Tech Dad",
    image: "/tech-dad.jpg",
    description: "Holds the phone 2 feet from his face with maximum brightness. Peers over reading glasses, and we love you for it.",
    color: "#FFD9CE"
  },
  {
    id: "fishing",
    type: "Fishing Dad",
    image: "/fishing-dad.jpg",
    description: "Has 47 photos of the exact same fish. Wakes up at 4:00 AM on weekends 'for the peace', and we love you for it.",
    color: "#AFC49C"
  },
  {
    id: "super",
    type: "Super Dad",
    image: "/super-dad.jpg",
    description: "Wears the absolute wildest gear, tells everyone he's still got it, ultimate family legend, and we love you for it.",
    color: "#FCE19C"
  },
  {
    id: "sports",
    type: "Sports Dad",
    image: "/sports-dad.png",
    description: "Sweats more than the players. Backseat coaches from the sidelines with maximum volume, and we love you for it.",
    color: "#E5E1F4"
  },
  {
    id: "sea",
    type: "Sea Dad",
    image: "/sea-dad.jpg",
    description: "Captain of the grill, master of the fake pipe, tells tall tales about the neighborhood pond, and we love you for it.",
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

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  angle: number;
}

export default function FathersDayPage() {
  const [screen, setScreen] = useState<"captcha" | "jokes" | "chuckleNo" | "chuckleYes" | "dadType" | "result" | "dadChat" | "favoriteChild">("captcha");
  const [verifying, setVerifying] = useState(false);
  const [verifiedText, setVerifiedText] = useState("");
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [flippedJokes, setFlippedJokes] = useState<Record<number, boolean>>({});
  const [selectedIndex, setSelectedIndex] = useState(1);
  
  // Custom states for the interactive celebration
  const [showCelebration, setShowCelebration] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  
  // State for the uploaded favorite child image preview string
  const [favoriteChildImage, setFavoriteChildImage] = useState<string | null>(null);
  
  // Chat States
  const [messages, setMessages] = useState<{ sender: "dad" | "user"; text: string }[]>([
    { sender: "dad", text: "Ask your mother, I'm fixing the lawnmower right now." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatLogsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Audio Reference for Elevator Background Music
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize the audio instance on mount safely client-side
  useEffect(() => {
    audioRef.current = new Audio("/elevator-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
  }, []);

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
    setVerifiedText("we won't take your word for it");

    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Audio autoplay prevented or failed:", err);
      });
    }
    
    setTimeout(() => {
      setVerifiedText("let's put that to the test");
      setTimeout(() => setScreen("jokes"), 1000);
    }, 1500);
  };

  const toggleJokeFlip = (index: number) => {
    setFlippedJokes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

 const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    console.log(messages);


    const req = { text: userText };
    const updatedMessages = [...messages, { sender: "user", text: userText }];
    console.log(req);
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: updatedMessages.map(m => ({
          role: m.sender === "dad" ? "assistant" : "user",
          content: m.text,
        }))
      }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { sender: "dad", text: data.reply }]);
    console.log(data.reply);
  };

  const triggerConfettiCelebration = () => {
    setShowCelebration(true);
    const colors = ["#E8836B", "#AFC49C", "#FCE19C", "#D0E1FD", "#FFD9CE", "#E5E1F4"];
    const pieces: ConfettiPiece[] = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -20 - 10,
      size: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      duration: Math.random() * 2 + 2.5,
      angle: Math.random() * 360
    }));
    setConfetti(pieces);
  };

  const handleNavigateToSelection = () => {
    setShowCelebration(false);
    setConfetti([]);
    setScreen("dadType");
  };

  // Convert uploaded image to an actionable local blob URL string for display
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFavoriteChildImage(imageUrl);
    }
  };

  const triggerFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center font-quicksand text-[#2B2B3D] select-none bg-[#FAF6F0] overflow-hidden relative">
      
      {/* Hidden file selector node */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Dynamic Confetti Stream Elements */}
      {confetti.map((piece) => (
        <span
          key={piece.id}
          className="absolute z-50 rounded-sm pointer-events-none animate-fall"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.angle}deg)`
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(0vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(115vh) rotate(720deg);
            opacity: 0.3;
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-iteration-count: infinite;
        }
      `}</style>

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
                onClick={() => {
                  if (audioRef.current) audioRef.current.play().catch(() => {});
                  setScreen("dadChat");
                }}
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
                  <div 
                    className="absolute inset-0 rounded-full border-3 border-[#2B2B3D] bg-[#FCE19C] flex items-center justify-center p-6 text-center font-bold text-sm shadow-[4px_4px_0_rgba(43,43,61,0.1)]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {joke.q}
                  </div>
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
            
            <div className="flex flex-col gap-4 w-full max-w-[320px] mt-4">
              {!showCelebration ? (
                <button 
                  className="bg-[#2B2B3D] text-white font-bold py-3.5 px-6 rounded-full border-2 border-[#2B2B3D] shadow-[4px_4px_0_#E8836B] hover:translate-y-[-2px] active:translate-y-[1px] transition-transform text-sm tracking-wide"
                  onClick={triggerConfettiCelebration}
                >
                  thank you kid you&apos;re simply the best
                </button>
              ) : (
                <div className="flex flex-col gap-3 w-full">
                  <div className="bg-white border-2 border-[#2B2B3D] rounded-full py-2 px-4 text-xs font-black uppercase text-[#D66A50] tracking-widest shadow-[3px_3px_0_#2B2B3D] mb-2">
                    ❤️ Best Dad Ever!
                  </div>
                  <button 
                    className="bg-[#E8836B] text-white font-bold py-3 px-6 rounded-full border-2 border-[#2B2B3D] shadow-[4px_4px_0_#2B2B3D]"
                    onClick={() => setScreen("favoriteChild")}
                  >
                    Start beef at home
                  </button>
                  <button 
                    className="bg-white text-[#2B2B3D] font-bold py-2 px-4 rounded-full border-2 border-dashed border-[#2B2B3D]"
                    onClick={handleNavigateToSelection}
                  >
                    turn around and pick a different type
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs font-bold opacity-50 mt-4">Happy father's day old man!</p>
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
          
          {/* Polaroid Frame Container */}
          <div className="bg-white border-[2.5px] border-[#2B2B3D] p-4 pb-10 shadow-[6px_6px_0_rgba(43,43,61,0.12)] rotate-[2deg] my-4 w-full">
            <div 
              onClick={triggerFileSelection}
              className="w-full aspect-[4/3] bg-[#EEEADF] border-2 border-dashed border-[#2B2B3D] flex flex-col items-center justify-center font-bold text-xs text-[#D66A50] cursor-pointer hover:bg-[#E5E1D5] transition-colors overflow-hidden relative group"
            >
              {favoriteChildImage ? (
                <>
                  <img 
                    src={favoriteChildImage} 
                    alt="The Favorite Child" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity font-bold text-xs">
                    Change Photo
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 p-4">
                  <svg className="w-6 h-6 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Click to upload winner photo</span>
                </div>
              )}
            </div>
            <h2 className="font-caveat font-bold text-4xl mt-4 text-[#2B2B3D]">The Favourite Child</h2>
          </div>

          <p className="font-caveat font-bold text-2xl text-[#D66A50]">&ldquo;Don&apos;t tell your siblings, but it&apos;s true.&rdquo;</p>
          
          <button 
            className="mt-4 bg-white text-[#2B2B3D] font-bold py-2 px-4 rounded-full border-2 border-dashed border-[#2B2B3D] text-xs"
            onClick={handleNavigateToSelection}
          >
            turn around and pick a different type
          </button>
        </div>
      )}

    </main>
  );
}