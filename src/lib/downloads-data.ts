export type DownloadPlatform = {
  id: "win10-11" | "win7" | "android8";
  name: string;
  arabicName: string;
  editionBadge: string;
  statusBadge: string;
  recommended: boolean;
  version: string;
  releaseDate: string;
  fileSize: string;
  primaryFile: {
    name: string;
    label: string;
    path: string;
    format: string;
  };
  secondaryFile?: {
    name: string;
    label: string;
    path: string;
    format: string;
  };
  sha256: string;
  minSystem: string;
  architecture: string;
  highlights: string[];
  arabicHighlights: string[];
  installationSteps: string[];
  arabicInstallationSteps: string[];
  notes?: string;
  arabicNotes?: string;
};

export const DOWNLOAD_PLATFORMS: DownloadPlatform[] = [
  {
    id: "win10-11",
    name: "Windows 10 / Windows 11",
    arabicName: "ويندوز 10 / ويندوز 11",
    editionBadge: "Modern Desktop Edition",
    statusBadge: "Stable v2.4.0 (Latest)",
    recommended: true,
    version: "2.4.0",
    releaseDate: "October 2026",
    fileSize: "48.2 MB",
    primaryFile: {
      name: "BT-Clock-Setup-v2.4.0-Win10-11.exe",
      label: "Download Installer (.exe)",
      path: "/downloads/BT-Clock-Setup-v2.4.0-Win10-11.exe",
      format: "Windows Installer (x64)",
    },
    secondaryFile: {
      name: "BT-Clock-Portable-v2.4.0-Win10-11.zip",
      label: "Portable Archive (.zip)",
      path: "/downloads/BT-Clock-Portable-v2.4.0-Win10-11.zip",
      format: "No-install Standalone ZIP",
    },
    sha256: "8e9a2f1b04c86e2d1947b71f98ac15e2193bfa60d2b78149e6f28b4950ca9e14",
    minSystem: "Windows 10 (version 1903+) or Windows 11 (21H2+)",
    architecture: "64-bit (x64 & ARM64 with native emulation)",
    highlights: [
      "Hardware-accelerated 60fps rendering with fluent glass transparency",
      "Floating desktop widget mode & minimized system tray clock",
      "Synthesized spatial soundscapes & midnight celebration chimes",
      "Offline countdown engine synchronized with global atomic time servers",
      "Automatic background update support & zero telemetry collection",
    ],
    arabicHighlights: [
      "تسريع عتادي 60 إطار في الثانية مع مظهر زجاجي عصري وتأثيرات بصرية فائقة",
      "وضع ويدجت طافي على سطح المكتب مع مصغّر في شريط المهام (System Tray)",
      "مؤثرات صوتية محيطية وتنبيهات صوتية فورية عند اكتمال العد التنازلي",
      "يعمل بدون إنترنت بالكامل مع مزامنة دقيقة مع خوادم الوقت الذرية",
      "تحديثات تلقائية خفيفة مع حماية تامة للخصوصية بدون تتبع",
    ],
    installationSteps: [
      "Download 'BT-Clock-Setup-v2.4.0-Win10-11.exe' to your PC.",
      "Launch the installer and select your preferred destination folder.",
      "Open BT Clock from the Start Menu or desktop shortcut.",
    ],
    arabicInstallationSteps: [
      "قم بتحميل ملف التثبيت 'BT-Clock-Setup-v2.4.0-Win10-11.exe'.",
      "افتح الملف واتبع خطوات التثبيت البسيطة (أقل من دقيقة).",
      "شغّل التطبيق مباشرة من قائمة ابدأ أو اختصار سطح المكتب.",
    ],
  },
  {
    id: "win7",
    name: "Windows 7 (SP1+ Legacy)",
    arabicName: "ويندوز 7 (النسخة المتوافقة SP1+)",
    editionBadge: "Legacy Compatibility Edition",
    statusBadge: "LTS Build v1.8.6",
    recommended: false,
    version: "1.8.6-LTS",
    releaseDate: "October 2026",
    fileSize: "56.8 MB",
    primaryFile: {
      name: "BT-Clock-Legacy-Setup-v1.8.6-Win7.exe",
      label: "Download Legacy Installer (.exe)",
      path: "/downloads/BT-Clock-Legacy-Setup-v1.8.6-Win7.exe",
      format: "Windows 7 Compatible Setup",
    },
    secondaryFile: {
      name: "BT-Clock-Legacy-Portable-v1.8.6-Win7.zip",
      label: "Standalone Portable ZIP",
      path: "/downloads/BT-Clock-Legacy-Portable-v1.8.6-Win7.zip",
      format: "Self-contained ZIP (No Install)",
    },
    sha256: "3d47a8f192b0e6c51846b9a7c3f81e25d40971b68e92a149c5e38d726b149f05",
    minSystem: "Windows 7 SP1 (with KB4474419) or Windows 8.1",
    architecture: "64-bit (x64) and 32-bit (x86) bundled runtime",
    highlights: [
      "Custom compatibility layer for legacy Windows 7 and Windows 8.1",
      "Embedded Chromium 109 legacy runtime (does not require Edge WebView2)",
      "Ultra-low CPU and RAM footprint (< 80 MB) optimized for older computers",
      "Windows Aero Glass support with classic translucent visual styling",
      "Includes all bundled dependencies and root certificates internally",
    ],
    arabicHighlights: [
      "طبقة توافقية مخصصة تعمل بكفاءة على ويندوز 7 وويندوز 8.1 القديم",
      "محرك تشغيل داخلي مدمج لا يحتاج إلى تثبيت Microsoft Edge WebView2",
      "استهلاك منخفض جداً للمعالج والذاكرة (أقل من 80 ميجابايت) يناسب الأجهزة الضعيفة",
      "يدعم تأثيرات زجاج ويندوز 7 الشهيرة (Aero Glass)",
      "يتضمن كافة الحزم والشهادات المطلوبة للتشغيل الفوري دون متطلبات إضافية",
    ],
    installationSteps: [
      "Ensure Windows 7 Service Pack 1 is installed (KB4474419 recommended).",
      "Download and run 'BT-Clock-Legacy-Setup-v1.8.6-Win7.exe'.",
      "If Windows SmartScreen warns about an unsigned legacy package, click 'More Info' -> 'Run anyway'.",
    ],
    arabicInstallationSteps: [
      "تأكد من وجود حزمة التحديث Windows 7 Service Pack 1.",
      "حمّل ملف 'BT-Clock-Legacy-Setup-v1.8.6-Win7.exe' وقم بتشغيله.",
      "في حال ظهور تنبيه أمان نظام ويندوز 7، اضغط 'المزيد من المعلومات' ثم 'تشغيل على أية حال'.",
    ],
    notes: "Tested on Windows 7 Service Pack 1 64-bit and 32-bit editions. Works completely offline.",
    arabicNotes: "تم اختباره بنجاح على نظام ويندوز 7 الحزمة 1 نواتي 64 و 32 بت، ويعمل بدون إنترنت.",
  },
  {
    id: "android8",
    name: "Android 8.0+ (Oreo & Newer)",
    arabicName: "أندرويد 8.0+ (أوريو وما فوق)",
    editionBadge: "Mobile APK Edition",
    statusBadge: "Mobile Release v2.3.1",
    recommended: false,
    version: "2.3.1",
    releaseDate: "October 2026",
    fileSize: "18.4 MB",
    primaryFile: {
      name: "BT-Clock-Mobile-v2.3.1-Android8.apk",
      label: "Download Android APK",
      path: "/downloads/BT-Clock-Mobile-v2.3.1-Android8.apk",
      format: "Universal Android Package (.apk)",
    },
    sha256: "b72e19a48f6c3d905182a47e62b81d9f43068c2e917b54a32c61e89df051287e",
    minSystem: "Android 8.0 Oreo (API level 26) through Android 15",
    architecture: "Universal APK (arm64-v8a, armeabi-v7a, x86_64)",
    highlights: [
      "Native home screen countdown widgets with real-time updates",
      "AMOLED True Black dark theme designed to minimize battery drain",
      "Background alarm & local event notification service",
      "Zero invasive permissions requested (no location, no contacts, no ads)",
      "High refresh rate 90Hz/120Hz display smoothness on modern smartphones",
    ],
    arabicHighlights: [
      "ويدجت تفاعلي للشاشة الرئيسية يعرض الوقت والعد التنازلي المباشر",
      "ثيم أسود فاحم (AMOLED) موفر للطاقة والبطارية على جميع الشاشات",
      "نظام تنبيهات محلي للمناسبات دون استهلاك بطارية في الخلفية",
      "خالٍ تماماً من الإعلانات ولا يطلب أي صلاحيات حساسة كالموقع أو جهات الاتصال",
      "دعم شاشات التردد العالي 90Hz و 120Hz لنعومة تامة",
    ],
    installationSteps: [
      "Tap 'Download Android APK' on your phone or tablet.",
      "When the download completes, tap the APK in your notifications or Downloads folder.",
      "If prompted, enable 'Install from unknown sources' for your browser, then tap 'Install'.",
    ],
    arabicInstallationSteps: [
      "اضغط على زر 'تحميل ملف APK' من هاتفك أو جهازك اللوحي.",
      "بعد اكتمال التنزيل، اضغط على الملف في شريط الإشعارات أو مجلد التنزيلات.",
      "إذا ظهرت رسالة أمان، اسمح بتثبيت التطبيقات من هذا المصدر في إعدادات الهاتف واضغط 'تثبيت'.",
    ],
    notes: "Compatible with all smartphones and tablets running Android 8.0 Oreo or higher.",
    arabicNotes: "متوافق مع جميع الهواتف والأجهزة اللوحية بنظام أندرويد 8.0 أوريو أو أحدث.",
  },
];
