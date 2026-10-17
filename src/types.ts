export type ThemeId = 'kodluyoruz' | 'cyberpunk' | 'emerald' | 'amber' | 'sunset' | 'matrix';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  emoji: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  accentColor: string;
  accentBg: string;
  textColor: string;
  glowColor: string;
  clockDigitColor: string;
}

export type ClockStyle = 'digital' | 'analog' | 'hybrid';

export type ActiveTab = 'clock' | 'stopwatch' | 'countdown' | 'world' | 'code';

export interface WorldClockCity {
  id: string;
  name: string;
  country: string;
  timeZone: string;
  flag: string;
}

export interface Quote {
  quote: string;
  author: string;
  role: string;
}
