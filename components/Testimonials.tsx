"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import ScrollFloat from "./ScrollFloat";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      service: "Luxury Wash",
      rating: 5,
      text: "Absolutely amazing service! My car looks brand new after the luxury wash. The attention to detail is incredible and the staff is very professional.",
      image: "/customer1.jpg"
    },
    {
      id: 2,
      name: "Priya Patel",
      service: "Ceramic Coating",
      rating: 5,
      text: "The ceramic coating service exceeded my expectations. My car has a beautiful shine and the water beading effect is fantastic. Highly recommend!",
      image: "/customer2.jpg"
    },
    {
      id: 3,
      name: "Amit Deshmukh",
      service: "Premium Polish",
      rating: 5,
      text: "Great experience with CAR STYLE. They took their time and made sure every detail was perfect. My car hasn't looked this good since it was new!",
      image: "/customer3.jpg"
    },
    {
      id: 4,
      name: "Sneha Kulkarni",
      service: "Interior Detailing",
      rating: 4,
      text: "The interior detailing service is outstanding. They cleaned every nook and corner of my car. The interior smells fresh and looks spotless.",
      image: "/customer4.jpg"
    },
    {
      id: 5,
      name: "Vikram Singh",
      service: "Paint Protection Film",
      rating: 5,
      text: "Professional PPF installation at a reasonable price. The team is knowledgeable and the quality of work is top-notch. Worth every penny!",
      image: "/customer5.jpg"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    // Temporarily pause auto-play when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    // Temporarily pause auto-play when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
    // Temporarily pause auto-play when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  return (
    <section id="Testimonials" className="py-20 md:py-24 bg-gradient-to-r from-blue-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollFloat
        
          animationDuration={0.1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=50%'
          stagger={0.03}
        >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Customer Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-dm-serif text-gray-900 mb-6">
              What Our <span className="text-primary italic">Customers Say</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our valued customers have to say about their experience with CAR STYLE.
            </p>
          </ScrollFloat>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div className="flex transition-transform duration-700 ease-in-out" 
                 style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full px-4"
                >
                  <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-black/5">
                    {/* Quote Icon */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8 mx-auto">
                      <Quote className="w-8 h-8 text-primary" />
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-center mb-8">
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      
                      {/* Rating */}
                      <div className="flex justify-center gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Customer Info */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-600">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.service}</div>
                        </div>
                      </div>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-black/5"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-black/5"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              } rounded-full`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Testimonials;
