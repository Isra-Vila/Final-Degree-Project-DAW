import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-20 py-10 bg-gray-900 text-gray-300 text-sm text-center">
      <div className="container mx-auto px-4">
        <p className="mb-4">
          <a property="dct:title" rel="cc:attributionURL" href="https://github.com/Isra-Vila/Final-Degree-Project-DAW" className="text-white hover:text-yellow-300 transition-colors duration-300">Trabajo de fin de grado DAW</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.linkedin.com/in/isravilavert/" className="text-white hover:text-yellow-300 transition-colors duration-300">Israel Vilavert Umpierrez</a> is licensed under 
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" className="inline-flex items-center text-white hover:text-yellow-300 transition-colors duration-300 ml-2">
            CC BY-NC-ND 4.0
            <img style={{ height: '20px' }} src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="CC icon" className="ml-1" />
            <img style={{ height: '20px' }} src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="BY icon" className="ml-1" />
            <img style={{ height: '20px' }} src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="NC icon" className="ml-1" />
            <img style={{ height: '20px' }} src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt="ND icon" className="ml-1" />
          </a>
        </p>
      </div>
    </footer>
  );
}