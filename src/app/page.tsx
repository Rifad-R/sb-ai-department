"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BookOpen,
  Users,
  Trophy,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Brain,
  BarChart3,
  Code2,
  ChevronDown,
} from "lucide-react";

function AnimatedCounter({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-3xl md:text-4xl font-bold"
        style={{ fontFamily: "var(--font-serif)", color: "var(--color-primary-peach)" }}
      >
        {count}{suffix}
      </div>
      <div className="text-sm mt-1" style={{ color: "var(--color-muted-text)" }}>
        {label}
      </div>
    </div>
  );
}

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function HomePage() {
  useScrollAnimation();

  const features = [
    {
      icon: Brain,
      title: "Artificial Intelligence",
      desc: "Deep dive into neural networks, NLP, computer vision, and intelligent systems.",
      color: "#FDB27C",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      desc: "Master statistical analysis, data visualization, and data-driven decision making.",
      color: "#756860",
    },
    {
      icon: Code2,
      title: "Programming",
      desc: "Build strong foundations in Python, machine learning frameworks, and software engineering.",
      color: "#1C1917",
    },
    {
      icon: Sparkles,
      title: "Innovation Lab",
      desc: "Hands-on projects, research initiatives, and industry-exposure opportunities.",
      color: "#FDB27C",
    },
  ];

  return (
    <>
      <Navbar />

      {/* ========================
          HERO SECTION
          ======================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-college.jpg"
            alt="St. Berchmans College Campus"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="hero-gradient-overlay absolute inset-0" />
        </div>

        <div className="container-main relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="badge-peach badge mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <Sparkles size={12} />
              First Batch 2026–2030
            </div>

            {/* Title */}
            <h1
              className="animate-fade-in-up mb-4"
              style={{
                animationDelay: "0.2s",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              BSc. Artificial Intelligence
              <br />
              <span style={{ color: "var(--color-primary-peach)" }}>
                & Data Science
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl mb-8 animate-fade-in-up max-w-xl"
              style={{
                animationDelay: "0.35s",
                color: "var(--color-muted-text)",
                lineHeight: 1.6,
              }}
            >
              Department of AI & Data Science at{" "}
              <strong style={{ color: "var(--color-dark-text)" }}>
                St. Berchmans College
              </strong>
              , Changanassery — shaping the future of technology, one mind at a
              time.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-3 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <Link href="/courses" className="btn btn-primary">
                Explore Program
                <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="btn btn-outline">
                About the Department
              </Link>
            </div>

            {/* Stats */}
            <div
              className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl animate-fade-in-up"
              style={{
                animationDelay: "0.65s",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.7)",
              }}
            >
              <AnimatedCounter target={4} label="Year Program" suffix="" />
              <AnimatedCounter target={2026} label="Established" suffix="" />
              <AnimatedCounter target={40} label="Students" suffix="+" />
              <AnimatedCounter target={6} label="Core Subjects" suffix="" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <ChevronDown size={24} style={{ color: "var(--color-muted-text)" }} />
        </div>
      </section>

      {/* ========================
          ABOUT PREVIEW
          ======================== */}
      <section className="section-padding" id="about-preview" style={{ background: "var(--color-bg-light)" }}>
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="badge-outline badge mb-4">About the Department</div>
              <h2 className="section-title mb-4">
                Where Tradition Meets{" "}
                <span style={{ color: "var(--color-primary-peach)" }}>Innovation</span>
              </h2>
              <p className="mb-4" style={{ lineHeight: 1.8 }}>
                The Department of Artificial Intelligence & Data Science is futuristic
                and dedicated to equip students with cutting-edge knowledge and
                practical skills in AI, machine learning, and data analytics.
              </p>
              <p className="mb-6" style={{ lineHeight: 1.8 }}>
                With a curriculum aligned to emerging technological trends, it fosters
                innovation, critical problem-solving, and exposure to the use of
                intelligent systems.
              </p>
              <Link href="/about" className="btn btn-accent">
                Learn More
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="animate-on-scroll delay-200 relative">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                <Image
                  src="/images/campus-tower.jpg"
                  alt="St. Berchmans College Tower"
                  width={600}
                  height={750}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating accent card */}
              <div
                className="absolute -bottom-6 -left-6 p-4 rounded-xl hidden md:block"
                style={{
                  background: "var(--color-primary-peach)",
                  boxShadow: "var(--shadow-button-hover)",
                }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--color-dark-text)" }}
                >
                  Est. 1922
                </div>
                <div className="text-xs font-medium" style={{ color: "var(--color-dark-espresso)" }}>
                  100+ Years of Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================
          FEATURES / WHAT WE OFFER
          ======================== */}
      <section className="section-padding" id="features">
        <div className="container-main">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="badge-outline badge mx-auto mb-4">Curriculum Highlights</div>
            <h2 className="section-title">
              What You&apos;ll <span style={{ color: "var(--color-primary-peach)" }}>Learn</span>
            </h2>
            <p className="section-subtitle mx-auto mt-2">
              A comprehensive program covering the pillars of modern AI and Data Science.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="card p-6 animate-on-scroll group cursor-default"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{
                      background: `${feature.color}18`,
                      color: feature.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3
                    className="text-lg mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================
          CAMPUS GALLERY PREVIEW
          ======================== */}
      <section
        className="section-padding"
        id="campus-preview"
        style={{ background: "var(--color-bg-light)" }}
      >
        <div className="container-main">
          <div className="text-center mb-10 animate-on-scroll">
            <div className="badge-outline badge mx-auto mb-4">Campus Life</div>
            <h2 className="section-title">
              Our Beautiful <span style={{ color: "var(--color-primary-peach)" }}>Campus</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-on-scroll delay-200">
            {[
              { src: "/images/campus-wide.jpg", alt: "Campus Wide View" },
              { src: "/images/campus-day.jpg", alt: "Campus Daytime" },
              { src: "/images/campus-dome.jpg", alt: "Iconic College Dome" },
            ].map((img, i) => (
              <div
                key={img.src}
                className="rounded-xl overflow-hidden group cursor-pointer relative"
                style={{
                  aspectRatio: i === 0 ? "16/9" : "4/3",
                  gridColumn: i === 0 ? "1 / -1" : undefined,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 animate-on-scroll delay-300">
            <Link href="/gallery" className="btn btn-outline">
              View Full Gallery
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================
          QUICK NAVIGATION
          ======================== */}
      <section className="section-padding" id="quick-nav">
        <div className="container-main">
          <div className="text-center mb-10 animate-on-scroll">
            <h2 className="section-title">
              Explore the <span style={{ color: "var(--color-primary-peach)" }}>Department</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { href: "/faculty", icon: Users, label: "Faculty" },
              { href: "/students", icon: GraduationCap, label: "Students" },
              { href: "/academics", icon: BookOpen, label: "Academics" },
              { href: "/co-curricular", icon: Trophy, label: "Co-curricular" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card p-6 flex flex-col items-center text-center animate-on-scroll group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all group-hover:scale-110"
                    style={{
                      background: "var(--color-primary-peach)",
                      color: "var(--color-dark-text)",
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================
          CTA BANNER
          ======================== */}
      <section
        className="py-16"
        style={{
          background: "var(--color-dark-text)",
        }}
        id="cta-banner"
      >
        <div className="container-main text-center">
          <h2
            className="text-white mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            }}
          >
            Ready to Shape the Future with AI?
          </h2>
          <p
            className="mb-6 max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Join the first batch of BSc. AI & Data Science at one of Kerala&apos;s most
            prestigious institutions.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://sites.google.com/sbcollege.ac.in/sbcadmissions2026/home"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              Apply for Admission
              <ArrowRight size={16} />
            </a>
            <Link href="/contact" className="btn btn-outline" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
