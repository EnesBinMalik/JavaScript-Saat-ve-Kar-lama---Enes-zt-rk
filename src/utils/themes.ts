import { ThemeConfig, ThemeId } from '../types';

export const THEMES: Record<ThemeId, ThemeConfig> = {
  kodluyoruz: {
    id: 'kodluyoruz',
    name: 'Kodluyoruz Klasiği',
    emoji: '🧡',
    bgGradient: 'from-[#0b0d13] via-[#111622] to-[#07090e]',
    cardBg: 'bg-black/40 backdrop-blur-xl',
    cardBorder: 'border-orange-500/30 hover:border-orange-500/60',
    accentColor: 'text-orange-400',
    accentBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
    textColor: 'text-orange-50',
    glowColor: 'shadow-[0_0_50px_-10px_rgba(249,115,22,0.35)]',
    clockDigitColor: 'text-orange-400 drop-shadow-[0_0_25px_rgba(249,115,22,0.6)]'
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Gece',
    emoji: '🌌',
    bgGradient: 'from-[#080214] via-[#13072b] to-[#06010d]',
    cardBg: 'bg-purple-950/30 backdrop-blur-xl',
    cardBorder: 'border-cyan-500/30 hover:border-cyan-400/60',
    accentColor: 'text-cyan-400',
    accentBg: 'bg-gradient-to-r from-cyan-500 to-fuchsia-500',
    textColor: 'text-purple-50',
    glowColor: 'shadow-[0_0_50px_-10px_rgba(6,182,212,0.35)]',
    clockDigitColor: 'text-cyan-300 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]'
  },
  emerald: {
    id: 'emerald',
    name: 'Zümrüt Doğa',
    emoji: '🌿',
    bgGradient: 'from-[#02130e] via-[#052219] to-[#010c09]',
    cardBg: 'bg-emerald-950/30 backdrop-blur-xl',
    cardBorder: 'border-emerald-500/30 hover:border-emerald-400/60',
    accentColor: 'text-emerald-400',
    accentBg: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    textColor: 'text-emerald-50',
    glowColor: 'shadow-[0_0_50px_-10px_rgba(16,185,129,0.35)]',
    clockDigitColor: 'text-emerald-300 drop-shadow-[0_0_25px_rgba(16,185,129,0.6)]'
  },
  amber: {
    id: 'amber',
    name: 'Sıcak Kehribar',
    emoji: '☕',
    bgGradient: 'from-[#140c04] via-[#21150a] to-[#0c0702]',
    cardBg: 'bg-amber-950/30 backdrop-blur-xl',
    cardBorder: 'border-amber-500/30 hover:border-amber-400/60',
    accentColor: 'text-amber-400',
    accentBg: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    textColor: 'text-amber-50',
    glowColor: 'shadow-[0_0_50px_-10px_rgba(245,158,11,0.35)]',
    clockDigitColor: 'text-amber-300 drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]'
  },
  sunset: {
    id: 'sunset',
    name: 'Kızıl Gün Batımı',
    emoji: '🌅',
    bgGradient: 'from-[#1a0715] via-[#2d0e21] to-[#0e030b]',
    cardBg: 'bg-rose-950/30 backdrop-blur-xl',
    cardBorder: 'border-rose-500/30 hover:border-rose-400/60',
    accentColor: 'text-rose-400',
    accentBg: 'bg-gradient-to-r from-rose-500 to-orange-400',
    textColor: 'text-rose-50',
    glowColor: 'shadow-[0_0_50px_-10px_rgba(244,63,94,0.35)]',
    clockDigitColor: 'text-rose-300 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)]'
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix Terminal',
    emoji: '💻',
    bgGradient: 'from-[#020902] via-[#051705] to-[#010501]',
    cardBg: 'bg-black/60 backdrop-blur-xl scanlines',
    cardBorder: 'border-green-500/40 hover:border-green-400/70',
    accentColor: 'text-green-400',
    accentBg: 'bg-gradient-to-r from-green-500 to-emerald-400',
    textColor: 'text-green-50',
    glowColor: 'shadow-[0_0_50px_-10px_rgba(34,197,94,0.4)]',
    clockDigitColor: 'text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.7)]'
  }
};
