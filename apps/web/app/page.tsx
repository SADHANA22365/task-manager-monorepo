// CI pipeline test change
import Link from "next/link";

const FEATURES = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Server Actions make every task update instant — no loading spinners, no API roundtrips.",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: "🔒",
    title: "Your Data Only",
    desc: "Row Level Security ensures no one — not even the database admin — can see your tasks.",
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: "🎯",
    title: "Priority System",
    desc: "Tag every task as Low, Medium, or High priority so you always know what to tackle first.",
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: "📅",
    title: "Due Dates",
    desc: "Set deadlines and get instant overdue alerts so nothing ever slips through the cracks.",
    gradient: "from-sky-500 to-cyan-500",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    icon: "✏️",
    title: "Edit Anytime",
    desc: "Changed your mind? Update any task's title, priority or due date right from the dashboard.",
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: "📊",
    title: "Live Stats",
    desc: "Your personal dashboard shows real-time counts for completed, pending, and overdue tasks.",
    gradient: "from-fuchsia-500 to-pink-500",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Create your account",
    desc: "Sign up in seconds with just your email and password. No credit card needed.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    step: "02",
    title: "Add your tasks",
    desc: "Drop in tasks with a title, pick a priority level, and set a due date if needed.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    step: "03",
    title: "Stay on top",
    desc: "Check off completed tasks, edit on the fly, and watch your stats update instantly.",
    gradient: "from-orange-500 to-amber-500",
  },
];

const STACK = [
  { label: "Next.js 14", sub: "App Router + Server Actions" },
  { label: "Supabase", sub: "PostgreSQL + Auth + RLS" },
  { label: "TypeScript", sub: "End-to-end type safety" },
  { label: "Zod", sub: "Runtime validation" },
  { label: "Tailwind CSS", sub: "Utility-first styling" },
  { label: "Vercel", sub: "Edge deployment" },
];

export default function Home() {
  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 15% 10%, #1e0840 0%, #0a0a18 45%, #050510 100%)",
        fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif",
      }}
    >
      {/* ── Decorative blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-15%] left-[-10%] w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute top-[20%] right-[-10%] w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #db2777, transparent)" }}
        />
        <div
          className="absolute bottom-[10%] left-[20%] w-64 h-64 sm:w-80 sm:h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #f97316, transparent)" }}
        />
        <div
          className="absolute bottom-[30%] right-[20%] w-56 h-56 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
        />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-20 flex items-center justify-between px-5 sm:px-10 lg:px-20 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-lg font-black tracking-widest text-purple-400 uppercase">
            TaskZen
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              boxShadow: "0 0 16px rgba(124,58,237,0.4)",
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-5 sm:px-10 pt-20 sm:pt-28 pb-20 sm:pb-28">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Full-Stack Task Manager
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl mb-6">
          Your tasks.{" "}
          <br className="hidden sm:block" />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)",
            }}
          >
            Organised. Secured.
          </span>
          <br className="hidden sm:block" />
          Done.
        </h1>

        {/* Subheading */}
        <p className="text-white/50 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          A beautiful full-stack to-do app built with Next.js Server Actions,
          Supabase RLS, and Zod validation. Your data, and only yours.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
              boxShadow: "0 0 32px rgba(124,58,237,0.5)",
            }}
          >
            Start for Free →
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white/60 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 transition-all duration-200"
          >
            I have an account
          </Link>
        </div>

        {/* Social proof strip */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-10 text-white/25 text-xs font-medium">
          <span>✓ No credit card</span>
          <span>✓ Instant setup</span>
          <span>✓ Open source</span>
          <span>✓ Row Level Security</span>
        </div>
      </section>

      {/* ── Mock Dashboard Preview ── */}
      <section className="relative z-10 px-5 sm:px-10 lg:px-20 pb-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-3xl border border-white/10 overflow-hidden"
            style={{
              background: "rgba(15,10,30,0.8)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.15)",
            }}
          >
            {/* Fake titlebar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/[0.02]">
              <span className="w-3 h-3 rounded-full bg-rose-500/70" />
              <span className="w-3 h-3 rounded-full bg-amber-500/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <span className="flex-1 text-center text-xs text-white/20 font-mono">
                taskzen.vercel.app/dashboard
              </span>
            </div>

            {/* Fake dashboard content */}
            <div className="p-5 sm:p-7">
              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-5">
                {[
                  { label: "Total", val: "8", g: "from-violet-600/40 to-purple-600/40", icon: "📋" },
                  { label: "Done", val: "5", g: "from-emerald-600/40 to-teal-600/40", icon: "✅" },
                  { label: "Pending", val: "3", g: "from-amber-600/40 to-orange-600/40", icon: "⏳" },
                  { label: "Overdue", val: "1", g: "from-rose-600/40 to-pink-600/40", icon: "🚨" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-xl bg-gradient-to-br ${s.g} p-px`}
                  >
                    <div className="rounded-xl bg-[#0f0f1a] p-2.5 sm:p-3">
                      <div className="text-base sm:text-lg">{s.icon}</div>
                      <div className="text-lg sm:text-2xl font-black text-white">{s.val}</div>
                      <div className="text-[10px] sm:text-xs text-white/40">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fake tasks */}
              <div className="space-y-2.5">
                {[
                  { title: "Design landing page", priority: "high", done: true, color: "from-rose-500 to-pink-500", badge: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
                  { title: "Write Zod schemas", priority: "medium", done: true, color: "from-amber-500 to-orange-500", badge: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
                  { title: "Set up Supabase RLS", priority: "high", done: false, color: "from-rose-500 to-pink-500", badge: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
                  { title: "Deploy to Vercel", priority: "low", done: false, color: "from-emerald-500 to-teal-500", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
                ].map((task, i) => (
                  <div
                    key={i}
                    className={`relative rounded-xl border transition-all flex items-center gap-3 px-4 py-3 ${
                      task.done
                        ? "border-white/5 bg-white/[0.02] opacity-50"
                        : "border-white/8 bg-white/[0.04]"
                    }`}
                  >
                    {!task.done && (
                      <div
                        className={`absolute left-0 top-2 bottom-2 w-1 rounded-full bg-gradient-to-b ${task.color}`}
                      />
                    )}
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                        task.done
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-white/20"
                      }`}
                    >
                      {task.done && <span className="text-white text-[10px] font-black">✓</span>}
                    </div>
                    <span className={`flex-1 text-sm font-semibold ${task.done ? "line-through text-white/30" : "text-white"}`}>
                      {task.title}
                    </span>
                    <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border ${task.badge}`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 px-5 sm:px-10 lg:px-20 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-3">
              ✦ Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Everything you need,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #a855f7, #ec4899)",
                }}
              >
                nothing you don't
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`rounded-2xl border ${f.border} ${f.bg} p-5 sm:p-6 hover:scale-[1.02] transition-transform duration-200`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-lg mb-4`}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-black text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative z-10 px-5 sm:px-10 lg:px-20 py-20 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold tracking-widest text-pink-400 uppercase mb-3">
              ✦ How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Up and running in{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #f97316, #ec4899)",
                }}
              >
                60 seconds
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden sm:block absolute top-8 left-[20%] right-[20%] h-px bg-gradient-to-r from-violet-500/30 via-pink-500/30 to-orange-500/30" />

            {STEPS.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-2xl font-black text-white mb-4 shadow-lg relative z-10`}
                >
                  {s.step}
                </div>
                <h3 className="text-base font-black text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="relative z-10 px-5 sm:px-10 lg:px-20 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-bold tracking-widest text-white/30 uppercase mb-8">
            Built with
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {STACK.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 p-3 sm:p-4 text-center transition-all duration-200"
              >
                <p className="text-sm font-black text-white">{s.label}</p>
                <p className="text-[10px] text-white/30 mt-0.5 leading-snug">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative z-10 px-5 sm:px-10 lg:px-20 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-3xl p-px"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
            }}
          >
            <div
              className="rounded-3xl px-8 sm:px-14 py-12 sm:py-16 text-center"
              style={{ background: "#0c0c1e" }}
            >
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
                Ready to get organised?
              </h2>
              <p className="text-white/45 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                Join TaskZen and take control of your day. Free forever, no
                credit card required.
              </p>
              <Link
                href="/signup"
                className="inline-block px-10 py-4 rounded-2xl font-black text-base text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
                  boxShadow: "0 0 40px rgba(124,58,237,0.5)",
                }}
              >
                Create Free Account →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 px-5 sm:px-10 lg:px-20 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-black tracking-widest text-purple-400 uppercase">
              TaskZen
            </span>
          </div>
          <p className="text-white/20 text-xs text-center">
            Built with Next.js · Supabase · Zod · Tailwind CSS
          </p>
          <div className="flex items-center gap-5 text-xs text-white/30">
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
