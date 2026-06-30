import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-400 py-16 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
        
        {/* कॉलम 1: ब्रांड और छोटा सा परिचय */}
        <div className="col-span-2">
          <span className="text-xl font-black text-white tracking-tighter">Chandra Gaya Automobile</span>
          <p className="text-xs mt-3 text-slate-500 max-w-sm leading-relaxed">
            ​"Your trusted authorized EV showroom in Iglas, Aligarh. Premium vehicles, unmatched trust."
          </p>
        </div>

        {/* कॉलम 2: गाड़ियां */}
        <div>
          <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Scooters</h5>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white cursor-pointer transition">Kinetic Green</li>
            <li className="hover:text-white cursor-pointer transition">Hero Electric X</li>
            <li className="hover:text-white cursor-pointer transition">Roastara</li>
          </ul>
        </div>

        {/* कॉलम 3: जानकारी */}
        <div>
          <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-4">About</h5>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white cursor-pointer transition">Our Story</li>
            <li className="hover:text-white cursor-pointer transition">Showroom Info</li>
            <li className="hover:text-white cursor-pointer transition">Contact Us</li>
          </ul>
        </div>

        {/* कॉलम 4: पता (Address) */}
        <div>
          <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Contact Info</h5>
          <p className="text-xs leading-relaxed text-slate-400"> 
            Gonda Road,Iglas,<br />
                 Aligarh
          </p>
        </div>

        {/* कॉलम 5: सोशल मीडिया बटन (बिना LinkedIn के और बिना किसी href एरर के) */}
        <div className="flex flex-col items-start md:items-end col-span-2 md:col-span-1">
          <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Follow Us</h5>
          
          {/* ⚡ बटन लॉजिक: इससे कोई भी कंपाइलर एरर या वॉर्निंग नहीं आएगी भाई */}
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => window.open('https://instagram.com', '_blank')} 
              className="text-white/70 hover:text-white text-lg transition focus:outline-none bg-transparent border-none cursor-pointer"
              title="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </button>
            
            <button 
              onClick={() => window.open('https://facebook.com', '_blank')} 
              className="text-white/70 hover:text-white text-lg transition focus:outline-none bg-transparent border-none cursor-pointer"
              title="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </button>
            
            <button 
              onClick={() => window.open('https://youtube.com', '_blank')} 
              className="text-white/70 hover:text-white text-lg transition focus:outline-none bg-transparent border-none cursor-pointer"
              title="YouTube"
            >
              <i className="fab fa-youtube"></i>
            </button>
            
            <button 
              onClick={() => window.open('https://twitter.com', '_blank')} 
              className="text-white/70 hover:text-white text-lg transition focus:outline-none bg-transparent border-none cursor-pointer"
              title="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </button>
          </div>

          {/* कांटेक्ट नंबर */}
          <div className="text-left md:text-right">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Support Call</span>
            <a href="tel:+917409784858" className="text-white font-black text-sm tracking-wide hover:text-blue-400 transition">
              📞 +91 7409784858
            </a>
          </div>
        </div>

      </div>

      {/* फूटर का सबसे निचला हिस्सा */}
      <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between text-[11px] text-slate-500 max-w-7xl mx-auto">
        <p>© 2026 Obia Tech. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;