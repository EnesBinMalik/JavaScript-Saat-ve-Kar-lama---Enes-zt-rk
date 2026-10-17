import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, User, Check, X, Wand2 } from 'lucide-react';
import { ThemeConfig } from '../types';

interface NameModalProps {
  isOpen: boolean;
  currentName: string;
  theme: ThemeConfig;
  onSave: (name: string) => void;
  onClose: () => void;
}

const QUICK_NAMES = [
  'Enes Öztürk',
  'Kodluyoruz Gezgini',
  'Frontend Geliştirici',
  'JavaScript Ustası',
  'Piksel Sihirbazı'
];

export const NameModal: React.FC<NameModalProps> = ({
  isOpen,
  currentName,
  theme,
  onSave,
  onClose
}) => {
  const [inputName, setInputName] = useState(currentName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = inputName.trim() || 'Misafir Geliştirici';
    onSave(finalName);
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-md rounded-2xl border ${theme.cardBorder} ${theme.cardBg} ${theme.glowColor} p-6 shadow-2xl relative transition-all duration-300`}
      >
        {/* Close button */}
        {currentName && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header icon */}
        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-3 rounded-xl ${theme.accentBg} text-slate-950 shadow-lg`}>
            <Sparkles className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              Karşılama Ekranı
            </h3>
            <p className="text-xs text-slate-400">
              JavaScript Ödev 1 • İsim Tanımlama
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-5 leading-relaxed">
          Merhaba! Ödev yönergesine göre karşılama ekranında yer alacak isminizi belirleyiniz.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Adınız & Soyadınız:
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Örn: Enes Öztürk"
                maxLength={32}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/80 transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Quick preset suggestions */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1">
                <Wand2 className="w-3 h-3 text-amber-400" /> Hızlı Öneriler:
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_NAMES.map((name) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => setInputName(name)}
                  className={`text-xs px-2.5 py-1 rounded-lg border border-slate-700/70 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white transition-colors`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            {currentName && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800/60 text-sm font-medium transition-colors"
              >
                Vazgeç
              </button>
            )}
            <button
              type="submit"
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-slate-950 ${theme.accentBg} hover:opacity-90 transition-all text-sm shadow-lg`}
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Giriş Yap & Başla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
