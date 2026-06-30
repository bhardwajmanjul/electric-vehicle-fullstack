import React, { useState, useEffect } from 'react';

const ServiceCenter = () => {
  const allParts = [
  // 🟢 ग्रुप 1 (1 से 12) - Neon Cyan & Emerald Theme
  { id: 1, name: "Brake Pad", icon: "fa-brake-warning", image: "/images/parts/brakepad.png", color: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" },
  { id: 2, name: "Front Disc", icon: "fa-compact-disc", image: "/images/parts/disc.png", color: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" },
  { id: 3, name: "Chain Set", icon: "fa-link", image: "/images/parts/chain.png", color: "text-cyan-400" },
  { id: 4, name: "Handle Grip", icon: "fa-mound", image: "/images/parts/grip.png", color: "text-emerald-400" },
  { id: 5, name: "LED Headlight", icon: "fa-lightbulb", image: "/images/parts/headlight.png", color: "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" }, // हेडलाइट को चमकीला पीला दिया है
  { id: 6, name: "Li-ion Battery", icon: "fa-battery-full", image: "/images/parts/battery.png", color: "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]" }, // बैटरी को फुल चार्ज ग्रीन लुक
  { id: 7, name: "Shock Oil", icon: "fa-oil-can", image: "/images/parts/oil.png", color: "text-cyan-400" },
  { id: 8, name: "Spark Plug", icon: "fa-bolt", image: "/images/parts/plug.png", color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" },
  { id: 9, name: "Air Filter", icon: "fa-wind", image: "/images/parts/filter.png", color: "text-cyan-400" },
  { id: 10, name: "Speedometer", icon: "fa-gauge", image: "/images/parts/meter.png", color: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" },
  { id: 11, name: "Side Stand", icon: "fa-ellipsis-vertical", image: "/images/parts/stand.png", color: "text-slate-400" },
  { id: 12, name: "Brake Lever", icon: "fa-sliders", image: "/images/parts/lever.png", color: "text-cyan-400" },
  
  // 🟢 ग्रुप 2 (13 से 24)
  { id: 13, name: "Side Mirror", icon: "fa-glasses", image: "/images/parts/mirror.png", color: "text-emerald-400" },
  { id: 14, name: "Horn", icon: "fa-volume-high", image: "/images/parts/Horn.png", color: "text-cyan-400" },
  { id: 15, name: "Alloy Wheel", icon: "fa-circle-dot", image: "/images/parts/wheel.png", color: "text-emerald-400" },
  { id: 16, name: "Tail Light", icon: "fa-eye", image: "/images/parts/taillight.png", color: "text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" }, // टेल लाइट को डेंजर रेड लुक
  { id: 17, name: "Ignition Key", icon: "fa-key", image: "/images/parts/key.png", color: "text-amber-400" },
  { id: 18, name: "Leg Guard", icon: "fa-shield-halved", image: "/images/parts/guard.png", color: "text-cyan-400" },
  { id: 19, name: "Wiring Harness", icon: "fa-lines-leaning", image: "/images/parts/wiring.png", color: "text-emerald-400" },
  { id: 20, name: "Rear Shock Absorber", icon: "fa-bezier-curve", image: "/images/parts/shock.png", color: "text-cyan-400" },
  { id: 21, name: "Wheel Lock", icon: "fa-lock", image: "/images/parts/lock.png", color: "text-rose-400" },
  { id: 22, name: "Number Plate", icon: "fa-credit-card", image: "/images/parts/plate.png", color: "text-slate-300" },
  { id: 23, name: "Accelerator Throttle", icon: "fa-gauge-high", image: "/images/parts/throttle.png", color: "text-emerald-400" },
  { id: 24, name: "Seat Cover", icon: "fa-couch", image: "/images/parts/seat.png", color: "text-cyan-400" },
  
  // 🟢 ग्रुप 3 (25 से 30)
  { id: 25, name: "Throttle Sensor", icon: "fa-microchip", image: "/images/parts/sensor.png", color: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" },
  { id: 26, name: "EV Controller", icon: "fa-box-gear", image: "/images/parts/controller.png", color: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" },
  { id: 27, name: "Rubber Bush", icon: "fa-ring", image: "/images/parts/bush.png", color: "text-slate-400" },
  { id: 28, name: "Footrest", icon: "fa-shoe-prints", image: "/images/parts/footrest.png", color: "text-cyan-400" },
  { id: 29, name: "DC-DC Converter", icon: "fa-bolt-lightning", image: "/images/parts/converter.png", color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" },
  { id: 30, name: "Main Stand", icon: "fa-anchor", image: "/images/parts/mainstand.png", color: "text-slate-400" }
];

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(allParts.length / itemsPerPage);

  // ⏱️ ऑटो-स्लाइडर: हर 5 सेकंड में 12 पार्ट्स का अगला ग्रुप आएगा
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  // फॉर्म के लिए स्टेट्स
  const [formData, setFormData] = useState({ name: '', phone: '', model: '', date: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Record Saved in Backend Database:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', model: '', date: '' });
    }, 4000);
  };

  const currentParts = allParts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <section className="w-full bg-slate-900 py-20 px-4 md:px-12 flex justify-center items-center relative overflow-hidden">
      
      {/* 🔮 बैकग्राउंड में प्रीमियम लुक के लिए नियॉन बबल्स */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* 🛠️ LEFT SIDE: पार्ट्स गैलरी (कलरफुल बैकग्राउंड + 3D ग्लोइंग इफेक्ट) */}
        <div className="w-full flex flex-col justify-between h-full min-h-[500px]">
          <div>
            <span className="text-blue-500 text-xs font-black uppercase tracking-widest block mb-2">100% Genuine Inventory</span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
              Our Spare Parts Lineup
            </h2>
            <p className="text-xs text-slate-400 mb-8"></p>
          </div>

          {/* 6 ऊपर, 6 नीचे का शानदार स्क्विरकल (Rounded Square) ग्रिड */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 min-h-[300px]">
            {currentParts.map((part) => (
              <div
                key={part.id}
                // 🎨 'bg-slate-800/40 backdrop-blur' से कलरफुल ग्लास-लुक दिया है
                // 🪄 'hover:brightness-125 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]' से इमेज एकदम चमक उठेगी!
                className="flex flex-col items-center justify-between p-4 bg-slate-800/40 backdrop-blur-md rounded-[28px] w-full aspect-square border border-slate-700/50 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] hover:border-blue-500 cursor-pointer group"
              >
                {/* 💥 आइकॉन/इमेज एरिया: यहाँ इमेज हैंडलर भी लगा दिया है, जब इमेज डालोगे तो वही चमकेगी */}
                <div className="text-3xl md:text-4xl text-blue-400 my-auto group-hover:scale-110 group-hover:text-blue-300 filter group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-300">
                  {/* स्मार्ट चेकर: अगर आप इमेज पाथ पर असली फोटो रख दोगे तो वो दिखेगी, वरना डिफ़ॉल्ट आइकॉन चमकेगा */}
                  <img 
                    src={part.image} 
                    alt={part.name}
                    className="w-12 h-12 object-contain hidden group-has-[img]:block" 
                    onError={(e) => { e.target.style.display = 'none'; }} // अगर इमेज न मिले तो छुपा दो
                  />
                  <i className={`fas ${part.icon} block group-hover:animate-pulse`}></i>
                </div>
                
                {/* पार्ट का नाम */}
                <span className="text-[11px] md:text-xs font-bold text-slate-300 tracking-wide block w-full mt-auto group-hover:text-white transition-colors">
                  {part.name}
                </span>
              </div>
            ))}
          </div>

          {/* डॉट्स इंडिकेटर */}
          <div className="flex gap-2 mt-8 justify-center lg:justify-start">
            {[...Array(totalPages)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700'}`}
              />
            ))}
          </div>
        </div>

        {/* 📝 RIGHT SIDE: बुकिंग फॉर्म कार्ड */}
        <div className="w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-slate-700/60 shadow-2xl relative overflow-hidden">
            {submitted ? (
              <div className="text-center py-16 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-5xl mb-4 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">⚡</div>
                <h3 className="text-lg font-black text-white">Booking Slot Confirmed</h3>
                <p className="text-xs text-slate-400 mt-2"> Data Successfully Send to Backend Database</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Book Service Slot</h3>
                  <p className="text-xs text-slate-400">Book Your Slot with in 10 Second</p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Customer Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Example-Aaditya Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-slate-700 bg-slate-900/50 text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    placeholder="Enter Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-slate-700 bg-slate-900/50 text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Vehicle Model</label>
                  <select
                    name="model"
                    required
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-slate-700 bg-slate-900/50 text-base text-white focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all"
                  >
                    <option value="" disabled className="bg-slate-800 text-slate-400">Select</option>
                    <option value="Ola S1 Pro" className="bg-slate-800 text-white">Delight Neo</option>
                    <option value="Ola S1 X" className="bg-slate-800 text-white">Delight Zing</option>
                    <option value="Roadster X" className="bg-slate-800 text-white">Delight Sniper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-slate-700 bg-slate-900/50 text-base text-white focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:bg-blue-500 active:scale-[0.98] transition-all mt-4 shadow-blue-600/20"
                >
                  Confirm Booking 🛠️
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServiceCenter;