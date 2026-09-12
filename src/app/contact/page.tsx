"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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
              <Phone size={12} />
              Get in Touch
            </div>
            <h1>
              Contact{" "}
              <span style={{ color: "var(--color-primary-peach)" }}>Us</span>
            </h1>
            <p className="text-lg mt-4" style={{ color: "var(--color-muted-text)" }}>
              Reach out to the Department of AI & Data Science for inquiries about admissions,
              academics, or collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3 animate-on-scroll">
              <h2 className="section-title mb-6">
                Send Us a{" "}
                <span style={{ color: "var(--color-primary-peach)" }}>Message</span>
              </h2>

              {submitted ? (
                <div
                  className="card p-8 text-center"
                  style={{ background: "var(--color-bg-light)" }}
                >
                  <CheckCircle2
                    size={48}
                    className="mx-auto mb-4"
                    style={{ color: "var(--color-primary-peach)" }}
                  />
                  <h3
                    className="text-xl mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>
                    Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: "var(--color-dark-text)" }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: "var(--color-dark-text)" }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--color-dark-text)" }}
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input"
                      style={{
                        cursor: "pointer",
                        appearance: "none",
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option value="admission">Admission Inquiry</option>
                      <option value="academic">Academic Information</option>
                      <option value="faculty">Faculty / Staff</option>
                      <option value="collaboration">Industry Collaboration</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--color-dark-text)" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input"
                      placeholder="Write your message here..."
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <button type="submit" className="btn btn-accent">
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 animate-on-scroll delay-200">
              <div className="card p-6 sticky top-24">
                <h3
                  className="text-lg mb-6"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Contact Information
                </h3>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--color-bg-canvas)",
                        color: "var(--color-primary-peach)",
                      }}
                    >
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div
                        className="text-xs font-medium uppercase tracking-wider mb-0.5"
                        style={{ color: "var(--color-light-text)" }}
                      >
                        Address
                      </div>
                      <p className="text-sm" style={{ color: "var(--color-dark-text)" }}>
                        Department of AI & Data Science
                        <br />
                        St. Berchmans College (Autonomous)
                        <br />
                        Changanassery, Kottayam
                        <br />
                        Kerala - 686101, India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--color-bg-canvas)",
                        color: "var(--color-primary-peach)",
                      }}
                    >
                      <Phone size={18} />
                    </div>
                    <div>
                      <div
                        className="text-xs font-medium uppercase tracking-wider mb-0.5"
                        style={{ color: "var(--color-light-text)" }}
                      >
                        Phone
                      </div>
                      <a
                        href="tel:+919961231314"
                        className="text-sm block hover:underline"
                        style={{ color: "var(--color-dark-text)" }}
                      >
                        +91 9961231314
                      </a>
                      <a
                        href="tel:04812420025"
                        className="text-sm block hover:underline"
                        style={{ color: "var(--color-muted-text)" }}
                      >
                        0481-2420025
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--color-bg-canvas)",
                        color: "var(--color-primary-peach)",
                      }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <div
                        className="text-xs font-medium uppercase tracking-wider mb-0.5"
                        style={{ color: "var(--color-light-text)" }}
                      >
                        Email
                      </div>
                      <a
                        href="mailto:info@sbcollege.ac.in"
                        className="text-sm block hover:underline"
                        style={{ color: "var(--color-dark-text)" }}
                      >
                        info@sbcollege.ac.in
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--color-bg-canvas)",
                        color: "var(--color-primary-peach)",
                      }}
                    >
                      <Clock size={18} />
                    </div>
                    <div>
                      <div
                        className="text-xs font-medium uppercase tracking-wider mb-0.5"
                        style={{ color: "var(--color-light-text)" }}
                      >
                        Office Hours
                      </div>
                      <p className="text-sm" style={{ color: "var(--color-dark-text)" }}>
                        Mon – Fri: 9:00 AM – 4:00 PM
                        <br />
                        <span style={{ color: "var(--color-muted-text)" }}>
                          Sat: 9:00 AM – 1:00 PM
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--color-bg-canvas)",
                        color: "var(--color-primary-peach)",
                      }}
                    >
                      <Globe size={18} />
                    </div>
                    <div>
                      <div
                        className="text-xs font-medium uppercase tracking-wider mb-0.5"
                        style={{ color: "var(--color-light-text)" }}
                      >
                        Website
                      </div>
                      <a
                        href="https://sbcollege.ac.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 hover:underline"
                        style={{ color: "var(--color-dark-text)" }}
                      >
                        sbcollege.ac.in <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding" style={{ background: "var(--color-bg-light)" }}>
        <div className="container-main">
          <h2 className="section-title text-center mb-8 animate-on-scroll">
            Find{" "}
            <span style={{ color: "var(--color-primary-peach)" }}>Us</span>
          </h2>
          <div
            className="rounded-2xl overflow-hidden animate-on-scroll delay-200"
            style={{
              boxShadow: "var(--shadow-elevated)",
              height: "400px",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.041637835537!2d76.53588531525!3d9.447398493328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0620d3b3f2e8e3%3A0x8b0e7e0e3e3e3e3e!2sSt.%20Berchmans%20College!5e0!3m2!1sen!2sin!4v1695000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St. Berchmans College Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
