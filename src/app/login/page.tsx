"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowLeft,
  Shield,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard/admin");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-bg-canvas)" }}>
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm mb-10 group transition-colors"
            style={{ color: "var(--color-muted-text)" }}
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: "var(--color-dark-text)" }}
            >
              AI
            </div>
            <div>
              <h2
                className="text-lg font-semibold"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-dark-text)",
                }}
              >
                AI & Data Science
              </h2>
              <p className="text-xs" style={{ color: "var(--color-muted-text)" }}>
                St. Berchmans College, Changanassery
              </p>
            </div>
          </div>

          {/* Welcome */}
          <div className="mb-8">
            <h1
              className="text-2xl mb-2"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-dark-text)",
              }}
            >
              Admin Portal
            </h1>
            <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>
              Sign in to manage department data
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-dark-text)" }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--color-muted-text)" }}
                />
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input pl-11"
                  placeholder="admin@sbcollege.ac.in"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-dark-text)" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--color-muted-text)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input pl-11 pr-11"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "var(--color-muted-text)" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="p-3 rounded-lg text-sm"
                style={{
                  background: "#FEE2E2",
                  color: "#991B1B",
                  border: "1px solid #FECACA",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    style={{ animation: "spin 0.8s linear infinite" }}
                  />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div
            className="mt-8 pt-6 text-center text-xs"
            style={{
              borderTop: "1px solid var(--color-border-subtle)",
              color: "var(--color-light-text)",
            }}
          >
            <p>
              This portal is for authorized department admins only.
              <br />
              Contact the department office for access.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Decorative (Desktop Only) */}
      <div
        className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden"
        style={{
          background: "var(--color-dark-text)",
        }}
      >
        <Image
          src="/images/campus-tower.jpg"
          alt="St. Berchmans College"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10 text-center max-w-md p-12">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: "var(--color-primary-peach)",
              color: "var(--color-dark-text)",
            }}
          >
            <Shield size={28} />
          </div>
          <h2
            className="text-white text-2xl mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Admin Portal
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Manage students, faculty, and academic notes — all in one secure dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
