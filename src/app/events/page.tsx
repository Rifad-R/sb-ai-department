"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Clock,
  Filter,
} from "lucide-react";

type EventType = {
  title: string;
  date: string;
  time: string;
  venue: string;
  desc: string;
  category: string;
  status: "upcoming" | "past";
  highlight?: boolean;
};

const events: EventType[] = [
  {
    title: "Department Inauguration",
    date: "2026-09-15",
    time: "10:00 AM",
    venue: "Main Auditorium",
    desc: "Grand inauguration of the Department of AI & Data Science with distinguished guests from academia and industry.",
    category: "Ceremony",
    status: "upcoming",
    highlight: true,
  },
  {
    title: "AI Orientation Week",
    date: "2026-09-20",
    time: "9:00 AM – 4:00 PM",
    venue: "AI Lab, Block C",
    desc: "Week-long orientation for the first batch covering introduction to AI, department facilities, and academic roadmap.",
    category: "Academic",
    status: "upcoming",
  },
  {
    title: "Python Bootcamp",
    date: "2026-10-05",
    time: "2:00 PM – 5:00 PM",
    venue: "Computer Lab 2",
    desc: "Intensive hands-on Python programming workshop for beginners. Covers fundamentals, data types, and basic algorithms.",
    category: "Workshop",
    status: "upcoming",
  },
  {
    title: "Guest Lecture: Future of AI in India",
    date: "2026-10-20",
    time: "11:00 AM",
    venue: "Seminar Hall",
    desc: "A special guest lecture by industry experts on the landscape of AI adoption and career opportunities in India.",
    category: "Guest Lecture",
    status: "upcoming",
  },
  {
    title: "Data Science Hackathon",
    date: "2026-11-15",
    time: "9:00 AM – 6:00 PM",
    venue: "AI Lab & Innovation Centre",
    desc: "A day-long data science hackathon where students solve real-world problems using datasets and analytical tools.",
    category: "Competition",
    status: "upcoming",
  },
  {
    title: "First Batch Welcome Ceremony",
    date: "2026-09-02",
    time: "10:00 AM",
    venue: "Main Auditorium",
    desc: "Official welcome ceremony for the pioneering batch of BSc. AI & Data Science students.",
    category: "Ceremony",
    status: "past",
  },
];

const filterCategories = ["All", "Ceremony", "Academic", "Workshop", "Guest Lecture", "Competition"];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return {
    day: date.getDate().toString().padStart(2, "0"),
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    year: date.getFullYear().toString(),
    full: date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showPast, setShowPast] = useState(false);

  const filtered = events.filter((e) => {
    const matchCategory = activeFilter === "All" || e.category === activeFilter;
    const matchStatus = showPast ? e.status === "past" : e.status === "upcoming";
    return matchCategory && matchStatus;
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
      <section className="pb-16" style={{ paddingTop: "var(--page-top-padding)", background: "var(--color-bg-light)" }}>
        <div className="container-main">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="badge-peach badge mb-4">
              <CalendarDays size={12} />
              What&apos;s Happening
            </div>
            <h1>
              Department{" "}
              <span style={{ color: "var(--color-primary-peach)" }}>Events</span>
            </h1>
            <p className="text-lg mt-4" style={{ color: "var(--color-muted-text)" }}>
              Stay updated with workshops, seminars, hackathons, and celebrations in the AI & Data
              Science department.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Toggle */}
      <section
        className="py-6 sticky z-30"
        style={{ background: "var(--color-bg-canvas)", top: "var(--navbar-height-desktop)" }}
      >
        <div className="container-main">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} style={{ color: "var(--color-muted-text)" }} />
              {filterCategories.map((cat) => (
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
                    border: `1px solid ${activeFilter === cat
                        ? "var(--color-dark-text)"
                        : "var(--color-border-subtle)"
                      }`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {(["upcoming", "past"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setShowPast(s === "past")}
                  className="btn text-xs capitalize"
                  style={{
                    background:
                      (s === "past") === showPast
                        ? "var(--color-dark-text)"
                        : "var(--color-surface-white)",
                    color:
                      (s === "past") === showPast
                        ? "var(--color-surface-white)"
                        : "var(--color-muted-text)",
                    border: `1px solid ${(s === "past") === showPast
                        ? "var(--color-dark-text)"
                        : "var(--color-border-subtle)"
                      }`,
                    padding: "0.4rem 1rem",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="section-padding">
        <div className="container-main">
          <div className="space-y-6">
            {filtered.map((event, index) => {
              const d = formatDate(event.date);
              return (
                <div
                  key={event.title}
                  className={`card overflow-hidden animate-on-scroll ${event.highlight ? "ring-2 ring-offset-2" : ""
                    }`}
                  style={{
                    animationDelay: `${index * 0.08}s`,
                    ...(event.highlight
                      ? ({
                        "--tw-ring-color": "var(--color-primary-peach)",
                        "--tw-ring-offset-color": "var(--color-bg-canvas)",
                      } as React.CSSProperties)
                      : {}),
                  }}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Date Block */}
                    <div
                      className="sm:w-32 p-5 flex sm:flex-col items-center justify-center gap-2 sm:gap-0 shrink-0"
                      style={{
                        background: event.highlight
                          ? "var(--color-primary-peach)"
                          : "var(--color-bg-warm)",
                      }}
                    >
                      <div
                        className="text-3xl font-bold"
                        style={{
                          fontFamily: "var(--font-serif)",
                          color: event.highlight
                            ? "var(--color-dark-text)"
                            : "var(--color-dark-text)",
                        }}
                      >
                        {d.day}
                      </div>
                      <div
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{
                          color: event.highlight
                            ? "var(--color-dark-espresso)"
                            : "var(--color-muted-text)",
                        }}
                      >
                        {d.month} {d.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3
                          className="text-lg"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {event.title}
                        </h3>
                        <span
                          className="badge text-[10px] shrink-0"
                          style={{
                            background: `var(--color-primary-peach)`,
                            color: "var(--color-dark-text)",
                          }}
                        >
                          {event.category}
                        </span>
                      </div>

                      <p
                        className="text-sm mb-4"
                        style={{ color: "var(--color-muted-text)" }}
                      >
                        {event.desc}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <div
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: "var(--color-light-text)" }}
                        >
                          <Clock size={13} />
                          {event.time}
                        </div>
                        <div
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: "var(--color-light-text)" }}
                        >
                          <MapPin size={13} />
                          {event.venue}
                        </div>
                        <div
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: "var(--color-light-text)" }}
                        >
                          <CalendarDays size={13} />
                          {d.full}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <CalendarDays
                size={48}
                style={{ color: "var(--color-border-subtle)" }}
                className="mx-auto mb-4"
              />
              <p
                className="text-lg font-semibold"
                style={{ color: "var(--color-muted-text)" }}
              >
                No {showPast ? "past" : "upcoming"} events
              </p>
              <p className="text-sm" style={{ color: "var(--color-light-text)" }}>
                {showPast
                  ? "Check the upcoming tab for scheduled events."
                  : "Stay tuned — new events will be announced soon!"}
              </p>
            </div>
          )}

          {/* Subscribe note */}
          <div
            className="mt-12 p-6 rounded-xl text-center animate-on-scroll"
            style={{
              background: "var(--color-bg-light)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>
              📅 Want to stay updated? Follow the department on social media or{" "}
              <Link
                href="/contact"
                className="font-semibold"
                style={{ color: "var(--color-primary-peach)" }}
              >
                subscribe to event notifications
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
