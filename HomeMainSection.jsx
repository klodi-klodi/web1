import React, { useState, useEffect, useRef } from "react";

// Create placeholder images
const placeholders = [
  "/section-1.jpg",
  "/portfolio1.jpg",
  "/section-3.jpg",
  "/portfolio3.jpg",
  "/section-5.jpg",
  "/portfolio6.jpg",
  "/section-7.jpg",
];

// Main section data
const sections = [
  {
    heading:
      "Building Dreams with Trust – Chennai’s Most Reliable Construction Company",
    content:
      "At Naya Builders, we take pride in being one of the best builders in Chennai for both residential and commercial projects. With a solid track record, we offer end-to-end construction services tailored to your needs—whether it’s luxury villas, compact apartments, office spaces, or retail complexes. As one of the top construction companies in Chennai, we’re committed to quality, timely delivery, innovative designs, and transparent pricing. So if you're looking for trusted house constructors in Chennai or a reliable commercial builder near you, Naya Builders is here to bring your vision to life—brick by brick.",
  },
  {
    heading: "Building Landmarks with Excellence – One Project at a Time",
    content:
      "At Naya Builders, we are more than just a construction company – we are visionaries and creators of spaces that matter. As one of the top builders in Chennai, we understand the evolving architectural trends and the importance of blending aesthetic appeal with functionality. Whether it's crafting elegant villas, modern apartments, or multi-storey commercial buildings, our team ensures precision, innovation, and long-term durability in every structure.",
  },
  {
    heading: "Chennai’s Trusted Residential Construction Partner",
    content:
      "When it comes to building homes, trust and quality matter most. Naya Builders has earned a solid reputation as one of the best home builders in Chennai by delivering custom-built homes that match the unique aspirations of every client. From planning and design to approvals and handover, we offer a complete turnkey solution backed by transparent communication and timely delivery. Whether you’re looking for a compact budget home or a luxurious independent villa, we make sure you move into a space you’re proud to call your own.",
  },
  {
    heading: "Your Go-To Commercial Construction Company in Chennai",
    content:
      "Naya Builders is recognized among the top commercial construction companies in Chennai for our ability to deliver spaces that drive business success. Our portfolio includes shopping complexes, corporate offices, restaurants, co-working hubs, and more. As a top 10 construction company in Chennai, we ensure every commercial project is optimized for safety, accessibility, and future scalability. We work closely with developers and investors to bring commercially viable structures to life—on time and within budget.",
  },
  {
    heading: "What Makes Naya Builders the No.1 Choice in Chennai?",
    content:
      "With over 10 years of experience, Naya Builders has risen to become the No. 1 builder in Chennai, trusted by hundreds of families and business owners. Our clients appreciate our transparent pricing, ethical practices, skilled workforce, and modern construction techniques. As one of the top house constructors in Chennai, we’re constantly innovating to exceed expectations and set new benchmarks in the city’s construction landscape.",
  },
  {
    heading: "Local Expertise with a Chennai Edge",
    content:
      "Being based in Chennai gives us a deep understanding of the city’s construction regulations, soil quality, environmental concerns, and architectural trends. This local insight helps us avoid delays, optimize material usage, and align projects with both government norms and client expectations. That’s why Naya Builders is consistently rated among the top-rated builders in Chennai on Google and local listings.",
  },
  {
    heading:
      "Save More, Get More – Achieve Your Dream Home with Our Turnkey Solution",
    content:
      "Naya Builders saves you up to 20% by managing everything, eliminating the need for separate contractors or consultants.",
  },
];

// Section component with intersection observer for animations
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
              backgroundImage: "url('/main-section-bg.jpg')",
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
            alt={`Section ${index + 1}`}
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

// Parallax background component
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

// Scroll progress indicator
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

// Main component
export default function AlternatingLayout() {
  return (
    <div className='bg-white min-h-screen w-full overflow-x-hidden'>
      <ScrollProgress />
      <ParallaxBackground />

      <main className='pt-0'>
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
        </div>
      </main>
    </div>
  );
}
