import '../globals.css'
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="bg-gray-900 text-white">
      <Component {...pageProps} changeLanguage={changeLanguage} language={language} />
    </div>
  );
}

export default MyApp;