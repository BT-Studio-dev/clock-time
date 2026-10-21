import React, { useEffect, useState } from "react";
import { Globe, Clock } from "lucide-react";
import { WORLD_CITIES } from "../lib/world-clocks";

type WorldClockViewProps = {
  lang: "en" | "ar";
};

export const WorldClockView: React.FC<WorldClockViewProps> = ({ lang }) => {
  const isAr = lang === "ar";
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-8 sm:py-12 px-4 max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold text-slate-200">
          <Globe className="size-3.5 text-[#7eb8e8]" />
          <span>{isAr ? "التوقيت العالمي المباشر" : "Live Global Timezones"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          {isAr ? "ساعات عواصم العالم" : "World Atomic Clocks"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          {isAr
            ? "مزامنة لحظية دقيقة لمواقيت العواصم والمدن العالمية الرئيسية بتقنية زجاجية عصرية."
            : "Precise atomic synchronization across major financial and cultural capitals."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {WORLD_CITIES.map((c) => {
          const timeStr = now.toLocaleTimeString(isAr ? "ar-EG" : "en-US", {
            timeZone: c.timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });

          const dateStr = now.toLocaleDateString(isAr ? "ar-EG" : "en-US", {
            timeZone: c.timeZone,
            weekday: "short",
            month: "short",
            day: "numeric",
          });

          return (
            <div
              key={c.city}
              className="glass-deep rounded-2xl p-4 sm:p-5 border-white/15 hover:border-[#ffd166]/50 hover:shadow-[0_0_25px_rgba(255,209,102,0.2)] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label={c.country}>
                    {c.flag}
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm">{c.city}</h3>
                    <p className="text-[11px] text-slate-300">{c.country}</p>
                  </div>
                </div>
                <Clock className="size-4 text-slate-400" />
              </div>

              <div>
                <div className="text-2xl font-black font-mono tracking-tight text-[#ffd166]">
                  {timeStr}
                </div>
                <div className="text-[11px] text-slate-300 mt-1">{dateStr}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
