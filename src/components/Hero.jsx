import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { RetroPCCanvas } from './canvas';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto flex items-center justify-center">
      {/* Responsive container */}
      <div className="flex flex-col-reverse lg:flex-row w-full h-full items-center justify-center text-center lg:text-left">
      {/* Left Section */}
      <div className={`${styles.paddingX} w-full lg:w-1/2 mt-10 lg:mt-0 flex flex-col justify-center gap-5 z-10`}>
        <div>
        <h1 className={`${styles.heroHeadText}`}>
          Hi, <br className="sm:hidden" />
          <span className="whitespace-nowrap">
            I'm <span className="text-pastelYellow">Romnick</span>
          </span>
          <span className="block sm:inline"> The Cyberizzler</span>
        </h1>


          <p className={`${styles.heroSubText} mt-2 text-white/80`}>
            I develop software, web applications <br className="sm:block hidden" /> and graphics for fun!
          </p>
        </div>
      </div>


        {/* Right Section with RetroPCCanvas */}
        <div 
          className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[80vh] relative z-15"
          style={{ pointerEvents: 'auto' }} // Ensure pointer events work properly on the canvas
        >
          <RetroPCCanvas />
        </div>
      </div>
    </section>
  );
};

export default Hero;
