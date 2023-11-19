import React, { useEffect } from 'react';
import './style.css';

const CityDetailsBackground = () => {
  useEffect(() => {
    const frame = document.querySelector('.frame');
    frame.innerHTML = `
      <div class="wave wave-back"></div>
      <div class="wave wave-middle"></div>
      <div class="wave wave-front"></div>
    `;

    const waves = document.querySelectorAll('.wave');
    waves.forEach(wave => {
      for (let i = 0; i < 16; i++) {
        wave.innerHTML += `<div class="circle"></div>`;
      }
    });
  }, []);

  return (
    <div className="frame">
      <div className="wave wave-back"></div>
      <div className="wave wave-middle"></div>
      <div className="wave wave-front"></div>
    </div>
  );
};

export default CityDetailsBackground;
