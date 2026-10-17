import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Palette, 
  Edit3, 
  Clock, 
  Maximize2, 
  Minimize2, 
  Award,
  Zap,
  Sparkles
} from 'lucide-react';
import { ThemeConfig, ThemeId, ClockStyle } from '../types';
import { THEMES } from '../utils/themes';

interface HeaderProps {
  userName: string;
  theme: ThemeConfig;
  soundEnabled: boolean;
  is24Hour: boolean;
  showMilliseconds: boolean;
  clockStyle: ClockStyle;
  onThemeChange: (themeId: ThemeId) => void;
  onToggleSound: () => void;
  onToggle24Hour: () => void;
  onToggleMilliseconds: () => void;
  onChangeClockStyle: (style: ClockStyle) => void;
  onOpenNameModal: () => void;
  onOpenSignatureModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  theme,
  soundEnabled,
  is24Hour,
  showMilliseconds,
  clockStyle,
  onThemeChange,
  onToggleSound,
  onToggle24Hour,
  onToggleMilliseconds,
  onChangeClockStyle,
  onOpenNameModal,
  onOpenSignatureModal
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="w-full pt-4 pb-2 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 relative z-40">
      {/* Brand & Signature Area */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-3">
          {/* Kodluyoruz Stylized Emblem */}
          <div className="relative group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-rose-600 p-[2px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-orange-400 font-mono-code text-base tracking-tighter">
                &lt;K/&gt;
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-base sm:text-lg font-display">
                kodluyoruz
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 font-mono-code">
                JS #1
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Frontend Patikası • Saat & Karşılama
            </p>
          </div>
        </div>

        {/* Enes Öztürk Signature Tag */}
        <button
          onClick={onOpenSignatureModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/20 text-amber-300 hover:text-amber-100 hover:border-amber-400 transition-all text-xs font-semibold shadow-md shadow-amber-500/10 group cursor-pointer"
          title="Ödev Künyesi ve Enes Öztürk İmzası"
        >
          <Award className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="tracking-wide">Enes Öztürk</span>
          <span className="hidden sm:inline text-[10px] opacity-75 font-normal">• El Emeği</span>
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
        </button>
      </div>

      {/* Control Actions & User Badge */}
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 w-full md:w-auto">
        {/* User Badge with quick edit */}
        <button
          onClick={onOpenNameModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-orange-500/60 text-slate-200 hover:text-white transition-all text-xs group shadow-sm"
          title="İsmi Güncelle"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-400">İsim:</span>
          <span className="font-bold text-white max-w-[120px] truncate">{userName}</span>
          <Edit3 className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-400 transition-colors" />
        </button>

        {/* Clock View Switcher (Digital / Analog / Hybrid) */}
        <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-0.5 text-xs font-medium text-slate-400">
          <button
            onClick={() => onChangeClockStyle('digital')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              clockStyle === 'digital'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'hover:text-slate-200'
            }`}
            title="Dijital Saat"
          >
            Dijital
          </button>
          <button
            onClick={() => onChangeClockStyle('analog')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              clockStyle === 'analog'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'hover:text-slate-200'
            }`}
            title="Analog Saat"
          >
            Analog
          </button>
          <button
            onClick={() => onChangeClockStyle('hybrid')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              clockStyle === 'hybrid'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'hover:text-slate-200'
            }`}
            title="Hibrit Görünüm (İkisi bir arada)"
          >
            Hibrit
          </button>
        </div>

        {/* 24h / 12h toggle */}
        <button
          onClick={onToggle24Hour}
          className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-mono font-medium"
          title={is24Hour ? '24 Saat Biçimi Aktif' : '12 Saat (AM/PM) Biçimi Aktif'}
        >
          {is24Hour ? '24 Saat' : '12 Saat'}
        </button>

        {/* Milliseconds toggle */}
        <button
          onClick={onToggleMilliseconds}
          className={`px-2.5 py-1.5 rounded-xl border transition-all text-xs font-mono font-medium ${
            showMilliseconds
              ? 'bg-orange-500/15 border-orange-500/50 text-orange-300'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
          title="Milisaniye Göstergesini Aç/Kapat"
        >
          .ms
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-xl border transition-all text-xs ${
            soundEnabled
              ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
          title={soundEnabled ? 'Tik-Tak Sesi Açık' : 'Tik-Tak Sesi Kapalı'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Theme Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition-all text-xs font-medium"
            title="Görsel Tema Seç"
          >
            <Palette className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">{theme.name}</span>
            <span>{theme.emoji}</span>
          </button>

          {showThemeMenu && (
            <div 
              className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-2xl p-2 z-50 backdrop-blur-xl animate-fadeIn"
              onMouseLeave={() => setShowThemeMenu(false)}
            >
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1 border-b border-white/5">
                Renk Temaları
              </div>
              <div className="space-y-1">
                {(Object.keys(THEMES) as ThemeId[]).map((id) => {
                  const t = THEMES[id];
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        onThemeChange(id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        theme.id === id
                          ? 'bg-orange-500/20 text-orange-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{t.emoji}</span>
                        <span>{t.name}</span>
                      </span>
                      {theme.id === id && <Zap className="w-3 h-3 text-orange-400 fill-orange-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all text-xs"
          title={isFullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekran Modu'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
