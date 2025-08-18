import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { AppProvider, useAppContext } from "../context/AppContext";

const heroImages = [
  "/rajwada-indore-mp-city-hero.jpeg",
  "/best-places-in-indore.jpg",
  "/images.jpeg",
  "/images.png",
];

// Navbar Component
const Navbar = ({ isUser, user, onLogout, setShowCard, showCard }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
        : 'bg-white border-b border-gray-200'
    } px-8 py-4 flex justify-between items-center rounded-b-lg`}>
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative">
          <img className="h-12 w-12 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" src="/Emblem_of_IMC_Indore.jpg" alt="IMC Logo" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-sm text-blue-900 tracking-wide transition-all duration-300 group-hover:text-blue-700">Indore Municipal</div>
          <div className="pl-4 font-bold text-sm text-blue-900 tracking-wide transition-all duration-300 group-hover:text-blue-700">Corporation</div>
        </div>
      </div>
       
      <ul className="flex gap-6 m-0 list-none items-center">
        <li><a href="/about" className="no-underline text-gray-700 font-bold px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-800">About</a></li>
        <li><Link to="/contact" className="no-underline text-gray-700 font-bold px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-800">Contact</Link></li>
        <li><a href="/login" className="no-underline text-gray-700 font-bold px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-800">
          <span className="relative z-10">Citizen Login</span>
          <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
        </a></li>
        <li><a href="/admin" className="no-underline bg-gradient-to-r from-blue-900 to-blue-700 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:from-blue-700 hover:to-blue-900 relative overflow-hidden group">
          <span className="relative z-10">Zonal Login</span>
          <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
        </a></li>
      </ul>
    </nav>
  );
};

// Hero Section Component
const HeroSection = ({ bgIndex }) => {
  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center text-white text-center overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === bgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img 
            src={image}
            alt={`Indore Hero ${index + 1}`}
            className="w-full h-full object-cover"
            style={{ minWidth: "100%", minHeight: "100%" }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 z-10"></div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {heroImages.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === bgIndex 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/80 cursor-pointer'
            }`}
          ></div>
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden z-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
      <div className="relative z-30 space-y-6 animate-fadeInUp">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl animate-pulse-slow">
          Indore Jansunwai
        </h1>
        <p className="mt-6 text-xl md:text-2xl bg-black/40 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20 max-w-2xl mx-auto shadow-2xl">
          An app made to address and solve citizens' issues efficiently.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <a href="/citizen" className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 relative overflow-hidden group">
            <span className="relative z-10">Login to File Grievance</span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
          </a>
          <a href="#achievements" className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold border border-white/30 transition-all duration-300 hover:bg-white/30 hover:-translate-y-2 hover:scale-105">
            Learn More
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const LeaderCard = ({ image, name, position }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group animate-fadeInUp">
    <div className="relative overflow-hidden">
      <img src={image} alt={name} className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{name}</h3>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{position}</p>
    </div>
  </div>
);

const LeadersSection = () => {
  const leaders = [
    { image: "/cm.jpeg", name: "Mr. Mohan Lal Yadav", position: "Chief Minister of Madhya Pradesh" },
    { image: "/mayor.jpeg", name: "Mr. Pushyamitra Bhargav", position: "Mayor of Indore" },
    { image: "/coll.jpeg", name: "Mr. Ashish Singh", position: "District Collector" },
    { image: "/mc1.jpeg", name: "Ms. Harshika Singh", position: "Municipal Commissioner" }
  ];
  return (
    <section className="py-16 px-5 text-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-blue-900 animate-fadeInUp">Leaders of Indore</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto mb-12 rounded-full"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {leaders.map((leader, index) => <LeaderCard key={index} {...leader} />)}
        </div>
      </div>
    </section>
  );
};

const InitiativeCard = ({ title, description, icon = "🏛️" }) => (
  <div className="bg-white text-gray-700 rounded-2xl shadow-lg overflow-hidden text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group animate-fadeInUp">
    <div className="p-6">
      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="font-bold text-lg text-blue-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{description}</p>
    </div>
    <div className="h-1 bg-gradient-to-r from-blue-900 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
  </div>
);

const InitiativesSection = () => {
  const initiatives = [
    { title: "Swachh Bharat Mission", description: "Indore has made tremendous strides in cleanliness and solid waste management, becoming a model for other cities.", icon: "🧹" },
    { title: "Indore 311 App", description: "This app provides essential city information and allows citizens to report civic issues directly to authorities.", icon: "📱" },
    { title: "Metro Development", description: "Indore is rapidly expanding its infrastructure with a new metro system to reduce traffic and improve public transport.", icon: "🚇" }
  ];
  return (
    <section className="py-16 px-5 text-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-4 animate-fadeInUp">Indore Initiatives</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-white to-blue-200 mx-auto mb-12 rounded-full"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => <InitiativeCard key={index} {...initiative} />)}
        </div>
      </div>
    </section>
  );
};

const AchievementCard = ({ image, title, description }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group animate-fadeInUp">
    <div className="relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
        <span className="text-blue-900 text-xl">🏆</span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-bold text-lg text-blue-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{description}</p>
    </div>
    <div className="h-1 bg-gradient-to-r from-blue-900 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
  </div>
);

const AchievementsSection = () => {
  const achievements = [
    { image: "/clean.jpeg", title: "Cleanest City of India", description: "Indore has been awarded as the Cleanest City in India for 7 consecutive years under the Swachh Survekshan initiative." },
    { image: "/waste.jpg", title: "100% Waste Processing", description: "Indore became the first city in India to achieve 100% waste segregation and processing of its daily waste." },
    { image: "/water.jpg", title: "Water Plus Certification", description: "Indore received India's first Water Plus certification under Swachh Bharat for treating and recycling used water." },
    { image: "/images.png", title: "Smart City Leader", description: "Ranked among the top in India's Smart City rankings for its effective use of technology and urban infrastructure planning." }
  ];
  return (
    <section id="achievements" className="py-16 px-5 text-center bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-blue-900 animate-fadeInUp">Achievements of Indore</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto mb-12 rounded-full"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => <AchievementCard key={index} {...achievement} />)}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const footerLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Disclaimer", href: "#" },
    { name: "CM Dashboard", href: "#" },
    { name: "Helpdesk", href: "#" }
  ];
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img className="h-12 w-12 rounded-full" src="/Emblem_of_IMC_Indore.jpg" alt="IMC Logo" />
            <div className="text-2xl font-bold">Indore Municipal Corporation</div>
          </div>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Building a cleaner, smarter, and more efficient Indore for all citizens through innovative solutions and dedicated service.
          </p>
        </div>
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="mb-6 text-lg">&copy; Indore Municipal Corporation</p>
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-blue-200 no-underline transition-all duration-300 hover:text-white hover:-translate-y-1 px-3 py-1 rounded-lg hover:bg-white/10">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Component
const Landing = () => {
  const { isUser, user, setIsUser, setUser } = useAppContext(AppProvider);
  const [showCard, setShowCard] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const onLogout = () => {
    setIsUser(false);
    setUser(null);
    setShowCard(false); // Hide card on logout
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 text-gray-700 flex flex-col">
      <Navbar isUser={isUser} user={user} onLogout={onLogout} setShowCard={setShowCard} showCard={showCard} />
      
      {showCard && user && (
        <div className="absolute right-8 top-24 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-50">
          <h3 className="font-bold text-lg mb-2 text-blue-900">Profile</h3>
          <p className="text-sm text-gray-700"><strong>Name:</strong> {user.name}</p>
          <p className="text-sm text-gray-700"><strong>Email:</strong> {user.email}</p>
          <p className="text-sm text-gray-700"><strong>Phone:</strong> {user.phone_number}</p>
          <p className="text-sm text-gray-700"><strong>Ward No:</strong> {user.ward_number}</p>
          <p className="text-sm text-gray-700"><strong>Area:</strong> {user.area}</p>
          <button
            onClick={onLogout}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}

      <HeroSection bgIndex={bgIndex} />
      <LeadersSection />
      <InitiativesSection />
      <AchievementsSection />
      <Footer />

      
    </div>
  );
};

export default Landing;
