"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
  ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const galleryImages = [
  {
    src: "/images/campus-wide.jpg",
    alt: "Panoramic view of St. Berchmans College campus",
    caption: "Campus Panorama",
    category: "Campus",
  },
  {
    src: "/images/campus-tower.jpg",
    alt: "The iconic tower of St. Berchmans College",
    caption: "College Main Building",
    category: "Campus",
  },
  {
    src: "/images/campus-day.jpg",
    alt: "Campus during a bright sunny day",
    caption: "Sunny Day at SBC",
    category: "Campus",
  },
  {
    src: "/images/campus-dome.jpg",
    alt: "The iconic dome and statue of St. Berchmans College",
    caption: "Heritage Dome",
    category: "Campus",
  },
  {
    src: "/images/campus-front.jpg",
    alt: "Front entrance of St. Berchmans College",
    caption: "College Entrance",
    category: "Campus",
  },
  {
    src: "/images/hero-college.jpg",
    alt: "St. Berchmans College campus view",
    caption: "Campus Life",
    category: "Campus",
  },
];

const categories = ["All", "Campus", "Events", "Students", "Department"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // Body scroll lock
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "var(--color-bg-light)" }}>
        <div className="container-main">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="badge-outline badge mb-4">
              <ImageIcon size={12} />
              Visual Stories
            </div>
            <h1>
              Photo{" "}
              <span style={{ color: "var(--color-primary-peach)" }}>Gallery</span>
            </h1>
            <p className="text-lg mt-4" style={{ color: "var(--color-muted-text)" }}>
              A visual journey through our beautiful campus, department activities, and student life
              at St. Berchmans College.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section
        className="py-6 sticky top-[72px] z-30"
        style={{ background: "var(--color-bg-canvas)" }}
      >
        <div className="container-main">
          <div className="flex items-center gap-2 flex-wrap">
            <Sparkles size={16} style={{ color: "var(--color-muted-text)" }} />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="badge transition-all cursor-pointer"
                style={{
                  background:
                    activeCategory === cat ? "var(--color-dark-text)" : "transparent",
                  color:
                    activeCategory === cat
                      ? "var(--color-surface-white)"
                      : "var(--color-muted-text)",
                  border: `1px solid ${
                    activeCategory === cat
                      ? "var(--color-dark-text)"
                      : "var(--color-border-subtle)"
                  }`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-main">
          <div className="gallery-masonry animate-on-scroll">
            {filtered.map((img, index) => (
              <div
                key={img.src}
                className="relative rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end"
                >
                  <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3
                      className="text-white text-sm font-semibold"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {img.caption}
                    </h3>
                    <p className="text-white/70 text-xs">{img.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon
                size={48}
                style={{ color: "var(--color-border-subtle)" }}
                className="mx-auto mb-4"
              />
              <p
                className="text-lg font-semibold"
                style={{ color: "var(--color-muted-text)" }}
              >
                No photos in this category yet
              </p>
              <p className="text-sm" style={{ color: "var(--color-light-text)" }}>
                Photos will be added as events and activities take place.
              </p>
            </div>
          )}

          <div
            className="mt-12 p-6 rounded-xl text-center animate-on-scroll"
            style={{
              background: "var(--color-bg-light)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>
              📸 More photos will be added as events and activities take place. Have photos to
              share? Contact the department web team.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Content */}
          <div
            className="relative z-10 max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Image */}
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>

            {/* Caption */}
            <div className="text-center mt-4">
              <h3 className="text-white text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                {filtered[lightboxIndex].caption}
              </h3>
              <p className="text-white/50 text-sm mt-1">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>

            {/* Navigation */}
            {filtered.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
