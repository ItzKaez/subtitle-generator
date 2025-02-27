import { useState } from 'react';

export default function Header({ changeLanguage, selectedLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#252538] p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <h1 className="text-2xl font-bold text-[#FAF3E0]">Dynamic Captions</h1>
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center w-full md:w-auto mt-4 md:mt-0 space-x-4`}>
          
          <select 
            className="bg-[#1E1E2E] text-[#FAF3E0] px-4 py-2 rounded-xl  transition duration-200 block w-full md:w-auto mt-2 md:mt-0" 
            id="languageSelector" 
            onChange={changeLanguage}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="pt">Portuguese</option>
          </select>
        </nav>
      </div>
    </header>
  );
}
