"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Instagram, ChevronRight } from "lucide-react";
import Image from "next/image";

const VideoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const galleryItems = [
    {
      id: 1,
      title: "Premium Ceramic Coating",
      category: "Protection Services",
      videoUrl: "https://www.instagram.com/p/DTpuYAxkjBs/",
      videoFile: "/vid1.mp4",
      description: "Watch our premium ceramic coating application"
    },
    {
      id: 2,
      title: "Ceramic Coating ",
      category: "Protection Services",
      videoUrl: "https://www.instagram.com/p/DULNjdmDCX3/",
      videoFile: "/vid2.mp4",
      description: "Professional ceramic coating demonstration"
    },
    {
      id: 3,
      title: "Engine Detailing Vaccination",
      category: "Detailing Services",
      videoUrl: "https://www.instagram.com/p/DTeiv2liOVC/",
      videoFile: "/vid3.mp4",
      description: "Engine bay detailing and protection process"
    },
    {
      id: 4,
      title: "Interior Cleaning and Protection",
      category: "Protection Services", 
      videoUrl: "https://www.instagram.com/p/DTQBDZ9DMi0/",
      videoFile: "/vid4.mp4",
      description: "Interior cleaning and ceramic coating application"
    },
    {
      id: 5,
      title: "Paint Correction",
      category: "Detailing Services",
      videoUrl: "https://www.instagram.com/p/DUAKvvSjGW6/",
      videoFile: "/vid5.mp4",
      description: "Professional paint correction process in action"
    },
    {
      id: 6,
      title: "Paint Correction",
      category: "Detailing Services",
      videoUrl: "https://www.instagram.com/p/DTmJzHIiC4m/",
      videoFile: "/vid6.mp4",
      description: "Before/after paint correction transformation"
    }
  ];

  // Play video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        // Auto-play was prevented, which is normal
        console.log('Auto-play prevented:', err);
      });
    }
  }, [currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 14000); // 12 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryItems.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    // Temporarily pause auto-play when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 13000); // Resume after 13 seconds
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    // Temporarily pause auto-play when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 13000); // Resume after 13 seconds
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Temporarily pause auto-play when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 13000); // Resume after 13 seconds
  };

  const currentItem = galleryItems[currentIndex];

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          See Our Craftsmanship
        </span>
        <h2 className="text-4xl md:text-5xl font-dm-serif text-gray-900 mb-6">
          Transformations <span className="text-primary italic">In Action</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Watch how we turn ordinary vehicles into extraordinary masterpieces. Every detail matters in our precision detailing process.
        </p>
        <p className="text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
          💡 Click on any video to watch the full transformation on Instagram
        </p>
        </motion.div>

        {/* Instagram Reels Style Container */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Video Display */}
            <div className="relative aspect-[9/16] max-w-md mx-auto rounded-3xl overflow-hidden bg-black shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  {/* Clickable Area */}
                  <a
                    href={currentItem.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 cursor-pointer"
                    aria-label={`View ${currentItem.title} on Instagram`}
                  />

                  {/* Video Element */}
                  <video
                    key={currentItem.id}
                    ref={videoRef}
                    src={currentItem.videoFile}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    playsInline={true}
                    className="w-full h-full object-cover"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(currentItem.videoUrl, '_blank');
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                  
                  {/* Instagram Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold pointer-events-none">
                    <Instagram className="w-3 h-3" />
                    Instagram
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 text-xs font-medium uppercase tracking-wider">
                          {currentItem.category}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {currentItem.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base">
                        {currentItem.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 border border-gray-200 z-20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 border border-gray-200 z-20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* Progress Indicator */}
          <div className="mt-6 space-y-3">
            {/* Progress Bar */}
            <div className="flex gap-1 justify-center">
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                      ? "w-8 bg-primary" 
                      : "w-1 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="https://www.instagram.com/car_style___/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5" />
            Follow Us on Instagram
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <p className="text-gray-500 text-sm mt-4">
            Follow @car_style___ for daily updates and exclusive content
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoGallery;
