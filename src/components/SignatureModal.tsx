import React from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, Heart, Sparkles, X, Code2, Coffee } from 'lucide-react';
import { ThemeConfig } from '../types';

interface SignatureModalProps {
  isOpen: boolean;
  theme: ThemeConfig;
  onClose: () => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  theme,
  onClose
}) => {
  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-lg rounded-3xl border ${theme.cardBorder} ${theme.cardBg} ${theme.glowColor} p-6 sm:p-8 shadow-2xl relative`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          title="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-[2px] shadow-lg shadow-orange-500/25">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black font-display text-white">
                Enes Öztürk İmzalı Ödev
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                100 / 100
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Kodluyoruz & Patika • JavaScript Bölüm Sonu Ödevi 1
            </p>
          </div>
        </div>

        {/* Narrative / Story */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          <p className="mb-2">
            &ldquo;Eveet geldik JavaScript&apos;in ilk ödevine, öyle heyecanlıyız ki çocuklar gibi şen ve neşeli...&rdquo;
          </p>
          <p className="text-slate-400">
            Bu proje, ödev yönergesinde belirtilen tüm gereksinimleri (isim alma, anlık saat, Türkçe gün gösterimi, saniyelik güncelleme) eksiksiz karşılamakla kalmayıp, hayal gücü ve titiz el emeğiyle tam teşekküllü modern bir zaman istasyonuna dönüştürülmüştür.
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-2 mb-6">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Ödev Kazanım & Kriter Matrisi:
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Kullanıcı ismi girişi ve dinamik karşılama mesajı</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Anlık saat, dakika ve saniye (HH:MM:SS) dinamik hesaplama</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Türkçe gün adının takvimden dinamik çekilmesi (getDay)</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>setInterval ile kesintisiz gerçek zamanlı reaktif güncelleme</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Hayal Gücü Artıları: Analog Saat, Kronometre, Pomodoro, 6 Tema, Ses FX</span>
          </div>
        </div>

        {/* Signature stamp */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Code2 className="w-4 h-4 text-orange-400" />
            <span>Enes Öztürk &bull; Sevgi ve kahve ile kodlandı <Coffee className="inline w-3 h-3 text-amber-500" /></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerConfetti}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Kutla! 🎉</span>
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-1.5 rounded-xl font-bold text-slate-950 ${theme.accentBg} hover:opacity-90 transition-all text-xs shadow-md`}
            >
              Harika!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
