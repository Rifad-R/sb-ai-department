"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Award, Calendar, Star, MapPin, BookOpen, Users } from "lucide-react";

const milestones = [
  { year: "1922", title: "Founded", desc: "Established by Venerable Mar Thomas Kurialacherry, Bishop of Changanassery." },
  { year: "1996", title: "R Shankar Award", desc: "Won the coveted R Shankar Award for Best College in Kerala — repeated in 1997." },
  { year: "1999", title: "Five Star Status", desc: "First accredited with 'Five Star' status by NAAC." },
  { year: "2006", title: "NAAC A+", desc: "Re-accredited with 'A+' grade in the second cycle." },
  { year: "2014", title: "Autonomous Status", desc: "Granted autonomy by UGC and the Government of Kerala." },
  { year: "2018", title: "NIRF Top 100", desc: "Ranked among the top 100 Indian colleges by NIRF, MHRD — every year since." },
  { year: "2026", title: "AI & DS Department", desc: "Launched BSc. AI & Data Science — the first batch begins its journey." },
];

export default function AboutPage() {
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
      <section className="pt-28 pb-16 relative overflow-hidden" style={{ background: "var(--color-bg-light)" }}>
        <div className="container-main relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="badge-outline badge mb-4">About Us</div>
            <h1>
              A Legacy of{" "}
              <span style={{ color: "var(--color-primary-peach)" }}>Excellence</span>
            </h1>
            <p className="text-lg mt-4 max-w-2xl" style={{ color: "var(--color-muted-text)" }}>
              St. Berchmans College is the first higher education institution of the Archdiocese of Changanacherry, with over 100 years of tradition in academic excellence.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 animate-on-scroll">
              <h2 className="section-title mb-6">Our Story</h2>
              <div className="space-y-4 text-base" style={{ color: "var(--color-muted-text)", lineHeight: 1.9 }}>
                <p>
                  St. Berchmans College is the first higher education institution of the Archdiocese of Changanacherry. The college comes under The Archidiocesan Educational and Charitable Trust of Changancherry. This institution was founded in 1922 by Venerable Mar Thomas Kurialacherry, Bishop of Changanassery diocese.
                </p>
                <p>
                  It was started with the noble aim of the Universal Catholic Church, to mould young men and women who will strive for excellence in every walk of life and human service. The College is recognized under sections 2(f) and 12(B) of the UGC Act 1956.
                </p>
                <p>
                  The College was first accredited with &ldquo;Five Star&rdquo; in 1999 and reaccredited with &ldquo;A+&rdquo; in 2006. In the third cycle of accreditation in 2012, the college was again graded at A. In 2017, the college was again reaccredited with &lsquo;A&rsquo; grade. The University Grants Commission (UGC) and the Government of Kerala granted autonomy to this college in the year 2014.
                </p>
                <p>
                  In 1996 and 1997, it won the coveted &ldquo;R Shankar Award&rdquo; for the Best College in the State, instituted by the Government of Kerala. In 2004, the UGC identified the College under its &ldquo;College with Potential for Excellence&rdquo; scheme.
                </p>
                <p>
                  It has been ranked among the top 100 Indian colleges by the National Institutional Ranking Framework (NIRF), MHRD, Government of India since 2018.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4 animate-on-scroll delay-200">
              {/* Achievement badges */}
              {[
                { icon: Award, label: "NAAC 'A' Grade", sub: "Consistently accredited" },
                { icon: Star, label: "NIRF Top 100", sub: "Since 2018" },
                { icon: BookOpen, label: "Autonomous College", sub: "Since 2014" },
                { icon: Users, label: "R Shankar Award", sub: "Best College in Kerala" },
                { icon: MapPin, label: "Changanassery", sub: "Kottayam, Kerala" },
                { icon: Calendar, label: "Est. 1922", sub: "100+ Years of Legacy" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="card-glass p-4 flex items-center gap-4"
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "var(--color-primary-peach)", color: "var(--color-dark-text)" }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--color-dark-text)" }}>
                        {item.label}
                      </div>
                      <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>
                        {item.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Campus Photos */}
      <section className="section-padding" style={{ background: "var(--color-bg-light)" }}>
        <div className="container-main">
          <h2 className="section-title text-center mb-10 animate-on-scroll">Our Campus</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-on-scroll delay-200">
            {[
              { src: "/images/campus-wide.jpg", alt: "Campus panoramic view" },
              { src: "/images/campus-day.jpg", alt: "Campus in daylight" },
              { src: "/images/campus-dome.jpg", alt: "Iconic dome and statue" },
            ].map((img) => (
              <div key={img.src} className="rounded-xl overflow-hidden group" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={500}
                  height={375}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="section-title text-center mb-12 animate-on-scroll">
            Milestones & <span style={{ color: "var(--color-primary-peach)" }}>Achievements</span>
          </h2>

          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: "var(--color-border-subtle)" }}
            />

            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex items-start gap-6 mb-10 animate-on-scroll ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div
                    className="card p-5 inline-block"
                    style={{ maxWidth: "320px" }}
                  >
                    <div
                      className="text-xs font-bold mb-1 uppercase tracking-wider"
                      style={{ color: "var(--color-primary-peach)" }}
                    >
                      {m.year}
                    </div>
                    <h3
                      className="text-base mb-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {m.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
                {/* Dot */}
                <div
                  className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-4 z-10"
                  style={{
                    borderColor: "var(--color-primary-peach)",
                    background: "var(--color-bg-canvas)",
                  }}
                />
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
