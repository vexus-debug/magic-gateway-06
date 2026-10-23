// Product update log. RULE: every new feature, improvement or bug fix shipped
// to users must be added here as a new entry (newest first) — see AGENTS.md.

export type UpdateKind = "feature" | "improvement" | "fix";

export interface UpdateEntry {
  version: string;
  date: string; // e.g. "October 22, 2026"
  title: string;
  kind: UpdateKind;
  items: { kind: UpdateKind; text: string }[];
}

export const updates: UpdateEntry[] = [
  {
    version: "v1.5.0",
    date: "October 23, 2026",
    title: "AI pre-chair patient briefing",
    kind: "feature",
    items: [
      { kind: "feature", text: "Dentists get an AI snapshot of allergies, conditions, last visit, today's plan and patient notes — in the waiting-room queue (sparkle button) and at the top of the dental chart." },
    ],
  },
  {
    version: "v1.4.4",
    date: "October 23, 2026",
    title: "Free AI models",
    kind: "improvement",
    items: [
      { kind: "improvement", text: "AI assistant now uses only free models, automatically falling back through 16 options." },
    ],
  },
  {
    version: "v1.4.3",
    date: "October 23, 2026",
    title: "AI automatic fallback",
    kind: "improvement",
    items: [
      { kind: "improvement", text: "AI assistant now switches to a backup model automatically if the main one is unavailable." },
    ],
  },
  {
    version: "v1.4.2",
    date: "October 23, 2026",
    title: "New AI provider",
    kind: "improvement",
    items: [
      { kind: "improvement", text: "ClineXus AI assistant now runs on OpenRouter." },
    ],
  },
  {
    version: "v1.4.1",
    date: "October 22, 2026",
    title: "Always-fresh app & notification check",
    kind: "improvement",
    items: [
      {
        kind: "improvement",
        text: "Installed apps now check for updates in the background every hour, so everyone is on the latest version without reinstalling or tapping anything.",
      },
      {
        kind: "feature",
        text: "The installed app now asks to turn on notifications before it opens, so no one misses clinic alerts. If notifications were blocked, the app shows how to re-enable them.",
      },
    ],
  },
  {
    version: "v1.4.0",
    date: "October 22, 2026",
    title: "Register new patients on the spot",
    kind: "feature",
    items: [
      {
        kind: "feature",
        text: "Front desk can now register a brand-new patient directly inside the Walk-In and Book Appointment forms — no more detour to the Patients page. Tap + New patient, save, and the patient is selected automatically so you can pick a dentist right away.",
      },
      {
        kind: "improvement",
        text: "Dentist assignment is now part of the same flow for receptionists and admins: register, assign a dentist, and the patient is on their schedule or in the waiting queue in one pass.",
      },
    ],
  },
];

export const kindLabel: Record<UpdateKind, string> = {
  feature: "New feature",
  improvement: "Improvement",
  fix: "Bug fix",
};
