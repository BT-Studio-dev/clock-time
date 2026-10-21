import React from "react";
import { Download } from "lucide-react";

type FooterProps = {
  lang: "en" | "ar";
  onGoToDownloads: () => void;
};

export const Footer: React.FC<FooterProps> = ({ lang, onGoToDownloads }) => {
  const isAr = lang === "ar";

  return (
    <footer className="w-full glass border-t border-white/10 mt-16 pt-8 pb-24 px-4 sm:px-6 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
        <div className="space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-bold text-white text-sm">BT Clock</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffd166]/15 border border-[#ffd166]/30 text-[#ffd166] font-semibold">
              Production Release v2.5.0
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {isAr
              ? "ساعة العد التنازلي والمواقيت العالمية، مع نسخ التحميل لأنظمة ويندوز 10/11 وويندوز 7 وأندرويد 8."
              : "Cinematic countdown clock, world atomic time, and official downloads for Windows 10/11, Windows 7 & Android 8+."}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <button
            onClick={onGoToDownloads}
            className="flex items-center gap-1.5 text-slate-300 hover:text-[#ffd166] transition-colors cursor-pointer"
          >
            <Download className="size-3.5 text-[#ffd166]" />
            <span>{isAr ? "تحميل النسخ" : "Downloads (Win/Android)"}</span>
          </button>

          <span className="text-slate-600">•</span>

          <a
            href="https://github.com/BT-Studio-dev/clock-time"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub Repository
          </a>

          <span className="text-slate-600">•</span>

          <span className="flex items-center gap-1 text-slate-400">
            <span>Built by BT Studio</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
