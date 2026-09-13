"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Calendar, BookOpen, Download, Clock } from "lucide-react";

const timetableData = [
  {
    day: "Monday",
    periods: [
      { code: "DSC-A", name: "Intro to AI & Data Science" },
      { code: "DSC-B", name: "Python (Allied Minor)" },
      { code: "DSC-C", name: "Statistics" },
      { code: "Lang", name: "English" },
      { code: "Lang", name: "Malayalam / Hindi" },
      { code: "Lab", name: "Lab (Excel)" },
    ],
  },
  {
    day: "Tuesday",
    periods: [
      { code: "DSC-C", name: "Statistics" },
      { code: "Lab", name: "Python Lab / DSC-B" },
      { code: "", name: "—" },
      { code: "Lab", name: "MDC Lab" },
      { code: "", name: "—" },
      { code: "Lab", name: "Lab (Excel)" },
    ],
  },
  {
    day: "Wednesday",
    periods: [
      { code: "DSC-A", name: "AI & Data Science" },
      { code: "", name: "—" },
      { code: "MDC", name: "MDC" },
      { code: "DSC-B", name: "Python" },
      { code: "Lang", name: "Malayalam / Hindi" },
      { code: "Elec", name: "Swayam" },
    ],
  },
  {
    day: "Thursday",
    periods: [
      { code: "DSC-A", name: "AI" },
      { code: "DSC-B", name: "Python" },
      { code: "Lang", name: "English" },
      { code: "DSC-C", name: "Statistics (Minor)" },
      { code: "MDC", name: "MDC" },
      { code: "Lab", name: "Tech Lab" },
    ],
  },
  {
    day: "Friday",
    periods: [
      { code: "DSC-A", name: "AI & Data Science" },
      { code: "DSC-C", name: "Statistics Lab" },
      { code: "", name: "—" },
      { code: "Lang", name: "English" },
      { code: "Lang", name: "Malayalam / Hindi" },
      { code: "Elec", name: "Mentoring" },
    ],
  },
];

const periodHeaders = ["Period 1", "Period 2", "Period 3", "Period 4", "Period 5", "Period 6"];

function getCodeColor(code: string) {
  const colors: Record<string, string> = {
    "DSC-A": "#FDB27C",
    "DSC-B": "#756860",
    "DSC-C": "#1C1917",
    MDC: "#8A7D76",
    Lab: "#E8984F",
    Lang: "#A39890",
    Elec: "#FEC89A",
  };
  return colors[code] || "transparent";
}

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState<"timetable" | "syllabus">("timetable");

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
            <div className="badge-outline badge mb-4">
              <BookOpen size={12} />
              Academic Resources
            </div>
            <h1>
              <span style={{ color: "var(--color-primary-peach)" }}>Academics</span>
            </h1>
            <p className="text-lg mt-4" style={{ color: "var(--color-muted-text)" }}>
              Timetables, syllabi, and academic resources for BSc. AI & Data Science.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="sticky z-30 py-4" style={{ background: "var(--color-bg-canvas)", top: "var(--navbar-height-desktop)" }}>
        <div className="container-main">
          <div className="flex gap-2">
            {(["timetable", "syllabus"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="btn text-sm capitalize"
                style={{
                  background: activeTab === tab ? "var(--color-dark-text)" : "var(--color-surface-white)",
                  color: activeTab === tab ? "var(--color-surface-white)" : "var(--color-muted-text)",
                  border: `1px solid ${activeTab === tab ? "var(--color-dark-text)" : "var(--color-border-subtle)"}`,
                }}
              >
                {tab === "timetable" ? <Clock size={14} /> : <BookOpen size={14} />}
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-main">
          {activeTab === "timetable" ? (
            <div className="animate-fade-in">
              <h2 className="section-title mb-6">
                Class <span style={{ color: "var(--color-primary-peach)" }}>Timetable</span>
              </h2>
              <p className="mb-8" style={{ color: "var(--color-muted-text)" }}>
                Weekly schedule for BSc. AI &amp; Data Science — Semester 1 (2026–2027)
              </p>

              {/* Desktop Timetable */}
              <div className="hidden md:block overflow-x-auto mb-8">
                <table className="timetable-grid w-full">
                  <thead>
                    <tr>
                      <th className="text-left" style={{ width: "100px" }}>Day</th>
                      {periodHeaders.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Monday */}
                    <tr>
                      <td>Monday</td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("DSC-A")}20`, color: getCodeColor("DSC-A") }}>DSC-A</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Intro to AI &amp; Data Science</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("DSC-B")}20`, color: getCodeColor("DSC-B") }}>DSC-B</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Python (Allied Minor)</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("DSC-C")}20`, color: getCodeColor("DSC-C") }}>DSC-C</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Statistics</div>
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lang")}20`, color: getCodeColor("Lang") }}>Language</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>English &amp; Malayalam / Hindi</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lab")}20`, color: getCodeColor("Lab") }}>Lab</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Lab (Excel)</div>
                      </td>
                    </tr>

                    {/* Tuesday */}
                    <tr>
                      <td>Tuesday</td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("DSC-C")}20`, color: getCodeColor("DSC-C") }}>DSC-C</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Statistics</div>
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lab")}20`, color: getCodeColor("Lab") }}>Lab</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Python Lab / DSC-B</div>
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lab")}20`, color: getCodeColor("Lab") }}>Lab</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>MDC Lab</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lab")}20`, color: getCodeColor("Lab") }}>Lab</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Lab (Excel)</div>
                      </td>
                    </tr>

                    {/* Wednesday */}
                    <tr>
                      <td>Wednesday</td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("DSC-A")}20`, color: getCodeColor("DSC-A") }}>DSC-A</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>AI &amp; Data Science</div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div className="text-xs" style={{ color: "var(--color-light-text)" }}>—</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("MDC")}20`, color: getCodeColor("MDC") }}>MDC</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>MDC</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("DSC-B")}20`, color: getCodeColor("DSC-B") }}>DSC-B</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Python</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lang")}20`, color: getCodeColor("Lang") }}>Lang</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Malayalam / Hindi</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Elec")}20`, color: getCodeColor("Elec") }}>Elec</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Swayam</div>
                      </td>
                    </tr>

                    {/* Thursday */}
                    <tr>
                      <td>Thursday</td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("DSC-A")}20`, color: getCodeColor("DSC-A") }}>DSC-A</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>AI</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("DSC-B")}20`, color: getCodeColor("DSC-B") }}>DSC-B</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Python</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lang")}20`, color: getCodeColor("Lang") }}>Lang</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>English</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("DSC-C")}20`, color: getCodeColor("DSC-C") }}>DSC-C</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Statistics (Minor)</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("MDC")}20`, color: getCodeColor("MDC") }}>MDC</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>MDC</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lab")}20`, color: getCodeColor("Lab") }}>Lab</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Tech Lab</div>
                      </td>
                    </tr>

                    {/* Friday */}
                    <tr>
                      <td>Friday</td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("DSC-A")}20`, color: getCodeColor("DSC-A") }}>DSC-A</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>AI &amp; Data Science</div>
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lab")}20`, color: getCodeColor("Lab") }}>Lab</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Statistics Lab (DSC-C)</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lang")}20`, color: getCodeColor("Lang") }}>Lang</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>English</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Lang")}20`, color: getCodeColor("Lang") }}>Lang</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Malayalam / Hindi</div>
                      </td>
                      <td>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: `${getCodeColor("Elec")}20`, color: getCodeColor("Elec") }}>Elec</span>
                        <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>Mentoring</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Timetable Cards */}
              <div className="md:hidden space-y-4">
                {timetableData.map((row) => (
                  <div key={row.day} className="card p-4">
                    <h3 className="text-base font-semibold mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                      {row.day}
                    </h3>
                    <div className="space-y-2">
                      {row.periods.map((period, pi) => (
                        <div
                          key={pi}
                          className="flex items-center gap-3 p-2 rounded-lg"
                          style={{ background: period.code ? "var(--color-bg-light)" : "transparent" }}
                        >
                          <span className="text-xs font-medium w-16 shrink-0" style={{ color: "var(--color-light-text)" }}>
                            P{pi + 1}
                          </span>
                          {period.code && (
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                              style={{
                                background: `${getCodeColor(period.code)}20`,
                                color: getCodeColor(period.code),
                              }}
                            >
                              {period.code}
                            </span>
                          )}
                          <span className="text-sm" style={{ color: "var(--color-muted-text)" }}>
                            {period.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <h2 className="section-title mb-6">
                <span style={{ color: "var(--color-primary-peach)" }}>Syllabus</span>
              </h2>
              <p className="mb-8" style={{ color: "var(--color-muted-text)" }}>
                Course syllabi for BSc. AI & Data Science programme.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "DSC-A: Introduction to AI & Data Science", semester: "Semester 1" },
                  { name: "DSC-B: Python Programming", semester: "Semester 1" },
                  { name: "DSC-C: Statistics", semester: "Semester 1" },
                  { name: "MDC: Multi-Disciplinary Course", semester: "Semester 1" },
                ].map((s) => (
                  <div key={s.name} className="card p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold" style={{ color: "var(--color-dark-text)" }}>
                        {s.name}
                      </h4>
                      <p className="text-xs mt-1" style={{ color: "var(--color-muted-text)" }}>
                        {s.semester}
                      </p>
                    </div>
                    <button
                      className="btn btn-outline text-xs px-3 py-1.5 opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <Download size={12} />
                      Soon
                    </button>
                  </div>
                ))}
              </div>

              <div
                className="mt-8 p-5 rounded-xl text-center"
                style={{ background: "var(--color-bg-light)", border: "1px solid var(--color-border-subtle)" }}
              >
                <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>
                  📚 Detailed syllabi PDFs will be uploaded soon. Visit the{" "}
                  <a
                    href="https://sbcollege.ac.in/sbacademics/undergraduate-program/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold"
                    style={{ color: "var(--color-primary-peach)" }}
                  >
                    university syllabus page
                  </a>{" "}
                  for reference.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
