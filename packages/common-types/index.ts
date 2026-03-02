import { z } from "zod";

// ─── TASK SCHEMA ────────────────────────────────────────────────────────────

export const taskSchema = z.object({
  title: z.string().min(1, "Task title cannot be empty"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  due_date: z.string().optional().nullable(),
});

// ─── EDIT TASK SCHEMA ───────────────────────────────────────────────────────

export const editTaskSchema = z.object({
  id: z.string().min(1, "Task ID is required"),
  title: z.string().min(1, "Task title cannot be empty"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  due_date: z.string().optional().nullable(),
});

// ─── TYPES ──────────────────────────────────────────────────────────────────

export type TaskInput = z.infer<typeof taskSchema>;
export type EditTaskInput = z.infer<typeof editTaskSchema>;