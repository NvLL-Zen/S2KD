// src/stores/tasks.js
import { writable } from 'svelte/store';

const STORAGE_KEY = 'tasks';

const initial = [];

function load() {
  if (typeof localStorage === 'undefined') return initial;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initial;
  } catch {
    return initial;
  }
}

export const tasks = writable(load());

if (typeof localStorage !== 'undefined') {
  tasks.subscribe(v => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  });
}

// One‑time inline migration: convert any previously stored hyphen dates to slash dates
tasks.update(list =>
  list.map(t =>
    t.deadline && t.deadline.includes('-') && !t.deadline.includes('/')
      ? { ...t, deadline: t.deadline.replace(/-/g, '/') }
      : t
  )
);

// Ensure existing tasks get an id (one-time)
tasks.update(list =>
  list.map((t, i) => t.id ? t : { ...t, id: `${Date.now()}_${i}` })
);

export function addTask(name, deadline) {
  // Canonical storage: YYYY/MM/DD
  const normalized = deadline ? deadline.replace(/-/g, '/') : '';
  const task = { id: `${Date.now()}_${Math.random().toString(36).slice(2)}`, name, deadline: normalized };
  tasks.update(list => [...list, task]);
}

export function removeTask(id) {
  tasks.update(list => list.filter(t => t.id !== id));
}