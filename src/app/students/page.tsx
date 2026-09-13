"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { GraduationCap, Search, Filter, ArrowRight, Globe, User as UserIcon, Link as LinkIcon } from "lucide-react";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/students")
      .then((r) => r.json())
      .then((data) => setStudents(data))
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
  }, [students]);

  const filtered = students.filter((s) => {
    let tags: string[] = [];
    try { tags = JSON.parse(s.tags || "[]"); } catch { tags = []; }
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || tags.includes(filter);
    return matchesSearch && matchesFilter;
  });

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
            Our Students
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
          >
            Meet the{" "}
            <span style={{ color: "var(--color-primary-peach)" }}>People</span>
          </h1>
          <p
            className="text-sm max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            The pioneering batch of BSc. AI & Data Science at St. Berchmans College — building the future, one project at a time.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section
        style={{
          background: "var(--color-dark-espresso)",
          borderBottom: "1px solid rgba(253,178,124,0.1)",
          padding: "1.5rem 0",
        }}
      >
        <div className="container-main">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(255,255,255,0.3)" }}
              />
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="student-search"
                className="w-full py-3 pl-11 pr-4 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(253,178,124,0.12)",
                  color: "#fff",
                }}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
              {["all", "NSS", "Sports Wing", "Tech Team", "NCC"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all"
                  style={{
                    background: filter === f ? "rgba(253,178,124,0.25)" : "rgba(255,255,255,0.04)",
                    color: filter === f ? "var(--color-primary-peach-light)" : "rgba(255,255,255,0.4)",
                    border: `1px solid ${filter === f ? "rgba(253,178,124,0.4)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Cards Grid */}
      <section
        style={{
          background: "var(--color-dark-text)",
          padding: "3rem 0 6rem",
        }}
      >
        <div className="container-main">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((student, index) => {
              let tags: string[] = [];
              try { tags = JSON.parse(student.tags || "[]"); } catch { tags = []; }
              const initials = student.name
                .split(" ")
                .map((n: string) => n.charAt(0))
                .join("")
                .substring(0, 2);

              return (
                <div
                  key={student.id}
                  className="animate-on-scroll group relative rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    animationDelay: `${(index % 8) * 0.06}s`,
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
                    style={{ background: getAvatarGradient(student.name) }}
                  >
                    {student.photoUrl ? (
                      <img
                        src={student.photoUrl}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span
                        className="select-none"
                        style={{
                          color: "rgba(253,178,124,0.1)",
                          fontFamily: "var(--font-serif)",
                          fontSize: "4rem",
                          fontWeight: "bold",
                        }}
                      >
                        {initials}
                      </span>
                    )}

                    {/* Social icons on hover */}
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                    >
                      {[Globe, UserIcon, LinkIcon].map((Icon, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md cursor-pointer transition-colors"
                          style={{
                            background: "rgba(253,178,124,0.15)",
                            border: "1px solid rgba(253,178,124,0.25)",
                            color: "var(--color-primary-peach)",
                          }}
                        >
                          <Icon size={14} />
                        </div>
                      ))}
                    </div>

                    {/* Tags top-left */}
                    {tags.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[8px] font-bold uppercase tracking-wide px-2 py-1 rounded-full backdrop-blur-md"
                            style={{
                              background: "rgba(253,178,124,0.2)",
                              border: "1px solid rgba(253,178,124,0.3)",
                              color: "var(--color-primary-peach-light)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Name Label */}
                  <div
                    className="relative -mt-5 mx-3 mb-3 px-4 py-3 rounded-xl flex items-center justify-between backdrop-blur-lg"
                    style={{
                      background: "rgba(253,178,124,0.08)",
                      border: "1px solid rgba(253,178,124,0.15)",
                    }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <GraduationCap size={14} style={{ color: "var(--color-primary-peach)" }} className="shrink-0" />
                      <p className="text-sm font-semibold truncate" style={{ color: "#fff" }}>
                        {student.name}
                      </p>
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

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <GraduationCap size={48} style={{ color: "rgba(253,178,124,0.15)" }} className="mx-auto mb-4" />
              <p className="text-lg font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
                No students found
              </p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                Try a different search or filter.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
