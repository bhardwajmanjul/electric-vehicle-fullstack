import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config'; 

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const performanceRef = useRef(null);
  const designRef = useRef(null);
  const techRef = useRef(null);

  useEffect(() => {
    if (!id || id === 'undefined') {
      console.error("Invalid Vehicle ID!!");
      setLoading(false);
      return;
    }

    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}`);
        if (!response.ok) throw new Error("Vehicle Not Found in Database");
        
        const data = await response.json();
        console.log("Vehicle Data Loaded Successfully", data);
        
        setVehicle(data);
        setLoading(false); 
      } catch (err) {
        console.error("Failed to Fetch Vehicle Data:", err);
        setLoading(false);
      }
    };
    
    fetchVehicleDetails();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 1️⃣ लोडिंग स्क्रीन
  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-slate-400 bg-[#02040a] min-h-screen flex items-center justify-center">
        Loading Studio...
      </div>
    );
  }
  
  // 2️⃣ एरर स्क्रीन
  if (!vehicle) {
    return (
      <div className="text-center py-20 font-bold text-rose-400 bg-[#02040a] min-h-screen flex items-center justify-center">
        No Vehicle Found Friend....!
      </div>
    );
  }

  // 3️⃣ मुख्य रेंडर (पूरी स्क्रीन पर लेफ्ट-टू-राइट एनीमेशन के साथ गाड़ी की फोटो)
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      {/* 🚗 फुल स्क्रीन पैनोरमिक हीरो सेक्शन (बिना किसी बॉक्स के) */}
      <section className="w-full h-screen relative flex flex-col justify-between overflow-hidden">
        {/* बैकग्राउंड नियॉन और ग्रेडिएंट्स */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#060b19]/40 to-[#02040a] z-10 pointer-events-none"></div>
        <div className="absolute top-[20%] left-[10%] w-[700px] h-[700px] bg-amber-600/10 blur-[180px] rounded-full pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[5%] right-[5%] w-[600px] h-[600px] bg-blue-900/15 blur-[220px] rounded-full pointer-events-none"></div>

        <header className="w-full p-6 max-w-7xl mx-auto flex justify-between items-center z-30 relative">
          <button onClick={() => navigate(-1)} className="text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white bg-black/40 backdrop-blur-md border border-slate-800 px-5 py-3 rounded-xl transition-all shadow-2xl">
            ← Back to Showroom
          </button>
          <span className="text-xs font-black text-amber-400 bg-amber-950/20 backdrop-blur-md border border-amber-500/30 px-5 py-3 rounded-full uppercase tracking-wider shadow-lg">
            {vehicle.name} Premium Edition
          </span>
        </header>

        {/* 🌌 फुल विड्थ इमेज कंटेनर - लेफ्ट टू राइट पैन */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 overflow-hidden">
          {/* विशाल बैकग्राउंड टेक्स्ट */}
          <h1 className="absolute text-[18vw] font-black uppercase tracking-tighter text-slate-800/10 select-none pointer-events-none text-center leading-none z-0">
            {vehicle.name}
          </h1>

          {/* पूरी स्क्रीन पर फैली हुई बिना बॉक्स वाली गाड़ी */}
          <div className="w-full h-full flex items-center justify-center px-4 relative z-10">
            <img 
              src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39'} 
              alt={vehicle.name}
              className="w-auto h-full max-h-[65vh] md:max-h-[72vh] object-contain drop-shadow-[0_35px_60px_rgba(245,158,11,0.2)] transform transition-transform duration-700 hover:scale-105"
              style={{
                animation: 'panImageLeftRight 12s ease-in-out infinite alternate',
                willChange: 'transform'
              }}
            />
          </div>

          {/* नीचे ग्राउंड रिफ्लेक्शन शैडो */}
          <div className="absolute bottom-[12%] w-[85vw] h-[40px] bg-gradient-to-r from-transparent via-slate-950/90 to-transparent blur-xl rounded-[50%] z-0"></div>
        </div>

        {/* CSS की मदद से लेफ्ट से राइट स्मूथ पैनिंग */}
        <style>{`
          @keyframes panImageLeftRight {
            0% { transform: translateX(-25px); }
            100% { transform: translateX(25px); }
          }
        `}</style>

        <div className="w-full flex flex-col items-center justify-center z-30 pb-6 relative">
          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-2">Explore Specifications</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent animate-bounce"></div>
        </div>
      </section>

      {/* 📌 स्टिकी नेविगेशन बार */}
      <div className="sticky top-0 bg-[#02040a]/90 backdrop-blur-xl border-y border-slate-900 py-4 z-40 shadow-2xl">
        <div className="max-w-xl mx-auto flex justify-center gap-4 px-4">
          <button onClick={() => scrollToSection(performanceRef)} className="flex-1 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:border-cyan-500/50 transition-all text-cyan-400">
            ⚡ Performance
          </button>
          <button onClick={() => scrollToSection(designRef)} className="flex-1 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:border-emerald-500/50 transition-all text-emerald-400">
            🎨 Design
          </button>
          <button onClick={() => scrollToSection(techRef)} className="flex-1 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:border-amber-500/50 transition-all text-amber-500">
            🛠️ Technology
          </button>
        </div>
      </div>

      {/* 📊 स्पेसिफिकेशन्स डिटेल्स */}
      <main className="max-w-6xl mx-auto px-6 py-24 space-y-32 relative z-20">
        <section ref={performanceRef} className="scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-cyan-400 tracking-wide mb-8 border-b border-slate-900 pb-4">⚡ Performance Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Battery Type</p>
              <p className="text-xl font-black mt-2 text-white">{vehicle.batteryType || 'Li-ion Smart'}</p>
            </div>
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Top Speed</p>
              <p className="text-xl font-black mt-2 text-white">{vehicle.topSpeed ? `${vehicle.topSpeed} km/h` : '90 km/h'}</p>
            </div>
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">True Range</p>
              <p className="text-xl font-black mt-2 text-white">
                {vehicle.rangePerCharge || vehicle.maxRange ? `${vehicle.rangePerCharge || vehicle.maxRange} km` : '120 km'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Acceleration</p>
              <p className="text-xl font-black mt-2 text-white">0-40 in 2.9s</p>
            </div>
          </div>
        </section>

        <section ref={designRef} className="scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-emerald-400 tracking-wide mb-8 border-b border-slate-900 pb-4">🎨 Premium Aesthetics & Design</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Seat Design</p>
              <p className="text-lg font-black mt-2 text-white">Ergonomic Anti-Slip</p>
            </div>
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Body Profile</p>
              <p className="text-lg font-black mt-2 text-white">Colored Panels</p>
            </div>
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Side Mirrors</p>
              <p className="text-lg font-black mt-2 text-white">Aero Dynamic</p>
            </div>
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Grab Handle</p>
              <p className="text-lg font-black mt-2 text-white">Aluminium Rail</p>
            </div>
          </div>
        </section>

        <section ref={techRef} className="scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-amber-500 tracking-wide mb-8 border-b border-slate-900 pb-4">🛠️ Futuristic Technology</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Braking System</p>
              <p className="text-lg font-black mt-2 text-white">Dual ABS Control</p>
            </div>
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Safety Integration</p>
              <p className="text-lg font-black mt-2 text-white">Brake By Wire Tech</p>
            </div>
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Dashboard Screen</p>
              <p className="text-lg font-black mt-2 text-white">7-inch Smart Touch</p>
            </div>
          </div>
        </section>
      </main>

      {/* 🧾 पॉपअप इन्क्वायरी फॉर्म */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="bg-[#050b18] border border-slate-800 p-8 rounded-[28px] max-w-md w-full relative shadow-2xl shadow-cyan-500/5">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white text-lg font-bold">✕</button>
            <div className="text-center mb-6">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full uppercase">Interested?</span>
              <h3 className="text-xl font-black mt-3 text-white">Are you interested in getting an Electric Product?</h3>
              <p className="text-slate-400 text-xs mt-1">Our Experts will contact you soon..</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); alert("Inquiry Submitted!"); }} className="space-y-4">
              <input type="text" placeholder="Your Full Name" className="w-full bg-[#02040a] border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" required />
              <input type="tel" placeholder="Mobile Number" className="w-full bg-[#02040a] border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" required />
              <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-xs font-black uppercase tracking-widest py-3.5 rounded-xl shadow-lg shadow-cyan-600/20">Submit Inquiry</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default VehicleDetails;