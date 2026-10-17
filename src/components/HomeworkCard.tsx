import React from 'react';
import { Sparkles, Heart, Code2, CheckCircle2 } from 'lucide-react';
import { ThemeConfig } from '../types';
import { getTimeGreeting, formatTurkishDate } from '../utils/dateUtils';

interface HomeworkCardProps {
  userName: string;
  date: Date;
  theme: ThemeConfig;
  onOpenNameModal: () => void;
  onOpenSignatureModal: () => void;
}

export const HomeworkCard: React.FC<HomeworkCardProps> = ({
  userName,
  date,
  theme,
  onOpenNameModal,
  onOpenSignatureModal
}) => {
  const currentHour = date.getHours();
  const timeGreeting = getTimeGreeting(currentHour);
  const formattedDate = formatTurkishDate(date);

  return (
    <div className="w-full max-w-3xl mx-auto my-6 px-4">
      <div
        className={`relative overflow-hidden rounded-3xl border ${theme.cardBorder} ${theme.cardBg} ${theme.glowColor} p-6 sm:p-8 text-center transition-all duration-300 shadow-2xl`}
      >
        {/* Decorative corner glows */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 ${theme.accentBg} opacity-15 blur-3xl pointer-events-none`} />

        {/* Dynamic greeting chip with icon */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-slate-200 mb-4 shadow-sm backdrop-blur-md">
          <span className="text-base">{timeGreeting.icon}</span>
          <span>{timeGreeting.greeting} • {timeGreeting.message}</span>
        </div>

        {/* Primary Welcome Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-3">
          Merhaba,{' '}
          <button
            onClick={onOpenNameModal}
            className={`inline-block underline decoration-wavy decoration-orange-400 hover:scale-105 transition-transform duration-200 cursor-pointer ${theme.accentColor}`}
            title="İsminizi değiştirmek için tıklayın"
          >
            {userName}
          </button>
          ! Hoş geldin!
        </h1>

        {/* The Famous Assignment Statement */}
        <div className="max-w-2xl mx-auto my-4 p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 text-slate-200 text-sm sm:text-base leading-relaxed">
          <p>
            <span className={`font-bold ${theme.accentColor} font-mono-code`}>
              {formattedDate}
            </span>{' '}
            tarihinde{' '}
            <span className="font-semibold text-orange-400">Kodluyoruz</span>{' '}
            Frontend Web Development Patika&apos;sının{' '}
            <span className="font-bold underline text-white">Javascript bölümü 1. Ödevindesiniz.</span>
          </p>
        </div>

        {/* Artisanal Enes Öztürk Signature Tagline */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
          <button
            onClick={onOpenSignatureModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 hover:text-orange-200 hover:bg-orange-500/20 transition-all font-medium cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Geliştirici: <strong className="text-white">Enes Öztürk</strong></span>
          </button>

          <span className="hidden sm:inline text-slate-600">•</span>

          <span className="flex items-center gap-1.5 text-slate-300">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>El emeği, göz nuru & modern dokunuşlar ile yapıldı</span>
          </span>

          <span className="hidden sm:inline text-slate-600">•</span>

          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Tam Uyumlu & Eksiksiz</span>
          </span>
        </div>
      </div>
    </div>
  );
};
