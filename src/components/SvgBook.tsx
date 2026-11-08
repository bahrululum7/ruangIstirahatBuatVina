import React from 'react';
import { Sparkles, Moon, PenTool, HeartHandshake } from 'lucide-react';

export interface BookInfo {
  id: 1 | 2 | 3;
  title: string;
  subtitle: string;
  tag: string;
  primaryColor: string;
  accentColor: string;
  spineColor: string;
  ribbonColor: string;
  pageEdgeColor: string;
}

export const BOOKS_DATA: BookInfo[] = [
  {
    id: 1,
    title: 'Ketika Kamu Lelah',
    subtitle: 'Aku punya lagu bagus buat tenangin kamu Vin',
    tag: 'Buku 01',
    primaryColor: '#f472b6', // warm pink
    accentColor: '#fbcfe8',
    spineColor: '#db2777',
    ribbonColor: '#f43f5e',
    pageEdgeColor: '#fff1f2',
  },
  {
    id: 2,
    title: 'Kalo Butuh Semangat',
    subtitle: 'cuman disini tulisan gw bagus wkwk',
    tag: 'Buku 02',
    primaryColor: '#c084fc', // soft pastel purple/lavender
    accentColor: '#e9d5ff',
    spineColor: '#9333ea',
    ribbonColor: '#a855f7',
    pageEdgeColor: '#faf5ff',
  },
  {
    id: 3,
    title: 'Kalo ingin mulai kembali',
    subtitle: 'Aku punya sesuatu buat kamu sebelum mulai lagi',
    tag: 'Buku 03',
    primaryColor: '#fb7185', // sweet strawberry rose
    accentColor: '#fecdd3',
    spineColor: '#e11d48',
    ribbonColor: '#f43f5e',
    pageEdgeColor: '#fff1f2',
  },
];

interface SvgBookProps {
  book: BookInfo;
  onClick: () => void;
  index: number;
}

export const SvgBook: React.FC<SvgBookProps> = ({ book, onClick, index }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      className="group relative flex flex-col items-center cursor-pointer select-none transition-all duration-500 hover:-translate-y-4 focus:outline-none"
    >
      {/* Floating Sparkle / Badge */}
      <div className="mb-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-pink-200 text-pink-600 text-xs font-semibold shadow-sm backdrop-blur-sm group-hover:bg-pink-100 group-hover:scale-105 transition-all">
        <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{book.tag}</span>
      </div>

      {/* SVG 3D Book Graphic */}
      <div className="relative w-56 sm:w-64 h-76 sm:h-84 transition-transform duration-500 group-hover:rotate-1">
        <svg
          viewBox="0 0 240 320"
          className="w-full h-full book-shadow drop-shadow-xl overflow-visible"
        >
          <defs>
            {/* Book cover gradient */}
            <linearGradient id={`coverGrad-${book.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={book.accentColor} />
              <stop offset="60%" stopColor={book.primaryColor} />
              <stop offset="100%" stopColor={book.spineColor} />
            </linearGradient>

            {/* Spine shadow */}
            <linearGradient id={`spineShadow-${book.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4a152d" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#4a152d" stopOpacity="0.1" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4a152d" stopOpacity="0.15" />
            </linearGradient>

            {/* Gold/Pastel Foil shimmer */}
            <linearGradient id={`goldShimmer-${book.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
            </linearGradient>

            {/* Page thickness texture */}
            <pattern id="pageLines" width="4" height="4" patternUnits="userSpaceOnUse">
              <line x1="0" y1="2" x2="4" y2="2" stroke="#e2d0d7" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* 1. Back cover & bottom pages shadow */}
          <rect x="24" y="16" width="194" height="290" rx="8" fill="#582638" opacity="0.3" />

          {/* 2. Paper stack right side & bottom edges */}
          <rect x="26" y="12" width="192" height="286" rx="6" fill="#fdf4f6" stroke="#f1cbd5" strokeWidth="1.5" />
          {/* Subtle page lines on side */}
          <rect x="210" y="16" width="8" height="278" fill="url(#pageLines)" opacity="0.8" />
          <rect x="36" y="290" width="180" height="8" fill="url(#pageLines)" opacity="0.8" />

          {/* 3. Main Book Front Cover */}
          <rect
            x="14"
            y="8"
            width="198"
            height="288"
            rx="12"
            fill={`url(#coverGrad-${book.id})`}
            stroke="#ffffff"
            strokeWidth="2.5"
          />

          {/* 4. Book Spine Emboss */}
          <rect x="14" y="8" width="22" height="288" rx="8" fill={book.spineColor} />
          <rect x="14" y="8" width="22" height="288" rx="8" fill={`url(#spineShadow-${book.id})`} />
          <line x1="36" y1="8" x2="36" y2="296" stroke="#4a152d" strokeWidth="1.2" strokeOpacity="0.25" />
          <line x1="38" y1="8" x2="38" y2="296" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />

          {/* 5. Hanging Bookmark Ribbon */}
          <path
            d="M 120,288 L 120,314 L 129,306 L 138,314 L 138,288 Z"
            fill={book.ribbonColor}
            stroke="#ffffff"
            strokeWidth="1"
          />

          {/* 6. Cute decorative border on cover */}
          <rect
            x="48"
            y="24"
            width="150"
            height="256"
            rx="10"
            fill="none"
            stroke={`url(#goldShimmer-${book.id})`}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* 7. Center emblem badge */}
          <circle cx="123" cy="100" r="38" fill="#ffffff" fillOpacity="0.25" />
          <circle cx="123" cy="100" r="32" fill="#ffffff" fillOpacity="0.9" />

          {/* Icon in center of cover */}
          {book.id === 1 && (
            <g transform="translate(107, 84)">
              <Moon className="w-8 h-8 text-pink-500 fill-pink-300" />
            </g>
          )}
          {book.id === 2 && (
            <g transform="translate(107, 84)">
              <PenTool className="w-8 h-8 text-purple-500 fill-purple-300" />
            </g>
          )}
          {book.id === 3 && (
            <g transform="translate(107, 84)">
              <HeartHandshake className="w-8 h-8 text-rose-500 fill-rose-300" />
            </g>
          )}

          {/* 8. Book Title Text on Cover */}
          <text
            x="123"
            y="170"
            textAnchor="middle"
            fill="#ffffff"
            fontWeight="bold"
            fontSize="14"
            fontFamily="Comfortaa, sans-serif"
            className="select-none tracking-tight"
          >
            {book.title.length > 20 ? (
              <>
                <tspan x="123" dy="0">{book.title.slice(0, 16)}</tspan>
                <tspan x="123" dy="18">{book.title.slice(16)}</tspan>
              </>
            ) : (
              book.title
            )}
          </text>

          {/* 9. Sweet small subtext */}
          <text
            x="123"
            y="235"
            textAnchor="middle"
            fill="#ffffff"
            opacity="0.9"
            fontSize="9.5"
            fontFamily="Quicksand, sans-serif"
            fontWeight="600"
          >
            Khusus Untuk Vina ♡
          </text>

          {/* 10. Cute stars / hearts corner decoration */}
          <circle cx="56" cy="32" r="2.5" fill="#ffffff" opacity="0.8" />
          <circle cx="190" cy="32" r="2.5" fill="#ffffff" opacity="0.8" />
          <circle cx="56" cy="272" r="2.5" fill="#ffffff" opacity="0.8" />
          <circle cx="190" cy="272" r="2.5" fill="#ffffff" opacity="0.8" />
        </svg>

        {/* Hover Click Me Pill */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 px-3 py-1 rounded-full bg-pink-600 text-white text-[11px] font-bold shadow-md whitespace-nowrap">
          Klik untuk Buka 📖
        </div>
      </div>

      {/* Title under book */}
      <div className="mt-4 text-center max-w-[220px]">
        <h3 className="font-cute font-bold text-base sm:text-lg text-pink-900 group-hover:text-pink-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-pink-700/70 mt-0.5">
          {book.subtitle}
        </p>
      </div>
    </div>
  );
};
