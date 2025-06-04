import { useState } from "react";
import {
  PlaneTakeoff,
  BookOpen,
  FileCode,
  Hammer,
  Building2,
  PaintBucket,
  Wrench,
} from "lucide-react";

export default function HowDoWeWorkSection() {
  const processSteps = [
    {
      id: 1,
      title: "Discovery Phase",
      description:
        "We begin with understanding your vision, requirements, and feasibility analysis.",
      icon: PlaneTakeoff,
      bgImage: "/work-1.jpg",
    },
    {
      id: 2,
      title: "Project Booking Phase",
      description:
        "Lock in your project through a streamlined booking system and initial formalities.",
      icon: BookOpen,
      bgImage: "/work-2.jpg",
    },
    {
      id: 3,
      title: "Design & Agreement Phase",
      description:
        "Our experts craft the design; we finalize agreements to align expectations.",
      icon: FileCode,
      bgImage: "/work-3.jpg",
    },
    {
      id: 4,
      title: "Working Drawings & Mobilization Phase",
      description:
        "Detailed working drawings are prepared, and the site is mobilized for execution.",
      icon: Hammer,
      bgImage: "/work-4.jpg",
    },
    {
      id: 5,
      title: "On-Site Construction, Interior & Landscape Designing",
      description:
        "Physical construction begins along with parallel interior and landscape planning.",
      icon: Building2,
      bgImage: "/work-5.jpg",
    },
    {
      id: 6,
      title: "Interior Fit-Outs, Landscapes & Delivery",
      description:
        "Finishing touches like interiors, landscaping, and final walkthrough are done.",
      icon: PaintBucket,
      bgImage: "/hero-6.jpg",
    },
    {
      id: 7,
      title: "Post-Delivery Maintenance",
      description:
        "We continue to support you with after-handover services and maintenance.",
      icon: Wrench,
      bgImage: "/work-7.png",
    },
  ];

  return (
    <section className='w-full pt-12 pb-20 px-4 bg-gray-50 mb-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Panel - Text Content */}
          <div className='lg:w-1/3 flex flex-col justify-center'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              <span className='text-black'>How Do </span>
              <span className='text-[#f74401]'>We Work</span>
            </h2>
            <p className='text-gray-700 text-lg'>
              We follow a structured, 7-step process that ensures timely and
              efficient completion of your dream construction project — from
              concept to keys in hand.
            </p>
          </div>

          {/* Right Panel - Process Cards Grid */}
          <div className='lg:w-2/3'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {processSteps.slice(0, 6).map((step) => (
                <ProcessCard key={step.id} step={step} />
              ))}
            </div>

            {/* Last card centered */}
            <div className='mt-4 flex justify-center'>
              <div className='w-full md:w-1/2 lg:w-1/3'>
                <ProcessCard step={processSteps[6]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = step.icon;

  return (
    <div
      className='h-64 w-full perspective-1000 cursor-pointer'
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full duration-700 transition-transform transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div
          className='absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg'
          style={{
            backgroundImage: `url(${step.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6'>
            <div className='bg-white bg-opacity-20 p-4 rounded-full mb-3'>
              <Icon size={32} color='white' />
            </div>
            <div className='flex items-center space-x-2 mb-2'>
              <span className='text-white text-lg font-bold'>{step.id}.</span>
              <h3 className='text-white text-lg font-bold text-center'>
                {step.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className='absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg bg-[#f74401] rotate-y-180'>
          <div className='flex h-full items-center justify-center p-6'>
            <p className='text-white text-center'>{step.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add custom CSS for 3D transforms
const style = document.createElement("style");
style.textContent = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;
document.head.appendChild(style);
