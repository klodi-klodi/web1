import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonial() {
  // Use ref to track the current index across renders
  const currentIndexRef = useRef(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Senthil K",
      role: "Living Room Remodeling",
      image: "/review1.png",
      stars: 5,
      date: "2 weeks ago",
      quote:
        "I'm so pleased with the work done by Naya Builders! They remodeled my living room beautifully, and the team was a pleasure to work with. Their attention to detail is commendable. I highly recommend them.",
    },
    {
      id: 2,
      name: "Ditto Senthil",
      role: "Interior Painting",
      image: "/review2.png",
      stars: 5,
      date: "1 month ago",
      quote:
        "Recently had done our house interior painting and it's all done clean n clear within promise dates and also the amount as discussed earlier. Thanks for the work and grateful. Will be in touch for future plans too. Well done Naya Builders.",
    },
    {
      id: 3,
      name: "Seetha Raman",
      role: "Custom Home Building",
      image: "/review3.png",
      stars: 5,
      date: "2 months ago",
      quote:
        "When I first talked to the best construction company, I knew about their potential. Then, their on-time project completion made me leave in awe. The best part of hiring the Naya Builders is their budget-friendly solution and affordable prices for better customer satisfaction. Highly recommended. Experienced wonderful job on custom home building.",
    },
    {
      id: 4,
      name: "Ashok Kumar",
      role: "Civil Works",
      image: "/review4.png",
      stars: 5,
      date: "1 month ago",
      quote:
        "Excellent civil works, the quality of the products used by them are top notch and on time to project completed definitely will refer to all of my contacts.",
    },
    {
      id: 5,
      name: "MKN D",
      role: "Dream Home Project",
      image: "/review5.png",
      stars: 5,
      date: "3 months ago",
      quote:
        "Naya Builders made my dream home a reality. They were professional from start to finish and the communication was excellent throughout the entire build. They really took the time to understand what I wanted and provided insightful suggestions to improve the project. Best home at affordable price with modern innovation.",
    },
    {
      id: 6,
      name: "Yugender Yugi",
      role: "New Home Construction",
      image: "/review6.png",
      stars: 5,
      date: "2 months ago",
      quote:
        "The builder did a fantastic job bringing my new home to life. Everything was completed beautifully and delivered right on time. I'm genuinely impressed with the quality of work and the professionalism shown throughout the entire journey!",
    },
    {
      id: 7,
      name: "Satheesh Kumar",
      role: "Studio Flat Project",
      image: "/review7.png",
      stars: 5,
      date: "3 months ago",
      quote:
        "NAYA Builders completed our studio flat project along with elevation, and we're extremely satisfied with the results. They finished the project on time and within budget. The team was professional and maintained excellent communication throughout the construction process.",
    },
    {
      id: 8,
      name: "M C",
      role: "Home and Parking Renovation",
      image: "/review8.png",
      stars: 5,
      date: "1 month ago",
      quote:
        "Naya builder's team did an outstanding job on my home and parking renovation. They worked quickly, finished with flawless quality, and were a pleasure to deal with. Highly recommend for top-tier results!",
    },
    {
      id: 9,
      name: "Mukilan K",
      role: "House Renovation",
      image: "/review9.png",
      stars: 5,
      date: "2 months ago",
      quote:
        "We renovated our house with Naya Builders the quality of work is first class, on time delivery. Absolute value for money, I will definitely recommend them to my friends and family.",
    },
    {
      id: 10,
      name: "Vikram Balaji",
      role: "Building Rework",
      image: "/review10.png",
      stars: 5,
      date: "3 months ago",
      quote:
        "I am extremely impressed with their work I have given rework for my building they done their work best, genuine and cost effective.",
    },
    {
      id: 11,
      name: "Manoj Kumar",
      role: "New Home Construction",
      image: "/review11.png",
      stars: 5,
      date: "1 month ago",
      quote:
        "Trusted builder, on time handing over, builder was transparent, happy to our new home.",
    },
  ];

  // Calculate average rating
  const averageRating = (
    testimonials.reduce((acc, curr) => acc + curr.stars, 0) /
    testimonials.length
  ).toFixed(1);

  // Update total slides on component mount
  useEffect(() => {
    setTotalSlides(testimonials.length);
  }, [testimonials.length]);

  // Handle touch start
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      goToNext();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      goToPrev();
    }
  };

  // Handle previous slide
  const goToPrev = () => {
    const newIndex = (currentIndexRef.current - 1 + totalSlides) % totalSlides;
    currentIndexRef.current = newIndex;
    setSlideIndex(newIndex);
  };

  // Handle next slide
  const goToNext = () => {
    const newIndex = (currentIndexRef.current + 1) % totalSlides;
    currentIndexRef.current = newIndex;
    setSlideIndex(newIndex);
  };

  // Go to specific slide from dots navigation
  const goToSlide = (index) => {
    currentIndexRef.current = index;
    setSlideIndex(index);
  };

  return (
    <section className='w-full pt-12 pb-20 px-4 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col items-center justify-between mb-8'>
          <div className='w-full flex justify-between items-center mb-6'>
            <div>
              <h2 className='text-3xl font-bold mb-2 flex items-center'>
                <span className='text-gray-800'>What Our </span>
                <span className='text-[#f74401] ml-1'>Clients Say</span>
              </h2>
              <div className='flex items-center'>
                <div className='flex mr-2'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < Math.floor(averageRating) ? "#FBBC05" : "none"}
                      color={
                        i < Math.floor(averageRating) ? "#FBBC05" : "#e2e8f0"
                      }
                    />
                  ))}
                </div>
                <span className='font-bold text-lg'>{averageRating}</span>
                <span className='text-gray-500 ml-2'>
                  ({testimonials.length} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Carousel Container */}
          <div
            className='relative w-full'
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className='overflow-hidden'>
              <div
                className='flex transition-transform duration-500 ease-in-out'
                style={{
                  transform: `translateX(-${slideIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className='w-full flex-shrink-0 px-2'
                  >
                    <div className='bg-white rounded-lg shadow-md p-6 h-full border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
                      <div className='flex items-center mb-4'>
                        <div className='w-10 h-10 rounded-full overflow-hidden mr-3'>
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            {testimonial.name}
                          </h3>
                          <div className='flex items-center'>
                            <div className='text-xs text-gray-500'>
                              {testimonial.date}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='flex mb-3'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < testimonial.stars ? "#FBBC05" : "none"}
                            color={
                              i < testimonial.stars ? "#FBBC05" : "#e2e8f0"
                            }
                          />
                        ))}
                      </div>

                      <p className='text-gray-700 text-sm line-clamp-4'>
                        {testimonial.quote}
                      </p>

                      <div className='mt-4 pt-3 border-t border-gray-100'>
                        <p className='text-xs text-gray-500'>
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className='flex justify-center space-x-2 mt-6'>
              <button
                onClick={goToPrev}
                className='p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100'
                aria-label='Previous review'
              >
                <ChevronLeft size={20} color='#333' />
              </button>
              <button
                onClick={goToNext}
                className='p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100'
                aria-label='Next review'
              >
                <ChevronRight size={20} color='#333' />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className='flex justify-center mt-4'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`mx-1 w-2 h-2 rounded-full transition-all duration-300 
                    ${slideIndex === index ? "bg-blue-500" : "bg-gray-300"}`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
