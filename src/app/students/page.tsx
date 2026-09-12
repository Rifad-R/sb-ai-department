"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { GraduationCap, Search, Filter } from "lucide-react";

const sampleStudents = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  rollNo: `SBCAIDS${String(i + 1).padStart(3, "0")}`,
  batch: "2026–2030",
  tags: [["NSS"], ["Sports Wing"], ["Tech Team"], ["NCC"], ["NSS", "Tech Team"], []][i % 6] || [],
}));

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = sampleStudents.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || s.tags.includes(filter);
    return matchesSearch && matchesFilter;
  });

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
              Batch 2026–2030
            </div>
            <h1>
              Our <span style={{ color: "var(--color-primary-peach)" }}>Students</span>
            </h1>
            <p className="text-lg mt-4" style={{ color: "var(--color-muted-text)" }}>
              The pioneering batch of BSc. AI & Data Science at St. Berchmans College.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8" style={{ background: "var(--color-bg-light)", borderBottom: "1px solid var(--color-border-subtle)" }}>
        <div className="container-main">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--color-muted-text)" }} />
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-11"
                id="student-search"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} style={{ color: "var(--color-muted-text)" }} />
              {["all", "NSS", "Sports Wing", "Tech Team", "NCC"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="badge transition-all cursor-pointer"
                  style={{
                    background: filter === f ? "var(--color-dark-text)" : "transparent",
                    color: filter === f ? "var(--color-surface-white)" : "var(--color-muted-text)",
                    border: `1px solid ${filter === f ? "var(--color-dark-text)" : "var(--color-border-subtle)"}`,
                  }}
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Grid */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((student, index) => (
              <div
                key={student.id}
                className="card overflow-hidden animate-on-scroll group cursor-pointer"
                style={{ animationDelay: `${(index % 8) * 0.05}s` }}
              >
                {/* Photo placeholder */}
                <div
                  className="relative h-48 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, var(--color-bg-canvas), var(--color-bg-warm))`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{
                      background: "var(--color-primary-peach)",
                      color: "var(--color-dark-text)",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {student.name.charAt(student.name.length - 1) === " "
                      ? "S"
                      : student.name.split(" ").pop()?.charAt(0) || "S"}
                  </div>

                  {/* Tags overlay */}
                  {student.tags.length > 0 && (
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                      {student.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: "var(--color-primary-peach)",
                            color: "var(--color-dark-text)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <h3
                    className="text-sm font-semibold truncate"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {student.name}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--color-muted-text)" }}>
                    {student.rollNo}
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: "var(--color-light-text)" }}>
                    {student.batch}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <GraduationCap size={48} style={{ color: "var(--color-border-subtle)" }} className="mx-auto mb-4" />
              <p className="text-lg font-semibold" style={{ color: "var(--color-muted-text)" }}>
                No students found
              </p>
              <p className="text-sm" style={{ color: "var(--color-light-text)" }}>
                Try a different search term or filter.
              </p>
            </div>
          )}

          <div
            className="mt-12 p-6 rounded-xl text-center"
            style={{ background: "var(--color-bg-light)", border: "1px solid var(--color-border-subtle)" }}
          >
            <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>
              📋 Student profiles will be populated from the department database. Data includes names, roll numbers, photos, portfolios, and co-curricular tags.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
