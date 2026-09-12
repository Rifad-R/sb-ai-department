"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect } from "react";
import {
  Brain,
  Code2,
  BarChart3,
  Database,
  Cpu,
  Globe,
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

const coreSubjects = [
  { code: "DSC-A", name: "Introduction to AI & Data Science", icon: Brain, semester: "All" },
  { code: "DSC-B", name: "Python Programming (Allied Minor)", icon: Code2, semester: "All" },
  { code: "DSC-C", name: "Statistics", icon: BarChart3, semester: "All" },
  { code: "MDC", name: "Multi-Disciplinary Course", icon: Database, semester: "Selected" },
];

const highlights = [
  "Strong foundation in computational thinking",
  "Hands-on projects and research initiatives",
  "Industry exposure and internships",
  "Interdisciplinary collaboration",
  "Curriculum aligned to emerging technological trends",
  "Career readiness in technology and research",
];

export default function CoursesPage() {
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
            <div className="badge-peach badge mb-4">
              <GraduationCap size={12} />
              Undergraduate Programme
            </div>
            <h1>
              BSc (Hons) Artificial Intelligence{" "}
              <span style={{ color: "var(--color-primary-peach)" }}>& Data Science</span>
            </h1>
            <p className="text-lg mt-4" style={{ color: "var(--color-muted-text)" }}>
              A 4-year undergraduate programme designed to equip students with cutting-edge knowledge in AI, machine learning, and data analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Programme Overview */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 animate-on-scroll">
              <h2 className="section-title mb-6">Programme Overview</h2>
              <p className="mb-4" style={{ color: "var(--color-muted-text)", lineHeight: 1.9 }}>
                The Department of Artificial Intelligence & Data Science is futuristic and dedicated to equip students with cutting-edge knowledge and practical skills in AI, machine learning, and data analytics. The department emphasizes a strong foundation in computational thinking, programming, and statistical analysis, complemented by hands-on projects, research initiatives, and industry exposure.
              </p>
              <p className="mb-8" style={{ color: "var(--color-muted-text)", lineHeight: 1.9 }}>
                With a curriculum aligned to emerging technological trends, it fosters innovation, critical problem-solving, and exposure to the use of intelligent systems. The department also encourages interdisciplinary collaboration and prepares students for careers in technology, research, and data-driven decision-making across diverse sectors.
              </p>

              {/* Programme Highlights */}
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                Programme Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--color-primary-peach)" }}
                    />
                    <span className="text-sm" style={{ color: "var(--color-muted-text)" }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="animate-on-scroll delay-200">
              <div
                className="card p-6 sticky top-24"
                style={{ background: "var(--color-surface-white)" }}
              >
                <h3 className="text-lg mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                  Quick Facts
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Clock, label: "Duration", value: "4 Years (8 Semesters)" },
                    { icon: BookOpen, label: "Degree", value: "BSc (Hons)" },
                    { icon: GraduationCap, label: "Batch", value: "2026–2030 (First)" },
                    { icon: Globe, label: "Affiliated To", value: "MG University" },
                    { icon: Cpu, label: "Department", value: "AI & Data Science" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: "var(--color-bg-canvas)", color: "var(--color-primary-peach)" }}
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>
                            {item.label}
                          </div>
                          <div className="text-sm font-semibold" style={{ color: "var(--color-dark-text)" }}>
                            {item.value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
                  <a
                    href="https://sites.google.com/sbcollege.ac.in/sbcadmissions2026/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent w-full text-sm"
                  >
                    Apply Now <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Subjects */}
      <section className="section-padding" style={{ background: "var(--color-bg-light)" }}>
        <div className="container-main">
          <h2 className="section-title text-center mb-10 animate-on-scroll">
            Core <span style={{ color: "var(--color-primary-peach)" }}>Subjects</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreSubjects.map((subj, index) => {
              const Icon = subj.icon;
              return (
                <div
                  key={subj.code}
                  className="card p-6 text-center animate-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "var(--color-primary-peach)", color: "var(--color-dark-text)" }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="badge-outline badge mx-auto mb-2">{subj.code}</div>
                  <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
                    {subj.name}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Additional subjects */}
          <div className="mt-8 text-center animate-on-scroll">
            <p className="text-sm mb-2" style={{ color: "var(--color-muted-text)" }}>
              Additional subjects include:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["English", "Malayalam / Hindi", "Swayam", "Mentoring", "Tech Lab", "Lab (Excel)"].map((s) => (
                <span key={s} className="badge-white badge">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "var(--color-dark-text)" }}>
        <div className="container-main text-center">
          <h2
            className="text-white mb-3"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            Interested in Joining?
          </h2>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Be part of the pioneering batch of AI & Data Science at St. Berchmans College.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://sites.google.com/sbcollege.ac.in/sbcadmissions2026/home"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              Apply for Admission <ArrowRight size={16} />
            </a>
            <Link
              href="/contact"
              className="btn btn-outline"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
