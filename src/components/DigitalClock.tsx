import React, { useState } from 'react';
import { Copy, Check, Compass, Radio } from 'lucide-react';
import { ThemeConfig } from '../types';
import { TURKISH_DAYS, padZero } from '../utils/dateUtils';

interface DigitalClockProps {
  date: Date;
  theme: ThemeConfig;
  is24Hour: boolean;
  showMilliseconds: boolean;
}

export const DigitalClock: React.FC<DigitalClockProps> = ({
  date,
  theme,
  is24Hour,
  showMilliseconds
}) => {
  const [copied, setCopied] = useState(false);

  let hours = date.getHours();
  const rawHours = hours;
  let ampm = '';
  if (!is24Hour) {
    ampm = hours >= 12 ? 'ÖS' : 'ÖÖ';
    hours = hours % 12 || 12;
  }

  const hoursStr = padZero(hours);
  const minutesStr = padZero(date.getMinutes());
  const secondsStr = padZero(date.getSeconds());
  const msStr = padZero(Math.floor(date.getMilliseconds() / 10));
  const dayName = TURKISH_DAYS[date.getDay()];

  // Calculate second progress 0 - 100%
  const secondProgress = ((date.getSeconds() + date.getMilliseconds() / 1000) / 60) * 100;

  const copyTime = () => {
    const formatted = `${hoursStr}:${minutesStr}:${secondsStr} ${ampm} ${dayName}`.trim();
    navigator.clipboard.writeText(formatted).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Turkish Day & Live Status Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-slate-300">
          <Radio className="w-3 h-3 text-red-500 animate-pulse" />
          CANLI ZAMAN
        </span>

        <span className={`px-4 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase border border-current shadow-lg ${theme.accentColor} bg-white/5`}>
          {dayName}
        </span>
      </div>

      {/* Main Big Monospace Digits Container */}
      <div className="relative group p-6 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center max-w-2xl w-full">
        {/* Subtle Ambient Glow */}
        <div className={`absolute -inset-1 rounded-3xl opacity-20 blur-xl ${theme.accentBg} pointer-events-none group-hover:opacity-30 transition-opacity`} />

        {/* Time Digits */}
        <div className="flex items-baseline justify-center font-mono-code font-bold tracking-tight select-none">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className={`text-5xl sm:text-7xl md:text-8xl ${theme.clockDigitColor} transition-all`}>
              {hoursStr}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1 font-sans">
              Saat
            </span>
          </div>

          {/* Separator */}
          <span className={`text-4xl sm:text-6xl md:text-7xl mx-1 sm:mx-3 ${theme.accentColor} animate-pulse-subtle`}>
            :
          </span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className={`text-5xl sm:text-7xl md:text-8xl ${theme.clockDigitColor} transition-all`}>
              {minutesStr}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1 font-sans">
              Dakika
            </span>
          </div>

          {/* Separator */}
          <span className={`text-4xl sm:text-6xl md:text-7xl mx-1 sm:mx-3 ${theme.accentColor} animate-pulse-subtle`}>
            :
          </span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className={`text-5xl sm:text-7xl md:text-8xl ${theme.clockDigitColor} transition-all`}>
              {secondsStr}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1 font-sans">
              Saniye
            </span>
          </div>

          {/* Milliseconds & AM/PM suffix */}
          {(showMilliseconds || !is24Hour) && (
            <div className="flex flex-col items-start ml-2 sm:ml-4 gap-1 self-center">
              {!is24Hour && (
                <span className={`text-xs sm:text-sm font-extrabold px-2 py-0.5 rounded-md bg-white/10 ${theme.accentColor}`}>
                  {ampm}
                </span>
              )}
              {showMilliseconds && (
                <span className="text-sm sm:text-xl font-mono text-slate-400 font-medium">
                  .{msStr}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 60-Second Progress Line Bar */}
        <div className="w-full mt-6 pt-4 border-t border-white/5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>0s</span>
            <span className="text-slate-300 font-medium">
              Saniye Akışı: {date.getSeconds()}. sn
            </span>
            <span>60s</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden p-[1px]">
            <div
              className={`h-full rounded-full ${theme.accentBg} transition-all duration-100 ease-linear shadow-sm`}
              style={{ width: `${secondProgress}%` }}
            />
          </div>
        </div>

        {/* Timezone label & Copy action button */}
        <div className="flex items-center justify-between w-full mt-4 pt-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-medium">TSİ (UTC+3) • Türkiye Saati</span>
          </div>

          <button
            onClick={copyTime}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-[11px] cursor-pointer"
            title="Saati Kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-400" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
