import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config'; 

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  const performanceRef = useRef(null);
  const designRef = useRef(null);
  const techRef = useRef(null);

  useEffect(() => {
    if (!id || id === 'undefined') {
      console.error("गाड़ी की ID सही नहीं मिली भाई!");
      setLoading(false);
      return;
    }

    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}`);
        if (!response.ok) throw new Error("डेटाबेस में यह गाड़ी नहीं मिली");
        
        const data = await response.json();
        console.log("गाड़ी का डेटा सफलतापूर्वक आ गया:", data);
        
        // 🚨 जादुई सुधार: पहले डेटा सेट करेंगे, लोडिंग को इसके बाद ही बंद करेंगे
        setVehicle(data);
        setLoading(false); 
      } catch (err) {
        console.error("गाड़ी का डेटा लाने में दिक्कत आई भाई:", err);
        setLoading(false); // एरर आने पर भी लोडिंग बंद करेंगे ताकि स्क्रीन न अटके
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

  useEffect(() => {
    let interval;
    if (isRotating) {
      interval = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.3) % 360);
      }, 25);
    }
    return () => clearInterval(interval);
  }, [isRotating]);

  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 1️⃣ सबसे पहले चेक होगा कि क्या डेटा अभी भी लोड हो रहा है
  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-slate-400 bg-[#02040a] min-h-screen flex items-center justify-center">
        Loading Studio
      </div>
    );
  }
  
  // 2️⃣ अगर लोडिंग खत्म हो चुकी है और सचमुच डेटाबेस से कोई गाड़ी नहीं मिली (vehicle null है), तभी यह एरर दिखेगी
  if (!vehicle) {
    return (
      <div className="text-center py-20 font-bold text-rose-400 bg-[#02040a] min-h-screen flex items-center justify-center">
        No Vehicle Found Friend....!
      </div>
    );
  }

  // 3️⃣ अगर लोडिंग भी खत्म हो गई और गाड़ी का डेटा भी मिल गया, तो सीधा असली 3D स्टूडियो रेंडर होगा
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      <section className="w-full h-screen relative flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#060b19]/60 to-[#02040a] z-10 pointer-events-none"></div>
        <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] bg-amber-600/10 blur-[180px] rounded-full pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-900/20 blur-[200px] rounded-full pointer-events-none"></div>

        <header className="w-full p-6 max-w-7xl mx-auto flex justify-between items-center z-30 relative">
          <button onClick={() => navigate(-1)} className="text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white bg-black/40 backdrop-blur-md border border-slate-800 px-5 py-3 rounded-xl transition-all shadow-2xl">
            ← Back to Showroom
          </button>
          <span className="text-xs font-black text-amber-400 bg-amber-950/20 backdrop-blur-md border border-amber-500/30 px-5 py-3 rounded-full uppercase tracking-wider shadow-lg">
            {vehicle.name} Premium Edition
          </span>
        </header>

        <div 
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center cursor-grab active:cursor-grabbing group z-20"
          onMouseEnter={() => setIsRotating(false)} 
          onMouseLeave={() => setIsRotating(true)}  
        >
          <h1 className="absolute text-[15vw] font-black uppercase tracking-tighter text-slate-800/10 select-none pointer-events-none text-center leading-none z-0">
            {vehicle.name}
          </h1>

          <div className="w-full h-full max-h-[70vh] flex items-center justify-center relative z-10">
            <img 
              src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39'} 
              alt={vehicle.name}
              style={{ transform: `rotateY(${rotationAngle}deg)` }}
              className="w-auto h-full max-h-[60vh] md:max-h-[68vh] object-contain transition-transform duration-100 drop-shadow-[0_35px_60px_rgba(245,158,11,0.25)]"
            />
          </div>

          <div 
            className="w-[80vw] max-w-[1200px] h-[50px] border-b border-slate-700/30 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent rounded-[50%] -mt-16 shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex items-center justify-center backdrop-blur-[2px] z-0"
            style={{ transform: `rotateX(72deg)` }}
          >
            <div 
              style={{ transform: `rotate(${rotationAngle}deg)` }}
              className="w-full h-full rounded-[50%] border border-dashed border-slate-500/30"
            ></div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center z-30 pb-6 relative">
          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-2">Explore Specifications</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent animate-bounce"></div>
        </div>
      </section>

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