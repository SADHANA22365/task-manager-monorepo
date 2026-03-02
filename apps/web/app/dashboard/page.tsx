import { createServerSupabase } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { addTask, toggleTask, deleteTask, editTask } from "../actions";

// ─── Priority Config ──────────────────────────────────────────────────────────
const PRIORITY_CONFIG = {
  high: {
    label: "High",
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/15",
    text: "text-rose-400",
    border: "border-rose-500/30",
    dot: "bg-rose-400",
  },
  medium: {
    label: "Medium",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
  },
  low: {
    label: "Low",
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isOverdue(due_date: string | null, is_completed: boolean) {
  if (!due_date || is_completed) return false;
  return new Date(due_date) < new Date(new Date().toDateString());
}

function formatDate(due_date: string | null) {
  if (!due_date) return null;
  return new Date(due_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  gradient,
  icon,
}: {
  label: string;
  value: number;
  gradient: string;
  icon: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-px`}
    >
      <div className="rounded-2xl bg-[#0f0f1a] p-4 sm:p-5 h-full">
        <div className="text-2xl mb-1">{icon}</div>
        <div className="text-2xl sm:text-3xl font-black text-white">{value}</div>
        <div className="text-xs sm:text-sm text-white/50 font-medium mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: "low" | "medium" | "high" }) {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.medium;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default async function Dashboard() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  const allTasks = tasks || [];
  const completedCount = allTasks.filter((t) => t.is_completed).length;
  const pendingCount = allTasks.filter((t) => !t.is_completed).length;
  const overdueCount = allTasks.filter((t) =>
    isOverdue(t.due_date, t.is_completed)
  ).length;
  const highPriorityCount = allTasks.filter(
    (t) => t.priority === "high" && !t.is_completed
  ).length;

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(ellipse at 20% 20%, #1a0533 0%, #0a0a18 40%, #050510 100%)",
        fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif",
      }}
    >
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-5%] w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute top-[30%] right-[-10%] w-64 h-64 sm:w-80 sm:h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #db2777, transparent)" }}
        />
        <div
          className="absolute bottom-[-5%] left-[30%] w-60 h-60 sm:w-72 sm:h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">⚡</span>
              <span className="text-xs font-bold tracking-widest text-purple-400 uppercase">
                TaskZen
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              My{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #a855f7, #ec4899, #f97316)",
                }}
              >
                Workspace
              </span>
            </h1>
            <p className="text-white/40 text-sm mt-1 truncate max-w-xs sm:max-w-none">
              {user.email}
            </p>
          </div>

          {/* Sign Out */}
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium transition-all duration-200"
            >
              <span>Sign Out</span>
              <span>→</span>
            </button>
          </form>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          <StatCard
            label="Total Tasks"
            value={allTasks.length}
            gradient="from-violet-600/40 to-purple-600/40"
            icon="📋"
          />
          <StatCard
            label="Completed"
            value={completedCount}
            gradient="from-emerald-600/40 to-teal-600/40"
            icon="✅"
          />
          <StatCard
            label="Pending"
            value={pendingCount}
            gradient="from-amber-600/40 to-orange-600/40"
            icon="⏳"
          />
          <StatCard
            label="Overdue"
            value={overdueCount}
            gradient="from-rose-600/40 to-pink-600/40"
            icon="🚨"
          />
        </div>

        {/* ── Add Task Form ── */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">
            ✦ Add New Task
          </h2>
          <form action={addTask} className="flex flex-col gap-3">
            {/* Title */}
            <input
              name="title"
              placeholder="What needs to be done?"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Priority */}
              <select
                name="priority"
                defaultValue="medium"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/60 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="low" className="bg-[#0f0f1a]">
                  🟢 Low Priority
                </option>
                <option value="medium" className="bg-[#0f0f1a]">
                  🟡 Medium Priority
                </option>
                <option value="high" className="bg-[#0f0f1a]">
                  🔴 High Priority
                </option>
              </select>

              {/* Due Date */}
              <input
                type="date"
                name="due_date"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 text-sm focus:outline-none focus:border-purple-500/60 transition-all duration-200 [color-scheme:dark]"
              />

              {/* Submit */}
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed, #db2777)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                + Add Task
              </button>
            </div>
          </form>
        </div>

        {/* ── Task List ── */}
        <div className="space-y-3">
          {allTasks.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="text-5xl mb-4">🎯</div>
              <p className="text-white/40 font-medium">No tasks yet.</p>
              <p className="text-white/20 text-sm mt-1">
                Add one above to get started!
              </p>
            </div>
          ) : (
            allTasks.map((task) => {
              const priority =
                (task.priority as "low" | "medium" | "high") || "medium";
              const config = PRIORITY_CONFIG[priority];
              const overdue = isOverdue(task.due_date, task.is_completed);
              const formattedDate = formatDate(task.due_date);

              return (
                <div
                  key={task.id}
                  className={`group relative rounded-2xl border transition-all duration-300 ${
                    task.is_completed
                      ? "border-white/5 bg-white/[0.02] opacity-60"
                      : overdue
                      ? "border-rose-500/30 bg-rose-500/5"
                      : `border-white/8 bg-white/[0.04] hover:bg-white/[0.07]`
                  }`}
                >
                  {/* Left accent bar */}
                  {!task.is_completed && (
                    <div
                      className={`absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b ${config.gradient} opacity-80`}
                    />
                  )}

                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 pl-5 sm:pl-6">
                    {/* Toggle */}
                    <form action={toggleTask} className="flex-shrink-0 mt-0.5 sm:mt-0">
                      <input type="hidden" name="id" value={task.id} />
                      <input
                        type="hidden"
                        name="is_completed"
                        value={String(task.is_completed)}
                      />
                      <button
                        type="submit"
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                          task.is_completed
                            ? "border-emerald-500 bg-emerald-500"
                            : `border-white/20 hover:${config.border}`
                        }`}
                      >
                        {task.is_completed && (
                          <span className="text-white text-xs font-black">✓</span>
                        )}
                      </button>
                    </form>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`text-sm sm:text-base font-semibold break-words ${
                            task.is_completed
                              ? "line-through text-white/30"
                              : "text-white"
                          }`}
                        >
                          {task.title}
                        </span>
                        {highPriorityCount > 0 && priority === "high" && !task.is_completed && (
                          <span className="text-xs animate-pulse">🔥</span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <PriorityBadge priority={priority} />
                        {formattedDate && (
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${
                              overdue
                                ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                                : "bg-white/5 text-white/40 border-white/10"
                            }`}
                          >
                            {overdue ? "⚠️" : "📅"} {formattedDate}
                            {overdue && " · Overdue"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Edit — uses a details/summary disclosure for inline editing */}
                      <details className="relative group/edit">
                        <summary className="list-none cursor-pointer w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/40 flex items-center justify-center transition-all duration-200 text-white/40 hover:text-indigo-400 text-sm">
                          ✏️
                        </summary>

                        {/* Edit dropdown */}
                        <div className="absolute right-0 top-10 z-50 w-72 sm:w-80 rounded-2xl border border-white/10 bg-[#12122a] shadow-2xl p-4">
                          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                            Edit Task
                          </p>
                          <form action={editTask} className="flex flex-col gap-3">
                            <input type="hidden" name="id" value={task.id} />
                            <input
                              name="title"
                              defaultValue={task.title}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-purple-500/60 transition-all"
                            />
                            <select
                              name="priority"
                              defaultValue={task.priority || "medium"}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/60 transition-all appearance-none"
                            >
                              <option value="low" className="bg-[#0f0f1a]">🟢 Low</option>
                              <option value="medium" className="bg-[#0f0f1a]">🟡 Medium</option>
                              <option value="high" className="bg-[#0f0f1a]">🔴 High</option>
                            </select>
                            <input
                              type="date"
                              name="due_date"
                              defaultValue={task.due_date?.split("T")[0] || ""}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white/70 text-sm focus:outline-none focus:border-purple-500/60 transition-all [color-scheme:dark]"
                            />
                            <button
                              type="submit"
                              className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
                              style={{
                                background: "linear-gradient(135deg, #6d28d9, #a21caf)",
                              }}
                            >
                              Save Changes
                            </button>
                          </form>
                        </div>
                      </details>

                      {/* Delete */}
                      <form action={deleteTask}>
                        <input type="hidden" name="id" value={task.id} />
                        <button
                          type="submit"
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 flex items-center justify-center transition-all duration-200 text-white/40 hover:text-rose-400 text-sm"
                        >
                          🗑️
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Footer ── */}
        {allTasks.length > 0 && (
          <div className="mt-8 text-center text-white/20 text-xs">
            {completedCount} of {allTasks.length} tasks completed
            {completedCount === allTasks.length && allTasks.length > 0 && (
              <span className="ml-2">🎉 All done!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
