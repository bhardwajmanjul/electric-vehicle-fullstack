import React from 'react';

const CustomerReviews = () => {
  const reviews = [
    { id: 1, name: "Rahul Kumar (Iglas)", comment: "Since getting a vehicle from Chandra Gaya Automobile, my petrol expenses have dropped to zero. The service is excellent!", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" },
    { id: 2, name: "Sanjay Singh (Aligarh)", comment: "The battery range is amazing. I can easily work for two full days on a single charge.।", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
    { id: 3, name: "Vikas Upadhyay", comment: "The owner's behavior and the quality of the vehicles at Iglas are the best. A 100% trustworthy showroom.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" },
  ];

  // मारकी इफ़ेक्ट को दोबारा दोहराने के लिए ताकि अनंत (Infinite) स्क्रॉल दिखे
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section className="bg-slate-50 py-16 overflow-hidden border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Our Valuable Customers</h2>
        <div className="h-1 w-16 bg-blue-600 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* 🪄 ऑटो-स्क्रॉलिंग कंटेनर (CSS स्टाइल के साथ जो माउस ले जाने पर रुक जाएगा) */}
      <div className="w-full overflow-hidden relative group">
        <div className="flex gap-8 w-max animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused] px-4">
          {doubleReviews.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm w-[360px] flex flex-col items-center text-center"
            >
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-600 mb-4 shadow-md"
              />
              <p className="text-slate-600 italic text-sm mb-4 leading-relaxed">"{item.comment}"</p>
              <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider">{item.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* 🛠️ टेलविंड में मारकी एनिमेशन जोड़ने के लिए छोटा सा स्टाइल टैग */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default CustomerReviews;