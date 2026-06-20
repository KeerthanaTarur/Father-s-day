'use client';
import { useState, useEffect } from 'react';

export default function FavChildGenerator() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [childName, setChildName] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Hydration Guard: Ensures this component renders only on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      {!imageSrc ? (
        <div className="w-full bg-paper border-[2.5px] border-ink rounded-3xl p-6 text-center shadow-[6px_6px_0_rgba(43,43,61,1)] font-quicksand">
          <span className="font-quicksand font-bold tracking-widest text-xs uppercase border-2 border-dashed border-terracotta text-terracotta px-3 py-0.5 rounded-full bg-white inline-block mb-3 -rotate-1">Household Decree</span>
          <h2 className="font-caveat text-4xl font-bold mb-2 text-ink">Favorite Child Proclaimer</h2>
          <p className="mb-5 text-xs font-medium text-ink/70">Upload a picture to instantly generate a screenshot card to share with the family chat.</p>
          
          <input 
            type="text" 
            placeholder="Enter Favorite Child's Name" 
            value={childName} 
            onChange={e => setChildName(e.target.value)} 
            className="w-full mb-4 px-4 py-2 text-sm border-2 border-ink rounded-full bg-cream/40 focus:outline-none text-ink" 
          />
          
          <input type="file" accept="image/*" id="fileUpload" onChange={handleImageUpload} className="hidden" />
          <label htmlFor="fileUpload" className="inline-block bg-sage border-2 border-ink text-ink font-bold text-sm px-6 py-3 rounded-full cursor-pointer shadow-[3px_3px_0_#2B2B3D] hover:-translate-y-0.5 active:translate-y-0 transition-transform">
            📸 Select Photo
          </label>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div id="screenshot-target" className="w-[340px] aspect-[9/16] bg-cream p-5 border-[4px] border-ink rounded-[2.5rem] shadow-[8px_8px_0_rgba(43,43,61,1)] flex flex-col justify-between items-center relative overflow-hidden pattern-dots">
            
            <div className="w-full text-center mt-6 z-10">
              <h1 className="font-caveat font-black text-5xl text-terracotta tracking-wide drop-shadow-sm -rotate-3">SUCK IT LOSERS!</h1>
              <div className="font-quicksand font-bold text-[11px] border-2 border-ink bg-butter px-3 py-0.5 inline-block rounded-md tracking-widest mt-2 rotate-1 text-ink">
                OFFICIAL DECLARATION
              </div>
            </div>

            <div className="w-60 h-60 border-4 border-ink rounded-2xl overflow-hidden bg-white shadow-[6px_6px_0_#2B2B3D] relative rotate-2 my-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc} alt="Favorite Child" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-ink text-white font-caveat text-2xl py-1 text-center font-bold tracking-wider">
                {childName || 'The Favorite'}
              </div>
            </div>

            <div className="w-full flex flex-col items-center mb-8 z-10">
              <div className="font-caveat text-2xl font-black text-sage border-[3px] border-dashed border-sage p-1.5 px-4 rounded-xl uppercase tracking-widest rotate-[-6deg] bg-white shadow-sm">
                🏆 Signed by Dad
              </div>
              <p className="font-quicksand font-bold text-[10px] text-ink/50 mt-3 text-center leading-tight">
                Screenshot this screen & drop it directly<br/>into your family group chat.
              </p>
            </div>
          </div>
          
          <button onClick={() => setImageSrc(null)} className="mt-4 font-quicksand text-xs font-bold border-2 border-dashed border-ink/40 text-ink/60 px-4 py-1.5 rounded-full bg-white/50 hover:bg-white transition-colors">
            Reset Card
          </button>
        </div>
      )}
    </div>
  );
}