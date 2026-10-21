import React, { useEffect, useState } from "react";
import { Download, Sparkles, Calendar, ChevronDown, ChevronUp, Gamepad2, ArrowRight } from "lucide-react";
import { splitRange, yearProgress, UPCOMING_EVENTS, pad2 } from "../lib/countdown";
import { playSfx } from "../lib/sfx";

type CountdownViewProps = {
  lang: "en" | "ar";
  onGoToDownloads: () => void;
};

export const CountdownView: React.FC<CountdownViewProps> = ({ lang, onGoToDownloads }) => {
  const isAr = lang === "ar";
  const [now, setNow] = useState(() => new Date());
  const [moreEventsOpen, setMoreEventsOpen] = useState(false);

  // Target New Year 2027
  const targetNewYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const parts = splitRange(now, targetNewYear);
  const progress = yearProgress(now);

  // GTA 6 event
  const gta6Event = UPCOMING_EVENTS[0];
  const gta6Parts = splitRange(now, gta6Event.target);

  const currentTimeStr = now.toLocaleTimeString(isAr ? "ar-EG" : "en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 1,
  });

  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 max-w-5xl mx-auto space-y-10">
      {/* Live Current Time Pill (Frosted Glass Pill) */}
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill text-xs sm:text-sm tracking-widest font-mono text-slate-300 shadow-lg">
        <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="size-2 rounded-full bg-emerald-400 -ml-4.5" />
        <span className="font-semibold text-white">{currentTimeStr}</span>
        <span className="text-slate-500">•</span>
        <span className="text-[#ffd166] font-bold">{isAr ? "توقيت ذري مباشر" : "ATOMIC SYNC"}</span>
      </div>

      {/* Main Countdown Units */}
      <div className="w-full flex flex-col items-center text-center">
        <h1 className="text-xl sm:text-2xl font-medium text-slate-300 mb-6 flex items-center gap-2">
          <span>{isAr ? "العد التنازلي لبداية عام 2027" : "Countdown to New Year 2027"}</span>
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 w-full max-w-4xl">
          {/* Months */}
          <div className="glass-deep rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center border-white/15 hover:border-[#7eb8e8]/50 hover:shadow-[0_0_25px_rgba(126,184,232,0.25)] transition-all">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white">
              {pad2(parts.months)}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#7eb8e8] font-bold mt-1">
              {isAr ? "شهور" : "Months"}
            </span>
          </div>

          {/* Days */}
          <div className="glass-deep rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center border-white/15 hover:border-[#7eb8e8]/50 hover:shadow-[0_0_25px_rgba(126,184,232,0.25)] transition-all">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white">
              {pad2(parts.days)}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#7eb8e8] font-bold mt-1">
              {isAr ? "أيام" : "Days"}
            </span>
          </div>

          {/* Hours */}
          <div className="glass-deep rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center border-white/15 hover:border-[#ffd166]/50 hover:shadow-[0_0_25px_rgba(255,209,102,0.25)] transition-all">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-[#ffd166]">
              {pad2(parts.hours)}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-300 font-bold mt-1">
              {isAr ? "ساعات" : "Hours"}
            </span>
          </div>

          {/* Minutes */}
          <div className="glass-deep rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center border-white/15 hover:border-[#ffd166]/50 hover:shadow-[0_0_25px_rgba(255,209,102,0.25)] transition-all">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-[#ffd166]">
              {pad2(parts.minutes)}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-300 font-bold mt-1">
              {isAr ? "دقائق" : "Minutes"}
            </span>
          </div>

          {/* Seconds */}
          <div className="glass-deep rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center border-white/15 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.25)] transition-all">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-emerald-300">
              {pad2(parts.seconds)}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-300 font-bold mt-1">
              {isAr ? "ثوانٍ" : "Seconds"}
            </span>
          </div>

          {/* Fraction .0s */}
          <div className="glass-deep rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center border-white/15 hover:border-emerald-400/50 transition-all">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-slate-400">
              .{parts.fraction}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
              {isAr ? "أجزاء الثانية" : "Tenths"}
            </span>
          </div>
        </div>

        {/* Target and Year Progress (Frosted Glass Container) */}
        <div className="mt-8 flex flex-col items-center gap-2.5 max-w-md w-full glass-pill p-4 rounded-2xl">
          <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 font-medium">
            <Calendar className="size-4 text-[#ffd166]" />
            <span>
              {isAr ? "الهدف: 1 يناير 2027" : "Target: January 1, 2027"}
            </span>
            <span>•</span>
            <span className="text-[#ffd166] font-bold">
              {isAr ? `اكتمل عام 2026 بنسبة ${progress.toFixed(2)}%` : `2026 is ${progress.toFixed(2)}% complete`}
            </span>
          </p>

          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7eb8e8] via-[#ffd166] to-emerald-400 shadow-sm transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Primary Banner: DOWNLOAD WINDOWS 7, WINDOWS 10/11 & ANDROID 8 (Heavy Frosted Glass) */}
      <div className="w-full max-w-4xl glass-deep glass-shimmer rounded-3xl p-6 sm:p-8 border-[#ffd166]/40 glass-glow-sun relative overflow-hidden group">
        <div className="absolute -right-12 -top-12 size-56 rounded-full bg-[#ffd166]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 size-56 rounded-full bg-[#7eb8e8]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-start space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd166]/20 border border-[#ffd166]/40 text-xs font-semibold text-[#ffd166]">
              <Sparkles className="size-3.5" />
              <span>{isAr ? "النسخ الرسمية متاحة الآن" : "Official Multi-Platform Editions"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isAr
                ? "حمّل تطبيق BT Clock على ويندوز 7 وويندوز 10/11 وأندرويد 8"
                : "Get BT Clock for Windows 7, Windows 10/11 & Android 8"}
            </h2>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              {isAr
                ? "تطبيق سطح المكتب والموبايل الرسمي بدون إنترنت مع ويدجت طافي ومؤثرات صوتية محيطية وتنبيهات المناسبات العالمية."
                : "Standalone desktop & mobile applications with offline countdowns, floating desktop widgets, spatial ambient sound, and global clock synchronization."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto flex-none">
            <button
              onClick={() => {
                playSfx("open");
                onGoToDownloads();
              }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#ffd166] to-[#ffb703] text-[#090614] font-black text-sm shadow-xl shadow-[#ffd166]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="size-4" />
              <span>{isAr ? "عرض صفحة التحميلات" : "View Download Editions"}</span>
              <ArrowRight className="size-4" />
            </button>
            <div className="flex items-center justify-center gap-2.5 text-[11px] text-slate-300 font-mono">
              <span className="px-2 py-0.5 rounded-md glass-pill text-white">Win 10/11</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md glass-pill text-white">Win 7</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md glass-pill text-white">Android 8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Countdown: GTA VI & More (Frosted Glass Panel) */}
      <div className="w-full max-w-4xl glass-deep rounded-3xl p-6 sm:p-7 border-white/15 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#ffd166] text-xs uppercase tracking-widest font-bold">
            <Gamepad2 className="size-4" />
            <span>{isAr ? "الحدث القادم المميز" : "Coming Up"}</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full glass-pill text-slate-300 font-medium">
            {gta6Event.category}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">{gta6Event.name}</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {isAr ? "موعد الصدور: 19 نوفمبر 2026" : "Releases November 19, 2026"} • {gta6Event.description}
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-2xl glass-pill font-mono text-lg font-black text-[#ffd166] border border-[#ffd166]/30 shadow-md">
            {Math.floor(gta6Parts.totalMs / 86400000)}d {pad2(gta6Parts.hours)}:{pad2(gta6Parts.minutes)}:{pad2(gta6Parts.seconds)}
          </div>
        </div>

        {/* Accordion for more releases */}
        <div className="pt-2 border-t border-white/10">
          <button
            onClick={() => {
              playSfx("click");
              setMoreEventsOpen(!moreEventsOpen);
            }}
            className="flex items-center justify-between w-full text-xs text-slate-300 hover:text-white transition-colors py-1 cursor-pointer"
          >
            <span>
              {isAr ? `المزيد من المناسبات والفعاليات (${UPCOMING_EVENTS.length - 1})` : `More releases & events (${UPCOMING_EVENTS.length - 1})`}
            </span>
            {moreEventsOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>

          {moreEventsOpen && (
            <div className="mt-3 space-y-2 pt-2">
              {UPCOMING_EVENTS.slice(1).map((evt) => {
                const p = splitRange(now, evt.target);
                return (
                  <div
                    key={evt.id}
                    className="flex items-center justify-between p-3 rounded-2xl glass-pill hover:bg-white/15 transition-all text-xs"
                  >
                    <div>
                      <span className="font-bold text-white">{evt.name}</span>
                      <span className="text-slate-400 ml-2">({evt.category})</span>
                    </div>
                    <div className="font-mono text-[#ffd166] font-semibold">
                      {Math.floor(p.totalMs / 86400000)}d left
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
