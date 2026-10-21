import React from "react";
import { Download, Globe, Moon, Sun, Volume2, VolumeX, Clock, Grid } from "lucide-react";
import { playSfx, toggleSfx } from "../lib/sfx";
import { MusicPicker } from "./MusicPicker";

type HeaderProps = {
  activeTab: "countdown" | "downloads" | "world-clock";
  setActiveTab: (tab: "countdown" | "downloads" | "world-clock") => void;
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
  lang: "en" | "ar";
  setLang: (l: "en" | "ar") => void;
  sfxOn: boolean;
  setSfxOn: (on: boolean) => void;
  ambientOn: boolean;
  setAmbientOn: (on: boolean) => void;
  pixelOn: boolean;
  setPixelOn: (on: boolean) => void;
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  lang,
  setLang,
  sfxOn,
  setSfxOn,
  ambientOn,
  setAmbientOn,
  pixelOn,
  setPixelOn,
}) => {
  const isAr = lang === "ar";

  const handleTab = (tab: "countdown" | "downloads" | "world-clock") => {
    playSfx("click");
    setActiveTab(tab);
  };

  const handleThemeToggle = () => {
    playSfx("pop");
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const handleSfxToggle = () => {
    const next = toggleSfx();
    setSfxOn(next);
  };

  const handlePixelToggle = () => {
    playSfx("pop");
    setPixelOn(!pixelOn);
  };

  const handleLangToggle = () => {
    playSfx("pop");
    const next = lang === "en" ? "ar" : "en";
    setLang(next);
    document.documentElement.setAttribute("dir", next === "ar" ? "rtl" : "ltr");
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/10 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => handleTab("countdown")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative size-10 flex-none rounded-2xl bg-gradient-to-br from-[#7eb8e8]/25 to-[#ffd166]/25 border border-white/20 p-1.5 flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-[#ffd166]/50 shadow-md">
            <svg viewBox="0 0 64 64" className="size-full">
              <defs>
                <linearGradient id="hdr-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7eb8e8" />
                  <stop offset="100%" stopColor="#ffd166" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="24" stroke="url(#hdr-ring)" strokeWidth="3" fill="none" />
              <line x1="32" y1="32" x2="32" y2="18" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="32" y1="32" x2="44" y2="32" stroke="#ffd166" strokeWidth="3" strokeLinecap="round" />
              <circle cx="32" cy="32" r="3" fill="#ffd166" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#ffd166] bg-clip-text text-transparent">
                BT Clock
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#ffd166]/20 text-[#ffd166] border border-[#ffd166]/30">
                v2.5.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {isAr ? "الساعة والعد التنازلي والتحميل" : "Countdown & Multi-Platform Downloads"}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => handleTab("countdown")}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "countdown"
                ? "bg-white/20 text-white shadow-sm border border-white/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {isAr ? "العد التنازلي" : "Countdown"}
          </button>

          <button
            onClick={() => handleTab("downloads")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "downloads"
                ? "bg-gradient-to-r from-[#ffd166]/25 to-[#7eb8e8]/25 text-[#ffd166] shadow-sm border border-[#ffd166]/50"
                : "text-slate-300 hover:text-[#ffd166] hover:bg-white/5"
            }`}
          >
            <Download className="size-4 text-[#ffd166]" />
            <span>{isAr ? "تحميل النسخ" : "Downloads"}</span>
            <span className="hidden md:inline text-[10px] px-1.5 py-0.2 rounded bg-[#ffd166]/20 text-[#ffd166] font-bold">
              3 OS
            </span>
          </button>

          <button
            onClick={() => handleTab("world-clock")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "world-clock"
                ? "bg-white/20 text-white shadow-sm border border-white/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Clock className="size-4" />
            <span className="hidden sm:inline">{isAr ? "ساعات العالم" : "World Clocks"}</span>
          </button>
        </nav>

        {/* Audio, Pixel Toggle, Theme, Lang Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Pixel On/Off Toggle Button */}
          <button
            onClick={handlePixelToggle}
            title={
              pixelOn
                ? isAr
                  ? "إيقاف نمط البيكسل"
                  : "Turn Pixel Mode OFF"
                : isAr
                ? "تفعيل نمط البيكسل"
                : "Turn Pixel Mode ON"
            }
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
              pixelOn
                ? "bg-emerald-400/20 border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)] font-mono text-xs"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10 font-mono text-xs"
            }`}
          >
            <Grid className="size-3.5" />
            <span className="font-bold tracking-wider text-[11px]">
              {pixelOn ? "PIXEL: ON" : "PIXEL: OFF"}
            </span>
            <span
              className={`size-1.5 rounded-full ${
                pixelOn ? "bg-emerald-400 animate-pulse" : "bg-slate-500"
              }`}
            />
          </button>

          {/* Music Picker (Tracks & Ambient) */}
          <MusicPicker
            ambientOn={ambientOn}
            setAmbientOn={setAmbientOn}
            lang={lang}
          />

          {/* SFX Toggle */}
          <button
            onClick={handleSfxToggle}
            title={sfxOn ? (isAr ? "كتم المؤثرات" : "Mute SFX") : isAr ? "تشغيل المؤثرات" : "Unmute SFX"}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {sfxOn ? <Volume2 className="size-4 text-[#ffd166]" /> : <VolumeX className="size-4" />}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={handleThemeToggle}
            title={isAr ? "تغيير المظهر" : "Toggle Theme"}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {theme === "dark" ? <Sun className="size-4 text-[#ffd166]" /> : <Moon className="size-4 text-[#7eb8e8]" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={handleLangToggle}
            title={isAr ? "Switch to English" : "التبديل إلى العربية"}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <Globe className="size-3.5" />
            <span>{isAr ? "EN" : "عربي"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
