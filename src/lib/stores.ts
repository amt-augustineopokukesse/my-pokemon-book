import { writable } from "svelte/store";

export const searchInput = writable("");

export const theme = writable('pink');

export const isVisible = writable(false);
