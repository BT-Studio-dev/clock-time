import React, { useState, useEffect } from "react";
import { RefreshCw, Sparkles, CheckCircle2, X } from "lucide-react";
import { playSfx } from "../lib/sfx";

type UpdateBannerProps = {
  lang: "en" | "ar";
};

export const UpdateBanner: React.FC<UpdateBannerProps> = ({ lang }) => {
  const isAr = lang === "ar";
  const [showBanner, setShowBanner] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const currentVersion = "v2.5.0";

  useEffect(() => {
    // Check if the user already updated to v2.5.0
    const savedVersion = localStorage.getItem("bt-clock-version");
    const dismissed = localStorage.getItem("bt-clock-update-dismissed");

    if (savedVersion !== currentVersion && dismissed !== currentVersion) {
      // Show prompt if on an older version
      setShowBanner(true);
    }
  }, []);

  const handleUpdate = () => {
    playSfx("chime");
    setUpdating(true);
    setStatusMessage(isAr ? "جارٍ إعادة التشغيل..." : "Restarting...");

    // 1. Unregister / update service workers
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const reg of registrations) {
          reg.update();
        }
      });
    }

    // 2. Clear old caches
    if ("caches" in window) {
      caches.keys().then((names) => {
        return Promise.all(names.map((name) => caches.delete(name)));
      });
    }

    // 3. Save current version stamp
    localStorage.setItem("bt-clock-version", currentVersion);
    localStorage.setItem("bt-clock-update-dismissed", currentVersion);

    // 4. Perform immediate hard reload to restart the app
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  const handleDismiss = () => {
    playSfx("close");
    localStorage.setItem("bt-clock-update-dismissed", currentVersion);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Application Update"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      {/* Opaque Solid Frosted Glass Card to prevent text bleed-through */}
      <div className="bg-[#0c081c]/98 text-white rounded-3xl p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-2 border-[#ffd166]/60 backdrop-blur-3xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="size-11 rounded-2xl bg-gradient-to-br from-[#ffd166]/25 to-[#7eb8e8]/25 border border-[#ffd166]/50 flex items-center justify-center text-[#ffd166] flex-none shadow-md">
            {updating ? (
              <RefreshCw className="size-5 animate-spin" />
            ) : (
              <Sparkles className="size-5" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white truncate">
                {isAr ? "تحديث جديد للنظام: v2.5.0" : "New Version Ready: v2.5.0"}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffd166] text-[#090614] font-black flex-none">
                NEW
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">
              {statusMessage ||
                (isAr
                  ? "إصلاح عزل البطاقات الزجاجية، وتحديث الإصدار، ودعم التنزيل الأوفلاين."
                  : "Frosted glass card fix, pixel background, and Win/Android editions.")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-none">
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd166] to-[#ffb703] text-[#090614] font-black text-xs sm:text-sm shadow-lg shadow-[#ffd166]/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${updating ? "animate-spin" : ""}`} />
            <span>
              {updating
                ? isAr
                  ? "جارٍ البدء..."
                  : "Restarting..."
                : isAr
                ? "تحديث وإعادة تشغيل"
                : "Update Now"}
            </span>
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
