import React, { useState } from 'react';

// 🌐 लाइव डिप्लॉयमेंट के समय बस यहाँ अपना लाइव यूआरएल डाल देना भाई
const API_BASE_URL = 'https://cg-java-backend.onrender.com'; 

const AdminPanel = () => {
  const [vehicleData, setVehicleData] = useState({
    name: '',
    type: 'SCOOTER',
    price: '',
    maxRange: '',          
    rangePerCharge: '',    
    batteryCapacity: '',   
    batteryType: 'Lithium-ion', 
    topSpeed: '',
    imageUrl: '/images/A1.png',
    available: true
  });

  const [adminPin, setAdminPin] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicleData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', isError: false });

    if (adminPin !== '9999') { 
      setMessage({ text: 'Wrong Secret Pin!!⛔', isError: true });
      setLoading(false);
      return;
    }

    try {
      // ⚡ यहाँ अब डायनेमिक API_BASE_URL का उपयोग हो रहा है
      const response = await fetch(`${API_BASE_URL}/api/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...vehicleData, price: parseInt(vehicleData.price) }),
      });

      if (response.ok) {
        setMessage({ text: 'Congratulations Mridul! New Electric Vehicle is Successfully added to Database🎉', isError: false });
        setVehicleData({ 
          name: '', type: 'SCOOTER', price: '', maxRange: '', 
          rangePerCharge: '', batteryCapacity: '', batteryType: 'Lithium-ion',
          topSpeed: '', imageUrl: '/images/A1.png', available: true 
        });
        setAdminPin('');
      } else {
        throw new Error('Server Error Friend!');
      }
    } catch (error) {
      setMessage({ text: `Connection Error : ${error.message}`, isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans flex flex-col justify-between relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full"></div>
      </div>

      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/60 py-5 px-8 flex justify-between items-center shadow-lg relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
          <h1 className="text-lg font-black tracking-wider text-white">
            MANJUL ELECTRICS <span className="font-light text-slate-500">| CONTROL CENTER</span>
          </h1>
        </div>
        <span className="text-xs font-black bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-xl shadow-md shadow-blue-600/20">
          OWNER MODE
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4 relative z-10">
        <div className="w-full max-w-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-[32px] shadow-2xl p-8 md:p-10 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"></div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">Add New Vehicle to Database</h2>
            <p className="text-slate-400 text-xs mt-1">फॉर्म भरते ही गाड़ी सीधे लाइव डेटाबेस और शोरूम की वेबसाइट पर दिखने लगेगी भाई।</p>
          </div>

          {message.text && (
            <div className={`p-4 mb-6 rounded-2xl text-xs font-bold text-center border animate-in fade-in zoom-in-95 ${message.isError ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
              <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 text-center">Enter Secret PIN *</label>
              <input 
                type="password" 
                name="adminPin"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 font-mono tracking-widest text-center text-xl transition-all"
                required 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vehicle Name *</label>
              <input type="text" name="name" value={vehicleData.name} onChange={handleChange} placeholder="Ola S1 Pro Gen 2" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:bg-slate-900/40 transition-all" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vehicle Type *</label>
              <select name="type" value={vehicleData.type} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all appearance-none">
                <option value="SCOOTER" className="bg-slate-900">Electric Scooty</option>
                <option value="BIKE" className="bg-slate-900">Electric Bike</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (₹) *</label>
              <input type="number" name="price" value={vehicleData.price} onChange={handleChange} placeholder="149999" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Certified Range *</label>
              <input type="text" name="maxRange" value={vehicleData.maxRange} onChange={handleChange} placeholder="195 km" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest ml-1">True Range Per Charge *</label>
              <input type="text" name="rangePerCharge" value={vehicleData.rangePerCharge} onChange={handleChange} placeholder="उदा. 150 km (Eco Mode)" className="w-full bg-slate-950 border border-cyan-900/50 rounded-xl p-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-all" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest ml-1">Battery Capacity *</label>
              <input type="text" name="batteryCapacity" value={vehicleData.batteryCapacity} onChange={handleChange} placeholder="उदा. 4.0 kWh" className="w-full bg-slate-950 border border-cyan-900/50 rounded-xl p-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-all" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest ml-1">Battery Type *</label>
              <select name="batteryType" value={vehicleData.batteryType} onChange={handleChange} className="w-full bg-slate-950 border border-cyan-900/50 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all">
                <option value="Lithium-ion" className="bg-slate-900">Lithium-ion (NMC)</option>
                <option value="LFP" className="bg-slate-900">LFP (Lithium Ferrophosphate)</option>
                <option value="Graphene" className="bg-slate-900">Graphene / Lead-Acid</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Top Speed *</label>
              <input type="text" name="topSpeed" value={vehicleData.topSpeed} onChange={handleChange} placeholder="120 km/h" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" required />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image Path *</label>
              <input type="text" name="imageUrl" value={vehicleData.imageUrl} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-mono text-xs text-blue-400" required />
            </div>

            <div className="md:col-span-2 flex items-center gap-2 py-1 ml-1">
              <input type="checkbox" name="available" id="available" checked={vehicleData.available} onChange={handleChange} className="w-4 h-4 accent-blue-500 rounded bg-slate-950 border-slate-800" />
              <label htmlFor="available" className="text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer select-none hover:text-white transition-colors">Available for Booking</label>
            </div>

            <div className="md:col-span-2 mt-2">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-black py-4 rounded-xl tracking-widest uppercase transition-all shadow-lg shadow-blue-600/10 active:scale-[0.99] disabled:bg-slate-800 disabled:text-slate-600"
              >
                {loading ? 'Connecting To Database...' : '🚀 Push Live to Website'}
              </button>
            </div>

          </form>
        </div>
      </main>

      <footer className="py-5 text-center text-slate-600 text-xs border-t border-slate-900 bg-slate-950/60 backdrop-blur-md">
        🔒 Secured Control Center for Manjul Electrics Authorized Members Only.
      </footer>
    </div>
  );
};

export default AdminPanel;