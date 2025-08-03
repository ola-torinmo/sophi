import React from 'react';
import Image from 'next/image';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';
import testbg from '../../../../../public/testbg.png';

interface TestimonialProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  title = "REAL PEOPLE, BEAUTIFUL RESULTS",
  subtitle = "Join the Sophi Global family and discover the magic of our products today!",
  backgroundImage = "/your-image-path.jpg", // Replace with your actual image path
  className = ""
}) => {
  return (
    <div className={`w-full  ${className}`}>
      {/* Header Section */}
      <div className="bg-gray-50 px-6 py-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-wide">
          {title}
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Image Section */}
      <div className="relative w-full  h-96 md:h-[500px] overflow-hidden">
        <Image
          src={testbg}
          alt="Customer testimonial showcase"
          fill
          className="object-cover"
          priority
        />
        
        
      </div>
    </div>
  );
};

export default Testimonial;