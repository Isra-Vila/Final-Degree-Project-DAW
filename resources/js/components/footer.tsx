// resources/js/components/Footer.tsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-10 text-sm text-center text-gray-500">
      <p>
        <span property="dct:title">Tripasion WebShop</span> by 
        <span property="cc:attributionName">Israel Vilavert Umpierrez</span> is licensed under 
        <a href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style={{ display: 'inline-block' }}>
          CC BY-NC 4.0
          <img style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }} src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="" />
          <img style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }} src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="" />
          <img style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }} src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="" />
        </a>
      </p>
    </footer>
  );
}
