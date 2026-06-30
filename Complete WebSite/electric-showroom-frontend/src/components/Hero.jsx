import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-slate-950 text-white min-h-[80vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* बैकग्राउंड में एक हल्का सा नियॉन ग्लो इफेक्ट */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* मुख्य कंटेंट */}
      <div className="relative z-10 max-w-4xl">
        <span className="text-green-400 font-bold text-xs md:text-sm tracking-widest uppercase bg-green-500/10 px-4 py-1.5 rounded-full border border-green-500/20">
          The Future Has Arrived
        </span>
        
        

        {/* ऐक्शन बटन्स */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#vehicles" className="w-full sm:w-auto bg-white hover:bg-slate-200 text-slate-950 font-bold px-8 py-3.5 rounded-full transition text-sm tracking-wide">
            Explore Models
          </a>
          <a href="#book-service" className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 text-white font-medium px-8 py-3.5 rounded-full transition text-sm tracking-wide bg-slate-900/50 backdrop-blur">
            Schedule Repair
          </a>
        </div>
      </div>

      {/* नीचे एक छोटी सी हिंट कि गाड़ी की फोटो कहाँ आएगी */}
      <div className="w-full max-w-3xl mt-12 opacity-40 border-t border-dashed border-slate-800 pt-4 text-center text-xs text-slate-500">
        [ यहाँ हम रिएक्ट ग्रिड में असली स्कूटर्स लोड करवाएंगे ]
      </div>
    </div>
  );
};

export default Hero;