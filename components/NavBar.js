'use client'
import Link from "next/link";
import { useState } from "react";

export default function NavBar({ changeLanguage, selectedLanguage }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="flex justify-between items-center px-8 py-6">
      <Link href="/" className="text-2xl font-bold">
        Capshun
      </Link>
      <button
        className="md:hidden p-2 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className="flex items-center gap-6">
        <div className="flex gap-8 mr-8">
          <Link
            href="/features"
            className="hover:text-[#FF7B7B] transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="hover:text-[#FF7B7B] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="hover:text-[#FF7B7B] transition-colors"
          >
            About
          </Link>
        </div>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center w-full md:w-auto mt-4 md:mt-0 space-x-4`}
        >
          <select
            className="bg-[#1e1e2e] border border-gray-600 rounded-lg px-4 py-2"
            id="languageSelector"
            onChange={changeLanguage}

          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="pt">Portuguese</option>
          </select>
        </nav>
      </div>
    </nav>
  );
}
