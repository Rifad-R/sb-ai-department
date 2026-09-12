"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import {
  Trophy,
  Users,
  Shield,
  Code2,
  Palette,
  Mic2,
  HeartHandshake,
  Medal,
  ArrowRight,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";

const clubs = [
  {
    name: "Tech Club",
    icon: Code2,
    color: "#FDB27C",
    desc: "Explore emerging technologies, hackathons, coding contests, and tech workshops led by students and industry mentors.",
    activities: ["Hackathons", "Coding Contests", "Tech Talks", "Workshops"],
  },
  {
    name: "NSS Unit",
    icon: HeartHandshake,
    color: "#756860",
    desc: "National Service Scheme activities focused on community development, social awareness, and voluntary service.",
    activities: ["Community Service", "Blood Donation", "Campus Clean-up", "Awareness Camps"],
  },
  {
    name: "NCC",
    icon: Shield,
    color: "#1C1917",
    desc: "National Cadet Corps — developing discipline, leadership, and patriotism through structured military training.",
    activities: ["Drill Training", "Camp Participation", "Republic Day Parade", "Adventure Activities"],
  },
  {
    name: "Sports Wing",
    icon: Medal,
    color: "#E8984F",
    desc: "Compete at inter-collegiate and university level sports, with access to modern sports facilities and coaching.",
    activities: ["Cricket", "Football", "Athletics", "Table Tennis"],
  },
  {
    name: "Arts & Culture",
    icon: Palette,
    color: "#8A7D76",
    desc: "Express creativity through fine arts, performing arts, literary events, and cultural festivals throughout the year.",
    activities: ["Fine Arts", "Drama", "Music", "Dance"],
  },
  {
    name: "Debate & MUN",
    icon: Mic2,
    color: "#FEC89A",
    desc: "Sharpen critical thinking and public speaking through inter-collegiate debates, Model United Nations, and oratory events.",
    activities: ["Debates", "Model UN", "Elocution", "Quiz Competitions"],
  },
];

const achievements = [
  { stat: "15+", label: "Annual Events" },
  { stat: "6", label: "Active Clubs" },
  { stat: "100%", label: "Student Participation" },
  { stat: "5+", label: "Inter-Collegiate Wins" },
];

export default function CoCurricularPage() {
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
              <Trophy size={12} />
              Beyond Academics
            </div>
            <h1>
              Co-curricular{" "}
              <span style={{ color: "var(--color-primary-peach)" }}>Activities</span>
            </h1>
            <p className="text-lg mt-4" style={{ color: "var(--color-muted-text)" }}>
              Holistic development through clubs, sports, community service, and creative pursuits
              that complement your academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section
        className="py-10"
        style={{
          background: "var(--color-dark-text)",
        }}
      >
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((a) => (
              <div key={a.label} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-primary-peach)",
                  }}
                >
                  {a.stat}
                </div>
                <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {a.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs & Activities */}
      <section className="section-padding">
        <div className="container-main">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="badge-outline badge mx-auto mb-4">
              <Sparkles size={12} />
              Student Life
            </div>
            <h2 className="section-title">
              Clubs &{" "}
              <span style={{ color: "var(--color-primary-peach)" }}>Organizations</span>
            </h2>
            <p className="section-subtitle mx-auto mt-2">
              Discover vibrant student organizations that nurture talent and build lifelong skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => {
              const Icon = club.icon;
              return (
                <div
                  key={club.name}
                  className="card p-6 animate-on-scroll group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{
                      background: `${club.color}18`,
                      color: club.color,
                    }}
                  >
                    <Icon size={26} />
                  </div>

                  <h3
                    className="text-lg mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {club.name}
                  </h3>

                  <p className="text-sm mb-4" style={{ color: "var(--color-muted-text)" }}>
                    {club.desc}
                  </p>

                  {/* Activity tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {club.activities.map((act) => (
                      <span
                        key={act}
                        className="badge-white badge text-[10px]"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Get Involved */}
      <section className="section-padding" style={{ background: "var(--color-bg-light)" }}>
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 className="section-title mb-6">
              How to Get{" "}
              <span style={{ color: "var(--color-primary-peach)" }}>Involved</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              {[
                {
                  step: "01",
                  title: "Explore",
                  desc: "Browse the clubs and activities above to find what excites you.",
                  icon: Target,
                },
                {
                  step: "02",
                  title: "Connect",
                  desc: "Reach out to club coordinators or the department faculty advisor.",
                  icon: Users,
                },
                {
                  step: "03",
                  title: "Participate",
                  desc: "Join events, attend meetings, and become an active contributor.",
                  icon: Trophy,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: "var(--color-primary-peach)",
                        color: "var(--color-dark-text)",
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <div
                      className="text-xs font-bold uppercase tracking-wider mb-1"
                      style={{ color: "var(--color-primary-peach)" }}
                    >
                      Step {item.step}
                    </div>
                    <h3
                      className="text-base mb-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
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
            Ready to Go Beyond the Classroom?
          </h2>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Join our clubs and shape your co-curricular journey at St. Berchmans College.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-accent">
              Get in Touch <ArrowRight size={16} />
            </Link>
            <Link
              href="/students"
              className="btn btn-outline"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
            >
              Meet the Students
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
