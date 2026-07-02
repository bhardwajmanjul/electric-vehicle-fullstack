import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 🌐 Dynamic API URL configuration based on environment
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080' 
  : 'https://my-electric-web-back.onrender.com';

const VehicleGrid = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // ⚡ Fetching live data from backend database
        const response = await fetch(`${API_BASE_URL}/api/vehicles`);
        if (!response.ok) throw new Error("Backend error");
        const data = await response.json();
        
        console.log("Vehicle data successfully synchronized:", data);
        setVehicles(data);
        setLoading(false);
      } catch (err) {
        console.error("Connection failed, loading fallback data...", err);
        // Backup fallback data if backend is offline or empty
        setVehicles([
          { id: 1, name: "Chandra Gaya Pro", price: 85000, rangePerCharge: 120, topSpeed: 85, imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=500" },
          { id: 2, name: "Manjul Speedster", price: 115000, rangePerCharge: 150, topSpeed: 95, imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=500" }
        ]);
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // 🔄 Professional loading state
  if (loading) {
    return (
      <div className="text-center py-20 font-black text-slate-400 tracking-widest uppercase bg-slate-950 min-h-[50vh] flex items-center justify-center animate-pulse">
        Initializing Showroom...
      </div>
    );
  }

  return (
    <section id="vehicles" className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* 🏆 Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">
            The Elite <span className="text-blue-600">Collection</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 🚗 Vehicles Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {vehicles.map((vehicle, index) => {
            const currentId = vehicle.id || (index + 1);

            return (
              <div 
                key={currentId} 
                className="relative group transition-all duration-500 hover:-translate-y-2"
                style={{
                  filter: 'drop-shadow(0 20px 30px rgba(37, 99, 235, 0.15))'
                }}
              >
                <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 flex flex-col h-full">
                  
                  {/* 🎨 Image Display Canvas */}
                  <div 
                    className="relative h-64 flex justify-center items-center pt-8 overflow-hidden"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)'
                    }}
                  >
                    <img 
                      src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39'} 
                      alt={vehicle.name} 
                      className="h-48 w-auto object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* 📝 Product Specification Details */}
                  <div className="p-8 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                        {vehicle.name}
                      </h3>
                      <p className="text-blue-600 font-bold text-lg mb-6">
                        ₹{vehicle.price ? vehicle.price.toLocaleString('en-IN') : '0'}
                      </p>

                      {/* 📊 Matrix Badges */}
                      <div className="flex justify-center gap-8 mb-8 border-t border-slate-50 pt-6">
                        <div className="text-center">
                          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Range</span>
                          <span className="text-slate-800 font-black text-base">
                            {vehicle.rangePerCharge ? `${vehicle.rangePerCharge} km` : 'N/A'}
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Speed</span>
                          <span className="text-slate-800 font-black text-base">
                            {vehicle.topSpeed ? `${vehicle.topSpeed} km/h` : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 🚀 Premium Explore Navigation Trigger */}
                    <button 
                      onClick={() => {
                        console.log("Navigating to showcase setup for vehicle ID:", currentId);
                        navigate(`/vehicle/${currentId}`);
                      }} 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VehicleGrid;