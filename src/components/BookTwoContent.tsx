import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Heart,
  FastForward
} from 'lucide-react';

interface BookTwoContentProps {
  onBack: () => void;
}

export const BookTwoContent: React.FC<BookTwoContentProps> = ({ onBack }) => {
  const fullText =
    "Aku nggak tau apa yang kamu pikirin, selalu nggak tau. Vin, aku juga nggak tau apa yang bisa buat kamu semangat lagi. Tapi, aku rasa aku tau satu hal. Setiap manusia bisa semangat lagi, kalau punya alasan. Aku harap kamu inget lagi alasan kamu bisa sampe sejauh ini, dan alasan kenapa kamu harus melanjutkan belajar kamu lagi. Aku bisa mengucapkan ribuan - jutaan kata penyemangat untukmu, tapi kamu lebih berhak untuk mengembalikan rasa semangatmu sendiri. Aku bangga sama kamu, dan aku pikir, akan selalu seperti itu.";

  const [charIndex, setCharIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(35); // ms per character

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTyping && charIndex < fullText.length) {
      timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, speed);
    } else if (charIndex >= fullText.length) {
      setIsTyping(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [charIndex, isTyping, fullText.length, speed]);

  const handleRestart = () => {
    setCharIndex(0);
    setIsTyping(true);
  };

  const handleSkipToEnd = () => {
    setCharIndex(fullText.length);
    setIsTyping(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayedText = fullText.slice(0, charIndex);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-6 sm:p-10 border-2 border-purple-200 pastel-card-shadow text-pink-950 animate-fade-in">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-purple-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-purple-100/70 text-purple-700 text-xs sm:text-sm font-bold border border-purple-200 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Rak 3 Buku</span>
        </button>

        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          Buku 2 : Ketika Kamu Butuh Semangat
        </span>
      </div>

      {/* Cute Subheader */}
      <div className="mt-6 mb-4 text-center">
        <h3 className="font-cute text-xl sm:text-2xl font-bold text-purple-900">
          mau nulissss buat kamuuuu
        </h3>
        <p className="text-xs text-purple-600/80 mt-1">
          bacanya pake hati juga siii kalo kata gw yak !
        </p>
      </div>

      {/* Lined Notebook Paper Container with Binder Holes */}
      <div className="relative my-6 rounded-2xl bg-[#fffdfa] border-2 border-purple-200/80 p-6 sm:p-10 shadow-xl overflow-hidden">
        {/* Notebook Top Red/Pink Margin Line */}
        <div className="absolute top-0 left-12 sm:left-16 bottom-0 w-0.5 bg-rose-300/40 pointer-events-none" />

        {/* Binder punch holes */}
        <div className="absolute left-3 sm:left-5 top-8 w-4 h-4 rounded-full bg-purple-100 border border-purple-300 shadow-inner" />
        <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-100 border border-purple-300 shadow-inner" />
        <div className="absolute left-3 sm:left-5 bottom-8 w-4 h-4 rounded-full bg-purple-100 border border-purple-300 shadow-inner" />

        {/* Paper Content Area */}
        <div className="pl-8 sm:pl-12 min-h-[260px] relative">
          <div className="text-lg sm:text-2xl font-handwriting font-medium leading-[2.1rem] sm:leading-[2.6rem] text-neutral-800 tracking-wide text-left inline">
            {displayedText}
          </div>

          {/* Animated SVG Pen at the active writing position */}
          {isTyping && (
            <span className="inline-block relative ml-1 align-baseline">
              <span className="inline-block animate-pen origin-bottom-left">
                <svg
                  viewBox="0 0 32 32"
                  className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md text-purple-600"
                  fill="none"
                >
                  {/* Nib */}
                  <path
                    d="M 6,26 L 10,22 L 8,20 L 4,24 Z"
                    fill="#3b0764"
                    stroke="#1e1b4b"
                    strokeWidth="0.8"
                  />
                  {/* Ink tip */}
                  <circle cx="5" cy="25" r="1.2" fill="#db2777" />
                  {/* Pen Barrel */}
                  <path
                    d="M 10,22 L 24,8 C 25,7 27,7 28,8 C 29,9 29,11 28,12 L 14,26 Z"
                    fill="url(#penGrad)"
                    stroke="#3b0764"
                    strokeWidth="1"
                  />
                  {/* Gold Ring */}
                  <line x1="12" y1="20" x2="16" y2="24" stroke="#fef08a" strokeWidth="2" />
                  <defs>
                    <linearGradient id="penGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="50%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#7e22ce" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </span>
          )}

          {/* Sweet Closing Signature when done */}
          {!isTyping && (
            <div className="mt-8 pt-4 border-t border-purple-100 flex items-center justify-between">
              <span className="font-handwriting text-2xl text-purple-800 font-bold">
                — Bandung, 2026 
              </span>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-purple-100 text-purple-700 text-xs font-semibold border border-purple-200 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tulis Ulang</span>
          </button>

          {isTyping && (
            <button
              onClick={handleSkipToEnd}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-semibold border border-purple-200 transition-colors"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Selesaikan Cepat</span>
            </button>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30 active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Tersalin!' : 'Salin Pesan'}</span>
        </button>
      </div>
    </div>
  );
};
