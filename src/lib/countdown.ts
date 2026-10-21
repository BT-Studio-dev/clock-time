/**
 * Precise time calculations and formatting for countdown clocks.
 */

export type CountdownParts = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  fraction: number;
  totalMs: number;
};

export function pad2(n: number): string {
  return String(Math.floor(n)).padStart(2, "0");
}

export function nextNewYear(from = new Date()): Date {
  const next = new Date(from.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
  return next;
}

export function splitRange(now: Date, target: Date): CountdownParts {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = diff / 1000;

  const daysTotal = Math.floor(totalSeconds / 86400);
  const months = Math.floor(daysTotal / 30.4375);
  const days = Math.floor(daysTotal % 30.4375);

  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const fraction = Math.floor((diff % 1000) / 100);

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
    fraction,
    totalMs: diff,
  };
}

export function yearProgress(now = new Date()): number {
  const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();
  const endOfYear = new Date(now.getFullYear() + 1, 0, 1).getTime();
  const current = now.getTime();
  const pct = ((current - startOfYear) / (endOfYear - startOfYear)) * 100;
  return Math.min(100, Math.max(0, pct));
}

export type EventItem = {
  id: string;
  name: string;
  target: Date;
  category: string;
  description: string;
};

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "gta6",
    name: "Grand Theft Auto VI",
    target: new Date("2026-11-19T00:00:00Z"),
    category: "Gaming",
    description: "Rockstar Games next-gen flagship release in Vice City",
  },
  {
    id: "newyear2027",
    name: "New Year 2027",
    target: new Date("2027-01-01T00:00:00Z"),
    category: "Global",
    description: "Global midnight transition & celebration",
  },
  {
    id: "artemis3",
    name: "NASA Artemis III Moon Mission",
    target: new Date("2026-12-15T00:00:00Z"),
    category: "Space",
    description: "Crewed lunar landing mission",
  },
  {
    id: "fifa2026",
    name: "FIFA World Cup 2026 Finals",
    target: new Date("2026-07-19T00:00:00Z"),
    category: "Sports",
    description: "World cup finale in North America",
  },
];
