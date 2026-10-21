import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CountdownView } from "./components/CountdownView";
import { DownloadsView } from "./components/DownloadsView";
import { WorldClockView } from "./components/WorldClockView";
import { Footer } from "./components/Footer";
import { PixelBackground } from "./components/PixelBackground";
import { UpdateBanner } from "./components/UpdateBanner";

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"countdown" | "downloads" | "world-clock">(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes("download") || hash.includes("download")) return "downloads";
      if (path.includes("world-clock") || hash.includes("world-clock")) return "world-clock";
    }
    return "countdown";
  });

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [sfxOn, setSfxOn] = useState<boolean>(true);
  const [ambientOn, setAmbientOn] = useState<boolean>(false);
  const [pixelOn, setPixelOn] = useState<boolean>(true);

  // Sync browser history state
  const handleSelectTab = (tab: "countdown" | "downloads" | "world-clock") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const targetPath = tab === "downloads" ? "/downloads" : tab === "world-clock" ? "/world-clock" : "/";
      window.history.pushState(null, "", targetPath);
    }
  };

  useEffect(() => {
    // Register Service Worker for PWA & offline support
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // ignore
      });
    }

    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes("download") || hash.includes("download")) {
        setActiveTab("downloads");
      } else if (path.includes("world-clock") || hash.includes("world-clock")) {
        setActiveTab("world-clock");
      } else {
        setActiveTab("countdown");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-[#ffd166] selection:text-[#090614]">
      {/* Dynamic Pixel & Ambient Glowing Background */}
      <PixelBackground pixelOn={pixelOn} theme={theme} />

      {/* Main Content Layer (Frosted Glass over Pixel Grid) */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <div>
          <Header
            activeTab={activeTab}
            setActiveTab={handleSelectTab}
            theme={theme}
            setTheme={setTheme}
            lang={lang}
            setLang={setLang}
            sfxOn={sfxOn}
            setSfxOn={setSfxOn}
            ambientOn={ambientOn}
            setAmbientOn={setAmbientOn}
            pixelOn={pixelOn}
            setPixelOn={setPixelOn}
          />

          <main className="w-full">
            {activeTab === "countdown" && (
              <CountdownView lang={lang} onGoToDownloads={() => handleSelectTab("downloads")} />
            )}

            {activeTab === "downloads" && <DownloadsView lang={lang} />}

            {activeTab === "world-clock" && <WorldClockView lang={lang} />}
          </main>
        </div>

        <Footer lang={lang} onGoToDownloads={() => handleSelectTab("downloads")} />

        {/* In-App Update Banner for Version v2.5.0 */}
        <UpdateBanner lang={lang} />
      </div>
    </div>
  );
};

export default App;
