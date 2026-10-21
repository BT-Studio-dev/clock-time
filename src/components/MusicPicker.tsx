import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, Radio, Volume2, VolumeX, ListMusic, ChevronUp, ChevronDown } from "lucide-react";
import { startAmbient, stopAmbient } from "../lib/ambient";
import { PLAYLIST_TRACKS, type PlaylistTrack } from "../lib/playlist-tracks";
import { playSfx } from "../lib/sfx";

type MusicPickerProps = {
  ambientOn: boolean;
  setAmbientOn: (on: boolean) => void;
  lang: "en" | "ar";
};

const fmt = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

export const MusicPicker: React.FC<MusicPickerProps> = ({ ambientOn, setAmbientOn, lang }) => {
  const isAr = lang === "ar";
  const [open, setOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<PlaylistTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(24);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    };

    const onEnded = () => {
      // Play next track
      playNext();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const playTrack = (track: PlaylistTrack | null) => {
    playSfx("click");
    const audio = audioRef.current;
    if (!audio) return;

    if (track === null) {
      // Switch to live generative ambient
      audio.pause();
      setCurrentTrack(null);
      setIsPlaying(true);
      setAmbientOn(true);
      startAmbient();
      return;
    }

    // Switch to MP3 track
    stopAmbient();
    setAmbientOn(true);
    setCurrentTrack(track);
    audio.src = `/music/${track.file}`;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Fallback to ambient if fetch fails
      startAmbient();
    });
  };

  const togglePlayback = () => {
    playSfx("click");
    const audio = audioRef.current;
    if (isPlaying) {
      audio?.pause();
      stopAmbient();
      setIsPlaying(false);
      setAmbientOn(false);
    } else {
      if (currentTrack && audio) {
        audio.play().then(() => {
          setIsPlaying(true);
          setAmbientOn(true);
        });
      } else {
        startAmbient();
        setIsPlaying(true);
        setAmbientOn(true);
      }
    }
  };

  const playNext = () => {
    if (!currentTrack) {
      if (PLAYLIST_TRACKS.length > 0) playTrack(PLAYLIST_TRACKS[0]);
      return;
    }
    const idx = PLAYLIST_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const nextIdx = (idx + 1) % PLAYLIST_TRACKS.length;
    playTrack(PLAYLIST_TRACKS[nextIdx]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          playSfx("open");
          setOpen(!open);
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
          isPlaying
            ? "bg-[#7eb8e8]/20 border-[#7eb8e8]/50 text-[#7eb8e8] shadow-[0_0_15px_rgba(126,184,232,0.25)]"
            : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
        }`}
      >
        <Radio className="size-3.5" />
        <span className="truncate max-w-[100px]">
          {currentTrack ? currentTrack.title : isAr ? "موسيقى فضائية" : "Ambient"}
        </span>
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 w-3">
            <span className="w-0.5 bg-[#7eb8e8] eq-bar-1" />
            <span className="w-0.5 bg-[#7eb8e8] eq-bar-2" />
            <span className="w-0.5 bg-[#7eb8e8] eq-bar-3" />
          </div>
        )}
        {open ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
      </button>

      {/* Playlist Popover Menu (Frosted Glass) */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 glass-deep rounded-2xl p-3 shadow-2xl border-white/20 z-50 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ListMusic className="size-4 text-[#ffd166]" />
              <span className="text-xs font-bold text-white">
                {isAr ? "قائمة الموسيقى (10 مسارات)" : "Soundscapes (10 Tracks)"}
              </span>
            </div>
            <button
              onClick={togglePlayback}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            </button>
          </div>

          {/* Now Playing Bar if active */}
          {currentTrack && (
            <div className="p-2 rounded-xl bg-white/5 text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-white font-semibold truncate">{currentTrack.title}</span>
                <span>
                  {fmt(currentTime)} / {fmt(duration)}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7eb8e8] to-[#ffd166]"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Track List */}
          <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs">
            {/* Option 0: Live Generative Ambience */}
            <button
              onClick={() => playTrack(null)}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-start transition-all cursor-pointer ${
                currentTrack === null && isPlaying
                  ? "bg-[#7eb8e8]/20 text-[#7eb8e8] font-bold"
                  : "hover:bg-white/5 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Radio className="size-3.5" />
                <span>{isAr ? "نغمات فضاء حية (Web Audio)" : "Live Generative Drone"}</span>
              </div>
              <span className="text-[10px] text-slate-400">LIVE</span>
            </button>

            {/* Generated MP3 Tracks */}
            {PLAYLIST_TRACKS.map((track) => {
              const active = currentTrack?.id === track.id && isPlaying;
              return (
                <button
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-start transition-all cursor-pointer ${
                    active
                      ? "bg-[#ffd166]/20 text-[#ffd166] font-bold"
                      : "hover:bg-white/5 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {active ? <Pause className="size-3" /> : <Play className="size-3" />}
                    <span className="truncate">{track.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {fmt(track.seconds)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
