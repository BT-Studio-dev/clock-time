import React, { useState, useEffect } from "react";
import { RefreshCw, Sparkles, CheckCircle2, X } from "lucide-react";
import { playSfx } from "../lib/sfx";

type UpdateBannerProps = {
  lang: "en" | "ar";
};

export const UpdateBanner: React.FC<UpdateBannerProps> = ({ lang }) => {
  const isAr = lang === "ar";
  const [showBanner, setShowBanner] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updatedSuccess, setUpdatedSuccess] = useState(false);

  const currentVersion = "v2.5.0";

  useEffect(() => {
    // Check if user already dismissed or updated
    const lastDismissed = localStorage.getItem("bt-clock-update-dismissed");
    if (lastDismissed === currentVersion) {
      setShowBanner(false);
    }
  }, []);

  const handleUpdate = () => {
    playSfx("chime");
    setUpdating(true);

    // Simulate clearing caches & updating service worker
    setTimeout(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const reg of registrations) {
            reg.update();
          }
        });
      }
      localStorage.setItem("bt-clock-version", currentVersion);
      setUpdating(false);
      setUpdatedSuccess(true);
      setTimeout(() => {
        setShowBanner(false);
      }, 3500);
    }, 1200);
  };

  const handleDismiss = () => {
    playSfx("close");
    localStorage.setItem("bt-clock-update-dismissed", currentVersion);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="glass-deep rounded-2xl p-4 shadow-2xl border-[#ffd166]/40 glass-glow-sun flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-[#ffd166]/20 to-[#7eb8e8]/20 border border-[#ffd166]/40 flex items-center justify-center text-[#ffd166] flex-none">
            {updatedSuccess ? (
              <CheckCircle2 className="size-5 text-emerald-400" />
            ) : (
              <Sparkles className="size-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">
                {updatedSuccess
                  ? isAr
                    ? "تم التحديث بنجاح!"
                    : "Updated Successfully!"
                  : isAr
                  ? "إصدار جديد متاح: v2.5.0"
                  : "New Version Ready: v2.5.0"}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#ffd166]/20 text-[#ffd166] font-bold">
                NEW
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              {updatedSuccess
                ? isAr
                  ? "يعمل الموقع الآن بأحدث إصدار مع كامل الملفات والتحميلات."
                  : "Website updated with full downloads & frosted glass."
                : isAr
                ? "إصلاح الملفات الناقصة، وإضافة نمط البيكسل والزجاج وتحديث التحميلات."
                : "Missing files restored, pixel & glass backgrounds, and Win/Android downloads."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-none">
          {!updatedSuccess && (
            <button
              onClick={handleUpdate}
              disabled={updating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#ffd166] to-[#ffb703] text-[#090614] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className={`size-3.5 ${updating ? "animate-spin" : ""}`} />
              <span>{updating ? (isAr ? "جارٍ التحديث..." : "Updating...") : isAr ? "تحديث الآن" : "Update Now"}</span>
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
