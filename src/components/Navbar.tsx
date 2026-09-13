"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Home,
  Info,
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  Trophy,
  FolderKanban,
  CalendarDays,
  Image,
  Phone,
  Menu,
  X,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/faculty", label: "Faculty", icon: Users },
  { href: "/students", label: "Students", icon: GraduationCap },
  { href: "/academics", label: "Academics", icon: Calendar },
  { href: "/co-curricular", label: "Co-curricular", icon: Trophy },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/contact", label: "Contact", icon: Phone },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hide-mobile ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-white"
        }`}
        id="main-nav"
      >
        <div className="container-main">
          <div className="flex items-center justify-between" style={{ height: "var(--navbar-height-desktop)" }}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "var(--color-dark-text)" }}
              >
                AI
              </div>
              <div>
                <span
                  className="font-semibold text-sm tracking-tight block leading-tight"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-dark-text)",
                  }}
                >
                  AI & Data Science
                </span>
                <span
                  className="text-xs block leading-tight"
                  style={{ color: "var(--color-muted-text)" }}
                >
                  St. Berchmans College
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link text-[11px] whitespace-nowrap ${
                      isActive ? "active" : ""
                    }`}
                    id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Admin Controls */}
            {session?.user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard/admin"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: "var(--color-bg-warm)",
                    border: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <User size={14} style={{ color: "var(--color-primary-peach-dark)" }} />
                  <span className="text-xs font-medium" style={{ color: "var(--color-dark-text)" }}>
                    {session.user.name}
                  </span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="btn-outline btn text-xs px-3 py-1.5 gap-1"
                  style={{ fontSize: "0.7rem" }}
                >
                  <LogOut size={12} />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  background: "var(--color-dark-text)",
                  color: "var(--color-surface-white)",
                }}
              >
                <User size={12} />
                Admin
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 hide-desktop transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-md"
            : "bg-white/60 backdrop-blur-md"
        }`}
        id="mobile-nav"
      >
        <div className="flex items-center justify-between px-4" style={{ height: "var(--navbar-height-mobile)" }}>
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "var(--color-dark-text)" }}
            >
              AI
            </div>
            <span
              className="font-semibold text-sm"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              AI & DS
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              background: mobileOpen
                ? "var(--color-dark-text)"
                : "var(--color-bg-light)",
              color: mobileOpen
                ? "var(--color-surface-white)"
                : "var(--color-dark-text)",
            }}
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 hide-desktop"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <nav
            className="absolute right-0 bottom-0 w-[280px] overflow-y-auto"
            style={{
              top: "var(--navbar-height-mobile)",
              background: "var(--color-bg-light)",
              borderLeft: "1px solid var(--color-border-subtle)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 space-y-1">
              {navItems.map((item, index) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{
                      background: isActive
                        ? "var(--color-dark-text)"
                        : "transparent",
                      color: isActive
                        ? "var(--color-surface-white)"
                        : "var(--color-muted-text)",
                      animationDelay: `${index * 50}ms`,
                    }}
                    id={`mobile-nav-${item.label
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium flex-1">
                      {item.label}
                    </span>
                    <ChevronRight size={14} style={{ opacity: 0.4 }} />
                  </Link>
                );
              })}

              <div
                className="mt-4 pt-4"
                style={{
                  borderTop: "1px solid var(--color-border-subtle)",
                }}
              >
                {session?.user ? (
                  <div className="space-y-3">
                    <Link
                      href="/dashboard/admin"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: "var(--color-bg-warm)" }}
                    >
                      <User size={18} style={{ color: "var(--color-primary-peach-dark)" }} />
                      <div>
                        <span className="text-sm font-medium block" style={{ color: "var(--color-dark-text)" }}>
                          {session.user.name}
                        </span>
                        <span className="text-xs" style={{ color: "var(--color-muted-text)" }}>
                          Admin Dashboard
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="btn-outline btn w-full text-sm gap-2"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium"
                    style={{
                      background: "var(--color-dark-text)",
                      color: "var(--color-surface-white)",
                    }}
                  >
                    <User size={14} />
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Bottom Tab Bar for Mobile */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 hide-desktop"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid var(--color-border-subtle)",
        }}
        id="mobile-bottom-nav"
      >
        <div className="flex items-center justify-around px-1" style={{ paddingTop: "0.5rem", paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" }}>
          {[navItems[0], navItems[2], navItems[4], navItems[9], navItems[10]].map(
            (item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all"
                  style={{
                    color: isActive
                      ? "var(--color-primary-peach-dark)"
                      : "var(--color-muted-text)",
                  }}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            }
          )}
        </div>
      </nav>
    </>
  );
}
