"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Instagram, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import ScrollFloat from "./ScrollFloat";
import { useI18n } from "@/lib/i18n";

const galleryItems = [
  {
    id: 1,
    title: "Premium Ceramic Coating",
    category: "Protection Services",
    videoUrl: "https://www.instagram.com/p/DTpuYAxkjBs/",
    videoFile: "/vid1.mp4",
    poster: "/premium-services-img3.jpg",
    description: "Watch our premium ceramic coating application",
  },
  {
    id: 2,
    title: "Ceramic Coating ",
    category: "Protection Services",
    videoUrl: "https://www.instagram.com/p/DULNjdmDCX3/",
    videoFile: "/vid2.mp4",
    poster: "/premium-services-img4.jpg",
    description: "Professional ceramic coating demonstration",
  },
  {
    id: 3,
    title: "Engine Detailing Vaccination",
    category: "Detailing Services",
    videoUrl: "https://www.instagram.com/p/DTeiv2liOVC/",
    videoFile: "/vid3.mp4",
    poster: "/premium-services-img5.jpg",
    description: "Engine bay detailing and protection process",
  },
  {
    id: 4,
    title: "Interior Cleaning and Protection",
    category: "Protection Services",
    videoUrl: "https://www.instagram.com/p/DTQBDZ9DMi0/",
    videoFile: "/vid4.mp4",
    poster: "/premium-services-img6.jpg",
    description: "Interior cleaning and ceramic coating application",
  },
  {
    id: 5,
    title: "Paint Correction",
    category: "Detailing Services",
    videoUrl: "https://www.instagram.com/p/DUAKvvSjGW6/",
    videoFile: "/vid5.mp4",
    poster: "/premium-services-img7.jpg",
    description: "Professional paint correction process in action",
  },
  {
    id: 6,
    title: "Paint Correction",
    category: "Detailing Services",
    videoUrl: "https://www.instagram.com/p/DTmJzHIiC4m/",
    videoFile: "/vid6.mp4",
    poster: "/premium-services-img9.jpg",
    description: "Before/after paint correction transformation",
  },
];

const VideoGallery = () => {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set([0]));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentItem = galleryItems[currentIndex];

  // Intersection observer - pause/play when scrolled out
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        videoRef.current?.pause();
        setIsPlaying(false);
      } else if (isInView && loadedVideos.has(currentIndex)) {
        videoRef.current?.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [isInView, loadedVideos, currentIndex]);

  // Auto-play next slide only if in view and video is playing
  useEffect(() => {
    if (!isAutoPlaying || !isInView || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % galleryItems.length;
        setLoadedVideos((s) => new Set(s).add(next));
        return next;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView, isPlaying]);

  // When slide changes, try to play
  useEffect(() => {
    if (!loadedVideos.has(currentIndex) || !isInView) return;
    const v = videoRef.current;
    if (v) {
      v.muted = isMuted;
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentIndex, loadedVideos, isInView, isMuted]);

  // Pause when not in view
  useEffect(() => {
    if (!isInView) {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isInView]);

  const handlePlayClick = () => {
    setLoadedVideos((s) => new Set(s).add(currentIndex));
    // small delay to let src mount
    setTimeout(() => {
      const v = videoRef.current;
      if (v) {
        v.muted = isMuted;
        v.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }, 50);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const navigate = (dir: 1 | -1) => {
    setCurrentIndex((prev) => {
      const next = (prev + dir + galleryItems.length) % galleryItems.length;
      setLoadedVideos((s) => new Set(s).add(next));
      return next;
    });
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const goToSlide = (index: number) => {
    setLoadedVideos((s) => new Set(s).add(index));
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  return (
    <section ref={sectionRef} id="transformations" className="py-20 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollFloat
          className="text-center mb-12 md:mb-16"
          animationDuration={0.1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=50%"
          stagger={0.03}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            {t("video.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-dm-serif text-gray-900 mb-4">
            {t("video.title")}
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("video.desc")}
          </p>
        </ScrollFloat>

        {/* Instagram Reels Style Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Video Display */}
            <div className="relative aspect-[9/16] max-w-[360px] mx-auto rounded-3xl overflow-hidden bg-black shadow-2xl ring-1 ring-black/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  {/* Poster + Play overlay when not loaded/playing */}
                  {!loadedVideos.has(currentIndex) || !isPlaying ? (
                    <button
                      onClick={handlePlayClick}
                      className="absolute inset-0 z-20 group flex flex-col items-center justify-center text-white"
                      aria-label={`Play ${currentItem.title}`}
                    >
                      <Image
                        src={currentItem.poster}
                        alt={currentItem.title}
                        fill
                        sizes="360px"
                        className="object-cover"
                        priority={currentIndex === 0}
                      />
                      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-white/95 text-primary flex items-center justify-center shadow-xl group-hover:scale-110 group-active:scale-95 transition-transform">
                          <Play className="w-7 h-7 fill-primary ml-0.5" />
                        </div>
                        <span className="text-xs font-bold tracking-widest uppercase bg-black/50 backdrop-blur px-3 py-1.5 rounded-full">
                          {t("video.tap")}
                        </span>
                      </div>
                      {/* Text still visible */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-left pointer-events-none">
                        <p className="text-white/70 text-[11px] font-bold uppercase tracking-wider mb-1">{currentItem.category}</p>
                        <h3 className="text-xl font-bold text-white leading-tight">{currentItem.title}</h3>
                      </div>
                    </button>
                  ) : null}

                  {/* Video Element - only mounted when loaded */}
                  {loadedVideos.has(currentIndex) && (
                    <video
                      ref={videoRef}
                      src={currentItem.videoFile}
                      muted={isMuted}
                      loop
                      playsInline
                      preload="metadata"
                      poster={currentItem.poster}
                      className="w-full h-full object-cover"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    />
                  )}

                  {/* Gradient Overlay when playing */}
                  {isPlaying && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />}

                  {/* Top badges - only when playing */}
                  {isPlaying && (
                    <>
                      <a
                        href={currentItem.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold shadow-lg hover:scale-105 transition-transform"
                      >
                        <Instagram className="w-3 h-3" />
                        Instagram
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted((m) => !m);
                          if (videoRef.current) videoRef.current.muted = !isMuted;
                        }}
                        className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </>
                  )}

                  {/* Content Overlay when playing */}
                  {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 pointer-events-none">
                      <p className="text-white/70 text-[11px] font-bold uppercase tracking-wider mb-1">{currentItem.category}</p>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{currentItem.title}</h3>
                      <p className="text-white/80 text-sm mt-1 hidden md:block">{currentItem.description}</p>
                      <a
                        href={currentItem.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-white underline underline-offset-4 decoration-white/50 hover:decoration-white pointer-events-auto"
                      >
                        Watch full on Instagram <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all border border-black/5 z-20"
              aria-label="Previous video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => navigate(1)}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all border border-black/5 z-20"
              aria-label="Next video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress + Counter */}
          <div className="mt-5 flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-7 bg-primary" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400 font-medium">
              {String(currentIndex + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")} • {isPlaying ? "Playing" : "Paused"}
            </p>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">💡 Videos play only on tap to save your data</p>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href="https://www.instagram.com/car_style___/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-7 py-3.5 rounded-full font-bold hover:shadow-xl hover:shadow-pink-500/20 transition-all group text-sm md:text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Instagram className="w-4 h-4" />
            {t("video.follow")}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoGallery;
