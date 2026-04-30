"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "motion/react";
import {
  X,
  ZoomIn,
  Camera,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Grid3X3,
  SlidersHorizontal,
} from "lucide-react";

interface GalleryItem {
  _id: string;
  url: string;
  description?: string;
  category?: string;
  createdAt: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setImages(data.images);
        } else {
          setError("Failed to load gallery.");
        }
      })
      .catch(() => setError("Network error. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  // Derive categories
  const categories = [
    "All",
    ...Array.from(new Set(images.map((img) => img.category).filter(Boolean))),
  ];
  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = useCallback(
    () => setLightbox({ open: false, index: 0 }),
    []
  );
  const prevImage = useCallback(
    () =>
      setLightbox((p) => ({
        ...p,
        index: (p.index - 1 + filteredImages.length) % filteredImages.length,
      })),
    [filteredImages.length]
  );
  const nextImage = useCallback(
    () =>
      setLightbox((p) => ({
        ...p,
        index: (p.index + 1) % filteredImages.length,
      })),
    [filteredImages.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox.open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox.open, closeLightbox, prevImage, nextImage]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightbox.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox.open]);

  const currentImage = filteredImages[lightbox.index];

  // Stagger animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white overflow-x-hidden">
      {/* ── Hero Header ── */}
      <div ref={heroRef} className="relative overflow-hidden pt-28 pb-20 px-6">
        {/* Animated gradient mesh background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/15 blur-[160px] animate-pulse" />
          <div className="absolute -top-20 left-[15%] w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[120px]" />
          <div className="absolute top-10 right-[10%] w-[350px] h-[350px] rounded-full bg-violet-500/8 blur-[100px]" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-6 bg-primary/10 px-5 py-2 rounded-full border border-primary/20 backdrop-blur-sm">
              <Sparkles size={13} className="animate-pulse" /> Our Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-5 leading-[1.1] tracking-tight"
          >
            Car Care{" "}
            <span className="text-primary italic font-niconne text-6xl sm:text-7xl md:text-8xl">
              Gallery
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            Browse our latest detailing work — every car treated like it&apos;s
            our own.
          </motion.p>

          {/* Stats row */}
          {!loading && !error && images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-8 mt-8"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Grid3X3 size={15} className="text-primary" />
                <span>
                  <span className="text-white font-semibold">
                    {images.length}
                  </span>{" "}
                  Photos
                </span>
              </div>
              {categories.length > 2 && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <SlidersHorizontal size={15} className="text-primary" />
                  <span>
                    <span className="text-white font-semibold">
                      {categories.length - 1}
                    </span>{" "}
                    Categories
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ── Category Filter ── */}
      {!loading && !error && categories.length > 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-7xl mx-auto px-4 mb-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as string)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                  : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 pb-28">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-36 gap-5 text-gray-400">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
              <Loader2
                size={44}
                className="animate-spin text-primary relative z-10"
              />
            </div>
            <p className="text-sm tracking-wide">Loading gallery…</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-36 text-gray-400 gap-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <Camera size={32} className="text-red-400" />
            </div>
            <p className="text-lg font-medium text-gray-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Empty */}
        {!loading && !error && images.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-36 text-gray-400 gap-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Camera size={32} className="text-gray-600" />
            </div>
            <p className="text-lg font-medium text-gray-300">
              No images yet. Check back soon!
            </p>
          </motion.div>
        )}

        {/* ── Masonry Grid ── */}
        {!loading && !error && filteredImages.length > 0 && (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]"
          >
            {filteredImages.map((img, index) => (
              <motion.div
                key={img._id}
                variants={itemVariants}
                layout
                className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl cursor-pointer bg-white/[0.03] border border-white/[0.06] hover:border-primary/30 transition-all duration-500"
                onClick={() => openLightbox(index)}
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.description || `Car detailing work ${index + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Permanent subtle gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-300" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-5">
                    <div className="flex items-end justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                      <div className="flex-1 min-w-0">
                        {img.category && (
                          <span className="inline-block text-[11px] text-primary font-bold tracking-wider uppercase mb-1.5 bg-primary/15 px-2.5 py-0.5 rounded-md">
                            {img.category}
                          </span>
                        )}
                        {img.description && (
                          <p className="text-white text-sm font-medium truncate leading-snug">
                            {img.description}
                          </p>
                        )}
                      </div>
                      <div className="ml-3 w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30 scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn size={17} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Corner index badge */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-bold text-white/60 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Image count */}
        {!loading && !error && filteredImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-3 text-gray-600 text-sm bg-white/[0.03] border border-white/[0.06] px-6 py-3 rounded-full">
              <Camera size={14} />
              <span>
                {filteredImages.length} image
                {filteredImages.length !== 1 ? "s" : ""}
                {activeCategory !== "All" && (
                  <span className="text-gray-500">
                    {" "}
                    in{" "}
                    <span className="text-primary font-medium">
                      {activeCategory}
                    </span>
                  </span>
                )}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox.open && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="absolute top-5 right-5 w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-20 backdrop-blur-sm border border-white/10"
              onClick={closeLightbox}
            >
              <X size={18} />
            </motion.button>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
            >
              <span className="text-xs font-semibold text-white/50 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                {lightbox.index + 1} / {filteredImages.length}
              </span>
            </motion.div>

            {/* Prev */}
            {filteredImages.length > 1 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute left-3 md:left-8 w-12 h-12 rounded-xl bg-white/5 hover:bg-primary/80 flex items-center justify-center transition-all duration-300 z-20 backdrop-blur-sm border border-white/10 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft size={20} />
              </motion.button>
            )}

            {/* Image */}
            <motion.div
              key={currentImage._id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-6xl max-h-[85vh] w-full flex flex-col items-center gap-5 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 max-h-[75vh] ring-1 ring-white/10">
                <Image
                  src={currentImage.url}
                  alt={currentImage.description || "Gallery image"}
                  width={1200}
                  height={800}
                  className="max-h-[75vh] w-auto h-auto object-contain"
                  priority
                />
              </div>

              {(currentImage.description || currentImage.category) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 text-center"
                >
                  {currentImage.category && (
                    <span className="bg-primary/15 text-primary text-xs font-bold px-3.5 py-1.5 rounded-lg border border-primary/25">
                      {currentImage.category}
                    </span>
                  )}
                  {currentImage.description && (
                    <p className="text-gray-300 text-sm font-medium">
                      {currentImage.description}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Next */}
            {filteredImages.length > 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute right-3 md:right-8 w-12 h-12 rounded-xl bg-white/5 hover:bg-primary/80 flex items-center justify-center transition-all duration-300 z-20 backdrop-blur-sm border border-white/10 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={20} />
              </motion.button>
            )}

            {/* Thumbnail strip */}
            {filteredImages.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto py-2 px-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/5 z-20"
              >
                {filteredImages.map((img, i) => (
                  <button
                    key={img._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((p) => ({ ...p, index: i }));
                    }}
                    className={`relative flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all duration-300 ${i === lightbox.index
                      ? "ring-2 ring-primary scale-110 opacity-100"
                      : "opacity-40 hover:opacity-70 ring-1 ring-white/10"
                      }`}
                  >
                    <Image
                      src={img.url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
