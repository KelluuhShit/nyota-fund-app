import React, { useState } from 'react';
import { ArrowRight, Star, Sparkles, Heart, Shield, Menu, X, ChevronRight, } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../index.css';
import CoverImage from '../assets/cover.png';

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const testimonials = [
    { name: "Aisha Mohamed", county: "Mombasa", quote: "Nyota ilinipa KSh 350K seed funding. Sasa brand yangu inauzwa Dubai!" },
    { name: "Brian Kiprotich", county: "Kericho", quote: "From jobless to drone business owner. Nyota mentorship changed my life." },
    { name: "Fatuma Hassan", county: "Garissa", quote: "Solar business yangu inawasha maisha ya 500+ families thanks to Nyota training." },
  ];

  return (
    <>
      {/* HEADER - Mobile-First, Clean & Compact */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-kenya-black/95 backdrop-blur-xl border-b-4 border-kenya-red">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">NYOTA</h1>
              <p className="text-[10px] text-kenya-green font-bold -mt-1">YOUTH PLATFORM</p>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          {/* <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-1">
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button> */}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="bg-kenya-black/98 border-t-4 border-kenya-red">
            <div className="px-6 py-6 space-y-5">
              {["Home", "About", "Programs", "Stories", "Apply Now"].map((item) => (
                <a key={item} href="#" className="block text-white text-lg font-semibold py-2 hover:text-kenya-red transition">
                  {item}
                </a>
              ))}
              <button className="w-full bg-kenya-red text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-kenya-green transition">
                Apply Sasa
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO - Mobile Optimized */}
      <section className="relative pt-20 min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 kenya-gradient opacity-90" />
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${CoverImage})` }} />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-5 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            NYOTA
            <br />
            <span className="text-kenya-green text-5xl md:text-7xl">PLATFORM</span>
            <br />
            FOR YOUTH
          </h1>

          <p className="mt-5 text-lg text-white/95 font-medium max-w-2xl mx-auto">
            Training • Funding • Mentorship • Jobs
          </p>

          <p className="mt-3 text-sm text-white/90">Kipepeo cha maisha yako kinaanza hapa</p>

          <div className="mt-10 flex flex-col gap-4 max-w-xs mx-auto">
            <Link to="/apply">
              <button className="w-full bg-kenya-green text-white py-4 px-8 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition flex items-center justify-center gap-3">
                Apply Sasa <Sparkles className="w-6 h-6" />
              </button>
            </Link>

            <Link to="/apply">
              <button className="w-full border-2 border-white text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-white hover:text-kenya-black transition">
                Learn More → Apply
              </button>
            </Link>
          </div>

          {/* Mobile Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 text-white text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl py-4 px-3">
              <p className="text-3xl font-black">250K+</p>
              <p className="text-xs mt-1 opacity-90">Youth</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl py-4 px-3">
              <p className="text-3xl font-black">KSh 12B+</p>
              <p className="text-xs mt-1 opacity-90">Funding</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl py-4 px-3">
              <p className="text-3xl font-black">47</p>
              <p className="text-xs mt-1 opacity-90">Counties</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Mobile Cards */}
      <section className="py-20 bg-gray-50">
        <div className="px-5">
          <h2 className="text-3xl font-black text-center mb-12 text-kenya-black">
            Success Stories
          </h2>

          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-kenya-red">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-kenya-green rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-kenya-black">{t.name}</p>
                    <p className="text-kenya-red text-sm font-semibold">{t.county} County</p>
                  </div>
                </div>
                <p className="text-gray-700 text-base leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-5 flex justify-end">
                  {i === 0 && <Heart className="w-7 h-7 text-kenya-red" />}
                  {i === 1 && <Shield className="w-7 h-7 text-kenya-green" />}
                  {i === 2 && <Sparkles className="w-7 h-7 text-kenya-red" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - Clean Mobile Footer */}
      <footer className="relative bg-kenya-black py-12">
        <div className="px-5 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-12 h-12 kenya-gradient rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white">NYOTA</h3>
          </div>

          <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">
            General Youth Opportunities Towards Advancement<br />
            Digital Youth Funds Initiative
          </p>

          <div className="flex justify-center gap-5 mb-8">
            {['F', 'X', 'IG', 'LN'].map((s) => (
              <div key={s} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-xl font-bold hover:bg-kenya-red transition">
                {s}
              </div>
            ))}
          </div>

          <div className="text-white/70 text-xs space-y-1">
            <p>© 2025 Nyota Youth Platform</p>
            <p>info@funds.digital | +254 700 123 456</p>
            <p className="text-white/60 pt-3">Made with passion</p>
          </div>
        </div>
      </footer>

      {/* Floating Apply Button - Mobile Only */}
      <a
        href="#"
        className="fixed bottom-6 right-6 z-40 bg-kenya-red text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition animate-bounce"
      >
        <ChevronRight className="w-10 h-10" />
      </a>
    </>
  );
}