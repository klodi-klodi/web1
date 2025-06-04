import { useState, useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Simplified Portfolio Gallery Section with optimizations for React
export function PortfolioGallerySection() {
  const [filter, setFilter] = useState("all");
  const [loadedItems, setLoadedItems] = useState(8); // Initial items to show
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const loadingRef = useRef(null);

  // Updated projects data - portfolio1-9 first, then original images
  const projects = [
    // New portfolio1-9 images first
    {
      id: 1,
      category: "exterior",
      image: "/portfolio1.jpg",
      thumbnail: "/thumbnails/portfolio1-thumbnail.jpg",
      title: "Contemporary Home",
      location: "Chennai",
    },
    {
      id: 2,
      category: "interior",
      image: "/portfolio2.jpg",
      thumbnail: "/thumbnails/portfolio2-thumbnail.jpg",
      title: "Modern Interior Design",
      location: "Chennai",
    },
    {
      id: 3,
      category: "exterior",
      image: "/portfolio3.jpg",
      thumbnail: "/thumbnails/portfolio3-thumbnail.jpg",
      title: "Residential Project",
      location: "pallikaranai",
    },
    {
      id: 4,
      category: "exterior",
      image: "/portfolio4.jpg",
      thumbnail: "/thumbnails/portfolio4-thumbnail.jpg",
      title: "Suburban Home",
      location: "Chennai",
    },
    {
      id: 5,
      category: "interior",
      image: "/portfolio5.jpg",
      thumbnail: "/thumbnails/portfolio5-thumbnail.jpg",
      title: "Luxury Interior",
      location: "Chennai",
    },
    {
      id: 6,
      category: "exterior",
      image: "/portfolio6.jpg",
      thumbnail: "/thumbnails/portfolio6-thumbnail.jpg",
      title: "Family Residence",
      location: "Perungudi",
    },
    {
      id: 7,
      category: "exterior",
      image: "/portfolio7.jpg",
      thumbnail: "/thumbnails/portfolio7-thumbnail.jpg",
      title: "Contemporary Design",
      location: "Chennai",
    },
    {
      id: 8,
      category: "exterior",
      image: "/portfolio8.jpg",
      thumbnail: "/thumbnails/portfolio8-thumbnail.jpg",
      title: "Modern Architecture",
      location: "Chennai",
    },
    {
      id: 9,
      category: "exterior",
      image: "/portfolio9.jpg",
      thumbnail: "/thumbnails/portfolio9-thumbnail.jpg",
      title: "Residential Complex",
      location: "Chennai",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  // Open lightbox with specific image
  const openLightbox = (project) => {
    setCurrentImage(project);
    setLightboxOpen(true);
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    // Re-enable body scrolling
    document.body.style.overflow = "auto";
  };

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && loadedItems < filteredProjects.length) {
        setLoadedItems((prevCount) =>
          Math.min(prevCount + 4, filteredProjects.length)
        );
      }
    }, options);

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loadedItems, filteredProjects.length]);

  // Reset loaded items when filter changes
  useEffect(() => {
    setLoadedItems(8); // Reset to initial count when filter changes
  }, [filter]);

  // Cleanup effect for lightbox
  useEffect(() => {
    // Cleanup function to ensure body scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section id='portfolio-gallery' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        {/* Portfolio Introduction */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Crafting Excellence
          </h2>
          <div className='w-24 h-1 bg-[#f74401] mx-auto mb-6'></div>
          <p className='text-gray-600 max-w-3xl mx-auto'>
            Explore our diverse portfolio showcasing our commitment to quality
            craftsmanship and innovative design. Each project reflects our
            dedication to excellence and attention to detail.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              filter === "all"
                ? "bg-[#f74401] text-white font-semibold"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All Projects
          </button>

          <button
            onClick={() => setFilter("exterior")}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              filter === "exterior"
                ? "bg-[#f74401] text-white font-semibold"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Exterior
          </button>

          <button
            onClick={() => setFilter("interior")}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              filter === "interior"
                ? "bg-[#f74401] text-white font-semibold"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Interior Design
          </button>
        </div>

        {/* Gallery Grid with LazyLoadImage and Click Functionality */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProjects.slice(0, loadedItems).map((project) => (
            <div
              key={project.id}
              className='group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'
              onClick={() => openLightbox(project)}
            >
              <div className='relative h-64 overflow-hidden bg-gray-100'>
                <LazyLoadImage
                  src={project.image}
                  alt={project.title}
                  effect='blur'
                  height='100%'
                  width='100%'
                  className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500'
                  wrapperClassName='w-full h-full'
                  threshold={300}
                  placeholderSrc='/placeholder-image.jpg' // Fallback placeholder
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70'></div>
              </div>
              <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
                <h3 className='font-semibold text-lg'>{project.title}</h3>
                <p className='text-sm text-gray-200'>{project.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator and infinite scroll trigger */}
        {loadedItems < filteredProjects.length && (
          <div ref={loadingRef} className='text-center mt-10'>
            <button
              onClick={() =>
                setLoadedItems((prev) =>
                  Math.min(prev + 8, filteredProjects.length)
                )
              }
              className='px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors'
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4'>
          <div className='relative w-full max-w-6xl'>
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className='absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all z-10'
              aria-label='Close lightbox'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>

            {/* Full size image */}
            <div className='relative'>
              <img
                src={currentImage.image}
                alt={currentImage.title}
                className='w-full h-auto max-h-screen object-contain mx-auto'
              />

              {/* Image info */}
              <div className='absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white'>
                <h3 className='font-semibold text-xl'>{currentImage.title}</h3>
                <p className='text-gray-200'>{currentImage.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Simple Portfolio Page Component
export default function PortfolioPage() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Only Portfolio Gallery Section */}
      <PortfolioGallerySection />
    </div>
  );
}
