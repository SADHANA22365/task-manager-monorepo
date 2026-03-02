"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => router.push("/login"), 3000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse at 80% 20%, #1a0533 0%, #0a0a18 40%, #050510 100%)",
        fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif",
      }}
    >
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
        />
        <div
          className="absolute bottom-[-5%] left-[-5%] w-64 h-64 sm:w-80 sm:h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #f97316, transparent)" }}
        />
        <div
          className="absolute top-[40%] right-[30%] w-56 h-56 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-3xl">⚡</span>
            <span className="text-xl font-black tracking-widest text-purple-400 uppercase">
              TaskZen
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Start for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #f97316, #ec4899, #a855f7)",
              }}
            >
              Free
            </span>
          </h1>
          <p className="text-white/40 text-sm mt-2">
            Create your account and own your tasks
          </p>
        </div>

        {/* Success State */}
        {success ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-black text-white mb-2">
              Account Created!
            </h2>
            <p className="text-white/50 text-sm mb-4">
              Check your email to confirm your account, then log in.
            </p>
            <p className="text-white/30 text-xs">
              Redirecting to login in a moment...
            </p>
            <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                style={{ animation: "progress 3s linear forwards" }}
              />
            </div>
            <style>{`
              @keyframes progress {
                from { width: 0% }
                to { width: 100% }
              }
            `}</style>
          </div>
        ) : (
          /* Card */
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
            <div className="flex flex-col gap-4">

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none transition-all duration-200 ${
                    confirmPassword && confirmPassword !== password
                      ? "border-rose-500/50 focus:border-rose-500"
                      : confirmPassword && confirmPassword === password
                      ? "border-emerald-500/50 focus:border-emerald-500"
                      : "border-white/10 focus:border-purple-500/60"
                  }`}
                />
                {/* Live password match indicator */}
                {confirmPassword && (
                  <p
                    className={`text-xs font-medium mt-0.5 ${
                      confirmPassword === password
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {confirmPassword === password
                      ? "✓ Passwords match"
                      : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              {/* Password strength hints */}
              {password && (
                <div className="flex gap-2">
                  {[
                    { label: "6+ chars", pass: password.length >= 6 },
                    { label: "Uppercase", pass: /[A-Z]/.test(password) },
                    { label: "Number", pass: /[0-9]/.test(password) },
                  ].map(({ label, pass }) => (
                    <span
                      key={label}
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all duration-200 ${
                        pass
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : "bg-white/5 text-white/25 border-white/10"
                      }`}
                    >
                      {pass ? "✓" : "○"} {label}
                    </span>
                  ))}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-1"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ec4899, #a855f7)",
                  boxShadow: "0 0 24px rgba(236,72,153,0.35)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create Account →"
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/20 text-xs">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-white/40">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-purple-400 hover:text-pink-400 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}

        {/* Bottom note */}
        <p className="text-center text-white/20 text-xs mt-6">
          Secured by Supabase Auth 🔒
        </p>
      </div>
    </div>
  );
}
