import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Heart,
  Music,
  Sparkles,
  Disc3,
  Shuffle,
  Repeat
} from 'lucide-react';
import { lullabyEngine } from '../utils/lullabyAudio';
import { ON_THE_SEA_LYRICS, LyricItem } from '../data/lyrics';

interface BookOneContentProps {
  onBack: () => void;
}

export const BookOneContent: React.FC<BookOneContentProps> = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(180); // Default 3 mins
  const [isLiked, setIsLiked] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [useFallbackAudio, setUseFallbackAudio] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [manualViewOverride, setManualViewOverride] = useState<'message' | 'lyrics' | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up audio on unmount or back
  useEffect(() => {
    return () => {
      lullabyEngine.stop();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    // If /song.mp3 is available and not errored
    if (!useFallbackAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If /song.mp3 is not yet uploaded or unplayable, fallback to soothing music
            setUseFallbackAudio(true);
            lullabyEngine.play(
              (secs) => setCurrentTime(secs),
              () => {
                setIsPlaying(false);
                setCurrentTime(0);
              }
            );
            setIsPlaying(true);
          });
      }
      return;
    }

    // Built-in melodic fallback
    if (isPlaying) {
      lullabyEngine.pause();
      setIsPlaying(false);
    } else {
      lullabyEngine.play(
        (secs) => setCurrentTime(secs),
        () => {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      );
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (!useFallbackAudio && audioRef.current) {
      audioRef.current.currentTime = val;
    } else {
      lullabyEngine.seek(val);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Synchronized active lyrics calculation
  const currentLyric = ON_THE_SEA_LYRICS.reduce<LyricItem>((acc, item) => {
    if (currentTime >= item.time) {
      return item;
    }
    return acc;
  }, ON_THE_SEA_LYRICS[0]);

  const currentLyricIndex = ON_THE_SEA_LYRICS.findIndex((item) => item === currentLyric);
  const nextLyric =
    currentLyricIndex >= 0 && currentLyricIndex < ON_THE_SEA_LYRICS.length - 1
      ? ON_THE_SEA_LYRICS[currentLyricIndex + 1]
      : null;

  // When play is clicked (or audio is in progress), show lyrics, unless manually set
  const isShowingLyrics =
    manualViewOverride !== null
      ? manualViewOverride === 'lyrics'
      : (isPlaying || currentTime > 0);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-3xl p-6 sm:p-10 border-2 border-pink-200 pastel-card-shadow text-pink-950 animate-fade-in">
      {/* Audio element for /song.mp3 */}
      <audio
        ref={audioRef}
        src="/song.mp3"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && audioRef.current.duration) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onError={() => {
          setUseFallbackAudio(true);
        }}
      />

      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-pink-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-pink-100/70 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Rak 3 Buku</span>
        </button>

        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          Buku 1 : Ketika Kamu Lelah
        </span>
      </div>

      {/* Dynamic Header: Warm Quote OR Synchronized Lyrics */}
      <div className="my-8 text-center px-2 sm:px-6 min-h-[160px] sm:min-h-[180px] flex flex-col items-center justify-center relative">
        {/* VIEW 1: SYNCHRONIZED LYRICS (Fades in when playing) */}
        <div
          className={`w-full max-w-2xl mx-auto transition-all duration-700 ease-in-out ${
            isShowingLyrics
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold mb-3 border border-pink-200 shadow-sm">
            <Music className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            <span>Lirik & Terjemahan • On The Sea</span>
          </div>

          {/* Original English Lyric */}
          <p className="font-cute text-xl sm:text-2xl md:text-3xl font-bold leading-snug text-pink-950 transition-all duration-300">
            {currentLyric.text}
          </p>

          {/* Indonesian Translation Below */}
          <p className="font-handwriting text-lg sm:text-2xl text-pink-700 font-semibold italic mt-2.5 transition-all duration-300">
            "{currentLyric.translation}"
          </p>

          {/* Next lyric preview */}
          {nextLyric && isPlaying && (
            <p className="text-[11px] text-pink-400/80 mt-3 font-medium transition-opacity">
              Selanjutnya: {nextLyric.text}
            </p>
          )}

          {/* Button to view original message if desired */}
          <div className="mt-3">
            <button
              onClick={() => setManualViewOverride('message')}
              className="text-[11px] text-pink-500 hover:text-pink-700 underline font-medium transition-colors"
            >
              Lihat pesan awal 💌
            </button>
          </div>
        </div>

        {/* VIEW 2: ORIGINAL WARM MESSAGE (Fades out when playing) */}
        <div
          className={`w-full max-w-2xl mx-auto transition-all duration-700 ease-in-out ${
            !isShowingLyrics
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute'
          }`}
        >
          <div className="inline-block p-2 rounded-2xl bg-pink-100/60 mb-3 text-pink-500">
            <Disc3 className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </div>
          <blockquote className="font-cute text-lg sm:text-2xl font-bold leading-relaxed text-pink-900 max-w-2xl mx-auto">
            "Manusia terkuat di belahan bumi pun, butuh istirahat. Otak kamu mu juga ingin diperlakukan manja oleh pemiliknya, tutup mata kamu vin, 3 menit kedepan, aku harap lagunya bisa nemenin stres kamu"
          </blockquote>
          <p className="text-xs text-pink-500/80 mt-2 font-medium">
            I love Beach House as I do you, vin wkkw
          </p>

          {currentTime > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setManualViewOverride('lyrics')}
                className="text-[11px] text-pink-500 hover:text-pink-700 underline font-medium transition-colors"
              >
                Kembali ke lirik lagu 🎵
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Spotify-Style Music Player Card */}
      <div className="bg-[#121212] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-800 relative overflow-hidden">
        {/* Subtle Spotify green/pink ambient backlight */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* Song Poster / Vinyl Artwork */}
          <div className="relative group shrink-0">
            <div
              className={`w-64 sm:w-72 h-44 sm:h-52 rounded-2xl overflow-hidden shadow-2xl border border-neutral-700/60 bg-gradient-to-tr from-pink-950 via-rose-900 to-pink-800 flex flex-col items-center justify-center text-center relative transition-transform duration-700 ${
                isPlaying ? 'scale-105' : ''
              }`}
            >
              {!imageError ? (
                <>
                  <img
                    src="/pic.png"
                    alt="Cover Beach House"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                  {isPlaying && (
                    <div className="absolute top-2 left-2 p-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-pink-500/50">
                      <Disc3 className="w-5 h-5 text-pink-400 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Cute poster graphic when pic.png is loading or not yet placed */}
                  <div
                    className={`w-28 h-28 rounded-full border-4 border-pink-300/40 bg-neutral-900 flex items-center justify-center shadow-inner ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '8s' }}
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-500/80 flex items-center justify-center">
                      <Music className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-[10px] uppercase tracking-widest text-pink-300 font-bold block">
                      Beach House
                    </span>
                    <span className="text-xs font-semibold text-neutral-300 truncate max-w-[150px] block">
                      On The Sea
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Player Controls & Info */}
          <div className="flex-1 w-full flex flex-col justify-between">
            {/* Title & Artist & Like */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider">
                  Sedang Diputar
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-cute text-white truncate max-w-xs sm:max-w-md">
                  On The Sea
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                  Beach House
                </p>
              </div>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-full hover:bg-neutral-800 transition-colors"
                title={isLiked ? 'Disukai' : 'Sukai'}
              >
                <Heart
                  className={`w-6 h-6 transition-transform active:scale-125 ${
                    isLiked ? 'text-pink-500 fill-pink-500' : 'text-neutral-400'
                  }`}
                />
              </button>
            </div>

            {/* Progress Slider */}
            <div className="my-3">
              <input
                type="range"
                min={0}
                max={duration || 180}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-400 transition-all"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main playback control buttons */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <button
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  title="Acak"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentTime(0);
                    if (!useFallbackAudio && audioRef.current) {
                      audioRef.current.currentTime = 0;
                    } else {
                      lullabyEngine.seek(0);
                    }
                  }}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  title="Ulangi dari awal"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Central Play/Pause Button */}
              <button
                onClick={handleTogglePlay}
                className="w-14 h-14 rounded-full bg-pink-500 hover:bg-pink-400 text-white flex items-center justify-center shadow-lg shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all"
                title={isPlaying ? 'Jeda' : 'Putar Musik'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                )}
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  title="Mute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  title="Ulangi terus"
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};
