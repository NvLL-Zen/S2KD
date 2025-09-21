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

export function addTask(name, deadline) {
  tasks.update(list => [...list, { name, deadline }]);
}

export function removeTask(index) {
  tasks.update(list => list.filter((_, i) => i !== index));
}