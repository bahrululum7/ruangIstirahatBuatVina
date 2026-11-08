import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Sparkles,
  BookOpen,
  Send,
  PartyPopper
} from 'lucide-react';

interface BookThreeContentProps {
  onBack: () => void;
}

export const BookThreeContent: React.FC<BookThreeContentProps> = ({ onBack }) => {
  const [hugCount, setHugCount] = useState<number>(1);
  const [extraHearts, setExtraHearts] = useState<Array<{ id: number; left: number }>>([]);

  const handleExtraHug = () => {
    setHugCount((prev) => prev + 1);
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      left: 20 + Math.random() * 60,
    }));
    setExtraHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setExtraHearts((prev) => prev.slice(newHearts.length));
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-gradient-to-br from-rose-50 via-pink-50 to-pink-100 rounded-3xl p-6 sm:p-10 border-2 border-rose-200 pastel-card-shadow text-pink-950 animate-fade-in overflow-hidden">
      {/* Floating Animated Hearts */}
      {extraHearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-10 text-rose-500 pointer-events-none transition-all duration-1000 ease-out animate-bounce z-20"
          style={{
            left: `${h.left}%`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        >
          <Heart className="w-6 h-6 fill-rose-500 opacity-80" />
        </div>
      ))}

      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-rose-200/80">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-rose-100/70 text-rose-700 text-xs sm:text-sm font-bold border border-rose-200 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Rak 3 Buku</span>
        </button>

        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          Buku 3 : Ketika kamu ingin memulai kembali
        </span>
      </div>

      {/* Interactive Stage: Stickman Hug & Speech Bubble */}
      <div className="my-6 flex flex-col items-center justify-center relative min-h-[360px]">
        {/* Adorable SVG Scene */}
        <div className="relative w-full max-w-md h-72 sm:h-80 flex items-center justify-center">
          <svg
            viewBox="0 0 400 320"
            className="w-full h-full drop-shadow-md overflow-visible select-none"
          >
            <defs>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="200" cy="275" rx="100" ry="12" fill="#fda4af" opacity="0.35" />

            {/* Floating ambient hearts */}
            <g className="animate-float">
              <path
                d="M 200,60 C 200,50 185,45 185,55 C 185,68 200,78 200,82 C 200,78 215,68 215,55 C 215,45 200,50 200,60 Z"
                fill="#f43f5e"
                opacity="0.85"
                filter="url(#softGlow)"
              />
            </g>
            <g className="animate-pulse-gentle">
              <path
                d="M 140,85 C 140,77 128,73 128,81 C 128,91 140,99 140,102 C 140,99 152,91 152,81 C 152,73 140,77 140,85 Z"
                fill="#fb7185"
                opacity="0.6"
              />
              <path
                d="M 260,95 C 260,88 250,84 250,91 C 250,100 260,107 260,110 C 260,107 270,100 270,91 C 270,84 260,88 260,95 Z"
                fill="#fb7185"
                opacity="0.6"
              />
            </g>

            {/* ================= STICKMAN HUG GROUP ================= */}
            <g transform="translate(10, 0)">
              {/* --- 1. MALE STICKMAN (Left side, leaning in warm embrace) --- */}
              {/* Body torso */}
              <line x1="175" y1="170" x2="175" y2="235" stroke="#4a152d" strokeWidth="5.5" strokeLinecap="round" />

              {/* Legs */}
              <line x1="175" y1="235" x2="160" y2="270" stroke="#4a152d" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="175" y1="235" x2="182" y2="270" stroke="#4a152d" strokeWidth="5.5" strokeLinecap="round" />

              {/* Head */}
              <circle cx="172" cy="140" r="22" fill="#fff5f7" stroke="#4a152d" strokeWidth="4.5" />
              {/* Cute Smiling closed eyes */}
              <path d="M 166,138 Q 170,143 174,138" fill="none" stroke="#4a152d" strokeWidth="2.5" strokeLinecap="round" />
              {/* Rosy blush */}
              <ellipse cx="164" cy="146" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
              {/* Cute hair / cap tuft */}
              <path d="M 162,120 Q 172,112 178,122" fill="none" stroke="#4a152d" strokeWidth="3.5" strokeLinecap="round" />

              {/* --- 2. FEMALE STICKMAN / VINA (Right side, snuggled in) --- */}
              {/* Body torso */}
              <line x1="205" y1="172" x2="205" y2="235" stroke="#4a152d" strokeWidth="5.5" strokeLinecap="round" />
              {/* Cute little pastel skirt */}
              <polygon points="194,220 216,220 222,242 188,242" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />

              {/* Legs */}
              <line x1="198" y1="242" x2="194" y2="270" stroke="#4a152d" strokeWidth="5" strokeLinecap="round" />
              <line x1="212" y1="242" x2="218" y2="270" stroke="#4a152d" strokeWidth="5" strokeLinecap="round" />

              {/* Head */}
              <circle cx="208" cy="142" r="21" fill="#fff5f7" stroke="#4a152d" strokeWidth="4.5" />
              {/* Sweet Peaceful eyes closed (resting on his shoulder) */}
              <path d="M 204,142 Q 208,146 212,142" fill="none" stroke="#4a152d" strokeWidth="2.5" strokeLinecap="round" />
              {/* Sweet smile */}
              <path d="M 206,150 Q 210,154 214,150" fill="none" stroke="#4a152d" strokeWidth="2" strokeLinecap="round" />
              {/* Sweet blush */}
              <ellipse cx="216" cy="147" rx="4.5" ry="3" fill="#f43f5e" opacity="0.7" />

              {/* Cute hair & pink bow for Vina */}
              <path d="M 218,124 Q 228,134 226,152" fill="none" stroke="#4a152d" strokeWidth="3" strokeLinecap="round" />
              {/* Ribbon Bow on head */}
              <g transform="translate(222, 126)">
                <circle cx="0" cy="0" r="3" fill="#f43f5e" />
                <path d="M 0,0 L 7,-5 L 7,5 Z" fill="#fb7185" />
                <path d="M 0,0 L -7,-5 L -7,5 Z" fill="#fb7185" />
              </g>

              {/* --- 3. HUGGING ARMS (Interlocking embrace) --- */}
              {/* Male arm wrapping warmly around female back */}
              <path
                d="M 175,178 Q 195,195 220,186"
                fill="none"
                stroke="#4a152d"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Female arm wrapping around male */}
              <path
                d="M 205,182 Q 185,198 165,186"
                fill="none"
                stroke="#4a152d"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </g>

            {/* ================= SPEECH BUBBLE FROM MALE ================= */}
            <g transform="translate(18, 10)">
              {/* Speech bubble background with soft shadow */}
              <rect
                x="20"
                y="14"
                width="200"
                height="68"
                rx="18"
                fill="#ffffff"
                stroke="#fda4af"
                strokeWidth="2.5"
                filter="url(#softGlow)"
                style={{ fontSize: '14px' }}
              />
              {/* Bubble pointer pointing to male stickman head */}
              <polygon
                points="145,82 155,82 165,115"
                fill="#ffffff"
                stroke="#fda4af"
                strokeWidth="2.5"
              />
              {/* Hide seam line */}
              <line x1="144" y1="82" x2="156" y2="82" stroke="#ffffff" strokeWidth="4" />

              {/* Speech text line 1 */}
              <text
                x="120"
                y="40"
                textAnchor="middle"
                fill="#881337"
                fontSize="10.5"
                fontWeight="bold"
                fontFamily="Comfortaa, sans-serif"
              >
                Selamat belajar kembali Vin !
              </text>
              {/* Speech text line 2 */}
              <text
                x="120"
                y="62"
                textAnchor="middle"
                fill="#be123c"
                fontSize="12.5"
                fontWeight="600"
                fontFamily="Caveat, cursive"
              >
                with love, Bahrul ♡
              </text>
            </g>
          </svg>
        </div>

        {/* Affirmation Note */}
        <div className="text-center mt-2 max-w-lg">
          <p className="font-cute text-sm sm:text-base font-semibold text-rose-900 leading-relaxed">
            Rehatnya udah cukup, Kembali belajar My Bebi gerl ! wkwk.
          </p>
          <p className="text-xs text-rose-700/80 mt-1">
            I Love U !
          </p>
        </div>

        {/* Interactive "Kirim Pelukan Hangat" Button */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          

          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs sm:text-sm border border-rose-300 transition-colors shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>Buka Buku Lainnya</span>
          </button>
        </div>
      </div>
    </div>
  );
};
