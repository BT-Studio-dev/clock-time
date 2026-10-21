export type CityClock = {
  city: string;
  country: string;
  timeZone: string;
  flag: string;
};

export const WORLD_CITIES: CityClock[] = [
  { city: "Cairo", country: "Egypt", timeZone: "Africa/Cairo", flag: "🇪🇬" },
  { city: "Riyadh", country: "Saudi Arabia", timeZone: "Asia/Riyadh", flag: "🇸🇦" },
  { city: "Dubai", country: "United Arab Emirates", timeZone: "Asia/Dubai", flag: "🇦🇪" },
  { city: "London", country: "United Kingdom", timeZone: "Europe/London", flag: "🇬🇧" },
  { city: "Paris", country: "France", timeZone: "Europe/Paris", flag: "🇫🇷" },
  { city: "Berlin", country: "Germany", timeZone: "Europe/Berlin", flag: "🇩🇪" },
  { city: "New York", country: "United States", timeZone: "America/New_York", flag: "🇺🇸" },
  { city: "San Francisco", country: "United States", timeZone: "America/Los_Angeles", flag: "🇺🇸" },
  { city: "Tokyo", country: "Japan", timeZone: "Asia/Tokyo", flag: "🇯🇵" },
  { city: "Singapore", country: "Singapore", timeZone: "Asia/Singapore", flag: "🇸🇬" },
  { city: "Sydney", country: "Australia", timeZone: "Australia/Sydney", flag: "🇦🇺" },
  { city: "Sao Paulo", country: "Brazil", timeZone: "America/Sao_Paulo", flag: "🇧🇷" },
];
