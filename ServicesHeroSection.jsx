import { useEffect, useRef } from "react";

export default function ServicesHeroSection() {
  // Parallax effect for mouse movement
  const heroRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current || !textContainerRef.current) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Subtle background movement
      heroRef.current.style.backgroundPosition = `${50 + x * 2}% ${
        50 + y * 2
      }%`;

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
    <div
      ref={heroRef}
      className='relative w-full h-[100vh] overflow-hidden bg-fixed'
      style={{
        backgroundImage: "url('/service-hero.jpg')", // Replace with your construction image
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-position 0.3s ease-out",
      }}
    >
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
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight animate-fade-in'>
            <span className='text-[#f74401]'>Premium</span> Construction &
            Interior Services
          </h1>

          {/* Subheading with Animation */}
          <p className='text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed'>
            Bringing your vision to life with exceptional craftsmanship and
            attention to detail. From foundation to finishing touches, we
            deliver excellence on every project.
          </p>

          {/* CTA Button */}
          <a
            href='#services-list'
            className='inline-block bg-[#f74401] hover:bg-[#e03a00] text-white font-semibold px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-button-appear'
          >
            <span className='flex items-center'>
              Explore Our Services
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg> */}
            </span>
          </a>
        </div>

        {/* Geometric decorative elements - construction themed */}
        <div className='absolute top-1/4 left-10 w-32 h-32 border-2 border-[#f74401]/30 rotate-45 animate-spin-slow'></div>
        <div className='absolute bottom-1/4 right-10 w-24 h-24 border-2 border-[#f74401]/30 animate-float-slow'></div>
        <div className='absolute top-1/2 right-1/4 w-16 h-16 bg-[#f74401]/10 blur-xl animate-pulse-slow'></div>
        <div className='absolute bottom-1/3 left-1/4 w-20 h-20 bg-[#f74401]/10 blur-xl animate-float-medium'></div>

        {/* Quality badges */}
        <div className='absolute top-16 right-16 md:block hidden'>
          <div className='bg-white/10 backdrop-blur-sm p-3 rounded-full w-24 h-24 flex items-center justify-center animate-float-slow'>
            <span className='text-white text-xs font-semibold text-center'>
              PREMIUM QUALITY
            </span>
          </div>
        </div>

        <div className='absolute bottom-36 left-16 md:block hidden'>
          <div className='bg-white/10 backdrop-blur-sm p-3 rounded-full w-20 h-20 flex items-center justify-center animate-float-medium'>
            <span className='text-white text-xs font-semibold text-center'>
              TRUSTED
            </span>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className='absolute bottom-24 left-0 right-0 flex justify-center'>
          <div className='animate-bounce'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 text-white opacity-70'
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
    const particleCount = 50;

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
