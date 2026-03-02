"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase-server";
import { taskSchema, editTaskSchema } from "@repo/common-types";

// ─── ADD TASK ────────────────────────────────────────────────────────────────

export async function addTask(formData: FormData) {
  const supabase = await createServerSupabase();

  const parsed = taskSchema.safeParse({
    title: formData.get("title"),
    priority: formData.get("priority") || "medium",
    due_date: formData.get("due_date") || null,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("tasks").insert({
    title: parsed.data.title,
    priority: parsed.data.priority,
    due_date: parsed.data.due_date || null,
    user_id: user.id,
    is_completed: false,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

// ─── EDIT TASK ───────────────────────────────────────────────────────────────

export async function editTask(formData: FormData) {
  const supabase = await createServerSupabase();

  const parsed = editTaskSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    priority: formData.get("priority") || "medium",
    due_date: formData.get("due_date") || null,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("tasks")
    .update({
      title: parsed.data.title,
      priority: parsed.data.priority,
      due_date: parsed.data.due_date || null,
    })
    .eq("id", parsed.data.id)
    .eq("user_id", user.id); // ensure users can only edit their own tasks

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

// ─── TOGGLE COMPLETE ─────────────────────────────────────────────────────────

export async function toggleTask(formData: FormData) {
  const supabase = await createServerSupabase();

  const id = formData.get("id") as string;
  const is_completed = formData.get("is_completed") === "true";

  if (!id) throw new Error("Task ID is required");

  const { error } = await supabase
    .from("tasks")
    .update({ is_completed: !is_completed })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

// ─── DELETE TASK ─────────────────────────────────────────────────────────────

export async function deleteTask(formData: FormData) {
  const supabase = await createServerSupabase();

  const id = formData.get("id") as string;

  if (!id) throw new Error("Task ID is required");

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}