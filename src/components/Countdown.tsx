import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, Hourglass, Bell, CheckCircle } from 'lucide-react';
import { ThemeConfig } from '../types';
import { padZero } from '../utils/dateUtils';
import { playChimeSound } from '../utils/audio';

interface CountdownProps {
  theme: ThemeConfig;
  soundEnabled: boolean;
}

const PRESETS = [
  { label: 'Pomodoro', minutes: 25, emoji: '🍅' },
  { label: 'Kısa Mola', minutes: 5, emoji: '☕' },
  { label: 'Uzun Mola', minutes: 15, emoji: '🌿' },
  { label: 'Derin Odak', minutes: 50, emoji: '⚡' }
];

export const Countdown: React.FC<CountdownProps> = ({ theme, soundEnabled }) => {
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [customInputMin, setCustomInputMin] = useState('25');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            playChimeSound(soundEnabled);
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 }
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, remainingSeconds, soundEnabled]);

  const handleSelectPreset = (minutes: number) => {
    const total = minutes * 60;
    setInitialSeconds(total);
    setRemainingSeconds(total);
    setIsRunning(false);
    setIsFinished(false);
    setCustomInputMin(minutes.toString());
  };

  const handleCustomApply = (e: React.FormEvent) => {
    e.preventDefault();
    const min = Math.max(1, Math.min(180, parseInt(customInputMin) || 1));
    const total = min * 60;
    setInitialSeconds(total);
    setRemainingSeconds(total);
    setIsRunning(false);
    setIsFinished(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(initialSeconds);
    setIsFinished(false);
  };

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const progress = initialSeconds > 0 ? ((initialSeconds - remainingSeconds) / initialSeconds) * 100 : 0;

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <Hourglass className="w-4 h-4 text-orange-400" />
        <span>Geri Sayım & Pomodoro Sayacı</span>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => handleSelectPreset(p.minutes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              initialSeconds === p.minutes * 60 && !isFinished
                ? 'bg-orange-500/20 border-orange-500/50 text-orange-300 font-bold'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>{p.emoji}</span>
            <span>{p.label}</span>
            <span className="text-[10px] opacity-75">({p.minutes}d)</span>
          </button>
        ))}
      </div>

      {/* Countdown Ring / Big Display */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="42%"
            className="stroke-slate-800"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r="42%"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray="264"
            strokeDashoffset={264 - (264 * progress) / 100}
            strokeLinecap="round"
            fill="transparent"
            className={`${theme.accentColor} transition-all duration-500`}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          {isFinished ? (
            <div className="flex flex-col items-center animate-bounce">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-1" />
              <span className="text-emerald-400 font-bold text-sm">Süre Doldu!</span>
              <span className="text-xs text-slate-400">Harika bir çalışma!</span>
            </div>
          ) : (
            <>
              <div className="font-mono-code font-black text-4xl sm:text-5xl text-white">
                {padZero(minutes)}:{padZero(seconds)}
              </div>
              <span className="text-[11px] text-slate-400 uppercase tracking-widest mt-1">
                Kalan Süre
              </span>
            </>
          )}
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            if (isFinished) handleReset();
            else setIsRunning(!isRunning);
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-slate-950 transition-all shadow-lg text-sm cursor-pointer ${
            isRunning ? 'bg-amber-400 hover:bg-amber-300' : `${theme.accentBg} hover:opacity-95`
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-slate-950" />
              <span>Duraklat</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isFinished ? 'Yeniden Başlat' : 'Geri Sayımı Başlat'}</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* Custom Duration Input Form */}
      <form onSubmit={handleCustomApply} className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">Özel Dakika:</span>
        <input
          type="number"
          min="1"
          max="180"
          value={customInputMin}
          onChange={(e) => setCustomInputMin(e.target.value)}
          className="w-16 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-center font-mono focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
        >
          Ayarla
        </button>
      </form>
    </div>
  );
};
