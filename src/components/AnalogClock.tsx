import React from 'react';
import { ThemeConfig } from '../types';
import { TURKISH_DAYS } from '../utils/dateUtils';

interface AnalogClockProps {
  date: Date;
  theme: ThemeConfig;
}

export const AnalogClock: React.FC<AnalogClockProps> = ({ date, theme }) => {
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000;
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;

  const secondDeg = seconds * 6; // 360 / 60
  const minuteDeg = minutes * 6; // 360 / 60
  const hourDeg = hours * 30; // 360 / 12

  const dayNameShort = TURKISH_DAYS[date.getDay()].substring(0, 3).toUpperCase();
  const dayNumber = date.getDate();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-b from-slate-700/40 to-slate-900/60 shadow-2xl border border-white/10 flex items-center justify-center">
        {/* Outer Ring Ambient Glow */}
        <div className={`absolute inset-0 rounded-full ${theme.accentBg} opacity-15 blur-xl pointer-events-none`} />

        {/* Clock Face SVG */}
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full rounded-full bg-slate-950/80 shadow-inner select-none"
        >
          {/* Subtle Dial Gradient Background */}
          <radialGradient id="dialGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
          </radialGradient>
          <circle cx="150" cy="150" r="145" fill="url(#dialGrad)" stroke="#334155" strokeWidth="2" />

          {/* 60 Minute/Second ticks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const isHourTick = i % 5 === 0;
            const angle = i * 6 * (Math.PI / 180);
            const outerR = 138;
            const innerR = isHourTick ? 122 : 130;
            const x1 = 150 + outerR * Math.sin(angle);
            const y1 = 150 - outerR * Math.cos(angle);
            const x2 = 150 + innerR * Math.sin(angle);
            const y2 = 150 - innerR * Math.cos(angle);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHourTick ? '#f8fafc' : '#475569'}
                strokeWidth={isHourTick ? 2.5 : 1}
                strokeLinecap="round"
                opacity={isHourTick ? 0.9 : 0.5}
              />
            );
          })}

          {/* Hour Numbers (12, 3, 6, 9) */}
          <text x="150" y="48" fill="#f8fafc" textAnchor="middle" fontSize="18" fontWeight="bold" fontFamily="Outfit, sans-serif">12</text>
          <text x="254" y="156" fill="#f8fafc" textAnchor="middle" fontSize="18" fontWeight="bold" fontFamily="Outfit, sans-serif">3</text>
          <text x="150" y="264" fill="#f8fafc" textAnchor="middle" fontSize="18" fontWeight="bold" fontFamily="Outfit, sans-serif">6</text>
          <text x="46" y="156" fill="#f8fafc" textAnchor="middle" fontSize="18" fontWeight="bold" fontFamily="Outfit, sans-serif">9</text>

          {/* Brand Watermark inside dial */}
          <text x="150" y="105" fill="#f97316" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2">
            KODLUYORUZ
          </text>
          <text x="150" y="117" fill="#94a3b8" textAnchor="middle" fontSize="8" letterSpacing="1">
            ENES ÖZTÜRK
          </text>

          {/* Turkish Date Window */}
          <g transform="translate(185, 138)">
            <rect x="0" y="0" width="36" height="24" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            <text x="18" y="11" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">
              {dayNameShort}
            </text>
            <text x="18" y="21" fill="#f8fafc" fontSize="10" fontWeight="extrabold" textAnchor="middle">
              {dayNumber}
            </text>
          </g>

          {/* Hour Hand */}
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="85"
            stroke="#f8fafc"
            strokeWidth="5"
            strokeLinecap="round"
            transform={`rotate(${hourDeg} 150 150)`}
          />

          {/* Minute Hand */}
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="55"
            stroke="#cbd5e1"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform={`rotate(${minuteDeg} 150 150)`}
          />

          {/* Second Hand (Accent Colored with counter-weight) */}
          <g transform={`rotate(${secondDeg} 150 150)`}>
            <line
              x1="150"
              y1="175"
              x2="150"
              y2="42"
              stroke="#f97316"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="150" cy="42" r="3.5" fill="#f97316" />
          </g>

          {/* Center Cap Pin */}
          <circle cx="150" cy="150" r="7" fill="#0f172a" stroke="#f97316" strokeWidth="2.5" />
          <circle cx="150" cy="150" r="3" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
};
