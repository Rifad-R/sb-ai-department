"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Users, Mail, Award } from "lucide-react";

const facultyData = [
  {
    name: "Faculty Member",
    designation: "Head of Department",
    qualifications: "PhD in Artificial Intelligence",
    specialization: "Machine Learning & Deep Learning",
    image: null,
  },
];

export default function FacultyPage() {
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
              <Users size={12} />
              Our Team
            </div>
            <h1>
              Meet Our{" "}
              <span style={{ color: "var(--color-primary-peach)" }}>Faculty</span>
            </h1>
            <p className="text-lg mt-4" style={{ color: "var(--color-muted-text)" }}>
              Dedicated educators shaping the next generation of AI and Data Science professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyData.map((faculty, index) => (
              <div
                key={index}
                className="card overflow-hidden animate-on-scroll group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Photo */}
                <div
                  className="relative h-64 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--color-bg-canvas), var(--color-bg-warm))" }}
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--color-primary-peach)",
                      color: "var(--color-dark-text)",
                    }}
                  >
                    <Users size={40} />
                  </div>
                  {/* Glass overlay */}
                  <div className="photo-glass-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <span className="text-xs">Contact via department</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                    {faculty.name}
                  </h3>
                  <div
                    className="text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary-peach)" }}
                  >
                    {faculty.designation}
                  </div>
                  <div className="space-y-1.5 mt-3">
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-muted-text)" }}>
                      <Award size={13} />
                      {faculty.qualifications}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-muted-text)" }}>
                      <Award size={13} />
                      {faculty.specialization}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Placeholder cards for future faculty */}
            {[1, 2].map((i) => (
              <div
                key={`placeholder-${i}`}
                className="card p-8 flex flex-col items-center justify-center text-center animate-on-scroll"
                style={{
                  minHeight: "380px",
                  background: "var(--color-bg-warm)",
                  border: "2px dashed var(--color-border-subtle)",
                  animationDelay: `${(i + 1) * 0.1}s`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "var(--color-border-subtle)", color: "var(--color-muted-text)" }}
                >
                  <Users size={28} />
                </div>
                <p className="text-sm font-medium" style={{ color: "var(--color-muted-text)" }}>
                  Faculty profile coming soon
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-light-text)" }}>
                  Details will be updated by admin
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-12 p-6 rounded-xl text-center animate-on-scroll"
            style={{
              background: "var(--color-bg-light)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>
              Faculty profiles are managed by the department admin. Check back for updates or{" "}
              <a href="/contact" className="font-semibold" style={{ color: "var(--color-primary-peach)" }}>
                contact the department
              </a>{" "}
              for more information.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
