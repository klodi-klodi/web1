import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
  Plus,
  Minus,
  Phone,
  MessageSquare,
  Calendar,
} from "lucide-react";

export default function PricingMainSection() {
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const navigate = useNavigate();

  // Modified to expand/collapse the same section across all packages
  const toggleSection = (sectionKey) => {
    const allPackagesForSection = {};

    // Check if any package has this section expanded
    let isAnyExpanded = false;
    packages.forEach((_, packageIndex) => {
      const key = `${packageIndex}-${sectionKey}`;
      if (expandedSections[key]) {
        isAnyExpanded = true;
      }
    });

    // Toggle all packages for this section based on current state
    packages.forEach((_, packageIndex) => {
      const key = `${packageIndex}-${sectionKey}`;
      allPackagesForSection[key] = !isAnyExpanded;
    });

    setExpandedSections((prev) => ({
      ...prev,
      ...allPackagesForSection,
    }));
  };

  const toggleFaq = (index) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Helper function to convert markdown-style bold text to JSX
  const formatBoldText = (text) => {
    if (!text) return "";

    // Split the text by the markdown bold pattern **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      // Check if this part is a bold section
      if (part.startsWith("**") && part.endsWith("**")) {
        // Remove the ** markers and return as bold element
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      // Return regular text
      return part;
    });
  };

  const packages = [
    {
      name: "Basic Package",
      price: "₹1999",
      unit: "/ sqft",
      description:
        "Perfect for budget-conscious homeowners seeking quality construction",
      colors:
        "bg-gradient-to-b from-white to-gray-50 border-gray-200 hover:border-orange-500",
      details: {
        Design: [
          "**SCHEME DRAWING:** ALL FLOORS (2D)",
          "**ELEVATION DESIGN:** (3D)",
        ],
        Structure: [
          "**Basement Height:** Upto 3 feet",
          "**Steel:** Any ISI Brand",
          "**AAC/FLYASH Brick:** For Partition walls. 8-Inch Thick Exterior Walls | 4 Inch Thick Inner Walls",
          "**Cement:** Penna / Priya",
          "**M Sand:** Blockwork & All Masonry Works",
          "**P Sand:** Plastering Works",
          "**Concrete Grade:** M20 (Manual Mix)",
          "**Ceiling Height:** 10 Feet",
          "**Steel Reinforcement:** As per Standard",
          '**Parapet Wall:** 3 Feet Height | 4" Thick (Only for Floor with Headroom)',
        ],
        "Bathroom & Plumbing": [
          "**Wall Tiles:** Upto 7' Height. Size 2'X1' Vitrified Tile. Upto ₹40/Sqft",
          "**Bath & CP Fittings:** Cera | Upto ₹12000 Per Bathroom | Floor Mounted EWC, Wall Mounted Wash Basin, Pillar Tap, Health Faucet, Shower Set, 2-in-1 Wall Mixer",
          "**Plumbing Pipes & Fittings:** Inner CPVC, Outer PVC. Brands: Any ISI Brand",
          "**Overhead Tank:** 1000 litres Sintex | 3 Layered | UV Protected | White Colour",
        ],
        Flooring: [
          "**Living, Dining, Bedrooms & Kitchen:** 2'X2' | Vitrified Tiles Upto ₹45/Sqft. Anuj / Sparrow",
          "**Balcony & Utility:** Size 1'X1' | Upto 35/Sqft",
          "**Staircase:** Size 1'X1' Tile : Upto ₹35/sqft",
          "**Car Parking:** 1'X1' Parking Tile | Upto ₹35/Sqft",
          "**Terrace Flooring:** Screed Concreting with Waterproofing",
        ],
        "Kitchen & Dining": [
          "**Wall Tile:** Vitrified Tile (2'X1') | Upto ₹45/Sqft",
          "**Sink Faucet:** Upto ₹900 / No",
          "**Kitchen Sink:** Stainless Steel single bowl Upto ₹2800",
          "**Dining:** Wall Mounted Wash Basin",
          "**Kitchen Granite Top:** Upto ₹90/Sqft",
        ],
        "Doors, Windows & Railing": [
          '**Main Door:** Malaysian Teak Door & Teak Frame | 32mm Thickness | 5"X3" Thick Frame | 7\' Height 3.5 Feet Width',
          "**Room Doors:** White Panel Door | Sal Wood Frame | 7'X3'",
          "**Bathroom Door:** PVC Door | 7'X2.5'",
          "**Windows:** Aluminium Sliding window | Max 4' X 4' | One Window Per Room | 5mm Clear Glass",
          "**Staircase Railing:** MS Railing",
          "**Balcony Railing:** MS Railing",
        ],
        Painting: [
          "**Inner Wall Putty:** 2 coats of Wall Putty | Any ISI Brand",
          "**Wall Painting:** 1 coat of Primer | 2 coats of Tractor emulsion | Any ISI Brand",
          "**Ceiling Painting:** 1 coat of Primer | 2 coats of Tractor emulsion | Any ISI Brand",
          "**Exterior Paint:** 1 coat of Primer | 2 Coats of Ace | Any ISI Brand",
        ],
        Electrical: [
          "**Wires –** Orbit",
          "**Switches –** Fybros",
          "**Bedroom:** 2 Switch Box(8-Module). One at Entrance and one at Bed-side",
          "**Bathroom:** 1 Switch Box(Inner) 4-Module, 1 Switch Box(Outer) 3-Module. Point for Heater & Exhaust",
          "**Living Room:** Upto 4 Switch Box (8 Module)",
          "**Dining:** 1 Switch (8-Module)",
          "**Pooja:** 1 Switch (3-Module)",
          "**Kitchen:** 3 Switch Box (6 Module). Point for HOB, Chimney, RO",
          "**Utility:** 1 Switch Box (4-Module)",
          "**AC Points:** 1 for Each Bedroom",
          "**Entrance:** 1 Switch Box (6-Module)",
          "**Balconies:** 1 Switch Box (3-Module)",
        ],
        "What's not included": [
          "**Compound Wall-**1950/-RFT (4'' Solid Block)",
          "**Gate**",
          "**Sump & Septic Tank** @ 24/Litre",
          "**Lift, SetBack Area**",
          "**Electricity Connection**",
          "**Building Plan Approval**",
          "**Elevation Special Materials**",
        ],
      },
      whatsappLink:
        "https://wa.me/9150324381?text=Hi,%20I%20had%20planned%20to%20choose%20your%20Basic%20Construction%20package.%20Can%20I%20get%20some%20more%20info%20about%20that%20package?%20",
    },
    {
      name: "Standard Package",
      price: "₹2199",
      unit: "/ sqft",
      description:
        "Enhanced features with premium materials and better finishes",
      popular: true,
      colors:
        "bg-gradient-to-b from-white to-gray-50 border-gray-200 hover:border-orange-500",
      details: {
        Design: [
          "**SCHEME DRAWING:** ALL FLOORS (2D)",
          "**ELEVATION DESIGN:** (3D)",
          "**WORKING DRAWING:** ALL FLOORS (2D)",
        ],
        Structure: [
          "**Basement Height:** Upto 3 feet",
          "**Steel:** Arun TMT / GBR or Equivalent",
          "**Chamber Bricks:** For Partition walls. 9-Inch Thick Exterior Walls | 4 Inch Thick Inner Walls",
          "**Cement:** Ramco / Dalmia",
          "**M Sand:** Blockwork & All Masonry Works",
          "**P Sand:** Plastering Works",
          "**Concrete Grade:** M20 | RMC for Roof",
          "**Ceiling Height:** 10 Feet",
          "**Steel Reinforcement:** As per Standard",
          "**Parapet Wall:** 3' Feet Height | 6\" Thick (Only for Floor with Headroom)",
        ],
        "Bathroom & Plumbing": [
          "**Wall Tiles:** Upto Ceiling (Full Height). Size 2'X2' Vitrified Tile. Upto ₹50/Sqft. 1 Colour for 2 Bathrooms",
          "**Bath & CP Fittings:** Parryware | Upto ₹17000 Per Bathroom | Wall Mounted EWC, Wall Mounted Wash Basin, Pillar Tap, Health Faucet, Shower Set, 2-in-1 Wall Mixer",
          "**Plumbing Pipes & Fittings:** Inner CPVC, Outer PVC. Brands: Any ISI Brand",
          "**Overhead Tank:** 2000 litres Sintex | 3 Layered | UV Protected | White Colour",
        ],
        Flooring: [
          "**Living, Dining, Bedrooms & Kitchen:** 4'X2' | Vitrified Tiles Upto ₹65/Sqft. 1 Model for Living, Dining and Kitchen. KAG / Sunheart or Equivalent",
          "**Balcony & Utility:** Size 2'X2' | Upto 50/Sqft | Antiskid",
          "**Staircase:** Full Body Tile : Upto ₹110/sqft",
          "**Car Parking:** 1'X1' Heavy Duty Tile | Upto ₹50/Sqft",
          "**Terrace Flooring:** Screed Concreting with Waterproofing",
        ],
        "Kitchen & Dining": [
          "**Wall Tile:** Vitrified Tile (2'X2') | Upto ₹55/Sqft",
          "**Sink Faucet:** Upto ₹2000 / No",
          "**Kitchen Sink:** Stainless Steel sink with Drain Upto ₹4000",
          "**Dining:** Wall Mounted Wash Basin",
          "**Kitchen Granite Top:** Upto ₹140/Sqft",
        ],
        "Doors, Windows & Railing": [
          '**Main Door:** Malaysian Teak Door & Teak Frame - Readymade | 35mm Thickness | 5"X3" Thick Frame | 7\' Height 3.5 Feet Width | Upto 22000/nos | 1 Nos only',
          "**Room Doors:** Flush Door| Sal Wood Frame | 7'X3'",
          "**Bathroom Door:** WPC Door & Frame | 7'X2.5'",
          "**Windows:** UPVC Sliding White | Max 5' X 5' | One Window Per Room | 5mm Clear Glass",
          "**Staircase Railing:** SS 304 Grade Railing",
          "**Balcony Railing:** SS 304 Grade Railing with 8mm Toughened Glass",
        ],
        Painting: [
          "**Inner Wall Putty:** 2 coats of Wall Putty | Nippon",
          "**Wall Painting:** 1 coat of Primer | 2 coats of Breeze emulsion | Nippon",
          "**Ceiling Painting:** 1 coat of Primer | 2 coats of Breeze emulsion | Nippon",
          "**Exterior Paint:** 1 coat of Primer | 2 Coats of Sumo Xtra | Nippon",
          "**Elevation Putty:** 2 Coat of Putty for Front Elevation | Nippon Exterior Putty",
        ],
        Electrical: [
          "**Wires –** Orbit (FRLS)",
          "**Switches –** Legrand",
          "**Bedroom:** 3 Switch Box(8-Module)",
          "**Bathroom:** 1 Switch Box(Inner) 4-Module, 1 Switch Box(Outer) 3-Module. Point for Heater & Exhaust",
          "**Living Room:** Upto 4 Switch Box (8 Module)",
          "**Dining:** 1 Switch (8-Module)",
          "**Pooja:** 1 Switch (3-Module)",
          "**Kitchen:** 3 Switch Box (6 Module). Point for HOB, Chimney, RO",
          "**Utility:** 1 Switch Box (4-Module)",
          "**AC Points:** 1 for Each Bedroom. 1 for Living Room",
          "**Entrance:** 1 Switch Box (6-Module)",
          "**Balconies:** 1 Switch Box (3-Module)",
        ],
        "What's not included": [
          "**Compound Wall-**1950/-RFT (4'' Solid Block)",
          "**Gate**",
          "**Sump & Septic Tank** @ 24/Litre",
          "**Lift, SetBack Area**",
          "**Electricity Connection**",
          "**Building Plan Approval**",
          "**Elevation Special Materials**",
        ],
      },
      whatsappLink:
        "https://wa.me/9150324381?text=Hi,%20I%20had%20planned%20to%20choose%20your%20Standard%20Construction%20package.%20Can%20I%20get%20some%20more%20info%20about%20that%20package?%20",
    },
    {
      name: "Premium Package",
      price: "₹2499",
      unit: "/ sqft",
      description:
        "Luxury construction with top-tier materials and superior finishes",
      colors:
        "bg-gradient-to-b from-white to-gray-50 border-gray-200 hover:border-orange-500",
      details: {
        Design: [
          "**SCHEME DRAWING:** ALL FLOORS (2D)",
          "**ELEVATION DESIGN:** (3D)",
          "**WORKING DRAWING:** ALL FLOORS (2D)",
          "**SOIL TEST REPORT**",
          "**STRUCTURAL DRAWINGS**",
          "**FURNITURE LAYOUT:** ALL FLOORS (2D)",
        ],
        Structure: [
          "**Basement Height:** Upto 3.5 feet",
          "**Steel:** ARS or Equivalent",
          "**Wire-Cut Bricks:** For Partition walls. 9-Inch Thick Exterior Walls | 4 Inch Thick Inner Walls",
          "**Cement:** Ramco / Dalmia",
          "**M Sand:** Blockwork & All Masonry Works",
          "**River Sand:** Plastering Works",
          "**Concrete Grade:** M20 | RMC for Roof",
          "**Ceiling Height:** 10 Feet (FFL to FFL)",
          "**Steel Reinforcement:** As per Naya Builders Structural Detailing",
          "**Parapet Wall:** 3.5' Feet Height | 6\" Thick",
          "**RCC Lift Pit:** Included (If Required)",
          "**Lift Pit & Shaft:** Included (If Required)",
        ],
        "Bathroom & Plumbing": [
          "**Wall Tiles:** Upto Ceiling (Full Height). 4'X2' Digital Vitrified Tile. Upto ₹85/Sqft",
          "**Bath & CP Fittings:** Jaquar | Upto ₹22000 Per Bathroom | Wall Mounted EWC, Wall Mounted Wash Basin, Pillar Tap, Health Faucet, Shower Set, Concealed Wall Mixer",
          "**Plumbing Pipes & Fittings:** Inner CPVC, Outer PVC. Brands: Ashirwad / Finolex",
          "**Overhead Tank:** 3000 litres Sintex | 5 Layered | UV Protected | White Colour. With Sensor",
          "**Solar Heater Plumbing Lines:** Included (If Required)",
        ],
        Flooring: [
          "**Living, Dining, Bedrooms & Kitchen:** 4'X2' | Tiles Upto ₹80/Sqft. Somany / Kajaria / KAG / Sunheart",
          "**Balcony & Utility:** Size 2'X2' | Upto 60/Sqft",
          "**Staircase:** Granite Upto ₹160/sqft",
          "**Car Parking:** 2'X2' Heavy Stone| Upto ₹80/Sqft",
          "**Terrace Flooring:** White Cooling Tile Size 1'X1' | Anuj | with Waterproofing",
        ],
        "Kitchen & Dining": [
          "**Wall Tile:** Vitrified Tile (4'X2') | Upto ₹65/Sqft",
          "**Sink Faucet:** Designer Brand | Upto ₹3500 /nos",
          "**Kitchen Sink:** Quartz Sink with Drain Upto ₹5000",
          "**Dining:** Wash Basin with Granite Counter",
          "**Kitchen Granite Top:** Upto ₹160/Sqft",
        ],
        "Doors, Windows & Railing": [
          '**Main Door:** Ghana Teak Door & Teak Frame | 35mm Thickness | 5"X3" Thick Frame | 8\' Height 4 Feet Width',
          "**Room Doors:** Flush Door with Laminate | Ghana Wood Frame | 7'X3'",
          "**Bathroom Door:** WPC Door & Frame | 7'X2.5'",
          "**Windows:** UPVC Sliding White - No Restriction on Size and Quantity | 5mm Clear Glass",
          "**Staircase Railing:** SS 304 Grade Railing",
          "**Balcony Railing:** 10mm Full Toughened Glass with 304 Grade Railing",
        ],
        Painting: [
          "**Inner Wall Putty:** 2 coats of Wall Putty | Birla",
          "**Wall Painting:** 1 coat of Primer | 2 coats of Pro Matex Gold Emulsion | Nippon",
          "**Ceiling Painting:** 1 coat of Primer | 2 coats of Pro Matex Gold Emulsion | Nippon",
          "**Exterior Paint:** 1 coat of Primer | 2 Coats of Weather bond PRO from Nippon",
          "**Elevation Putty:** 2 Coat of Putty for Two sides of Elevation | Birla Wallseal Waterproof",
        ],
        Electrical: [
          "**Wires –** Finolex / Havells (FRLS)",
          "**Switches –** GM",
          "**No Restriction on Number of Points**",
          "**Electricity Panel Board -** Single Service with RLCB - Exterior Grade",
        ],
        "What's not included": [
          "**Compound Wall-**1950/-RFT (4'' Solid Block)",
          "**Gate**",
          "**Sump & Septic Tank** @ 24/Litre",
          "**Lift, SetBack Area**",
          "**Electricity Connection**",
          "**Building Plan Approval**",
          "**Elevation Special Materials**",
        ],
      },
      whatsappLink:
        "https://wa.me/9150324381?text=Hi,%20I%20had%20planned%20to%20choose%20your%20Premium%20Construction%20package.%20Can%20I%20get%20some%20more%20info%20about%20that%20package?%20",
    },
    {
      name: "Ultra Premium Package",
      price: "₹2999",
      unit: "/ sqft",
      description:
        "Exceptional luxury with exclusive materials and unparalleled craftsmanship",
      colors:
        "bg-gradient-to-b from-white to-gray-50 border-gray-200 hover:border-orange-500",
      highlight: true,
      details: {
        Design: [
          "**SCHEME DRAWING:** ALL FLOORS (2D)",
          "**ELEVATION DESIGN:** (3D)",
          "**HALF LAYOUT:** ALL FLOORS (3D)",
          "**ELECTRICAL DRAWINGS:** ALL FLOORS (2D)",
          "**PLUMBING DRAWING:** ALL FLOORS (2D)",
          "**WORKING DRAWING:** ALL FLOORS (2D)",
          "**SOIL TEST REPORT**",
          "**STRUCTURAL DRAWINGS**",
          "**FURNITURE LAYOUT:** ALL FLOORS (2D)",
          "**ELEVATION DETAIL DRAWING:** (2D)",
          "**SITE ASSESSMENT & SITE PLAN**",
          "**INTERIOR VIEWS:** ALL FLOORS (3D)",
          "**INTERIOR DETAILING:** ALL ROOMS (2D)",
          "**INTERIOR 3D WALK-THROUGH**",
          "**APPROVAL DRAWING**",
          "**LANDSCAPING ARCHITECTURAL DESIGNS**",
        ],
        Structure: [
          "**Basement Height:** Upto 5 feet",
          "**Steel:** TATA Steel",
          "**Wire-Cut Bricks:** For Partition walls. 9-Inch Thick Exterior Walls | 4 Inch Thick Inner Walls",
          "**Cement:** Ramco / Dalmia / Coramandel",
          "**River Sand:** Blockwork & All Masonry Works",
          "**River Sand:** Plastering Works",
          "**Concrete Grade:** M25 | RMC for Roof",
          "**Ceiling Height:** 11 Feet (FFL to FFL)",
          "**Steel Reinforcement:** As per Structural",
          "**Parapet Wall:** 3.5' Feet Height | 6\" Thick (Or) Toughened Glass Railing if Required",
          "**RCC Lift Pit:** Included (If Required)",
          "**RCC Concrete Slab for Base**",
          "**Lift Pit & Shaft:** Included (If Required)",
        ],
        "Bathroom & Plumbing": [
          "**Wall Tiles:** Upto Ceiling (Full Height). 4'X2' Vitrified Tile. Upto ₹120/Sqft",
          "**Bath & CP Fittings:** Kohler | Upto ₹60000 Per Bathroom | Concealed EWC, Counter Top Wash Basin, Marble Counter Slab, Pillar Tap, Health Faucet, Shower Set, Concealed Wall Mixer",
          "**Plumbing Pipes & Fittings:** Inner CPVC, Outer PVC. HDPE flexible pipe. Brands: Ashirwad / Finolex / Jindal",
          "**RCC Overhead Tank:** Upto 6000 litres with Waterproofing",
          "**Solar Heater Plumbing Lines:** Included (If Required)",
        ],
        Flooring: [
          "**Living, Dining, Bedrooms & Kitchen:** 6'X6' | Quarts Tiles Upto ₹200/Sqft",
          "**Balcony & Utility:** Size 2'X2' | Upto 60/Sqft",
          "**Staircase:** Marble Upto ₹350/sqft",
          "**Car Parking:** Granite| Upto ₹120/Sqft",
          "**Terrace Flooring:** 2'X2' Exterior Grade Vitrified Tile. (Any Grade) | with Waterproofing",
        ],
        "Kitchen & Dining": [
          "**Wall Tile:** Vitrified Designer Tile (4'X2') | Upto ₹125/Sqft",
          "**Sink Faucet:** Floor Mounter Pull-Out | Upto ₹8000 / No",
          "**Kitchen Sink:** Multifunction Sink Upto ₹15000",
          "**Dining:** Premium Designer Collection Wash Basin with Marble Counter and Designer Tap",
          "**Kitchen Top:** Quarts Stone Upto ₹350/Sqft",
        ],
        "Doors, Windows & Railing": [
          "**Main Door:** Designer Wood Door of Height upto 8Feet X 5Feet (or) Security Steel Door of Size (8'X4.5') Pure Stainless Steel with Digital Lock",
          "**Room Doors:** Flush Door with Laminate | Ghana Wood Frame | 8'X3.5'",
          "**Bathroom Door:** Water Proof Flush Door with Designer Laminates | 8'X3'",
          "**Windows:** Openable Type | UPVC Coloured | No Restriction on Size and Quantity | Toughened Glass",
          "**Staircase Railing:** Toughened Glass with SS or Wood Railing or Aluminium",
          "**Balcony Railing:** 10mm Full Toughened Glass with Aluminium Railing",
        ],
        Painting: [
          "**Inner Wall Putty:** 2 coats of Wall Putty | Birla",
          "**Wall Painting:** 1 coat of Primer | 2 coats of Royal Shyne | Asian",
          "**Ceiling Painting:** 1 coat of Primer | 2 coats of Royal Shyne | Nippon",
          "**Exterior Paint:** 1 coat of Primer | 2 Coats of Apex Ultima ProteK | Asian",
          "**Elevation Putty:** HCCAA LL2 Coat of Putty for All sides of Elevation | Birla Wallseal Waterproofing",
        ],
        Electrical: [
          "**Wires –** Finolex / Havells (FRLS)",
          "**Switches –** Touch Switches with Glass Plates",
          "**No Restriction on Number of Points**",
          "**Electricity Panel Board -** Upto 2 Service Connection with RLCB Exterior Grade",
        ],
        "What's not included": [
          "**Compound Wall-**1950/-RFT (4'' Solid Block)",
          "**Lift, SetBack Area, Gate**",
          "**Sump & Septic Tank** @ 24/Litre",
          "**Electricity Connection**",
          "**Building Plan Approval**",
          "**Elevation Special Materials**",
        ],
      },
      whatsappLink:
        "https://wa.me/9150324381?text=Hi,%20I%20had%20planned%20to%20choose%20your%20Ultra-Premium%20Construction%20package.%20Can%20I%20get%20some%20more%20info%20about%20that%20package?%20 ",
    },
  ];

  const faqs = [
    {
      question: "What's not included in the package prices?",
      answer:
        "Our packages don't include: compound wall (1950/-RFT) & gate, sump & septic tank (₹24/Litre), lift, electricity connection, building plan approval, and elevation special materials. These can be added at additional cost.",
    },
    {
      question: "Do prices vary based on the number of floors?",
      answer:
        "Yes, the price may vary depending on the number of floors for all packages. We'll provide you with a custom quote after understanding your specific requirements.",
    },
    {
      question: "How much do underground water storage sumps cost?",
      answer:
        "Underground water storage sumps cost ₹24 per liter across all packages.",
    },
    {
      question: "Is roof weathering included in the packages?",
      answer:
        "Basic waterproofing is included in all packages. Premium waterproofing treatments are available in Standard and Premium packages if the build-up area is more than 2000 sq ft.",
    },
    {
      question: "What type of soil testing is included in the Premium package?",
      answer:
        "The Premium package includes standard soil testing to determine soil bearing capacity and soil type, which helps in designing the foundation structure appropriately.",
    },
  ];
  const handleCall = () => {
    window.location.href = "tel:9150324381";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/9150324381", "_blank");
  };

  const handleBookConsultation = () => {
    // Use window.location for navigation instead of useNavigate
    navigate("/contact");
  };
  return (
    <div className='bg-gray-50 min-h-screen font-sans'>
      {/* Page Header */}
      <div className='bg-gradient-to-r from-orange-500 to-orange-600 py-16 px-4 text-center text-white relative overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-10'></div>
        <div className='relative z-10'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            Construction Packages
          </h1>
          <p className='text-lg md:text-xl max-w-2xl mx-auto'>
            Choose the perfect construction package tailored to your needs and
            budget
          </p>
        </div>
      </div>

      {/* Enhanced Pricing Cards with Expandable Details */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6'>
          {packages.map((pkg, packageIndex) => (
            <div
              key={packageIndex}
              className={`rounded-lg border-2 ${
                pkg.colors
              } shadow-lg transition-all duration-300 overflow-hidden relative ${
                pkg.popular
                  ? "ring-2 ring-orange-500 "
                  : pkg.highlight
                  ? ""
                  : ""
              }`}
            >
              {pkg.popular && (
                <div className='absolute top-0 right-0'>
                  <div className='bg-orange-500 text-white py-1 px-4 rounded-bl-lg text-sm font-semibold'>
                    MOST POPULAR
                  </div>
                </div>
              )}

              {pkg.highlight && (
                <div className='absolute top-0 right-0'>
                  <div className='bg-orange-500 text-white py-1 px-4 rounded-bl-lg text-sm font-semibold'>
                    PREMIUM CHOICE
                  </div>
                </div>
              )}

              <div className='p-6'>
                <h3 className='text-xl font-bold text-gray-800'>{pkg.name}</h3>
                <div className='mt-4 flex items-baseline'>
                  <span className='text-4xl font-extrabold text-orange-500'>
                    {pkg.price}
                  </span>
                  <span className='ml-1 text-gray-500'>{pkg.unit}</span>
                </div>
                <p className='mt-2 text-gray-600 text-sm'>{pkg.description}</p>

                {/* Expandable Detail Sections */}
                <div className='mt-6 space-y-3'>
                  {Object.entries(pkg.details).map(
                    ([sectionKey, items], sectionIndex) => (
                      <div
                        key={sectionIndex}
                        className='border-b border-gray-100 pb-1'
                      >
                        <button
                          onClick={() => toggleSection(sectionKey)}
                          className='w-full flex justify-between items-center py-2 text-left focus:outline-none'
                        >
                          <span className='font-medium text-gray-800'>
                            {sectionKey}
                          </span>
                          {expandedSections[`${packageIndex}-${sectionKey}`] ? (
                            <Minus size={16} className='text-orange-500' />
                          ) : (
                            <Plus size={16} className='text-orange-500' />
                          )}
                        </button>

                        {expandedSections[`${packageIndex}-${sectionKey}`] && (
                          <div className='mt-2 pl-2 space-y-1 text-sm text-gray-600 pb-2'>
                            {items.map((item, itemIndex) => (
                              <div key={itemIndex} className='flex items-start'>
                                <Check
                                  size={12}
                                  className='text-green-500 mr-2 mt-1 flex-shrink-0'
                                />
                                <span>{formatBoldText(item)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>

                <div className='mt-6'>
                  <button
                    onClick={() =>
                      window.open(
                        pkg.whatsappLink,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className={`w-full py-3 px-6 rounded-md font-medium flex items-center justify-center 
                    ${
                      pkg.popular
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : pkg.highlight
                        ? "bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                        : "bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                    } transition-colors duration-300`}
                  >
                    Choose Package
                    <ArrowRight size={16} className='ml-2' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className='max-w-4xl mx-auto px-4 py-12 bg-white rounded-lg shadow-md my-12'>
        <h2 className='text-3xl font-bold text-center mb-8 text-gray-800'>
          Frequently Asked Questions
        </h2>

        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className='border border-gray-200 rounded-lg overflow-hidden hover:border-orange-300 transition-colors'
            >
              <button
                onClick={() => toggleFaq(index)}
                className='w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none hover:bg-gray-50'
              >
                <span className='text-gray-800'>{faq.question}</span>
                {expandedFaqs[index] ? (
                  <ChevronUp size={20} className='text-orange-500' />
                ) : (
                  <ChevronDown size={20} className='text-orange-500' />
                )}
              </button>

              {expandedFaqs[index] && (
                <div className='px-4 pb-4 pt-0 text-gray-600 animate-fadeIn'>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Call to Action */}
      <div className='bg-gradient-to-r from-orange-500 to-orange-600 py-16 px-4 text-center text-white relative'>
        <div className='absolute inset-0 bg-black opacity-10'></div>
        <div className='max-w-5xl mx-auto relative z-10'>
          <h2 className='text-3xl font-bold mb-6'>
            Ready to Build Your Dream Home?
          </h2>
          <p className='text-lg mb-10 max-w-3xl mx-auto'>
            Get in touch with our expert team for a personalized consultation
            and detailed quote. We'll help you choose the perfect package for
            your dream home.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto'>
            <button
              className='bg-white text-orange-600 font-semibold py-3 px-4 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center'
              onClick={handleCall}
            >
              <Phone size={18} className='mr-2' /> Call Now
            </button>
            <button
              className='bg-white text-orange-600 font-semibold py-3 px-4 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center'
              onClick={handleWhatsApp}
            >
              <MessageSquare size={18} className='mr-2' /> WhatsApp Us
            </button>
            <button
              className='bg-white text-orange-600 font-semibold py-3 px-4 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center'
              onClick={handleBookConsultation}
            >
              <Calendar size={18} className='mr-2' /> Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Note about price variations */}
      <div className='max-w-7xl mx-auto px-4 py-8 text-center'>
        <p className='text-gray-600 text-sm'>
          * Prices may vary depending on the number of floors and specific
          requirements. Contact us for a detailed estimate tailored to your
          project.
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 1000px;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
