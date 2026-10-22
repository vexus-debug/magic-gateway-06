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
