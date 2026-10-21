import React, { useState } from "react";
import {
  Download,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  Cpu,
  ShieldCheck,
  FileCode,
  Copy,
  Check,
  Smartphone,
  Monitor,
  ExternalLink,
  Info,
} from "lucide-react";
import { DOWNLOAD_PLATFORMS, type DownloadPlatform } from "../lib/downloads-data";
import { playSfx } from "../lib/sfx";

type DownloadsViewProps = {
  lang: "en" | "ar";
};

export const DownloadsView: React.FC<DownloadsViewProps> = ({ lang }) => {
  const isAr = lang === "ar";
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [copiedSha, setCopiedSha] = useState<string | null>(null);

  const handleCopySha = (sha: string) => {
    playSfx("pop");
    navigator.clipboard.writeText(sha);
    setCopiedSha(sha);
    setTimeout(() => setCopiedSha(null), 2500);
  };

  const handleDownloadClick = (filename: string) => {
    playSfx("download");
  };

  const platformsToDisplay =
    selectedPlatform === "all"
      ? DOWNLOAD_PLATFORMS
      : DOWNLOAD_PLATFORMS.filter((p) => p.id === selectedPlatform);

  return (
    <div className="py-8 sm:py-12 px-4 max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd166]/15 border border-[#ffd166]/30 text-xs font-semibold text-[#ffd166]">
          <Download className="size-3.5" />
          <span>{isAr ? "تحميل نسخ التطبيق الرسمية" : "Official Standalone Releases"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          {isAr
            ? "تحميل تطبيق BT Clock لجميع المنصات"
            : "Download BT Clock for Your Platform"}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {isAr
            ? "اختر النسخة المناسبة لجهازك: متوفر لويندوز 10/11 الحديث، وويندوز 7 القديم المتوافق، وهواتف أندرويد 8 وما بعده. جميع النسخ تعمل بدون إنترنت وبأداء خفيف فائق السرعة."
            : "Choose the dedicated build for your system: modern Windows 10/11, legacy Windows 7 SP1 compatibility build, and Android 8.0+ mobile APK. 100% offline-capable, lightweight, and atomic-synced."}
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={() => {
              playSfx("click");
              setSelectedPlatform("all");
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedPlatform === "all"
                ? "bg-white text-[#090614] shadow-md scale-105"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            {isAr ? "جميع المنصات (3)" : "All Platforms (3)"}
          </button>

          <button
            onClick={() => {
              playSfx("click");
              setSelectedPlatform("win10-11");
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedPlatform === "win10-11"
                ? "bg-[#ffd166] text-[#090614] shadow-md scale-105"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <Monitor className="size-3.5" />
            <span>Windows 10 / 11</span>
          </button>

          <button
            onClick={() => {
              playSfx("click");
              setSelectedPlatform("win7");
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedPlatform === "win7"
                ? "bg-[#7eb8e8] text-[#090614] shadow-md scale-105"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <Monitor className="size-3.5" />
            <span>Windows 7 (Legacy)</span>
          </button>

          <button
            onClick={() => {
              playSfx("click");
              setSelectedPlatform("android8");
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedPlatform === "android8"
                ? "bg-emerald-400 text-[#090614] shadow-md scale-105"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <Smartphone className="size-3.5" />
            <span>Android 8+ (APK)</span>
          </button>
        </div>
      </div>

      {/* Main Platform Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {platformsToDisplay.map((platform) => {
          const isWin10 = platform.id === "win10-11";
          const isWin7 = platform.id === "win7";
          const isAndroid = platform.id === "android8";

          return (
            <div
              key={platform.id}
              className={`glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] ${
                isWin10
                  ? "border-[#ffd166]/40 glass-glow-sun ring-1 ring-[#ffd166]/30"
                  : isWin7
                  ? "border-[#7eb8e8]/30 hover:border-[#7eb8e8]/60"
                  : "border-emerald-400/30 hover:border-emerald-400/60"
              }`}
            >
              {/* Recommended Badge on Win 10/11 */}
              {platform.recommended && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ffd166] to-[#ffb703] text-[#090614] text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {isAr ? "موصى به" : "Recommended"}
                </div>
              )}

              {/* Legacy Badge on Win 7 */}
              {isWin7 && (
                <div className="absolute top-4 right-4 bg-[#7eb8e8]/20 border border-[#7eb8e8]/40 text-[#7eb8e8] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                  {isAr ? "نسخة توافقية" : "Legacy SP1"}
                </div>
              )}

              {/* Mobile Badge on Android */}
              {isAndroid && (
                <div className="absolute top-4 right-4 bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                  {isAr ? "حزمة APK" : "Universal APK"}
                </div>
              )}

              <div>
                {/* Header Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`size-12 rounded-2xl flex items-center justify-center border p-2.5 ${
                      isWin10
                        ? "bg-[#ffd166]/15 border-[#ffd166]/40 text-[#ffd166]"
                        : isWin7
                        ? "bg-[#7eb8e8]/15 border-[#7eb8e8]/40 text-[#7eb8e8]"
                        : "bg-emerald-400/15 border-emerald-400/40 text-emerald-400"
                    }`}
                  >
                    {isAndroid ? (
                      <Smartphone className="size-full" />
                    ) : (
                      <Monitor className="size-full" />
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight">
                      {isAr ? platform.arabicName : platform.name}
                    </h2>
                    <p className="text-xs text-slate-400">{platform.editionBadge}</p>
                  </div>
                </div>

                {/* Badges metadata */}
                <div className="flex flex-wrap items-center gap-2 mb-5 text-[11px] font-mono text-slate-300">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                    {platform.statusBadge}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                    {platform.fileSize}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                    {platform.architecture}
                  </span>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-2.5 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {isAr ? "الميزات والخصائص:" : "Key Features:"}
                  </p>
                  <ul className="space-y-2">
                    {(isAr ? platform.arabicHighlights : platform.highlights).map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2
                          className={`size-3.5 flex-none mt-0.5 ${
                            isWin10
                              ? "text-[#ffd166]"
                              : isWin7
                              ? "text-[#7eb8e8]"
                              : "text-emerald-400"
                          }`}
                        />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legacy Warning for Windows 7 */}
                {isWin7 && (
                  <div className="p-3.5 rounded-2xl bg-[#7eb8e8]/10 border border-[#7eb8e8]/30 mb-6 text-xs text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#7eb8e8]">
                      <Info className="size-3.5" />
                      <span>{isAr ? "ملاحظة التوافق لويندوز 7:" : "Legacy Compatibility Note:"}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {isAr ? platform.arabicNotes : platform.notes}
                    </p>
                  </div>
                )}

                {/* Android Info */}
                {isAndroid && (
                  <div className="p-3.5 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 mb-6 text-xs text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <ShieldCheck className="size-3.5" />
                      <span>{isAr ? "أمان وتوافق أندرويد 8:" : "Security & Compatibility:"}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {isAr ? platform.arabicNotes : platform.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons & Checksum */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                {/* Primary Download Button */}
                <a
                  href={platform.primaryFile.path}
                  download={platform.primaryFile.name}
                  onClick={() => handleDownloadClick(platform.primaryFile.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                    isWin10
                      ? "bg-gradient-to-r from-[#ffd166] to-[#ffb703] text-[#090614] hover:brightness-110 active:scale-98"
                      : isWin7
                      ? "bg-gradient-to-r from-[#7eb8e8] to-[#5a9ad4] text-[#090614] hover:brightness-110 active:scale-98"
                      : "bg-gradient-to-r from-emerald-400 to-emerald-500 text-[#090614] hover:brightness-110 active:scale-98"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Download className="size-4" />
                    <span>{platform.primaryFile.label}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/20">
                    {platform.fileSize}
                  </span>
                </a>

                {/* Secondary Download Button (Portable) if exists */}
                {platform.secondaryFile && (
                  <a
                    href={platform.secondaryFile.path}
                    download={platform.secondaryFile.name}
                    onClick={() => handleDownloadClick(platform.secondaryFile.name)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-medium text-xs bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileCode className="size-3.5 text-slate-400" />
                      <span>{platform.secondaryFile.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">.ZIP</span>
                  </a>
                )}

                {/* SHA256 Checksum Toggle */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-mono">
                  <span className="truncate max-w-[200px]" title={platform.sha256}>
                    SHA-256: {platform.sha256.slice(0, 10)}...{platform.sha256.slice(-6)}
                  </span>
                  <button
                    onClick={() => handleCopySha(platform.sha256)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy full SHA-256 hash"
                  >
                    {copiedSha === platform.sha256 ? (
                      <Check className="size-3 text-emerald-400" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                    <span>{copiedSha === platform.sha256 ? (isAr ? "تم النسخ" : "Copied") : (isAr ? "نسخ" : "Copy")}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass rounded-3xl p-6 sm:p-8 border-white/10 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {isAr ? "مقارنة النسخ والمواصفات الفنية" : "Edition Comparison & Requirements Matrix"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {isAr
              ? "نظرة شاملة على الفروقات التقنية بين نسخة ويندوز 10/11، وويندوز 7، وأندرويد 8."
              : "Technical comparison between Windows 10/11, Windows 7 Legacy, and Android 8+ APK."}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 text-start">{isAr ? "الخاصية" : "Feature"}</th>
                <th className="py-3 px-4 text-start text-[#ffd166]">Windows 10 / 11</th>
                <th className="py-3 px-4 text-start text-[#7eb8e8]">Windows 7 (Legacy)</th>
                <th className="py-3 px-4 text-start text-emerald-400">Android 8.0+ (Oreo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-medium text-white">{isAr ? "إصدار النظام الأدنى" : "Min OS Version"}</td>
                <td className="py-3 px-4">Windows 10 v1903 / 11</td>
                <td className="py-3 px-4">Windows 7 SP1 (KB4474419)</td>
                <td className="py-3 px-4">Android 8.0 Oreo (API 26)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">{isAr ? "المعمارية المدعومة" : "Architecture"}</td>
                <td className="py-3 px-4">x64, ARM64</td>
                <td className="py-3 px-4">x64, x86 (32-bit)</td>
                <td className="py-3 px-4">arm64-v8a, armeabi-v7a</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">{isAr ? "حجم الملف" : "Download Size"}</td>
                <td className="py-3 px-4">48.2 MB</td>
                <td className="py-3 px-4">56.8 MB</td>
                <td className="py-3 px-4">18.4 MB</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">{isAr ? "العمل بدون إنترنت" : "Offline Capability"}</td>
                <td className="py-3 px-4 text-emerald-400">100% Offline</td>
                <td className="py-3 px-4 text-emerald-400">100% Offline</td>
                <td className="py-3 px-4 text-emerald-400">100% Offline</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">{isAr ? "ويدجت الشاشة الطافي" : "Desktop/Home Widget"}</td>
                <td className="py-3 px-4 text-emerald-400">Yes (Always on Top)</td>
                <td className="py-3 px-4 text-emerald-400">Yes (Aero Glass)</td>
                <td className="py-3 px-4 text-emerald-400">Yes (Home Screen 4x2)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">{isAr ? "محرك العرض الداخلي" : "Rendering Engine"}</td>
                <td className="py-3 px-4">DirectX Fluent Engine</td>
                <td className="py-3 px-4">Embedded Chromium 109</td>
                <td className="py-3 px-4">Android Native Canvas</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">{isAr ? "الصوتيات والمؤثرات" : "Soundscapes & SFX"}</td>
                <td className="py-3 px-4">Full Spatial Audio</td>
                <td className="py-3 px-4">Standard Audio</td>
                <td className="py-3 px-4">Local Tones & Chimes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sideload & Installation Guide FAQ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Windows 7 Guide */}
        <div className="glass rounded-3xl p-6 border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-[#7eb8e8] font-bold text-sm">
            <Monitor className="size-4" />
            <span>{isAr ? "دليل تشغيل ويندوز 7" : "Windows 7 Quick Install Guide"}</span>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
            <li>
              {isAr
                ? "حمّل مثبت النسخة التوافقية 'BT-Clock-Legacy-Setup-v1.8.6-Win7.exe'."
                : "Download 'BT-Clock-Legacy-Setup-v1.8.6-Win7.exe' from the button above."}
            </li>
            <li>
              {isAr
                ? "في حال ظهور رسالة الحماية (Windows SmartScreen)، اختر 'More Info' ثم 'Run anyway'."
                : "If Windows SmartScreen warns about an unrecognized app, click 'More info' then 'Run anyway'."}
            </li>
            <li>
              {isAr
                ? "لا تحتاج هذه النسخة لبرنامج WebView2؛ كل المكونات مدمجة ذاتياً داخل الحزمة."
                : "No external runtimes like Edge WebView2 required; all components are self-contained."}
            </li>
          </ol>
        </div>

        {/* Android 8 APK Guide */}
        <div className="glass rounded-3xl p-6 border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Smartphone className="size-4" />
            <span>{isAr ? "دليل تثبيت APK على أندرويد 8+" : "Android 8.0+ Sideload Guide"}</span>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
            <li>
              {isAr
                ? "حمّل ملف 'BT-Clock-Mobile-v2.3.1-Android8.apk' مباشرة إلى هاتفك."
                : "Download 'BT-Clock-Mobile-v2.3.1-Android8.apk' directly on your mobile device."}
            </li>
            <li>
              {isAr
                ? "افتح الملف من مجلد التنزيلات. إذا طلب إذن التثبيت من مصادر غير معروفة، فعّله للمتصفح."
                : "Tap the APK in your Downloads. Enable 'Install unknown apps' for your browser if prompted."}
            </li>
            <li>
              {isAr
                ? "اضغط تثبيت (Install) واستمتع بويدجت الشاشة الرئيسية الموفر للبطارية."
                : "Tap 'Install' and add the battery-efficient countdown widget to your home screen."}
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
