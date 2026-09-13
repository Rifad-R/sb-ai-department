"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Users,
  GraduationCap,
  BookOpen,
  LogOut,
  Plus,
  Edit3,
  Trash2,
  X,
  Home,
  Search,
  LayoutDashboard,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  batch: string;
  tags: string;
  photoUrl: string | null;
}

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualifications: string;
  specialization: string;
  email: string | null;
  photoUrl: string | null;
}

interface Note {
  id: string;
  title: string;
  subject: string;
  semester: string;
  fileUrl: string | null;
  content: string | null;
  createdAt: string;
}

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "faculty", label: "Faculty", icon: Users },
  { id: "notes", label: "Academic Notes", icon: BookOpen },
];

export default function AdminDashboard() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState<Student[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Form states
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [studentForm, setStudentForm] = useState({ name: "", rollNo: "", batch: "2026-2030", tags: "" });

  const [showFacultyForm, setShowFacultyForm] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);
  const [facultyForm, setFacultyForm] = useState({ name: "", designation: "", qualifications: "", specialization: "", email: "" });

  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteForm, setNoteForm] = useState({ title: "", subject: "", semester: "1", fileUrl: "", content: "" });

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/login");
    } else if (sessionStatus === "authenticated" && (session?.user as any)?.role !== "ADMIN") {
      router.push("/");
    }
  }, [sessionStatus, session, router]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchAll();
    }
  }, [sessionStatus]);

  const fetchAll = async () => {
    try {
      const [sRes, fRes, nRes] = await Promise.all([
        fetch("/api/students"),
        fetch("/api/faculty"),
        fetch("/api/notes"),
      ]);
      if (sRes.ok) setStudents(await sRes.json());
      if (fRes.ok) setFaculty(await fRes.json());
      if (nRes.ok) setNotes(await nRes.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- Student CRUD ----
  const handleSaveStudent = async () => {
    const tags = studentForm.tags
      ? studentForm.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    const body = { ...studentForm, tags };

    const method = editingStudent ? "PUT" : "POST";
    const url = editingStudent ? `/api/students/${editingStudent.id}` : "/api/students";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      resetStudentForm();
      fetchAll();
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm("Delete this student?")) return;
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    fetchAll();
  };

  const resetStudentForm = () => {
    setShowStudentForm(false);
    setEditingStudent(null);
    setStudentForm({ name: "", rollNo: "", batch: "2026-2030", tags: "" });
  };

  // ---- Faculty CRUD ----
  const handleSaveFaculty = async () => {
    const method = editingFaculty ? "PUT" : "POST";
    const url = editingFaculty ? `/api/faculty/${editingFaculty.id}` : "/api/faculty";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(facultyForm),
    });
    if (res.ok) {
      resetFacultyForm();
      fetchAll();
    }
  };

  const handleDeleteFaculty = async (id: string) => {
    if (!confirm("Delete this faculty member?")) return;
    await fetch(`/api/faculty/${id}`, { method: "DELETE" });
    fetchAll();
  };

  const resetFacultyForm = () => {
    setShowFacultyForm(false);
    setEditingFaculty(null);
    setFacultyForm({ name: "", designation: "", qualifications: "", specialization: "", email: "" });
  };

  // ---- Notes CRUD ----
  const handleSaveNote = async () => {
    const method = editingNote ? "PUT" : "POST";
    const body = editingNote ? { id: editingNote.id, ...noteForm } : noteForm;

    const res = await fetch("/api/notes", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      resetNoteForm();
      fetchAll();
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Delete this note?")) return;
    await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
    fetchAll();
  };

  const resetNoteForm = () => {
    setShowNoteForm(false);
    setEditingNote(null);
    setNoteForm({ title: "", subject: "", semester: "1", fileUrl: "", content: "" });
  };

  if (sessionStatus === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg-canvas)" }}>
        <div className="text-center">
          <div
            className="w-10 h-10 border-3 rounded-full mx-auto mb-4"
            style={{ borderColor: "var(--color-border-subtle)", borderTopColor: "var(--color-primary-peach)", animation: "spin 0.8s linear infinite" }}
          />
          <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-canvas)" }}>
      {/* Top Bar */}
      <header className="sticky top-0 z-50" style={{ background: "var(--color-dark-text)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between px-4 sm:px-8 h-14">
          <div className="flex items-center gap-3">
            <Shield size={16} style={{ color: "var(--color-primary-peach)" }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
              Admin Dashboard
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span className="text-xs hidden sm:inline" style={{ color: "rgba(255,255,255,0.4)" }}>
              AI & Data Science — St. Berchmans College
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ color: "rgba(255,255,255,0.5)" }} title="Back to Site">
              <Home size={16} />
            </Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ color: "rgba(255,255,255,0.5)" }} title="Sign Out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-14 z-40 overflow-x-auto" style={{ background: "var(--color-surface-white)", borderBottom: "1px solid var(--color-border-subtle)" }}>
        <div className="flex px-4 sm:px-8 gap-0 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const count = tab.id === "students" ? students.length : tab.id === "faculty" ? faculty.length : tab.id === "notes" ? notes.length : undefined;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-3.5 text-xs font-medium transition-all whitespace-nowrap"
                style={{
                  color: isActive ? "var(--color-dark-text)" : "var(--color-muted-text)",
                  borderBottom: isActive ? "2px solid var(--color-primary-peach)" : "2px solid transparent",
                }}
              >
                <Icon size={14} />
                {tab.label}
                {count !== undefined && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: isActive ? "var(--color-primary-peach)" : "var(--color-bg-canvas)", color: isActive ? "var(--color-dark-text)" : "var(--color-muted-text)" }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">

        {/* ===== OVERVIEW ===== */}
        {activeTab === "overview" && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--color-dark-text)" }}>
              Welcome, {session?.user?.name}
            </h1>
            <p className="text-sm mb-8" style={{ color: "var(--color-muted-text)" }}>
              Manage students, faculty, and academic notes for the department.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Students", value: students.length, icon: GraduationCap, tab: "students" },
                { label: "Faculty", value: faculty.length, icon: Users, tab: "faculty" },
                { label: "Notes", value: notes.length, icon: BookOpen, tab: "notes" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <button key={s.label} onClick={() => setActiveTab(s.tab)} className="card p-6 text-left transition-all" style={{ background: "var(--color-surface-white)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--color-muted-text)" }}>{s.label}</p>
                      <Icon size={18} style={{ color: "var(--color-primary-peach)" }} />
                    </div>
                    <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-serif)", color: "var(--color-dark-text)" }}>{s.value}</p>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions */}
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-muted-text)" }}>Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Add Student", tab: "students", action: () => { setActiveTab("students"); setShowStudentForm(true); } },
                { label: "Add Faculty", tab: "faculty", action: () => { setActiveTab("faculty"); setShowFacultyForm(true); } },
                { label: "Add Note", tab: "notes", action: () => { setActiveTab("notes"); setShowNoteForm(true); } },
              ].map((a) => (
                <button key={a.label} onClick={a.action} className="card p-4 flex items-center gap-3 text-left" style={{ background: "var(--color-surface-white)" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--color-primary-peach)", color: "var(--color-dark-text)" }}>
                    <Plus size={16} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--color-dark-text)" }}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ===== STUDENTS TAB ===== */}
        {activeTab === "students" && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl" style={{ fontFamily: "var(--font-serif)", color: "var(--color-dark-text)" }}>Manage Students</h2>
              <button onClick={() => { setEditingStudent(null); setStudentForm({ name: "", rollNo: "", batch: "2026-2030", tags: "" }); setShowStudentForm(true); }} className="btn btn-primary text-sm px-4 py-2">
                <Plus size={14} /> Add Student
              </button>
            </div>

            {/* Student Form */}
            {showStudentForm && (
              <div className="card p-6 mb-6" style={{ background: "var(--color-surface-white)", border: "2px solid var(--color-primary-peach)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm" style={{ color: "var(--color-dark-text)" }}>
                    {editingStudent ? "Edit Student" : "Add New Student"}
                  </h3>
                  <button onClick={resetStudentForm}><X size={16} style={{ color: "var(--color-muted-text)" }} /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Full Name *" value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} className="input" />
                  <input type="text" placeholder="Roll Number *" value={studentForm.rollNo} onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })} className="input" />
                  <input type="text" placeholder="Batch (e.g. 2026-2030)" value={studentForm.batch} onChange={(e) => setStudentForm({ ...studentForm, batch: e.target.value })} className="input" />
                  <input type="text" placeholder="Tags (comma separated)" value={studentForm.tags} onChange={(e) => setStudentForm({ ...studentForm, tags: e.target.value })} className="input" />
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={handleSaveStudent} className="btn btn-primary text-sm px-6 py-2">{editingStudent ? "Update" : "Add"} Student</button>
                  <button onClick={resetStudentForm} className="btn btn-outline text-sm px-4 py-2">Cancel</button>
                </div>
              </div>
            )}

            {/* Students Table */}
            {students.length > 0 ? (
              <div className="card overflow-hidden" style={{ background: "var(--color-surface-white)" }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ background: "var(--color-bg-light)", borderBottom: "1px solid var(--color-border-subtle)" }}>
                        {["Name", "Roll No.", "Batch", "Tags", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--color-muted-text)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => {
                        let tags: string[] = [];
                        try { tags = JSON.parse(s.tags); } catch { tags = []; }
                        return (
                          <tr key={s.id} style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "var(--color-primary-peach)", color: "var(--color-dark-text)" }}>
                                  {s.name.charAt(0)}
                                </div>
                                <span className="text-sm font-medium" style={{ color: "var(--color-dark-text)" }}>{s.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs font-medium" style={{ color: "var(--color-dark-text)" }}>{s.rollNo}</td>
                            <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted-text)" }}>{s.batch}</td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {tags.map((t: string) => (
                                  <span key={t} className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: "var(--color-bg-warm)", color: "var(--color-muted-text)" }}>{t}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => {
                                  let parsedTags: string[] = [];
                                  try { parsedTags = JSON.parse(s.tags); } catch { parsedTags = []; }
                                  setEditingStudent(s);
                                  setStudentForm({ name: s.name, rollNo: s.rollNo, batch: s.batch, tags: parsedTags.join(", ") });
                                  setShowStudentForm(true);
                                }} className="p-1.5 rounded-lg" style={{ color: "var(--color-muted-text)" }} title="Edit">
                                  <Edit3 size={13} />
                                </button>
                                <button onClick={() => handleDeleteStudent(s.id)} className="p-1.5 rounded-lg" style={{ color: "#ef4444" }} title="Delete">
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center" style={{ background: "var(--color-surface-white)" }}>
                <GraduationCap size={40} className="mx-auto mb-3" style={{ color: "var(--color-border-subtle)" }} />
                <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>No students added yet.</p>
              </div>
            )}
          </div>
        )}

        {/* ===== FACULTY TAB ===== */}
        {activeTab === "faculty" && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl" style={{ fontFamily: "var(--font-serif)", color: "var(--color-dark-text)" }}>Manage Faculty</h2>
              <button onClick={() => { setEditingFaculty(null); setFacultyForm({ name: "", designation: "", qualifications: "", specialization: "", email: "" }); setShowFacultyForm(true); }} className="btn btn-primary text-sm px-4 py-2">
                <Plus size={14} /> Add Faculty
              </button>
            </div>

            {/* Faculty Form */}
            {showFacultyForm && (
              <div className="card p-6 mb-6" style={{ background: "var(--color-surface-white)", border: "2px solid var(--color-primary-peach)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm" style={{ color: "var(--color-dark-text)" }}>
                    {editingFaculty ? "Edit Faculty" : "Add New Faculty"}
                  </h3>
                  <button onClick={resetFacultyForm}><X size={16} style={{ color: "var(--color-muted-text)" }} /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Full Name *" value={facultyForm.name} onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })} className="input" />
                  <input type="text" placeholder="Designation *" value={facultyForm.designation} onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })} className="input" />
                  <input type="text" placeholder="Qualifications" value={facultyForm.qualifications} onChange={(e) => setFacultyForm({ ...facultyForm, qualifications: e.target.value })} className="input" />
                  <input type="text" placeholder="Specialization" value={facultyForm.specialization} onChange={(e) => setFacultyForm({ ...facultyForm, specialization: e.target.value })} className="input" />
                  <input type="email" placeholder="Email" value={facultyForm.email} onChange={(e) => setFacultyForm({ ...facultyForm, email: e.target.value })} className="input sm:col-span-2" />
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={handleSaveFaculty} className="btn btn-primary text-sm px-6 py-2">{editingFaculty ? "Update" : "Add"} Faculty</button>
                  <button onClick={resetFacultyForm} className="btn btn-outline text-sm px-4 py-2">Cancel</button>
                </div>
              </div>
            )}

            {/* Faculty Table */}
            {faculty.length > 0 ? (
              <div className="card overflow-hidden" style={{ background: "var(--color-surface-white)" }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ background: "var(--color-bg-light)", borderBottom: "1px solid var(--color-border-subtle)" }}>
                        {["Name", "Designation", "Qualifications", "Specialization", "Email", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--color-muted-text)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {faculty.map((f) => (
                        <tr key={f.id} style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "var(--color-primary-peach)", color: "var(--color-dark-text)" }}>
                                {f.name.charAt(0)}
                              </div>
                              <span className="text-sm font-medium" style={{ color: "var(--color-dark-text)" }}>{f.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted-text)" }}>{f.designation}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted-text)" }}>{f.qualifications}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted-text)" }}>{f.specialization}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted-text)" }}>{f.email || "—"}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => {
                                setEditingFaculty(f);
                                setFacultyForm({ name: f.name, designation: f.designation, qualifications: f.qualifications, specialization: f.specialization, email: f.email || "" });
                                setShowFacultyForm(true);
                              }} className="p-1.5 rounded-lg" style={{ color: "var(--color-muted-text)" }} title="Edit">
                                <Edit3 size={13} />
                              </button>
                              <button onClick={() => handleDeleteFaculty(f.id)} className="p-1.5 rounded-lg" style={{ color: "#ef4444" }} title="Delete">
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center" style={{ background: "var(--color-surface-white)" }}>
                <Users size={40} className="mx-auto mb-3" style={{ color: "var(--color-border-subtle)" }} />
                <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>No faculty added yet.</p>
              </div>
            )}
          </div>
        )}

        {/* ===== NOTES TAB ===== */}
        {activeTab === "notes" && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl" style={{ fontFamily: "var(--font-serif)", color: "var(--color-dark-text)" }}>Academic Notes</h2>
              <button onClick={() => { setEditingNote(null); setNoteForm({ title: "", subject: "", semester: "1", fileUrl: "", content: "" }); setShowNoteForm(true); }} className="btn btn-primary text-sm px-4 py-2">
                <Plus size={14} /> Add Note
              </button>
            </div>

            {/* Note Form */}
            {showNoteForm && (
              <div className="card p-6 mb-6" style={{ background: "var(--color-surface-white)", border: "2px solid var(--color-primary-peach)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm" style={{ color: "var(--color-dark-text)" }}>
                    {editingNote ? "Edit Note" : "Add New Note"}
                  </h3>
                  <button onClick={resetNoteForm}><X size={16} style={{ color: "var(--color-muted-text)" }} /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Title *" value={noteForm.title} onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })} className="input" />
                  <input type="text" placeholder="Subject *" value={noteForm.subject} onChange={(e) => setNoteForm({ ...noteForm, subject: e.target.value })} className="input" />
                  <select value={noteForm.semester} onChange={(e) => setNoteForm({ ...noteForm, semester: e.target.value })} className="input" style={{ cursor: "pointer" }}>
                    {["1", "2", "3", "4", "5", "6", "7", "8"].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                  <input type="url" placeholder="File URL (Google Drive link, etc.)" value={noteForm.fileUrl} onChange={(e) => setNoteForm({ ...noteForm, fileUrl: e.target.value })} className="input" />
                  <textarea placeholder="Additional notes / description" value={noteForm.content} onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })} className="input sm:col-span-2" rows={3} style={{ resize: "vertical" }} />
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={handleSaveNote} className="btn btn-primary text-sm px-6 py-2">{editingNote ? "Update" : "Add"} Note</button>
                  <button onClick={resetNoteForm} className="btn btn-outline text-sm px-4 py-2">Cancel</button>
                </div>
              </div>
            )}

            {/* Notes Grid */}
            {notes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((n) => (
                  <div key={n.id} className="card p-5" style={{ background: "var(--color-surface-white)" }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "var(--color-bg-warm)", color: "var(--color-muted-text)" }}>
                          Sem {n.semester}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => {
                          setEditingNote(n);
                          setNoteForm({ title: n.title, subject: n.subject, semester: n.semester, fileUrl: n.fileUrl || "", content: n.content || "" });
                          setShowNoteForm(true);
                        }} className="p-1.5" style={{ color: "var(--color-muted-text)" }}>
                          <Edit3 size={12} />
                        </button>
                        <button onClick={() => handleDeleteNote(n.id)} className="p-1.5" style={{ color: "#ef4444" }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm mt-2" style={{ fontFamily: "var(--font-serif)", color: "var(--color-dark-text)" }}>{n.title}</h3>
                    <p className="text-xs mt-1" style={{ color: "var(--color-primary-peach-dark)" }}>{n.subject}</p>
                    {n.content && <p className="text-xs mt-2" style={{ color: "var(--color-muted-text)" }}>{n.content}</p>}
                    {n.fileUrl && (
                      <a href={n.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs mt-3 font-medium" style={{ color: "var(--color-primary-peach-dark)" }}>
                        📎 Download / View File
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center" style={{ background: "var(--color-surface-white)" }}>
                <BookOpen size={40} className="mx-auto mb-3" style={{ color: "var(--color-border-subtle)" }} />
                <p className="text-sm" style={{ color: "var(--color-muted-text)" }}>No academic notes added yet.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
