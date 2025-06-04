import React from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const ContactBar = () => {
  return (
    <div className='fixed bottom-8 left-8 flex flex-col gap-4 z-50'>
      {/* WhatsApp */}
      <div className='relative rounded-lg overflow-hidden shadow-lg'>
        <div className='absolute w-4 h-4 bg-green-500 left-0 top-1/2 transform -translate-x-2 rotate-45'></div>
        <a
          href='https://wa.me/9150324381'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center w-12 h-12 bg-green-500 text-white transition-transform duration-300 hover:scale-110 relative'
          aria-label='Chat on WhatsApp'
        >
          <FaWhatsapp size={24} />
        </a>
      </div>

      {/* Phone */}
      <div className='relative rounded-lg overflow-hidden shadow-lg'>
        <div className='absolute w-4 h-4 bg-green-600 left-0 top-1/2 transform -translate-x-2 rotate-45'></div>
        <a
          href='tel:9150324381'
          className='flex items-center justify-center w-12 h-12 bg-green-600 text-white transition-transform duration-300 hover:scale-110 relative'
          aria-label='Call us'
        >
          <FaPhone
            size={24}
            style={{ transform: "scaleX(-1) rotate(90deg)" }}
          />
        </a>
      </div>
    </div>
  );
};

export default ContactBar;
