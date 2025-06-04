import React, { useState, useEffect, useRef } from "react";
import { Calendar, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Create placeholder images
const placeholders = [
  "/about-1.jpg",
  "/about-2.jpg",
  "/about-3.jpg",
  "/about-4.jpg",
  "/about-5.jpg",
];

// Parallax background component - moved outside to be shared
const ParallaxBackground = () => {
  return (
    <div className='fixed inset-0 -z-10'>
      <div className='absolute inset-0 bg-gradient-to-br from-white to-gray-100 opacity-70'></div>
      <div className='absolute top-0 left-0 w-full h-full'>
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern
              id='grid'
              width='40'
              height='40'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M 40 0 L 0 0 0 40'
                fill='none'
                stroke='#f0f0f0'
                strokeWidth='1'
              />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#grid)' />
        </svg>
      </div>
    </div>
  );
};

// Scroll progress indicator - moved outside to be shared
const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollWidth(scrollPercent * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50'>
      <div
        className='h-full bg-[#f74401] transition-all duration-150 ease-out'
        style={{ width: `${scrollWidth}%` }}
      />
    </div>
  );
};

// About section data with enhanced content - moved outside to be shared
const sections = [
  {
    heading: "Creating Heartfelt Homes, Not Just Buildings",
    content:
      "At Naya Builders, we believe in crafting more than structures – we build sanctuaries where life unfolds. Our dedication goes beyond construction; we're fostering an environment where continuous learning and daily improvement flourish. We're driven by a passion to empower everyone in our ecosystem with the principles of universal compassion and service. By elevating expertise at every level, we enhance living experiences through innovative, sustainable architectural designs and thoughtful interiors.",
  },
  {
    heading: "The Evolution of Excellence – Our Story",
    content:
      "Established in 2010 as Yuva Constructions, our journey of growth led to our incorporation as Yuva Constructions Private Limited in 2018. Today, under our distinctive brand Naya Builders Design Build Firm, we deliver a diverse portfolio of residential and commercial projects, each reflecting our commitment to quality and innovation throughout Tamil Nadu.",
  },
  {
    heading: "Foundations Built on Trust and Transparency",
    content:
      "From our earliest days, integrity and transparent communication have been the cornerstone of our operations, evident in every project we undertake. Through dedicated craftsmanship and unwavering principles, we've experienced remarkable growth to become one of Tamil Nadu's premier construction companies, with our signature developments now spanning the entire region.",
  },
  {
    heading: "Transforming Spaces into Life-Enriching Environments",
    content:
      "Our mission extends beyond construction – we're dedicated to elevating lives through exceptional architectural and interior solutions. The Naya Builders team unites around a singular vision: creating homes where families can truly live their aspirations. Each project represents our commitment to turning dreams into tangible, livable spaces where memories are made.",
  },
  {
    heading: "Setting New Standards in Home Creation",
    content:
      "Every decision at Naya Builders is made with deliberate intention to deliver an unparalleled home-building experience. Our relentless pursuit of excellence is fueled by genuine care for the well-being of those who inhabit our creations. This philosophy permeates everything from architectural design and construction to interior finishes and customer care, establishing us as an industry leader in client satisfaction.",
  },
];

// Section component with intersection observer for animations - moved outside
const Section = ({ index, heading, content, image }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isEven = index % 2 === 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`w-full min-h-screen flex items-center py-16 lg:py-0 transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${isEven ? "relative" : ""}`}
      style={
        isEven
          ? {
              backgroundImage: "url('/about-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }
          : {}
      }
    >
      {isEven && (
        <div className='absolute inset-0 bg-black bg-opacity-30'></div>
      )}
      <div
        className={`container mx-auto px-6 lg:px-12 flex flex-col ${
          isEven ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-10 lg:gap-16 relative z-10`}
      >
        <div
          className={`w-full lg:w-1/2 flex flex-col justify-center transform transition-transform duration-1000 ${
            isVisible
              ? "translate-x-0"
              : isEven
              ? "translate-x-16"
              : "-translate-x-16"
          } ${isEven ? "text-white" : "text-gray-900"}`}
        >
          <h2
            className={`text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight ${
              isEven ? "drop-shadow-lg" : ""
            }`}
          >
            {heading}
          </h2>
          <p
            className={`text-lg lg:text-xl ${
              isEven ? "text-gray-100" : "text-gray-700"
            } max-w-lg ${isEven ? "drop-shadow-md" : ""}`}
          >
            {content}
          </p>
          {/* <div className='mt-8'>
            <button
              className={`px-6 py-3 bg-[#f74401] text-white rounded-md hover:bg-[#e03b00] transition-colors duration-300 shadow-lg transform hover:scale-105 hover:-translate-y-1`}
            >
              Learn More
            </button>
          </div> */}
        </div>

        <div
          className={`w-full lg:w-1/2 h-64 md:h-80 lg:h-96 relative overflow-hidden rounded-2xl transform transition-transform duration-1000 ${
            isVisible
              ? "translate-x-0"
              : isEven
              ? "-translate-x-16"
              : "translate-x-16"
          }`}
        >
          <div className='absolute inset-0 bg-black bg-opacity-20 z-10'></div>
          <img
            src={image}
            alt={`About Naya Builders ${index + 1}`}
            className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${
              isEven ? "shadow-2xl" : ""
            }`}
          />
          {isEven ? (
            <div className='absolute inset-0 border-2 border-white border-opacity-30 m-4 rounded-xl pointer-events-none'></div>
          ) : (
            <div className='absolute inset-0 shadow-inner'></div>
          )}
        </div>
      </div>

      {/* Additional decorative elements for even sections */}
      {isEven && (
        <>
          <div className='absolute top-16 left-16 w-24 h-24 border-2 border-white border-opacity-20 rounded-full'></div>
          <div className='absolute bottom-16 right-16 w-32 h-32 border-2 border-white border-opacity-20 rounded-full'></div>
        </>
      )}
    </div>
  );
};

// Timeline component for company history - moved outside

const Timeline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const currentRef = timelineRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={timelineRef}
      className={`w-full py-12 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-12'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-900'>
          Our Journey Through the Years
        </h2>

        {/* Timeline for mobile */}
        <div className='md:hidden'>
          <div className='space-y-12'>
            <TimelineItemMobile
              year='2010'
              description='Founded as Yuva Constructions, embarking on our journey to transform the construction landscape.'
              isVisible={isVisible}
              delay='200ms'
            />

            <TimelineItemMobile
              year='2015'
              description='Expanded operations across Tamil Nadu, solidifying our reputation for excellence in construction.'
              isVisible={isVisible}
              delay='400ms'
            />

            <TimelineItemMobile
              year='2018'
              description="Incorporated as Naya Builders Private Limited, marking a significant milestone in our company's evolution."
              isVisible={isVisible}
              delay='600ms'
            />

            <TimelineItemMobile
              year='Present'
              description="Operating as Naya Builders Design Build Firm, recognized as one of South Tamil Nadu's premier construction and design companies."
              isVisible={isVisible}
              delay='800ms'
            />
          </div>
        </div>

        {/* Timeline for desktop */}
        <div className='hidden md:block relative'>
          {/* Vertical line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#f74401] rounded-full'></div>

          {/* Timeline items */}
          <div className='space-y-24'>
            <TimelineItemLeft
              year='2010'
              description='Founded as Yuva Constructions, embarking on our journey to transform the construction landscape.'
              isVisible={isVisible}
              delay='200ms'
            />

            <TimelineItemRight
              year='2015'
              description='Expanded operations across Tamil Nadu, solidifying our reputation for excellence in construction.'
              isVisible={isVisible}
              delay='400ms'
            />

            <TimelineItemLeft
              year='2018'
              description="Incorporated as Naya Builders Private Limited, marking a significant milestone in our company's evolution."
              isVisible={isVisible}
              delay='600ms'
            />

            <TimelineItemRight
              year='Present'
              description="Operating as Naya Builders Design Build Firm, recognized as one of South Tamil Nadu's premier construction and design companies."
              isVisible={isVisible}
              delay='800ms'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile timeline item component
const TimelineItemMobile = ({ year, description, isVisible, delay }) => (
  <div
    className={`relative pl-8 transition-transform duration-1000 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
    }`}
    style={{ transitionDelay: delay }}
  >
    {/* Dot on the left */}
    <div className='absolute left-0 top-1 flex items-center justify-center w-6 h-6 rounded-full bg-white border-4 border-[#f74401] shadow-md'>
      <div className='w-2 h-2 bg-[#f74401] rounded-full'></div>
    </div>

    {/* Line from dot downwards (except for last item) */}
    <div className='absolute left-3 top-6 w-px h-full bg-[#f74401]'></div>

    <h3 className='text-xl font-semibold text-gray-900 mb-2'>{year}</h3>
    <p className='text-gray-700 text-sm'>{description}</p>
  </div>
);

// Desktop timeline item for left side
const TimelineItemLeft = ({ year, description, isVisible, delay }) => (
  <div
    className={`flex flex-row items-center transition-transform duration-1000 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
    }`}
    style={{ transitionDelay: delay }}
  >
    <div className='w-1/2 pr-8 text-right'>
      <h3 className='text-2xl font-semibold text-gray-900 mb-2'>{year}</h3>
      <p className='text-gray-700'>{description}</p>
    </div>
    <div className='relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-[#f74401] shadow-lg'>
      <div className='w-4 h-4 bg-[#f74401] rounded-full'></div>
    </div>
    <div className='w-1/2 pl-8'></div>
  </div>
);

// Desktop timeline item for right side
const TimelineItemRight = ({ year, description, isVisible, delay }) => (
  <div
    className={`flex flex-row items-center transition-transform duration-1000 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
    }`}
    style={{ transitionDelay: delay }}
  >
    <div className='w-1/2 pr-8 text-right'></div>
    <div className='relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-[#f74401] shadow-lg'>
      <div className='w-4 h-4 bg-[#f74401] rounded-full'></div>
    </div>
    <div className='w-1/2 pl-8'>
      <h3 className='text-2xl font-semibold text-gray-900 mb-2'>{year}</h3>
      <p className='text-gray-700'>{description}</p>
    </div>
  </div>
);

// This component would be added as another section in your AboutPage
const AboutSubSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("philosophy");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Philosophy content data
  const tabContent = {
    philosophy: {
      title: "Our Design Philosophy",
      content:
        "At Naya Builders, we believe architecture should be a harmonious blend of form and function. We create spaces that not only captivate the eye but also serve their purpose with exceptional efficiency. Our design philosophy centers on the belief that every structure should tell a story—one that reflects its inhabitants' aspirations while respecting environmental and cultural contexts. We approach each project as a unique opportunity to create something extraordinary, balancing innovation with timeless principles of good design.",
      points: [
        "Human-centered design that prioritizes comfort and well-being",
        "Thoughtful integration with surrounding environments",
        "Balance between aesthetic beauty and practical functionality",
        "Sustainable solutions that minimize environmental impact",
      ],
    },
    approach: {
      title: "The Naya Builders Approach",
      content:
        "Our approach combines meticulous planning with creative problem-solving to transform concepts into remarkable realities. We begin by deeply understanding our clients' vision, needs, and constraints. Through collaborative dialogue, we refine ideas and develop comprehensive strategies that address every aspect of the project. Our multidisciplinary team works in perfect synchrony, bringing specialized expertise to each phase while maintaining a holistic perspective. This integrated approach ensures seamless execution from initial concept to final delivery.",
      points: [
        "In-depth client consultation and requirement analysis",
        "Collaborative design development with continuous feedback",
        "Rigorous quality control throughout implementation",
        "Transparent communication and project management",
      ],
    },
    difference: {
      title: "The Naya Builders Difference",
      content:
        "What truly sets Naya Builders apart is our unwavering commitment to excellence in every dimension. We don't merely meet industry standards—we exceed them. Our designs incorporate innovative solutions that anticipate future needs while addressing present requirements. We maintain exceptional attention to detail, ensuring flawless execution of every element, no matter how small. Our commitment extends beyond project completion; we build lasting relationships with clients and stand behind our work for years to come.",
      points: [
        "Innovative design solutions tailored to each unique challenge",
        "Exceptional craftsmanship and attention to detail",
        "Long-term perspective that considers future adaptability",
        "Comprehensive support throughout the lifecycle of your space",
      ],
    },
  };

  // For the 3D rotating cube effect
  const [rotation, setRotation] = useState({ x: 15, y: -15 });
  const cubeRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cubeRef.current) return;

    const box = cubeRef.current.getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;

    // Calculate relative position (-1 to 1)
    const relativeX = (e.clientX - centerX) / (box.width / 2);
    const relativeY = (e.clientY - centerY) / (box.height / 2);

    // Convert to rotation angles with limits
    const rotationY = -relativeX * 25; // Horizontal movement affects Y rotation
    const rotationX = relativeY * 25; // Vertical movement affects X rotation

    setRotation({ x: rotationX, y: rotationY });
  };

  const resetRotation = () => {
    setRotation({ x: 15, y: -15 });
  };
  const navigate = useNavigate();
  return (
    <div
      ref={sectionRef}
      className={`w-full pb-24 pt-0 bg-gradient-to-br from-gray-50 to-gray-100 transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className='container mx-auto px-6 lg:px-12'>
        {/* Section heading */}
        <div className='text-center mb-16'>
          <div className='inline-block'>
            <h2 className='text-4xl font-bold text-gray-900 mb-3'>
              The Essence of Naya Builders
            </h2>
            <div className='h-1 w-1/2 bg-[#f74401] mx-auto rounded-full'></div>
          </div>
          <p className='max-w-2xl mx-auto mt-6 text-gray-700 text-lg'>
            Discover the unique approach and vision that drives our pursuit of
            architectural excellence.
          </p>
        </div>

        {/* Main content area */}
        <div className='flex flex-col lg:flex-row gap-16 items-center'>
          {/* 3D rotating element */}
          <div
            className={`w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-16 opacity-0"
            }`}
          >
            <div
              ref={cubeRef}
              className='relative w-64 h-64 md:w-80 md:h-80 perspective-1000'
              onMouseMove={handleMouseMove}
              onMouseLeave={resetRotation}
            >
              <div
                className='w-full h-full transform-style-3d transition-transform duration-300 ease-out'
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
              >
                {/* Cube faces */}
                <div className='absolute inset-0 bg-[#f74401] opacity-80 transform translate-z-40 shadow-xl flex items-center justify-center p-8 rounded-lg'>
                  <div className='text-white text-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16 mx-auto mb-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                      />
                    </svg>
                    <h3 className='text-2xl font-bold'>Naya Builders</h3>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gray-800 opacity-80 transform rotate-y-90 translate-z-40 shadow-xl flex items-center justify-center p-8 rounded-lg'>
                  <div className='text-white text-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16 mx-auto mb-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                      />
                    </svg>
                    <h3 className='text-2xl font-bold'>QUALITY</h3>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gray-700 opacity-80 transform rotate-y-180 translate-z-40 shadow-xl flex items-center justify-center p-8 rounded-lg'>
                  <div className='text-white text-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16 mx-auto mb-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <h3 className='text-2xl font-bold'>DELIGHT</h3>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gray-600 opacity-80 transform rotate-y-270 translate-z-40 shadow-xl flex items-center justify-center p-8 rounded-lg'>
                  <div className='text-white text-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16 mx-auto mb-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M13 10V3L4 14h7v7l9-11h-7z'
                      />
                    </svg>
                    <h3 className='text-2xl font-bold'>INNOVATION</h3>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gray-900 opacity-80 transform rotate-x-90 translate-z-40 shadow-xl flex items-center justify-center p-8 rounded-lg'>
                  <div className='text-white text-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16 mx-auto mb-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                    <h3 className='text-2xl font-bold'>TEAMWORK</h3>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gray-500 opacity-80 transform rotate-x-270 translate-z-40 shadow-xl flex items-center justify-center p-8 rounded-lg'>
                  <div className='text-white text-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16 mx-auto mb-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <h3 className='text-2xl font-bold'>SUSTAINABILITY</h3>
                  </div>
                </div>
              </div>

              {/* Cube shadow */}
              <div className='absolute -bottom-10 left-0 right-0 mx-auto w-4/5 h-4 bg-black opacity-20 blur-md rounded-full'></div>

              {/* Interactive message */}
              <div className='absolute -bottom-20 left-0 right-0 text-center text-gray-500 text-sm'>
                <p>Hover to interact</p>
              </div>
            </div>
          </div>

          {/* Information tabs */}
          <div
            className={`w-full lg:w-1/2 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-16 opacity-0"
            }`}
          >
            {/* Tab navigation */}
            <div className='flex mb-8'>
              <button
                onClick={() => setActiveTab("philosophy")}
                className={`flex-1 py-3 px-4 text-center font-medium rounded-tl-lg rounded-bl-lg transition-all ${
                  activeTab === "philosophy"
                    ? "bg-[#f74401] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Philosophy
              </button>
              <button
                onClick={() => setActiveTab("approach")}
                className={`flex-1 py-3 px-4 text-center font-medium transition-all ${
                  activeTab === "approach"
                    ? "bg-[#f74401] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Approach
              </button>
              <button
                onClick={() => setActiveTab("difference")}
                className={`flex-1 py-3 px-4 text-center font-medium rounded-tr-lg rounded-br-lg transition-all ${
                  activeTab === "difference"
                    ? "bg-[#f74401] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Difference
              </button>
            </div>

            {/* Tab content */}
            <div className='bg-white p-8 rounded-lg shadow-lg'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                {tabContent[activeTab].title}
              </h3>
              <p className='text-gray-700 mb-6'>
                {tabContent[activeTab].content}
              </p>
              <ul className='space-y-3'>
                {tabContent[activeTab].points.map((point, index) => (
                  <li key={index} className='flex items-start'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 text-[#f74401] mr-2 flex-shrink-0'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <span className='text-gray-700'>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom banner - Connect with us */}
        <div
          className={`mt-24 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className='relative px-8 py-12 md:p-12'>
            {/* Background pattern */}
            <div className='absolute inset-0 opacity-10'>
              <svg
                width='100%'
                height='100%'
                xmlns='http://www.w3.org/2000/svg'
              >
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

            <div className='relative z-10 flex flex-col md:flex-row items-center justify-between'>
              <div className='mb-8 md:mb-0 md:mr-8'>
                <h3 className='text-3xl font-bold text-white mb-4'>
                  Let's Build Something Extraordinary Together
                </h3>
                <p className='text-gray-300 max-w-xl'>
                  Our passion for architectural excellence is matched only by
                  our dedication to creating meaningful relationships with our
                  clients. We'd love to hear about your vision and discuss how
                  we can bring it to life.
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <button
                  onClick={() =>
                    window.open("https://wa.me/9150324381", "_blank")
                  }
                  className='px-6 py-3 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-lg font-medium'
                >
                  <span className='flex items-center gap-2'>
                    <Calendar size={18} />
                    Schedule a Consultation
                  </span>
                </button>
                <button
                  onClick={() => navigate("/portfolio")}
                  className='px-6 py-3 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-lg font-medium'
                >
                  <span className='flex items-center gap-2'>
                    <FolderOpen size={18} />
                    View Our Portfolio
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Awards and recognitions */}
        {/* <div
          className={`mt-24 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className='text-center mb-12'>
            <h3 className='text-2xl font-bold text-gray-900'>
              Awards & Recognition
            </h3>
            <p className='text-gray-600 mt-2'>
              Our commitment to excellence has been recognized by industry
              leaders
            </p>
          </div>

          <div className='flex flex-wrap justify-center items-center gap-8 md:gap-16'>
            <div className='flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer group'>
              <div className='w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mb-2 group-hover:bg-[#f74401] transition-colors'>
                <span className='font-bold text-gray-600 group-hover:text-white transition-colors'>
                  A+
                </span>
              </div>
              <span className='text-sm text-gray-600'>
                Architecture Plus
                <br />
                Award 2022
              </span>
            </div>

            <div className='flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer group'>
              <div className='w-16 h-16 rounded-md bg-gray-300 flex items-center justify-center mb-2 group-hover:bg-[#f74401] transition-colors'>
                <span className='font-bold text-gray-600 group-hover:text-white transition-colors'>
                  GD
                </span>
              </div>
              <span className='text-sm text-gray-600'>
                Green Design
                <br />
                Excellence 2023
              </span>
            </div>

            <div className='flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer group'>
              <div className='w-16 h-16 rounded-lg bg-gray-300 flex items-center justify-center mb-2 group-hover:bg-[#f74401] transition-colors'>
                <span className='font-bold text-gray-600 group-hover:text-white transition-colors'>
                  RE
                </span>
              </div>
              <span className='text-sm text-gray-600'>
                Real Estate
                <br />
                Innovation 2021
              </span>
            </div>

            <div className='flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer group'>
              <div className='w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mb-2 group-hover:bg-[#f74401] transition-colors'>
                <span className='font-bold text-gray-600 group-hover:text-white transition-colors'>
                  CS
                </span>
              </div>
              <span className='text-sm text-gray-600'>
                Construction
                <br />
                Summit Award
              </span>
            </div>

            <div className='flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer group'>
              <div
                className='w-16 h-16 bg-gray-300 flex items-center justify-center mb-2 group-hover:bg-[#f74401] transition-colors'
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                }}
              >
                <span className='font-bold text-gray-600 group-hover:text-white transition-colors'>
                  ID
                </span>
              </div>
              <span className='text-sm text-gray-600'>
                Interior Design
                <br />
                Excellence 2024
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const TeamAndValues = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Core values data
  const coreValues = [
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 text-[#f74401]'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
          />
        </svg>
      ),
      title: "Integrity",
      description:
        "We uphold the highest standards of honesty and ethical conduct in every decision, interaction, and project we undertake.",
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 text-[#f74401]'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 10V3L4 14h7v7l9-11h-7z'
          />
        </svg>
      ),
      title: "Innovation",
      description:
        "We constantly push boundaries through creative thinking and cutting-edge solutions that elevate architectural experiences.",
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 text-[#f74401]'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
      ),
      title: "Collaboration",
      description:
        "We foster meaningful partnerships with clients, stakeholders, and team members to create exceptional results through unified vision.",
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 text-[#f74401]'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
      title: "Timeliness",
      description:
        "We respect the value of time, ensuring every project is delivered efficiently without compromising on quality or detail.",
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 text-[#f74401]'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
          />
        </svg>
      ),
      title: "Empathy",
      description:
        "We design with genuine understanding of our clients' needs, creating spaces that resonate with their lifestyle and aspirations.",
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 text-[#f74401]'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
          />
        </svg>
      ),
      title: "Sustainability",
      description:
        "We embrace environmentally conscious practices that minimize ecological impact while maximizing long-term value and efficiency.",
    },
  ];

  // Team stats data
  const stats = [
    { label: "Years of Excellence", value: 11 },
    { label: "Completed Projects", value: 104 },
    { label: "Expert Team Members", value: 45 },
    { label: "Client Satisfaction", value: "97%" },
  ];

  return (
    <div
      ref={sectionRef}
      className={`w-full py-24 bg-gradient-to-b from-white to-gray-50 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className='container mx-auto px-6 lg:px-12'>
        {/* Section heading */}
        <div className='text-center mb-16'>
          <div className='inline-block'>
            <h2 className='text-4xl font-bold text-gray-900 mb-3'>
              Our Guiding Principles
            </h2>
            <div className='h-1 w-2/3 bg-[#f74401] mx-auto rounded-full'></div>
          </div>
          <p className='max-w-2xl mx-auto mt-6 text-gray-700 text-lg'>
            What sets Naya Builders apart is not just what we build, but how and
            why we build it. Our core values form the foundation of every
            relationship and project we undertake.
          </p>
        </div>

        {/* Core values */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24'>
          {coreValues.map((value, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className='flex flex-col items-center text-center'>
                <div className='mb-4 p-3 bg-gray-50 rounded-full'>
                  {value.icon}
                </div>
                <h3 className='text-2xl font-semibold text-gray-900 mb-3'>
                  {value.title}
                </h3>
                <p className='text-gray-600'>{value.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive stats section */}
        <div className='relative overflow-hidden rounded-2xl bg-[#f74401] shadow-2xl'>
          <div className='absolute inset-0 bg-black bg-opacity-20'></div>
          <div className='relative z-10 py-16 px-8'>
            <div className='max-w-4xl mx-auto text-center mb-12'>
              <h3 className='text-3xl font-bold text-white mb-4'>
                Building Excellence By The Numbers
              </h3>
              <p className='text-white text-opacity-90 text-lg'>
                Our journey of architectural innovation and construction
                excellence is reflected in these achievements.
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-8 text-center border border-white border-opacity-20 transform transition-all duration-500 ${
                    isVisible
                      ? "translate-y-0 opacity-100 rotate-0"
                      : "translate-y-8 opacity-0 rotate-3"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 300}ms` }}
                >
                  <div className='text-5xl font-bold text-white mb-2'>
                    {stat.value}
                  </div>
                  <div className='text-white text-opacity-80'>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        {/* <div
          className={`mt-24 text-center max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <h3 className='text-3xl font-bold text-gray-900 mb-6'>
            Ready to Transform Your Vision into Reality?
          </h3>
          <p className='text-lg text-gray-700 mb-10'>
            At Naya Builders, we don't just build structures – we create living
            spaces that reflect your aspirations and enhance your life. Let's
            embark on this journey together.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <button className='px-8 py-4 bg-[#f74401] text-white rounded-md hover:bg-[#e03b00] transition-colors duration-300 shadow-lg transform hover:scale-105 text-lg font-medium'>
              Start Your Project
            </button>
            <button className='px-8 py-4 border-2 border-[#f74401] text-[#f74401] rounded-md hover:bg-[#f74401] hover:text-white transition-all duration-300 text-lg font-medium'>
              Meet Our Team
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

// Main component
export default function AboutMainSection() {
  return (
    <div className='bg-white min-h-screen w-full overflow-x-hidden'>
      <ScrollProgress />
      <ParallaxBackground />

      <main className='pt-16'>
        <div className='space-y-0'>
          {sections.map((section, index) => (
            <Section
              key={index}
              index={index}
              heading={section.heading}
              content={section.content}
              image={placeholders[index]}
            />
          ))}
          <Timeline />
          <TeamAndValues />
          <AboutSubSection />
        </div>
      </main>
    </div>
  );
}
