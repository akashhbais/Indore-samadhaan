import React from "react";
import { Link } from "react-router-dom";

const testUsers = [
  { name: "Test User 1", phone: "+91 98765 43210" },
  { name: "Test User 2", phone: "+91 91234 56789" },
  { name: "Test User 3", phone: "+91 99887 77665" },
];

const emails = [
  "support@indoremc.gov.in",
  "helpdesk@indoremc.gov.in",
];

const helpline = "1800-123-4567";

const Contact = () => (
  <div className="min-h-screen flex flex-col relative">
    {/* Rajwada background image */}
    <div className="fixed inset-0 z-0">
      <img
        src="/rajwada-indore-mp-city-hero.jpeg"
        alt="Rajwada Indore"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
    {/* Cross Button at Page Top-Right */}
    <Link
      to="/"
      className="fixed top-5 right-5 z-50 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold transition"
      title="Close"
    >
      &times;
    </Link>
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-xl w-full bg-white/90 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#002868] mb-8">Contact Us</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Helpline Number</h2>
          <p className="text-lg text-blue-700 font-bold">{helpline}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Test User Phone Numbers</h2>
          <ul className="space-y-2">
            {testUsers.map((user, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="font-medium text-gray-700">{user.name}:</span>
                <a href={`tel:${user.phone.replace(/\s+/g, '')}`} className="text-blue-600 hover:underline">{user.phone}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Email Addresses</h2>
          <ul className="space-y-2">
            {emails.map((email, idx) => (
              <li key={idx}>
                <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    {/* Footer (copied from Landing.jsx) */}
    <footer className="bg-[#002868] text-white py-5 text-center mt-auto z-10 relative">
      <p>&copy; Indore Municipal Corporation</p>
      <div className="flex flex-wrap justify-center gap-5 mt-5">
        <a href="#" className="text-white no-underline">Privacy Policy</a>
        <a href="#" className="text-white no-underline">Disclaimer</a>
        <a href="#" className="text-white no-underline">CM Dashboard</a>
        <a href="#" className="text-white no-underline">Helpdesk</a>
      </div>
    </footer>
  </div>
);

export default Contact; 