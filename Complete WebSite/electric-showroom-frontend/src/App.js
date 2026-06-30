import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 👈 राउटर सेटअप
import Navbar from './components/Navbar';
import StylishHero from './components/StylishHero'; 
import ShowroomInfo from './components/ShowroomInfo';
import VehicleGrid from './components/VehicleGrid'; 
import ServiceCenter from './components/ServiceCenter'; 
import CustomerReviews from './components/CustomerReviews'; 
import Footer from './components/Footer'; 
import AdminPanel from './components/AdminPanel';
import VehicleDetails from './components/VehicleDetails';

// 🏠 मुख्य होम पेज कंपोनेंट (इसमें आपकी पुरानी गाड़ियां और पूरा शोरूम है)
const Home = () => {
  return (
    <div className="bg-white min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. सबसे ऊपर का नेविगेशन बार */}
      <Navbar />
      
      {/* 2. मुख्य हीरो सेक्शन - जहाँ 4 गाड़ियां आगे बढ़ेंगी */}
      <StylishHero />
      
      {/* 3. शोरूम की मुख्य जानकारी (इग्लास, अलीगढ़) */}
      <ShowroomInfo />
      
      {/* 4. गाड़ियों का पूरा ग्रिड (यहाँ दिखेंगी आपकी पुरानी गाड़ियां भाई) */}
      <VehicleGrid /> 
      
      {/* 5. सर्विस सेंटर स्लॉट बुकिंग फॉर्म */}
      <ServiceCenter />
      
      {/* 6. हमारे मूल्यवान ग्राहक रिव्यूज */}
      <CustomerReviews />
      
      {/* 7. प्रीमियम ओला स्टाइल फूटर */}
      <Footer />
    </div>
  );
};

function App() {
  // यूआरएल चेक करने के लिए (उदा. http://localhost:3000/?mode=admin)
  const queryParams = new URLSearchParams(window.location.search);
  const isAdminTab = queryParams.get('mode') === 'admin';

  // अगर एडमिन मोड ऑन है, तो सीधा एडमिन पैनल दिखाओ भाई
  if (isAdminTab) {
    return <AdminPanel />;
  }

  return (
    // 🌐 ध्यान दें: यहाँ ब्राउज़र राउटर बिल्कुल सही तरीके से सेट कर दिया है
    <BrowserRouter>
      <Routes>
        {/* 1. जब यूजर नॉर्मल वेबसाइट खोलेगा (/) तो उसे पूरा शोरूम और गाड़ियां दिखेंगी */}
        <Route path="/" element={<Home />} />
        
        {/* 2. जब एक्सप्लोर बटन पर क्लिक करेगा, तब वह इस नए फुल-स्क्रीन पेज पर जाएगा */}
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;