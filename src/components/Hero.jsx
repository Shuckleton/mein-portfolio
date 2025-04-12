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
              <span className="block sm:inline"> The Cyberizzler</span>
            </h1>
              <p className={`${styles.heroSubText} mt-2 text-white/80`}>
                    I'm <span className="text-pastelYellow">Romnick Canonigo</span>, a tech enthusiast passionate about web development, graphics, and cybersecurity.
              </p>
            
              <p className="text-white/70 text-[14px] sm:text-[16px] mt-6">
                Subscribe to stay in touch and receive updates on my latest projects.
            
                <br />
                <br />
              </p>
                  <div className="mt-2">
                    <button className="border border-pastelYellow text-pastelYellow bg-pastelYellow px-5 py-2 rounded text-black hover:bg-transparent hover:text-pastelYellow transition-colors duration-300">
                      Subscribe
                    </button>
                </div>
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
