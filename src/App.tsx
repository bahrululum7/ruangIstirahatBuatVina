/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BOOKS_DATA, BookInfo, SvgBook } from './components/SvgBook';
import { BookOneContent } from './components/BookOneContent';
import { BookTwoContent } from './components/BookTwoContent';
import { BookThreeContent } from './components/BookThreeContent';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [openedBookId, setOpenedBookId] = useState<number | null>(null);

  const handleOpenBook = (id: number) => {
    setOpenedBookId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseBook = () => {
    setOpenedBookId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f7] via-[#ffe4ec] to-[#fdf2f8] text-[#4a2840] flex flex-col justify-between selection:bg-pink-300 selection:text-pink-900 relative overflow-hidden px-4 py-6 sm:py-10">
      {/* Adorable Floating Ambient Background Elements */}
      <div className="fixed top-12 left-8 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-12 right-8 w-60 h-60 bg-rose-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/2 left-1/3 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Header */}
      <header className="w-full max-w-4xl mx-auto text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/90 text-pink-600 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md mb-3 animate-pulse-gentle">
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
          <span>Safe Place buat Vina</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-cute font-bold text-pink-950 tracking-tight">
          Pojok Tiga Buku
        </h1>
        <p className="text-xs sm:text-sm text-pink-700/80 mt-1 max-w-md mx-auto">
          Pilih salah satu buku di bawah ini sesuai dengan apa yang lagi kamu rasain
        </p>
      </header>

      {/* Dynamic View: 3 Books Shelf OR Enlarged Open Book */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex items-center justify-center my-2">
        {openedBookId === null ? (
          /* THE 3 BOOKS INTERACTIVE SHELF */
          <div className="w-full flex flex-col items-center">
            {/* Shelf Graphic & Books Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-10 items-end justify-center py-6">
              {BOOKS_DATA.map((book: BookInfo, idx: number) => (
                <SvgBook
                  key={book.id}
                  book={book}
                  index={idx}
                  onClick={() => handleOpenBook(book.id)}
                />
              ))}
            </div>

            {/* Wooden / Pastel Bookshelf Plank Base */}
            <div className="w-full max-w-4xl h-5 rounded-full bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200 shadow-md border-t border-white/60 -mt-2 hidden md:block" />

            {/* Gentle hint */}
            <p className="mt-8 text-xs text-pink-600/70 font-medium text-center">
              Sentuh atau klik sampul buku untuk membukanya 📖✨
            </p>
          </div>
        ) : (
          /* OPENED ENLARGED BOOK CONTENT */
          <div className="w-full transition-all duration-500 transform scale-100">
            {openedBookId === 1 && <BookOneContent onBack={handleCloseBook} />}
            {openedBookId === 2 && <BookTwoContent onBack={handleCloseBook} />}
            {openedBookId === 3 && <BookThreeContent onBack={handleCloseBook} />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto text-center pt-8 pb-4 text-xs text-pink-500/70">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          Shit ! kayaknya gw kecintaan ama loe ! -_-
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
        </p>
      </footer>
    </div>
  );
}
