/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Timer, 
  Hourglass, 
  Globe2, 
  Terminal, 
  Heart, 
  Sparkles, 
  Github, 
  Share2, 
  Check,
  Award
} from 'lucide-react';
import { ThemeId, ClockStyle, ActiveTab } from './types';
import { THEMES } from './utils/themes';
import { playTickSound } from './utils/audio';
import { Header } from './components/Header';
import { HomeworkCard } from './components/HomeworkCard';
import { DigitalClock } from './components/DigitalClock';
import { AnalogClock } from './components/AnalogClock';
import { Stopwatch } from './components/Stopwatch';
import { Countdown } from './components/Countdown';
import { WorldClocks } from './components/WorldClocks';
import { CodeInspector } from './components/CodeInspector';
import { DeveloperQuotes } from './components/DeveloperQuotes';
import { NameModal } from './components/NameModal';
import { SignatureModal } from './components/SignatureModal';

export default function App() {
  // User name state with localStorage persistence
  const [userName, setUserName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kodluyoruz_user_name');
      return saved || 'Enes Öztürk';
    }
    return 'Enes Öztürk';
  });

  // Current live date & time
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  // Theme state
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kodluyoruz_theme') as ThemeId;
      if (saved && THEMES[saved]) return saved;
    }
    return 'kodluyoruz';
  });

  // Clock preferences
  const [clockStyle, setClockStyle] = useState<ClockStyle>('digital');
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [showMilliseconds, setShowMilliseconds] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Active view tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('clock');

  // Modals
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  const theme = THEMES[themeId] || THEMES.kodluyoruz;
  const lastSecondRef = useRef<number>(new Date().getSeconds());

  // Clock update loop
  useEffect(() => {
    // If milliseconds are shown, update every 50ms; otherwise every 250ms for smooth precision
    const intervalTime = showMilliseconds ? 50 : 250;
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);

      // Trigger tick sound on each new second
      if (now.getSeconds() !== lastSecondRef.current) {
        lastSecondRef.current = now.getSeconds();
        if (soundEnabled) {
          playTickSound(true);
        }
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [showMilliseconds, soundEnabled]);

  // Handle name update
  const handleSaveName = (name: string) => {
    setUserName(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kodluyoruz_user_name', name);
    }
  };

  // Handle theme change
  const handleThemeChange = (newTheme: ThemeId) => {
    setThemeId(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kodluyoruz_theme', newTheme);
    }
  };

  // Share application link
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      }).catch(() => {});
    }
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${theme.bgGradient} ${theme.textColor} transition-colors duration-500 flex flex-col justify-between selection:bg-orange-500 selection:text-slate-950 relative overflow-x-hidden`}>
      {/* Background ambient decorative shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full ${theme.accentBg} opacity-10 blur-3xl`} />
        <div className={`absolute top-1/2 -right-40 w-96 h-96 rounded-full ${theme.accentBg} opacity-10 blur-3xl`} />
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        {/* Navigation & Controls Header */}
        <Header
          userName={userName}
          theme={theme}
          soundEnabled={soundEnabled}
          is24Hour={is24Hour}
          showMilliseconds={showMilliseconds}
          clockStyle={clockStyle}
          onThemeChange={handleThemeChange}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onToggle24Hour={() => setIs24Hour(!is24Hour)}
          onToggleMilliseconds={() => setShowMilliseconds(!showMilliseconds)}
          onChangeClockStyle={setClockStyle}
          onOpenNameModal={() => setIsNameModalOpen(true)}
          onOpenSignatureModal={() => setIsSignatureModalOpen(true)}
        />

        {/* Hero Assignment Card */}
        <HomeworkCard
          userName={userName}
          date={currentDate}
          theme={theme}
          onOpenNameModal={() => setIsNameModalOpen(true)}
          onOpenSignatureModal={() => setIsSignatureModalOpen(true)}
        />

        {/* Feature Navigation Tabs */}
        <div className="w-full max-w-2xl mx-auto px-4 mb-6">
          <div className="flex items-center justify-center p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-lg gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('clock')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'clock'
                  ? `${theme.accentBg} text-slate-950 shadow-md`
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Ana Saat</span>
            </button>

            <button
              onClick={() => setActiveTab('stopwatch')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'stopwatch'
                  ? `${theme.accentBg} text-slate-950 shadow-md`
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>Kronometre</span>
            </button>

            <button
              onClick={() => setActiveTab('countdown')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'countdown'
                  ? `${theme.accentBg} text-slate-950 shadow-md`
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Hourglass className="w-4 h-4" />
              <span>Geri Sayım</span>
            </button>

            <button
              onClick={() => setActiveTab('world')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'world'
                  ? `${theme.accentBg} text-slate-950 shadow-md`
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>Dünya Saatleri</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'code'
                  ? `${theme.accentBg} text-slate-950 shadow-md`
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Kod İncele</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <main className="w-full max-w-5xl mx-auto px-4 flex-grow flex flex-col justify-center">
          {activeTab === 'clock' && (
            <div className="w-full flex flex-col items-center gap-8 py-2 animate-fadeIn">
              {clockStyle === 'digital' && (
                <DigitalClock
                  date={currentDate}
                  theme={theme}
                  is24Hour={is24Hour}
                  showMilliseconds={showMilliseconds}
                />
              )}

              {clockStyle === 'analog' && (
                <AnalogClock
                  date={currentDate}
                  theme={theme}
                />
              )}

              {clockStyle === 'hybrid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-4xl">
                  <div className="flex justify-center">
                    <AnalogClock
                      date={currentDate}
                      theme={theme}
                    />
                  </div>
                  <div className="flex justify-center">
                    <DigitalClock
                      date={currentDate}
                      theme={theme}
                      is24Hour={is24Hour}
                      showMilliseconds={showMilliseconds}
                    />
                  </div>
                </div>
              )}

              {/* Developer Quote of the Day */}
              <DeveloperQuotes theme={theme} />
            </div>
          )}

          {activeTab === 'stopwatch' && (
            <div className="py-4 animate-fadeIn">
              <Stopwatch theme={theme} soundEnabled={soundEnabled} />
            </div>
          )}

          {activeTab === 'countdown' && (
            <div className="py-4 animate-fadeIn">
              <Countdown theme={theme} soundEnabled={soundEnabled} />
            </div>
          )}

          {activeTab === 'world' && (
            <div className="py-4 animate-fadeIn">
              <WorldClocks date={currentDate} theme={theme} is24Hour={is24Hour} />
            </div>
          )}

          {activeTab === 'code' && (
            <div className="py-4 animate-fadeIn">
              <CodeInspector theme={theme} userName={userName} />
            </div>
          )}
        </main>
      </div>

      {/* Footer with Enes Öztürk Signature and Credits */}
      <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-xl py-6 px-4 mt-8 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>
              Kodluyoruz &bull; JavaScript Bölüm Sonu Ödevi 1 &bull;{' '}
              <button
                onClick={() => setIsSignatureModalOpen(true)}
                className="font-bold text-orange-400 hover:text-orange-300 transition-colors underline cursor-pointer"
              >
                Enes Öztürk İmzalı
              </button>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              title="Ödev Bağlantısını Kopyala"
            >
              {shareCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Paylaş</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsSignatureModalOpen(true)}
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer font-medium"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Ödev Künyesi</span>
            </button>

            <span className="text-slate-600">|</span>

            <span className="flex items-center gap-1">
              <span>El emeği ile kodlandı</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </span>
          </div>
        </div>
      </footer>

      {/* Name Input / Edit Modal */}
      <NameModal
        isOpen={isNameModalOpen}
        currentName={userName}
        theme={theme}
        onSave={handleSaveName}
        onClose={() => setIsNameModalOpen(false)}
      />

      {/* Enes Öztürk Signature & Homework Matrix Modal */}
      <SignatureModal
        isOpen={isSignatureModalOpen}
        theme={theme}
        onClose={() => setIsSignatureModalOpen(false)}
      />
    </div>
  );
}
