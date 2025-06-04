import { useState, useEffect, useRef } from "react";
import { MessageSquare, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  // Images for the carousel
  const images = ["/hero-cons-5.jpg", "/hero-cons-6.jpg", "/hero-con.jpg"];
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);
  const heroRef = useRef(null);
  const textContainerRef = useRef(null);
  const navigate = useNavigate();

  // Function to advance to the next image
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  // Set up automatic image transition
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextImage();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Parallax effect for mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current || !textContainerRef.current) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Subtle background movement - only apply to current image
      const currentImageEl = document.querySelector(".current-bg-image");
      if (currentImageEl) {
        currentImageEl.style.transform = `scale(1.05) translate(${
          x * 5 - 2.5
        }px, ${y * 5 - 2.5}px)`;
      }

      // Text container subtle floating effect
      textContainerRef.current.style.transform = `translate(${x * 10 - 5}px, ${
        y * 10 - 5
      }px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={heroRef} className='relative w-full h-screen overflow-hidden'>
      {/* Background Image Carousel with Parallax */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            currentImage === index
              ? "opacity-100 current-bg-image"
              : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            transform: `scale(${currentImage === index ? "1.05" : "1"})`,
            zIndex: currentImage === index ? 0 : -1,
            transition: "transform 0.3s ease-out, opacity 1s ease-in-out",
          }}
        />
      ))}

      {/* Dark Overlay with gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-10'></div>

      {/* Animated particles effect */}
      <div className='absolute inset-0 z-20'>
        <ParticlesBackground />
      </div>

      {/* Content Container */}
      <div className='relative z-30 h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16'>
        <div
          ref={textContainerRef}
          className='max-w-4xl mx-auto text-center transition-transform duration-300 ease-out'
        >
          {/* Main Heading with Animation */}
          <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight animate-fade-in'>
            We Enhance People's Living Through
            <span className='text-[#f74401]'> Architecture & Interiors</span>
          </h1>

          {/* Subheading with Animation */}
          <p className='text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed'>
            At Naya Builders, we bring your dream home to life with expert
            construction and design, creating interiors that reflect your unique
            personality and meet the needs of your family.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row justify-center gap-4 animate-button-appear'>
            {/* Primary CTA Button */}
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/9150324381?text=Hi%20Can%20you%20please%20share%20me%20the%20construction%20package%20please",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className='w-auto max-w-xs mx-auto sm:mx-0 bg-[#f74401] hover:bg-[#e03a00] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
            >
              <span className='flex items-center justify-center gap-2'>
                <MessageSquare size={18} />
                Talk to Our Experts
              </span>
            </button>

            {/* Secondary CTA Button for Pricing */}
            <button
              onClick={() => navigate("/pricing")}
              className='w-auto max-w-xs mx-auto sm:mx-0 bg-[#f74401] hover:bg-[#e03a00] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
            >
              <span className='flex items-center justify-center gap-2'>
                <Package size={18} />
                Explore Our Packages
              </span>
            </button>
          </div>
        </div>

        {/* Geometric decorative elements - construction themed */}
        <div className='hidden md:block absolute top-1/4 left-10 w-32 h-32 border-2 border-[#f74401]/30 rotate-45 animate-spin-slow'></div>
        <div className='hidden md:block absolute bottom-1/4 right-10 w-24 h-24 border-2 border-[#f74401]/30 animate-float-slow'></div>
        <div className='absolute top-1/2 right-1/4 w-16 h-16 bg-[#f74401]/10 blur-xl animate-pulse-slow'></div>
        <div className='absolute bottom-1/3 left-1/4 w-20 h-20 bg-[#f74401]/10 blur-xl animate-float-medium'></div>

        {/* Bottom scroll indicator */}
        <div className='absolute bottom-16 sm:bottom-24 left-0 right-0 flex justify-center'>
          <div className='animate-bounce'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 sm:h-8 sm:w-8 text-white opacity-70'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </div>
        </div>

        {/* Carousel Navigation Dots */}
        <div className='absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center space-x-2 sm:space-x-3'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImage(index);
                // Reset interval timer on manual click
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                }
                intervalRef.current = setInterval(nextImage, 5000);
              }}
              className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                currentImage === index
                  ? "bg-[#f74401] w-6 sm:w-8"
                  : "bg-white bg-opacity-50 hover:bg-opacity-80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes buttonAppear {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-15px, -15px) rotate(45deg);
          }
        }

        @keyframes floatMedium {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(15px, -25px);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-button-appear {
          animation: buttonAppear 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }

        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: floatMedium 12s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Particle background for added visual interest
const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 50; // Reduced particles for mobile

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: "rgba(255, 255, 255, 0.3)",
          speed: Math.random() * 0.5 + 0.1,
          direction: Math.random() * 360,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Move particles
        const radian = (particle.direction * Math.PI) / 180;
        particle.x += Math.cos(radian) * particle.speed;
        particle.y += Math.sin(radian) * particle.speed;

        // Reset particles when they go off-screen
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.x = Math.random() * canvas.width;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.y = Math.random() * canvas.height;
        }
      });

      requestAnimationFrame(drawParticles);
    }

    drawParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 w-full h-full'
      style={{ pointerEvents: "none" }}
    />
  );
};
