# BT Clock (Clock Time)

A modern, cinematic countdown application and world atomic clock featuring official downloadable editions for **Windows 10/11**, **Windows 7 (Legacy SP1+)**, and **Android 8.0+ (Oreo & Newer)**.

Live Web App: [https://clocktime-teal.vercel.app](https://clocktime-teal.vercel.app)

---

## 📥 Official Download Editions

| Platform | Edition | Version | Architecture | File Formats |
| :--- | :--- | :--- | :--- | :--- |
| **Windows 10 / 11** | Modern Desktop (DirectX / Fluent) | `v2.4.0` | 64-bit (x64 / ARM64) | Installer (`.exe`), Portable (`.zip`) |
| **Windows 7** | Legacy Compatibility (SP1+ / Win 8.1) | `v1.8.6-LTS` | 64-bit (x64) & 32-bit (x86) | Setup (`.exe`), Standalone (`.zip`) |
| **Android 8.0+** | Mobile APK (Oreo through Android 15) | `v2.3.1` | Universal APK (ARM64 / ARMv7 / x86_64) | Package (`.apk`) |

### Features Across Editions
- **Windows 10/11**: DirectX hardware acceleration, system tray mini-clock, always-on-top desktop widget, spatial ambient audio, and offline atomic clock sync.
- **Windows 7 (Legacy)**: Embedded Chromium 109 legacy runtime (no modern Edge WebView2 required), low memory footprint (< 80MB), Aero Glass support, and full offline functionality.
- **Android 8.0+**: Resizable home screen widgets (4x2, 2x2), AMOLED True Black battery saver theme, zero invasive permissions, and local event reminders.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🚀 Vercel Deployment

The project contains `vercel.json` configured for Vite SPA with clean URLs and dynamic routing (`/`, `/downloads`, `/world-clock`).

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
