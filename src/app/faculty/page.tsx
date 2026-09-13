"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Users, Mail, ArrowRight, Award } from "lucide-react";

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/faculty")
      .then((r) => r.json())
      .then((data) => setFaculty(data))
      .catch(() => {});
  }, []);

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
  }, [faculty]);

  const getAvatarGradient = (name: string) => {
    const colors = [
      ["#1C1917", "#2C2520"],
      ["#231F1C", "#3A3330"],
      ["#2C2520", "#1C1917"],
      ["#3A3330", "#231F1C"],
      ["#1C1917", "#3A3330"],
      ["#2C2520", "#231F1C"],
    ];
    const idx = name.charCodeAt(0) % colors.length;
    return `linear-gradient(135deg, ${colors[idx][0]}, ${colors[idx][1]})`;
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "var(--page-top-padding)",
          paddingBottom: "4rem",
          background: "var(--color-dark-text)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(253,178,124,0.3), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="container-main relative z-10 text-center">
          <p
            className="text-[11px] font-bold uppercase tracking-[4px] mb-4"
            style={{ color: "var(--color-primary-peach)" }}
          >
            Our Team
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
          >
            Meet the{" "}
            <span style={{ color: "var(--color-primary-peach)" }}>Faculty</span>
          </h1>
          <p
            className="text-sm max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Dedicated educators shaping the next generation of AI and Data Science professionals.
          </p>
        </div>
      </section>

      {/* Faculty Cards Grid */}
      <section
        style={{
          background: "var(--color-dark-text)",
          padding: "2rem 0 6rem",
        }}
      >
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member, index) => {
              const initials = member.name
                .split(" ")
                .map((n: string) => n.charAt(0))
                .join("")
                .substring(0, 2);

              return (
                <div
                  key={member.id}
                  className="animate-on-scroll group relative rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(253,178,124,0.08)",
                  }}
                >
                  {/* Hover Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(253,178,124,0.06), transparent)",
                      border: "1px solid rgba(253,178,124,0.2)",
                      borderRadius: "1rem",
                    }}
                  />

                  {/* Photo Area */}
                  <div
                    className="relative aspect-[3/4] flex items-center justify-center overflow-hidden"
                    style={{ background: getAvatarGradient(member.name) }}
                  >
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span
                        className="select-none"
                        style={{
                          color: "rgba(253,178,124,0.1)",
                          fontFamily: "var(--font-serif)",
                          fontSize: "5rem",
                          fontWeight: "bold",
                        }}
                      >
                        {initials}
                      </span>
                    )}

                    {/* Email icon on hover */}
                    {member.email && (
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                      >
                        <a
                          href={`mailto:${member.email}`}
                          className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                          style={{
                            background: "rgba(253,178,124,0.15)",
                            border: "1px solid rgba(253,178,124,0.25)",
                            color: "var(--color-primary-peach)",
                          }}
                        >
                          <Mail size={15} />
                        </a>
                      </div>
                    )}

                    {/* Qualifications badge top-left */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[8px] font-bold uppercase tracking-wide px-2 py-1 rounded-full backdrop-blur-md"
                        style={{
                          background: "rgba(253,178,124,0.2)",
                          border: "1px solid rgba(253,178,124,0.3)",
                          color: "var(--color-primary-peach-light)",
                        }}
                      >
                        {member.qualifications || "Faculty"}
                      </span>
                    </div>
                  </div>

                  {/* Name & Role Label */}
                  <div
                    className="relative -mt-5 mx-3 mb-3 px-4 py-3 rounded-xl flex items-center justify-between backdrop-blur-lg"
                    style={{
                      background: "rgba(253,178,124,0.08)",
                      border: "1px solid rgba(253,178,124,0.15)",
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Award size={15} style={{ color: "var(--color-primary-peach)" }} className="shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "#fff" }}>
                          {member.name}
                        </p>
                        <p className="text-[10px] truncate" style={{ color: "rgba(253,178,124,0.6)" }}>
                          {member.designation}
                          {member.specialization ? ` · ${member.specialization}` : ""}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className="shrink-0 group-hover:translate-x-1 transition-transform"
                      style={{ color: "rgba(253,178,124,0.5)" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {faculty.length === 0 && (
            <div className="text-center py-20">
              <Users size={48} style={{ color: "rgba(253,178,124,0.15)" }} className="mx-auto mb-4" />
              <p className="text-lg font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
                No faculty profiles yet
              </p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                Faculty profiles will be added by the department admin.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
