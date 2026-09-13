import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-dark-text)",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  background: "var(--color-primary-peach)",
                  color: "var(--color-dark-text)",
                }}
              >
                AI
              </div>
              <div>
                <h3
                  className="text-white text-base"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  AI & Data Science
                </h3>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  St. Berchmans College
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Equipping students with cutting-edge knowledge in AI, Machine
              Learning, and Data Analytics since 2026.
            </p>
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              BSc (Hons) AI & Data Science — First Batch 2026–2030
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ letterSpacing: "0.1em" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About" },
                { href: "/courses", label: "Courses" },
                { href: "/faculty", label: "Faculty" },
                { href: "/students", label: "Students" },
                { href: "/academics", label: "Academics" },
                { href: "/gallery", label: "Gallery" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4
              className="text-white text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ letterSpacing: "0.1em" }}
            >
              Useful Links
            </h4>
            <ul className="space-y-2.5">
              {[
                {
                  href: "https://sbcollege.ac.in/",
                  label: "SB College Website",
                  external: true,
                },
                {
                  href: "https://sbcollege.ac.in/sbacademics/undergraduate-program/",
                  label: "Syllabus",
                  external: true,
                },
                {
                  href: "https://sbcollege.ac.in/sbscholarships/",
                  label: "Scholarships",
                  external: true,
                },
                {
                  href: "https://sbcollege.ac.in/alumni-form/",
                  label: "Alumni Registration",
                  external: true,
                },
                {
                  href: "https://sbcollege.ac.in/virtual-tour/",
                  label: "360° Virtual Tour",
                  external: true,
                },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    {link.label}
                    {link.external && <ExternalLink size={11} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ letterSpacing: "0.1em" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "var(--color-primary-peach)" }} />
                <span className="text-sm">
                  St. Berchmans College, Changanassery,
                  <br />
                  Kottayam, 686101, Kerala, India
                </span>
              </li>
              <li>
                <a
                  href="tel:+919961231314"
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
                >
                  <Phone size={16} style={{ color: "var(--color-primary-peach)" }} />
                  +91 9961231314
                </a>
              </li>
              <li>
                <a
                  href="tel:04812420025"
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors ml-[26px]"
                >
                  0481-2420025
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sbcollege.ac.in"
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
                >
                  <Mail size={16} style={{ color: "var(--color-primary-peach)" }} />
                  info@sbcollege.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          <p>
            Tradition of Excellence since 1922. © {new Date().getFullYear()} St.
            Berchmans College. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Women Helpline: 1091, 181</span>
            <span>Anti-Ragging: 1800 180 5522</span>
          </div>
        </div>
      </div>

      {/* Mobile bottom padding so content doesn't hide behind tab bar */}
      <div className="hide-desktop" style={{ height: "calc(var(--mobile-bottom-nav-height) + 16px + env(safe-area-inset-bottom, 0px))" }} />
    </footer>
  );
}
