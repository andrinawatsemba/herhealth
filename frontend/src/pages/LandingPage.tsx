import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const purpleHeartLogo = (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#4B2A7B"/>
    <path d="M24 38s-11.52-9.216-16.32-14.592C2.496 24.096 0 20.352 0 16.32 0 9.792 5.184 4.608 11.712 4.608c3.456 0 6.72 1.536 8.832 4.032C22.08 6.144 25.344 4.608 28.8 4.608 35.328 4.608 40.512 9.792 40.512 16.32c0 4.032-2.496 7.776-7.68 12.288C35.52 28.992 24 38 24 38z" fill="#fff" fillOpacity="0.2"/>
    <path d="M24 34s-8.64-6.912-12.24-10.944C3.744 18.336 2.016 15.36 2.016 12.288 2.016 7.488 6.048 3.456 10.848 3.456c2.88 0 5.6 1.28 7.36 3.36C20.16 4.736 22.88 3.456 25.76 3.456c4.8 0 8.832 4.032 8.832 8.832 0 3.072-1.728 6.048-5.744 10.768C32.64 27.088 24 34 24 34z" fill="#fff"/>
    <circle cx="24" cy="24" r="8" fill="#fff"/>
    <ellipse cx="24" cy="24" rx="3.5" ry="6" fill="#4B2A7B"/>
  </svg>
);

const heroImage = '/img2.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F3]">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-4 py-3 md:px-12 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          {purpleHeartLogo}
          <span className="text-2xl font-bold text-[#4B2A7B] tracking-tight">HER HEALTH UGANDA</span>
        </div>
        <nav className="hidden md:flex gap-6 text-[#4B2A7B] font-medium">
          <Link to="/login" className="hover:text-[#FFA726]">Login</Link>
          <Link to="/register" className="hover:text-[#FFA726]">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-8 gap-8 bg-[#FAF7F3]">
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#4B2A7B] mb-2 leading-tight">
            HER HEALTH UGANDA
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-[#FFA726] mb-4">
            Guiding Mothers, Saving Lives
          </h2>
          <p className="text-base md:text-lg text-[#2E1A47] mb-6">
            HER HEALTH UGANDA is a maternal health platform dedicated to supporting Ugandan mothers during antenatal and postnatal care. We empower women through education, support, and secure record keeping—connecting you to trusted health professionals every step of the way.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#4B2A7B] hover:bg-[#FFA726] text-white font-bold py-3 px-8 rounded-full shadow transition-colors mb-4"
          >
            Get Started
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={heroImage}
            alt="Pregnant Black woman with nurse"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover border-4 border-[#FFA726]"
          />
        </div>
      </main>

      {/* Contact Section */}
      <section className="w-full bg-[#F6A764] py-8 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#2E1A47] mb-2">Contact Us</h2>
          <p className="text-[#2E1A47] mb-1">Email: <a href="mailto:support@hearhealth.ug" className="underline hover:text-[#4B2A7B]">support@hearhealth.ug</a></p>
          <p className="text-[#2E1A47] mb-1">Phone: <a href="tel:+256700000000" className="underline hover:text-[#4B2A7B]">+256 700 000 000</a></p>
          <a
            href="https://wa.me/256700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 bg-[#4B2A7B] text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-[#FFA726] hover:text-white transition-colors"
          >
            WhatsApp Live Support
          </a>
        </div>
        <div className="flex-1 flex justify-end">
          <span className="text-[#2E1A47] text-lg font-semibold">We're here for you, every step of the way.</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#FAF7F3] border-t border-[#F6A764] py-4 text-center text-[#2E1A47] text-sm">
        &copy; {new Date().getFullYear()} HER HEALTH UGANDA. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage; 