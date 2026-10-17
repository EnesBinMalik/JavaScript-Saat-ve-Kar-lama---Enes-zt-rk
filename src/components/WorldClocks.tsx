import React from 'react';
import { Globe2, Sun, Moon } from 'lucide-react';
import { ThemeConfig } from '../types';
import { WORLD_CITIES, TURKISH_DAYS } from '../utils/dateUtils';

interface WorldClocksProps {
  date: Date;
  theme: ThemeConfig;
  is24Hour: boolean;
}

export const WorldClocks: React.FC<WorldClocksProps> = ({ date, theme, is24Hour }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-orange-400" />
          <h3 className="text-base font-bold text-white font-display">
            Dünya Saatleri & Küresel Zaman Dilimleri
          </h3>
        </div>
        <span className="text-xs text-slate-400">Canlı Senkronize</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {WORLD_CITIES.map((city) => {
          let cityTimeString = '';
          let cityDayString = '';
          let cityHour = 12;

          try {
            const timeFormatter = new Intl.DateTimeFormat('tr-TR', {
              timeZone: city.timeZone,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: !is24Hour
            });
            cityTimeString = timeFormatter.format(date);

            const dayFormatter = new Intl.DateTimeFormat('tr-TR', {
              timeZone: city.timeZone,
              weekday: 'long'
            });
            cityDayString = dayFormatter.format(date);

            const hourFormatter = new Intl.DateTimeFormat('en-US', {
              timeZone: city.timeZone,
              hour: 'numeric',
              hour12: false
            });
            cityHour = parseInt(hourFormatter.format(date), 10) || 12;
          } catch {
            cityTimeString = '--:--:--';
          }

          const isDay = cityHour >= 6 && cityHour < 19;

          return (
            <div
              key={city.id}
              className={`p-4 rounded-2xl border transition-all duration-200 ${
                city.id === 'istanbul'
                  ? `bg-orange-500/10 border-orange-500/40 shadow-lg ${theme.glowColor}`
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl" role="img" aria-label={city.name}>
                    {city.flag}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">{city.name}</h4>
                    <p className="text-[10px] text-slate-400">{city.country}</p>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-white/5 text-slate-300" title={isDay ? 'Gündüz' : 'Gece'}>
                  {isDay ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-300" />}
                </div>
              </div>

              {/* Time digits */}
              <div className="mt-3 flex items-baseline justify-between font-mono-code">
                <span className="text-2xl font-black text-white tracking-tight">
                  {cityTimeString}
                </span>
                <span className="text-[11px] font-sans font-medium text-slate-400">
                  {cityDayString}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
