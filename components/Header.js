import { useState } from 'react';

export default function Header({ changeLanguage, selectedLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white overflow-x-hidden">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="text-2xl font-bold">Dynamic Subtitles</div>
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center w-full md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto justify-center">
            <li><a className="hover:underline block py-2" href="#">{selectedLanguage.home}</a></li>
            <li><a className="hover:underline block py-2" href="#">{selectedLanguage.features}</a></li>
            <li><a className="hover:underline block py-2" href="#">{selectedLanguage.pricing}</a></li>
            <li><a className="hover:underline block py-2" href="#">{selectedLanguage.contact}</a></li>
          
            <li className="md:ml-4">
              <select className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600" id="languageSelector" onChange={changeLanguage}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="pt">Portuguese</option>
              </select>
            </li>
            <li className="md:ml-4">
              <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 w-full md:w-auto">Sign In</button>
            </li>
            <li className="md:ml-4">
              <button className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800 w-full md:w-auto">Sign Up</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}