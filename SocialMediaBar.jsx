import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const SocialMediaBar = () => {
  return (
    <div className='fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col gap-4 p-2 bg-transparent z-50'>
      {/* Facebook */}
      <div className='rounded-l-lg overflow-hidden shadow-lg'>
        <a
          href='https://www.facebook.com/profile.php?id=61576160222061'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center w-12 h-12 bg-blue-600 text-white transition-transform duration-300 hover:scale-110'
        >
          <FaFacebookF size={24} />
        </a>
      </div>

      {/* Instagram */}
      <div className='rounded-l-lg overflow-hidden shadow-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400'>
        <a
          href='https://www.instagram.com/naya_builders_/'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center w-12 h-12 text-white transition-transform duration-300 hover:scale-110'
        >
          <FaInstagram size={24} />
        </a>
      </div>

      {/* YouTube */}
      <div className='rounded-l-lg overflow-hidden shadow-lg'>
        <a
          href='https://www.youtube.com/channel/UCFHa3N1PcZH63X90vdziPgw'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center w-12 h-12 bg-red-600 text-white transition-transform duration-300 hover:scale-110'
        >
          <FaYoutube size={24} />
        </a>
      </div>
    </div>
  );
};

export default SocialMediaBar;
