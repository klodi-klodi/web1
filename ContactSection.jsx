import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageSquare,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Send,
  Check,
  AlertCircle,
} from "lucide-react";

export default function ContactSection() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const [selectedLocation, setSelectedLocation] = useState("chennai");

  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.service) newErrors.service = "Please select a service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitStatus("submitting");

      try {
        const response = await fetch("https://formspree.io/f/mdkglzbj", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitStatus("success");
          // Reset form after successful submission
          setTimeout(() => {
            setFormData({
              name: "",
              phone: "",
              email: "",
              service: "",
              message: "",
            });
            setSubmitStatus(null);
          }, 3000);
        } else {
          setSubmitStatus("error");
          setTimeout(() => {
            setSubmitStatus(null);
          }, 3000);
        }
      } catch {
        setSubmitStatus("error");
        setTimeout(() => {
          setSubmitStatus(null);
        }, 3000);
      }
    }
  };

  // Contact details based on location
  const locations = {
    chennai: {
      address: "No:9/5, Suresh Nagar, Selaiyur, Chennai-600073",
      phone: "+91 9150324381",
    },
    nagercoil: {
      address: "3/267 B, Alamparai Road, Parvathipuram",
      phone: "+91 9566449911",
    },
  };

  // Common data
  const timings = "Mon–Sat: 10:00 AM – 08:00 PM";
  const email = "nayabuilders1@gmail.com ";

  // Service options
  const serviceOptions = [
    { value: "", label: "What are you looking for?" },
    { value: "inquiry", label: "General Inquiry" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "interior", label: "Interior Services" },
    { value: "turnkey", label: "Turnkey Construction" },
    { value: "consultation", label: "Design Consultation" },
    { value: "other", label: "Other Services" },
  ];

  return (
    <div
      id='contact-section'
      className={`w-full bg-white py-16 px-4 md:px-8 lg:px-16 overflow-hidden mt-10 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transition: "opacity 1s ease-out" }}
    >
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-center text-3xl md:text-4xl font-bold mb-16 text-gray-800 relative'>
          <span className='relative inline-block'>
            Get In Touch
            <span className='absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-[#f74401]'></span>
          </span>
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Left Column - Contact Information */}
          <div
            className={`rounded-xl shadow-lg overflow-hidden transform ${
              isVisible ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{
              transition:
                "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            <div className='h-full bg-white bg-opacity-95 relative'>
              {/* Blueprint-style background */}
              <div
                className='absolute inset-0 opacity-5 pointer-events-none'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h98v98H1z' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Cpath d='M0 25h100M0 50h100M0 75h100M25 0v100M50 0v100M75 0v100' fill='none' stroke='%23000' stroke-width='0.25'/%3E%3C/svg%3E")`,
                  backgroundSize: "50px 50px",
                }}
              ></div>

              <div className='p-8 md:p-10 relative z-10'>
                <h3 className='text-2xl font-bold mb-8 text-[#f74401]'>
                  Contact Information
                </h3>

                {/* Contact Details */}
                <div className='space-y-6'>
                  <div className='flex items-start'>
                    <div className='flex justify-center items-center w-10 h-10 rounded-full bg-[#fceae6] flex-shrink-0 mr-4'>
                      <MapPin size={20} className='text-[#f74401]' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='text-sm font-semibold text-[#f74401] mb-1'>
                        Our Address
                      </h4>
                      <p className='text-gray-700'>
                        {locations[selectedLocation].address}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='flex justify-center items-center w-10 h-10 rounded-full bg-[#fceae6] flex-shrink-0 mr-4'>
                      <Phone size={20} className='text-[#f74401]' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='text-sm font-semibold text-[#f74401] mb-1'>
                        Phone Number
                      </h4>
                      <p className='text-gray-700'>
                        {locations[selectedLocation].phone}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='flex justify-center items-center w-10 h-10 rounded-full bg-[#fceae6] flex-shrink-0 mr-4'>
                      <Clock size={20} className='text-[#f74401]' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='text-sm font-semibold text-[#f74401] mb-1'>
                        Working Hours
                      </h4>
                      <p className='text-gray-700'>{timings}</p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='flex justify-center items-center w-10 h-10 rounded-full bg-[#fceae6] flex-shrink-0 mr-4'>
                      <Mail size={20} className='text-[#f74401]' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='text-sm font-semibold text-[#f74401] mb-1'>
                        Email Address
                      </h4>
                      <p className='text-gray-700'>{email}</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className='mt-12'>
                  <h4 className='text-sm font-semibold text-[#f74401] mb-5'>
                    Follow Us On
                  </h4>
                  <div className='flex space-x-4'>
                    {[
                      {
                        icon: Facebook,
                        link: "https://www.facebook.com/profile.php?id=61576160222061",
                      },
                      {
                        icon: Instagram,
                        link: "https://www.instagram.com/naya_builders_/",
                      },
                      {
                        icon: Youtube,
                        link: "https://www.youtube.com/channel/UCFHa3N1PcZH63X90vdziPgw",
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        className='flex justify-center items-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-[#f74401] hover:text-white transform hover:scale-110 transition-all duration-300'
                        aria-label={`Follow us on ${social.icon.name}`}
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            className={`bg-white rounded-xl shadow-lg p-8 md:p-10 transform ${
              isVisible ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              transition:
                "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s",
            }}
          >
            <div className='mb-8'>
              <h3 className='text-2xl font-bold text-[#f74401] mb-2'>
                Get In Touch With Us
              </h3>
              <p className='text-gray-600'>
                Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <div className='relative'>
              <form
                onSubmit={handleSubmit}
                className='space-y-6'
                action='https://formspree.io/f/mqaqdpod'
                method='POST'
              >
                {/* Name Input */}
                <div className='relative'>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Your Full Name *'
                    className={`w-full px-4 py-3 border ${
                      errors.name
                        ? "border-red-500"
                        : activeField === "name"
                        ? "border-[#f74401]"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f74401] focus:ring-opacity-50 transition-all duration-300`}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                  />
                  {errors.name && (
                    <div className='text-red-500 text-sm mt-1 flex items-center'>
                      <AlertCircle size={14} className='mr-1' />
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <div className='relative'>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='Your Phone Number *'
                    className={`w-full px-4 py-3 border ${
                      errors.phone
                        ? "border-red-500"
                        : activeField === "phone"
                        ? "border-[#f74401]"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f74401] focus:ring-opacity-50 transition-all duration-300`}
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField(null)}
                  />
                  {errors.phone && (
                    <div className='text-red-500 text-sm mt-1 flex items-center'>
                      <AlertCircle size={14} className='mr-1' />
                      {errors.phone}
                    </div>
                  )}
                </div>

                {/* Email Input */}
                <div className='relative'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Your Email Address *'
                    className={`w-full px-4 py-3 border ${
                      errors.email
                        ? "border-red-500"
                        : activeField === "email"
                        ? "border-[#f74401]"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f74401] focus:ring-opacity-50 transition-all duration-300`}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                  />
                  {errors.email && (
                    <div className='text-red-500 text-sm mt-1 flex items-center'>
                      <AlertCircle size={14} className='mr-1' />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Service Dropdown */}
                <div className='relative'>
                  <select
                    id='service'
                    name='service'
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border appearance-none ${
                      errors.service
                        ? "border-red-500"
                        : activeField === "service"
                        ? "border-[#f74401]"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f74401] focus:ring-opacity-50 transition-all duration-300 bg-white text-gray-500`}
                    onFocus={() => setActiveField("service")}
                    onBlur={() => setActiveField(null)}
                  >
                    {serviceOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.value === ""}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500'>
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                  {errors.service && (
                    <div className='text-red-500 text-sm mt-1 flex items-center'>
                      <AlertCircle size={14} className='mr-1' />
                      {errors.service}
                    </div>
                  )}
                </div>

                {/* Message Textarea */}
                <div className='relative'>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='Tell us more about your project (optional)'
                    rows={4}
                    className={`w-full px-4 py-3 border ${
                      activeField === "message"
                        ? "border-[#f74401]"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f74401] focus:ring-opacity-50 transition-all duration-300`}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField(null)}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={
                    submitStatus === "submitting" || submitStatus === "success"
                  }
                  className={`w-full py-4 rounded-lg transition-all duration-500 flex items-center justify-center font-medium ${
                    submitStatus === "success"
                      ? "bg-green-600"
                      : "bg-[#f74401] hover:bg-[#e33d00]"
                  } text-white transform hover:scale-[1.02] hover:shadow-lg`}
                >
                  {submitStatus === "submitting" ? (
                    <>
                      <svg
                        className='animate-spin -ml-1 mr-2 h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      SENDING...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <Check size={20} className='mr-2' />
                      SENT SUCCESSFULLY!
                    </>
                  ) : (
                    <>
                      <Send size={18} className='mr-2' />
                      SUBMIT
                    </>
                  )}
                </button>
              </form>

              {/* Form Success Animation */}
              {submitStatus === "success" && (
                <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10'>
                  <div className='text-center p-8 rounded-lg transform scale-in-center'>
                    <div className='flex justify-center mb-4'>
                      <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center'>
                        <Check size={32} className='text-green-600' />
                      </div>
                    </div>
                    <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                      Thank You!
                    </h3>
                    <p className='text-gray-600'>
                      We've received your message and will get back to you
                      shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Google Maps Integration */}
      <div className='w-full mt-16'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1560.3906613479714!2d80.1402184382551!3d12.922104422070124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a525fb616c21a17%3A0xd0db2093849059f9!2sNo9%2F5%2C%20Naya%20Builders%2C%20Suresh%20Nagar%2C%20Selaiyur%2C%20Chennai%2C%20Tamil%20Nadu%20600073!3m2!1d12.9219166!2d80.141348!5e0!3m2!1sen!2sin!4v1746552034157!5m2!1sen!2sin'
          width='100%'
          height='450'
          style={{ border: 0 }}
          allowFullScreen=''
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          className='rounded-xl shadow-lg'
        />
      </div>
    </div>
  );
}
