import React from 'react';

const ShowroomInfo = () => {
  return (
    <section id="showroom" className="bg-white py-16 px-6 md:px-12 overflow-hidden">
      
      {/* 💡 हमने ग्रिड का बैलेंस बदला है: टेक्स्ट को 4 हिस्से और इमेज को पूरे 8 हिस्से दिए हैं ताकि डिज़ाइन बहुत विशाल दिखे */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        
        {/* लेफ्ट साइड: शोरूम की डिटेल्स (md:col-span-4 में एकदम परफेक्ट सेट) */}
        <div className="order-2 md:order-1 md:col-span-4 flex flex-col justify-center">
          <div className="items-start">
            <span className="text-green-600 font-bold tracking-widest text-[10px] uppercase bg-green-50 px-3 py-1 rounded-full border border-green-100 inline-block">
              Visit Us in Iglas
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-Green text-slate-1100 mt-5 leading-tight">
            Chandra Gaya Automobile: <br />
            <span className="text-slate-500 font-light">The Future of E-Mobility.</span>
          </h2>
          
          <p className="text-slate-600 mt-6 text-sm md:text-base leading-relaxed">
            Visit our showroom in Iglas (Aligarh) to experience the electric revolution firsthand; we offer a premium retail experience, genuine dealership services, 
            and top-notch electrical solutions.</p>
          
          <div className="mt-8 flex gap-6 items-center">
            <div className="text-center border-r border-slate-200 pr-6">
              <p className="text-2xl font-black text-slate-900">500+</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900">100%</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Genuine Spares</p>
            </div>
          </div>
        </div>

        {/* राइट साइड: शोरूम का चित्र (अब यह 12 में से पूरे 8 हिस्से में फैलेगा - महा-विशाल लुक) */}
        <div className="order-1 md:order-2 md:col-span-8 w-full flex justify-center items-center relative">
          
          {/* 🪄 जादुई मास्क कंटेनर: किनारों को हल्का सा स्मूथ शेड देगा और पूरी फोटो को स्क्रीन पर उभार देगा */}
          <div 
            className="w-full relative"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent), linear-gradient(to bottom, transparent, black 4%, black 96%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent), linear-gradient(to bottom, transparent, black 4%, black 96%, transparent)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
          >
            <img 
              src="/images/showroom.jpg" 
              alt="Chandra Gaya Automobile Showroom Iglas" 
              // ⚡ max-h-none कर दिया है ताकि लैपटॉप स्क्रीन पर इसकी ऊंचाई पर कोई रोक न लगे, और scale-110 से यह बेहद शानदार और बड़ा दिखेगा!
              className="w-full h-auto max-h-none md:max-h-[650px] object-cover scale-110 transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=1200"; 
              }}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default ShowroomInfo;