import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Enhanced Section Header Component with animated underline
const SectionHeader = ({
  title,
  highlightedText,
  subtitle,
  align = "center",
}) => {
  return (
    <div
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2
        className={`text-3xl md:text-5xl font-bold mb-4 relative inline-block`}
      >
        <span className='text-[#1a1a1a]'>{title}</span>{" "}
        <span className='text-[#f74401]'>{highlightedText}</span>
        <motion.div
          className='absolute -bottom-3 left-0 h-1 bg-[#f74401] rounded'
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.3, duration: 0.5 }}
        ></motion.div>
      </h2>
      <p className='text-[#3d3d3d] max-w-3xl mx-auto text-lg md:text-xl mt-6'>
        {subtitle}
      </p>
    </div>
  );
};

// Animated Service Card Component
const ServiceCard = ({ service, index, onSelect, isActive }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial='hidden'
      animate={controls}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${
        isActive
          ? "border-[#f74401] transform scale-[1.02]"
          : "border-transparent hover:border-[#f74401] hover:scale-[1.01]"
      }`}
      onClick={() => onSelect(index)}
    >
      <div className='p-1'>
        <div
          className={`p-6 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${
            isActive ? "bg-[#fff5f2]" : "bg-white hover:bg-[#fff5f2]/30"
          }`}
        >
          <div
            className={`text-[${service.color}] p-3 bg-white rounded-full shadow-sm`}
          >
            {service.icon}
          </div>
          <h3 className='text-xl font-bold text-[#1a1a1a]'>{service.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

// Service Detail Component
const ServiceDetail = ({ service }) => {
  const [ref] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className='grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8 md:p-12 flex flex-col justify-center'>
        <h3
          className='text-2xl md:text-3xl font-bold mb-4'
          style={{ color: service.color }}
        >
          {service.title}
        </h3>
        <p className='text-gray-700 mb-6 text-lg'>{service.description}</p>
        <ul className='space-y-3'>
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className='flex items-start text-gray-700'
            >
              <svg
                className='w-5 h-5 mr-3 text-[#f74401] flex-shrink-0 mt-1'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='mt-8'
        >
          {/* <a
            href='#quote'
            className='inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg'
            style={{ backgroundColor: service.color }}
          >
            Get Started
            <svg
              className='w-5 h-5 ml-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              ></path>
            </svg>
          </a> */}
        </motion.div>
      </div>
      <div
        className='h-64 md:h-auto bg-gray-200 relative overflow-hidden'
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className='absolute inset-0 opacity-20'
          style={{ backgroundColor: service.color }}
        ></div>
      </div>
    </motion.div>
  );
};

// Section Divider Component
const SectionDivider = ({ reversed = false }) => {
  return (
    <div className='relative h-16 md:h-24 w-full overflow-hidden'>
      <svg
        className={`absolute w-full h-full ${reversed ? "rotate-180" : ""}`}
        preserveAspectRatio='none'
        viewBox='0 0 1440 120'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 0L1440 0V60C1440 60 1082.5 120 720 120C357.5 120 0 60 0 60V0Z'
          fill='#fafafa'
        ></path>
      </svg>
    </div>
  );
};

// Redesigned Exterior Services Section
const ExteriorServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [ref] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const exteriorServices = [
    {
      title: "Architectural Design",
      icon: (
        <svg
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
      description:
        "Transform your vision into reality with our comprehensive architectural design services that blend aesthetics with functionality. Our team of experienced architects works closely with you to create spaces that reflect your unique style and meet your specific needs.",
      features: [
        "2D Floor Plans with precision detailing",
        "3D Elevation Design visualization",
        "Structural design engineering",
        "Interior 3D view & virtual walkthrough",
        "Electrical & plumbing layout design",
      ],
      image: "/archi.jpg",
    },
    {
      title: "Structural Construction",
      icon: (
        <svg
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
      description:
        "Build strong foundations with our structural construction expertise. We use cutting-edge technology and premium materials to ensure your building stands the test of time. Our structural engineers and construction specialists focus on durability, safety, and precision in every project.",
      features: [
        "Foundation construction up to 4 feet",
        "Premium quality RCC framework",
        "High-grade steel & cement options",
        "Quality assured building materials",
        "Waterproofing solutions with Dr.Fixit",
      ],
      image: "/structural.jpg",
    },
    {
      title: "Additional Features",
      icon: (
        <svg
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
        </svg>
      ),
      description:
        "Enhance your property with specialized features that add value and functionality. From sustainable solutions to decorative elements, these additional options allow you to customize your space to perfectly match your lifestyle needs.",
      features: [
        "Stylish staircase railing options",
        "Rainwater harvesting systems",
        "Parapet wall construction",
        "Roof weathering solutions",
        "Professional soil testing",
      ],
      image: "/stair.jpg",
    },
  ];

  return (
    <section ref={ref} className='py-24 bg-white relative overflow-hidden'>
      <div className='absolute top-0 right-0 w-1/3 h-1/3 bg-[#fff5f2] rounded-bl-full opacity-20' />
      <div className='absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#fff5f2] rounded-tr-full opacity-20' />

      <div className='container mx-auto px-4 relative z-10'>
        <SectionHeader
          title='Exterior'
          highlightedText='Construction Services'
          subtitle='Build the perfect structure with our comprehensive exterior construction solutions that combine innovative design with exceptional craftsmanship.'
        />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-12'>
          {exteriorServices.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              onSelect={setActiveService}
              isActive={activeService === index}
            />
          ))}
        </div>

        <AnimatePresence mode='wait'>
          <ServiceDetail
            key={`exterior-${activeService}`}
            service={exteriorServices[activeService]}
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

// Redesigned Interior Services Section
const InteriorServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [ref] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const interiorServices = [
    {
      title: "Interior Finishes",
      icon: (
        <svg
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z'></path>
        </svg>
      ),
      description:
        "Create stunning interiors that reflect your personal style and enhance your daily living experience. Our interior finishing services cover everything from flooring to cabinetry, delivered with attention to detail and impeccable craftsmanship.",
      features: [
        "Premium flooring options (tiles & granite)",
        "Designer wall painting with quality finishes",
        "Stylish kitchen & bathroom installations",
        "Custom door & window solutions",
        "Built-in shelving & storage spaces",
      ],
      image: "/services-interior.jpg",
    },
    {
      title: "Plumbing & Fixtures",
      icon: (
        <svg
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
      description:
        "Ensure efficient water systems with our comprehensive plumbing solutions. From basic installations to advanced water management systems, we provide reliable plumbing infrastructure that combines functionality with modern convenience.",
      features: [
        "Complete bathroom fittings installation",
        "Modern kitchen sink & faucet setups",
        "Hot & cold water system installation",
        "RO water purification point setup",
        "Quality assured water storage solutions",
      ],
      image: "/plumbing.jpg",
    },
    {
      title: "Electrical Systems",
      icon: (
        <svg
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
      description:
        "Power your space with safe and efficient electrical systems designed for modern living. Our electrical experts implement smart solutions that optimize energy usage while ensuring safety and reliability for all your power needs.",
      features: [
        "Premium electrical wiring installation",
        "Comprehensive switch point allocation",
        "Customized lighting system setup",
        "A/C & appliance connection points",
        "Brand-name electrical components",
      ],
      image: "/electricals.jpg",
    },
  ];

  return (
    <section ref={ref} className='py-24 bg-[#fafafa] relative overflow-hidden'>
      <div className='absolute top-0 left-0 w-1/3 h-1/3 bg-[#fff5f2] rounded-br-full opacity-20' />
      <div className='absolute bottom-0 right-0 w-1/4 h-1/4 bg-[#fff5f2] rounded-tl-full opacity-20' />

      <div className='container mx-auto px-4 relative z-10'>
        <SectionHeader
          title='Interior'
          highlightedText='Finishing Services'
          subtitle='Transform your space with our premium interior solutions that bring comfort, style and functionality to every corner of your home.'
        />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-12'>
          {interiorServices.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              onSelect={setActiveService}
              isActive={activeService === index}
            />
          ))}
        </div>

        <AnimatePresence mode='wait'>
          <ServiceDetail
            key={`interior-${activeService}`}
            service={interiorServices[activeService]}
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

// Enhanced Feature Showcase with improved styling
const FeatureShowcase = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Feature variants
  const featureVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const features = [
    {
      icon: (
        <svg
          className='w-10 h-10'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
      title: "Premium Quality Materials",
      description:
        "We use only the finest ISI certified materials, including premium steel, cement, and water-resistant solutions for lasting durability and performance.",
    },
    {
      icon: (
        <svg
          className='w-10 h-10'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z'></path>
        </svg>
      ),
      title: "Expert Craftsmanship",
      description:
        "Our skilled team ensures meticulous attention to detail in every aspect of construction and finishing, delivering excellence in every project we undertake.",
    },
    {
      icon: (
        <svg
          className='w-10 h-10'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
      title: "Customizable Solutions",
      description:
        "From luxury finishes to practical designs, we tailor our services to match your exact requirements and preferences, ensuring your vision comes to life exactly as you imagined.",
    },
    {
      icon: (
        <svg
          className='w-10 h-10'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
          <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
        </svg>
      ),
      title: "Data-Driven Approach",
      description:
        "We leverage modern technology and data analytics to optimize construction processes, improve efficiency, and deliver projects that exceed industry standards.",
    },
    {
      icon: (
        <svg
          className='w-10 h-10'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
      title: "Lifetime Support",
      description:
        "Our relationship doesn't end at project completion. We offer comprehensive post-construction support to ensure your property remains in perfect condition for years to come.",
    },
    {
      icon: (
        <svg
          className='w-10 h-10'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
      title: "Client-Centered Focus",
      description:
        "Your satisfaction is our priority. We maintain transparent communication, offer flexible solutions, and ensure every project reflects your unique vision and requirements.",
    },
  ];

  return (
    <section className='py-24 bg-white relative overflow-hidden'>
      <div className='container mx-auto px-4'>
        <SectionHeader
          title='Why Choose'
          highlightedText='Naya Builders'
          subtitle='Our commitment to excellence sets us apart in the construction industry, delivering exceptional quality and reliability on every project.'
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial='hidden'
          animate={controls}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className='bg-[#fafafa] rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group'
            >
              <div className='text-[#f74401] mb-6 bg-white p-4 rounded-full inline-block shadow-sm group-hover:shadow-md transition-all group-hover:bg-[#fff5f2]'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-bold mb-4 text-[#1a1a1a] group-hover:text-[#f74401] transition-colors'>
                {feature.title}
              </h3>
              <p className='text-[#3d3d3d]'>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle decorative elements */}
        <div className='absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#fff5f2] opacity-30 z-0' />
        <div className='absolute bottom-20 right-20 w-40 h-40 rounded-full bg-[#fff5f2] opacity-40 z-0' />
      </div>
    </section>
  );
};

// Call-to-Action Banner component
const CTABanner = () => {
  const navigate = useNavigate();
  return (
    <section className='py-16 bg-gradient-to-r from-[#f74401] to-[#a62600] relative overflow-hidden'>
      <div className='container mx-auto px-4 relative z-10'>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          <div className='mb-6 md:mb-0 text-center md:text-left'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              Ready to Transform Your Space?
            </h2>
            <p className='text-white text-opacity-90 text-lg max-w-xl'>
              Let's bring your vision to life with our premium construction and
              interior services. Contact us today for a free consultation.
            </p>
          </div>
          <div>
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/9150324381?text=Share%20your%20quotation",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className='inline-flex items-center px-8 py-4 bg-white text-[#f74401] rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
            >
              Get Free Quote
              <ArrowRight className='w-5 h-5 ml-2' />
            </button>
          </div>
        </div>
      </div>

      {/* Abstract shapes for visual interest */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden opacity-10'>
        <div className='absolute -top-10 -left-10 w-40 h-40 rounded-full border-8 border-white'></div>
        <div className='absolute top-10 right-10 w-20 h-20 rounded-full border-4 border-white'></div>
        <div className='absolute bottom-10 left-1/3 w-32 h-32 rounded-full border-6 border-white'></div>
      </div>
    </section>
  );
};

// Service Process Steps component
const ServiceProcess = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description:
        "We begin with a detailed discussion to understand your vision, requirements, and preferences.",
      icon: (
        <svg
          className='w-8 h-8'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
    },
    {
      number: "02",
      title: "Design & Planning",
      description:
        "Our experts create detailed architectural plans and 3D visualizations for your approval.",
      icon: (
        <svg
          className='w-8 h-8'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z'></path>
        </svg>
      ),
    },
    {
      number: "03",
      title: "Material Selection",
      description:
        "Choose from premium materials and finishes that match your style and budget.",
      icon: (
        <svg
          className='w-8 h-8'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
    },
    {
      number: "04",
      title: "Construction",
      description:
        "Our skilled team brings your design to life with precision and attention to detail.",
      icon: (
        <svg
          className='w-8 h-8'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
    },
    {
      number: "05",
      title: "Quality Inspection",
      description:
        "We conduct thorough inspections at every stage to ensure superior quality.",
      icon: (
        <svg
          className='w-8 h-8'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
    },
    {
      number: "06",
      title: "Final Delivery",
      description:
        "We hand over your beautifully finished space with full documentation and support.",
      icon: (
        <svg
          className='w-8 h-8'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
          <path
            fillRule='evenodd'
            d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <section className='py-24 bg-white'>
      <div className='container mx-auto px-4'>
        <SectionHeader
          title='Our'
          highlightedText='Process'
          subtitle='We follow a streamlined approach to ensure your project is completed efficiently, with transparent communication at every step.'
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial='hidden'
          animate={controls}
          className='relative mt-16'
        >
          {/* Connecting line */}
          <div className='absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#f74401] to-[#a62600] transform -translate-x-1/2 hidden md:block'></div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 relative'>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex ${
                  index % 2 === 0
                    ? "md:mr-auto md:pr-16"
                    : "md:ml-auto md:pl-16"
                } relative`}
              >
                {/* Step number circle for desktop */}
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0 ? "md:right-0" : "md:left-0"
                  } w-12 h-12 rounded-full bg-[#f74401] text-white flex items-center justify-center font-bold text-lg transform translate-x-1/2 -translate-y-1/2 hidden md:flex`}
                >
                  {index + 1}
                </div>

                {/* Content card */}
                <div className='bg-[#fafafa] rounded-xl p-8 shadow-md hover:shadow-lg transition-all w-full max-w-md border-l-4 border-[#f74401] group hover:bg-white'>
                  {/* Step number for mobile */}
                  <div className='md:hidden flex items-center mb-4'>
                    <div className='w-10 h-10 rounded-full bg-[#f74401] text-white flex items-center justify-center font-bold text-lg mr-4'>
                      {index + 1}
                    </div>
                    <h3 className='text-2xl font-bold text-[#1a1a1a]'>
                      {step.title}
                    </h3>
                  </div>

                  {/* Desktop title */}
                  <h3 className='text-2xl font-bold text-[#1a1a1a] mb-4 hidden md:block'>
                    {step.title}
                  </h3>

                  <div className='flex items-start mb-4'>
                    <div className='text-[#f74401] mr-4'>{step.icon}</div>
                    <p className='text-[#3d3d3d]'>{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Component that combines all sections
const ServiceMainSection = () => {
  return (
    <div className='services-page'>
      {/* Hero Banner for Services */}
      <section className='relative bg-gray-900 py-20 overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern
                id='smallGrid'
                width='20'
                height='20'
                patternUnits='userSpaceOnUse'
              >
                <path
                  d='M 20 0 L 0 0 0 20'
                  fill='none'
                  stroke='white'
                  strokeWidth='0.5'
                />
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#smallGrid)' />
          </svg>
        </div>
        <div className='container mx-auto px-4 relative z-10'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
              Craftsmanship That Stands The Test of Time
            </h1>
            <p className='text-xl text-white/80 mb-8'>
              Expert construction solutions tailored to your unique needs with
              quality that exceeds expectations
            </p>
          </div>
        </div>

        {/* Decorative overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/50 to-black/30'></div>

        {/* Background pattern */}
        <div className='absolute inset-0 opacity-20'>
          <div className='absolute inset-0 bg-pattern'></div>
        </div>
      </section>

      {/* Services Sections */}
      <div id='exterior-services'>
        <ExteriorServicesSection />
      </div>

      <SectionDivider />

      <div id='interior-services'>
        <InteriorServicesSection />
      </div>

      <SectionDivider reversed={true} />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* CTA Banner */}
      <CTABanner />
    </div>
  );
};

export default ServiceMainSection;
