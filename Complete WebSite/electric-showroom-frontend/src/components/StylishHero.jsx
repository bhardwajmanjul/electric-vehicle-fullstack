import React, { useState, useEffect } from 'react';

const StylishHero = () => {
  const bannerSlides = [
    {
      id: 1,
      image: '/images/scooter11.avif',
      fallback: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200',
      bgGradient: 'from-rose-950 via-slate-950 to-neutral-950',
      shadowColor: 'rgba(244,63,94,0.3)'
    },
    {
      id: 2,
      image: '/images/scooter12.webp',
      fallback: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200',
      bgGradient: 'from-sky-950 via-slate-950 to-neutral-950',
      shadowColor: 'rgba(14,165,233,0.3)'
    },
    {
      id: 3,
      image: '/images/scooter13.png',
      fallback: 'https://images.unsplash.com/photo-1515777315835-281b94c9589f?q=80&w=1200',
      bgGradient: 'from-slate-800 via-slate-950 to-zinc-950',
      shadowColor: 'rgba(255,255,255,0.15)'
    },
    {
      id: 4,
      image: '/images/scooter-green.png',
      fallback: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200',
      bgGradient: 'from-emerald-950 via-slate-950 to-neutral-950',
      shadowColor: 'rgba(16,185,129,0.3)'
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  return (
    
    <section 
      className={`relative w-full h-screen flex flex-col justify-center items-center overflow-hidden transition-all duration-1000 ease-in-out bg-gradient-to-b ${bannerSlides[current].bgGradient}`}
    >
      
      {/* 🔮 बैकग्राउंड नियॉन लाइट */}
      <div 
        className="absolute w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: bannerSlides[current].shadowColor }}
      ></div>

      {/* 📝 फ्यूचरिस्टिक टैगलाइन एरिया */}
    

      {/* 🎞️ फुल कवर इमेज फ्रेम (यह अब पूरे स्क्रीन एरिया को घेरेगा) */}
      <div className="w-full h-full absolute inset-0 flex justify-center items-center z-10">
        
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-1000 ease-in-out ${
              index === current 
                ? 'opacity-100 scale-100 pointer-events-auto' 
                : 'opacity-0 scale-98 pointer-events-none'
            }`}
            style={{
              /* 🪄 4-Way मल्टिपल मास्क जो इमेज को कोनों से धुंधला करके बैकग्राउंड में घुसा देगा */
              maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
          >
            <img 
              src={slide.image} 
              alt="Manjul Electrics Fullscreen Banner" 
              // 📐 w-full h-full और object-cover से इमेज पूरे लैपटॉप स्क्रीन पर फिट हो जाएगी भाई
              className="w-full h-full object-cover filter brightness-105 drop-shadow-[0_0_50px_rgba(0,0,0,0.7)]"
              onError={(e) => {
                e.target.src = slide.fallback; 
              }}
            />
          </div>
        ))}

      </div>

      {/* 🧭 बॉटम नैविगेशन डॉट्स */}
      <div className="absolute bottom-10 flex gap-3 z-30">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-blue-500' : 'w-2 bg-slate-800'}`}
          />
        ))}
      </div>

    </section>
  );
};

export default StylishHero;