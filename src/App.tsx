import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CountdownView } from "./components/CountdownView";
import { DownloadsView } from "./components/DownloadsView";
import { WorldClockView } from "./components/WorldClockView";
import { Footer } from "./components/Footer";

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

  // Sync browser history state
  const handleSelectTab = (tab: "countdown" | "downloads" | "world-clock") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const targetPath = tab === "downloads" ? "/downloads" : tab === "world-clock" ? "/world-clock" : "/";
      window.history.pushState(null, "", targetPath);
    }
  };

  useEffect(() => {
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
      {/* Background radial gradients for cosmic feel */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute -top-[30%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#7eb8e8]/5 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#ffd166]/5 blur-[140px]" />
        <div className="absolute -bottom-[20%] left-[10%] w-[700px] h-[700px] rounded-full bg-[#3b1c6e]/10 blur-[160px]" />
      </div>

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
    </div>
  );
};
export default App;
