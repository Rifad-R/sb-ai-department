"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  ArrowRight,
  Sparkles,
  Filter,
  Brain,
  BarChart3,
  Eye,
  Bot,
} from "lucide-react";

const projects = [
  {
    title: "Campus AI Assistant",
    desc: "An intelligent chatbot built with NLP to answer student queries about admissions, courses, schedules, and campus life at St. Berchmans College.",
    category: "AI / NLP",
    status: "In Progress",
    tech: ["Python", "LangChain", "Gemini API", "Next.js"],
    team: "AI & DS Students",
    icon: Bot,
  },
  {
    title: "Student Performance Analytics",
    desc: "A data visualization dashboard that analyzes academic performance trends, attendance patterns, and learning outcomes across semesters.",
    category: "Data Science",
    status: "Planned",
    tech: ["Python", "Pandas", "Matplotlib", "Streamlit"],
    team: "Data Analytics Team",
    icon: BarChart3,
  },
  {
    title: "Image Classification Model",
    desc: "A deep learning model trained on custom datasets for classifying campus flora, built as a hands-on computer vision learning project.",
    category: "Machine Learning",
    status: "Planned",
    tech: ["Python", "TensorFlow", "OpenCV", "Flask"],
    team: "ML Study Group",
    icon: Eye,
  },
  {
    title: "AI-Powered Timetable Generator",
    desc: "An intelligent scheduling system that optimizes class timetables considering faculty availability, room constraints, and student preferences.",
    category: "AI / Optimization",
    status: "Ideation",
    tech: ["Python", "Constraint Programming", "React"],
    team: "Tech Club",
    icon: Brain,
  },
  {
    title: "Sentiment Analysis Dashboard",
    desc: "Analyzing student feedback and social media mentions using NLP techniques to gauge campus satisfaction and highlight areas for improvement.",
    category: "Data Science",
    status: "Planned",
    tech: ["Python", "NLTK", "Hugging Face", "D3.js"],
    team: "NLP Team",
    icon: BarChart3,
  },
  {
    title: "Department Website",
    desc: "This very website! A modern, responsive web platform for the AI & Data Science department, built from scratch by the first batch.",
    category: "Web Development",
    status: "Active",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    team: "Web Dev Team",
    icon: FolderKanban,
  },
];

const categories = ["All", "AI / NLP", "Data Science", "Machine Learning", "AI / Optimization", "Web Development"];

function getStatusStyle(status: string) {
  switch (status) {
    case "Active":
      return { bg: "#22c55e20", color: "#16a34a" };
    case "In Progress":
      return { bg: "#FDB27C25", color: "#E8984F" };
    case "Planned":
      return { bg: "#75686020", color: "#756860" };
    case "Ideation":
      return { bg: "#8A7D7620", color: "#8A7D76" };
    default:
      return { bg: "#f3f4f6", color: "#6b7280" };
  }
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
      <section className="pb-16" style={{ paddingTop: "var(--page-top-padding)", background: "var(--color-bg-light)" }}>
        <div className="container-main">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="badge-peach badge mb-4">
              <Sparkles size={12} />
              Student Innovation
            </div>
            <h1>
              Our{" "}
              <span style={{ color: "var(--color-primary-peach)" }}>Projects</span>
            </h1>
            <p className="text-lg mt-4" style={{ color: "var(--color-muted-text)" }}>
              Explore the innovative projects being developed by students and faculty of the AI &
              Data Science department.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section
        className="py-6 sticky z-30"
        style={{ background: "var(--color-bg-canvas)", top: "var(--navbar-height-desktop)" }}
      >
        <div className="container-main">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} style={{ color: "var(--color-muted-text)" }} />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="badge transition-all cursor-pointer"
                style={{
                  background:
                    activeFilter === cat ? "var(--color-dark-text)" : "transparent",
                  color:
                    activeFilter === cat
                      ? "var(--color-surface-white)"
                      : "var(--color-muted-text)",
                  border: `1px solid ${
                    activeFilter === cat
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

      {/* Project Cards */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              const statusStyle = getStatusStyle(project.status);
              return (
                <div
                  key={project.title}
                  className="card p-6 flex flex-col animate-on-scroll group"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        background: "var(--color-primary-peach)",
                        color: "var(--color-dark-text)",
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-lg mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm mb-4 flex-1"
                    style={{ color: "var(--color-muted-text)" }}
                  >
                    {project.desc}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="badge-white badge text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-3"
                    style={{
                      borderTop: "1px solid var(--color-border-subtle)",
                    }}
                  >
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-light-text)" }}
                    >
                      {project.team}
                    </span>
                    <span
                      className="text-[10px] font-medium uppercase tracking-wider"
                      style={{ color: "var(--color-muted-text)" }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <FolderKanban
                size={48}
                style={{ color: "var(--color-border-subtle)" }}
                className="mx-auto mb-4"
              />
              <p
                className="text-lg font-semibold"
                style={{ color: "var(--color-muted-text)" }}
              >
                No projects in this category yet
              </p>
              <p className="text-sm" style={{ color: "var(--color-light-text)" }}>
                Check back soon or try a different filter.
              </p>
            </div>
          )}

          {/* Note */}
          <div
            className="mt-12 p-6 rounded-xl text-center animate-on-scroll"
            style={{
              background: "var(--color-bg-light)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>
              🚀 Projects are actively being developed by students of the first batch. Have an
              idea?{" "}
              <Link
                href="/contact"
                className="font-semibold"
                style={{ color: "var(--color-primary-peach)" }}
              >
                Reach out to the department
              </Link>{" "}
              to pitch your project.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "var(--color-dark-text)" }}>
        <div className="container-main text-center">
          <h2
            className="text-white mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            Have a Project Idea?
          </h2>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            We encourage innovation and collaboration. Submit your project idea to the department.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-accent">
              Submit Your Idea <ArrowRight size={16} />
            </Link>
            <Link
              href="/courses"
              className="btn btn-outline"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
