import React, { useState, useEffect } from 'react';

const Hero = () => {
  // 📸 अपनी पसंदीदा गाड़ियों की इमेजेस के लिंक्स यहाँ डालें
  const heroImages = [
    'images/Scooter11.avif', // पहली गाड़ी
    'images/Scooter12.webp', // दूसरी गाड़ी
    'images/Scooter13.png'  // तीसरी गाड़ी
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 🔄 हर 3 सेकंड में इमेज को अपने आप बदलने का लॉजिक
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // 3000ms = 3 सेकंड
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-slate-950 text-white min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      
      {/* 🌌 बैकग्राउंड में बड़ा इमेज स्लाइडर */}
      <div className="absolute inset-0 w-full h-full z-0 transition-all duration-1000 ease-in-out">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950 z-10"></div>
        <img 
          src={heroImages[currentImageIndex]} 
          alt="Premium Electric Vehicle" 
          className="w-full h-full object-cover opacity-30 transition-all duration-1000 transform scale-105"
        />
      </div>

      {/* बैकग्राउंड में एक हल्का सा नियॉन ग्लो इफेक्ट */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* मुख्य कंटेंट */}
      <div className="relative z-10 max-w-4xl mt-12">
        <span className="text-green-400 font-bold text-xs md:text-sm tracking-widest uppercase bg-green-500/10 px-4 py-1.5 rounded-full border border-green-500/20">
          The Future Has Arrived
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-6 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
          Drive the Revolution
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-4 max-w-xl mx-auto">
          Experience the ultimate fusion of performance, luxury, and futuristic technology with our premium electric lineup.
        </p>

        {/* ऐक्शन बटन्स */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#vehicles" className="w-full sm:w-auto bg-white hover:bg-slate-200 text-slate-950 font-bold px-8 py-3.5 rounded-full transition text-sm tracking-wide shadow-lg shadow-white/5">
            Explore Models
          </a>
          <a href="#book-service" className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 text-white font-medium px-8 py-3.5 rounded-full transition text-sm tracking-wide bg-slate-900/50 backdrop-blur">
            Schedule Repair
          </a>
        </div>
      </div>

      {/* नीचे एक्टिव इमेज के डॉट्स (Indicators) */}
      <div className="relative z-10 flex gap-2 mt-16">
        {heroImages.map((_, index) => (
          <div 
            key={index} 
            className={`h-1.5 rounded-full transition-all duration-500 ${index === currentImageIndex ? 'w-8 bg-green-400' : 'w-2 bg-slate-700'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;