import React from "react";

function Slider() {
  return (
    <div className="relative">
      {/* Title Section */}
      <div className="relative">
        <div className="text-center relative z-10 mt-20 text-4xl font-bold text-gray-800">
          Our Special Partners
        </div>
      </div>

      {/* Slider Section */}
      <div className="mt-10 overflow-hidden bg-blue-50 py-6">
        <div className="flex items-center justify-center gap-6 animate-marquee">
          {[
            { src: "public/images/image1.jpg", alt: "Logo 1" },
            { src: "public/images/image2.jpg", alt: "Logo 2" },
            { src: "public/images/image3.webp", alt: "Logo 3" },
            { src: "public/images/image4.png", alt: "Logo 4" },
            { src: "public/images/image5.jpg", alt: "Logo 5" },
            { src: "public/images/image6.png", alt: "Logo 6" },
            { src: "public/images/image7.jpg", alt: "Logo 7" },
            { src: "public/images/image8.png", alt: "Logo 8" },
            { src: "public/images/image9.jpg", alt: "Logo 9" },
            { src: "public/images/image10.png", alt: "Logo 10" },
            { src: "public/images/image11.jpg", alt: "Logo 11" },
            { src: "public/images/image12.jpg", alt: "Logo 12" },
            { src: "public/images/image13.png", alt: "Logo 13" },
            { src: "public/images/image14.jpg", alt: "Logo 14" },
          ].map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="h-20 sm:h-24 object-contain mx-4 transition-transform duration-500 hover:scale-110"
            />
          ))}
        </div>
      </div>

      {/* Marquee Animation Styles */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: scroll 20s linear infinite;
          white-space: nowrap;
        }

        @keyframes scroll {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}

export default Slider;