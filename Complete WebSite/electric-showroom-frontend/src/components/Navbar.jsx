import React, { useState } from 'react';

const Navbar = () => {
  // यह स्टेट सिर्फ ओला वाले गोल मेनू को खोलने/बंद करने के लिए है
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md text-slate-900 py-3 px-6 md:px-12 flex justify-between items-center border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      
      {/* 🛵 लेफ्ट साइड: नया गोल व्हीकल लोगो + ब्रांड नेम */}
      <div className="flex items-center gap-3">
        {/* नया अपडेटेड लोगो: लाइट नवबार के लिए ट्रांसपेरेंट बैकग्राउंड के साथ */}
        <div className="w-[50px] h-[50px] md:w-[55px] md:h-[55px] flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
            {/* नवबार लाइट है, इसलिए बाहरी सर्कल को डार्क स्लेट और अंदर का हिस्सा ट्रांसपेरेंट रखा है */}
            <circle cx="250" cy="250" r="230" fill="transparent" stroke="#0f172a" stroke-width="8"/>
            
            {/* इलेक्ट्रिक टू-व्हीलर वििंग्स */}
            <path d="M 140,160 L 250,200 L 360,160 L 250,240 Z" fill="#00d8f6"/>
            <path d="M 170,130 L 250,165 L 330,130 L 250,190 Z" fill="#10b981"/>
            
            {/* मुख्य नाम: CHANDRA GAYA AUTOMOBILE */}
            <text x="250" y="345" text-anchor="middle" font-family="'Orbitron', sans-serif" font-size="25" font-weight="900" fill="#0f172a" letter-spacing="2">
              CHANDRA GAYA
            </text>
            <text x="250" y="380" text-anchor="middle" font-family="'Orbitron', sans-serif" font-size="17" font-weight="900" fill="#00d8f6" letter-spacing="4">
              AUTOMOBILE
            </text>

            {/* सब-टेक्स्ट: KHEREWALAS ESTABLISHMENT */}
            <text x="250" y="425" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="11" font-weight="800" fill="#ea580c" letter-spacing="4">
              KHEREWALAS ESTABLISHMENT
            </text>
            <circle cx="250" cy="445" r="4" fill="#10b981"/>
          </svg>
        </div>

        {/* ब्रांड टेक्स्ट: जो पहले था, उसे लोगो के बगल में परफेक्ट अलाइन कर दिया है */}
        <div className="flex flex-col inherited-fonts">
          <span className="text-lg md:text-xl font-black tracking-tighter text-slate-900 leading-tight">
            CHANDRA GAYA AUTOMOBILE
          </span>
          <span className="text-[10px] md:text-[11px] font-bold text-emerald-600 tracking-widest uppercase">
            Kherewalas' Establishment
          </span>
        </div>
      </div>

      {/* राइट साइड: ओला स्टाइल गोल हैमबर्गर बटन */}
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-all shadow-xs focus:outline-none"
        >
          {isOpen ? <span className="text-sm font-bold">✕</span> : <span className="text-lg font-bold">☰</span>}
        </button>

        {/* 📋 ड्रॉपडाउन मेनू */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <a 
              href="#vehicles" 
              onClick={() => setIsOpen(false)}
              className="block px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 hover:text-black transition"
            >
              Our Scooters
            </a>
            <a 
              href="#showroom" 
              onClick={() => setIsOpen(false)}
              className="block px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 hover:text-black transition"
            >
              Our Showroom
            </a>
            
            <div className="border-t border-slate-100 my-1"></div>

            {/* 🚀 असली जादुई लिंक: बिना किसी स्टेट के, सीधे ब्राउज़र में नया टैब (target="_blank") खोलेगा */}
            <a 
              href="/?mode=admin" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setIsOpen(false)}
              className="block px-5 py-3 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 hover:bg-red-100 transition"
            >
              Admin Panel 🔒
            </a>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;