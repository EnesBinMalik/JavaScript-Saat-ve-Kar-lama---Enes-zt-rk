import React, { useState } from 'react';
import { Quote as QuoteIcon, RefreshCw, Copy, Check } from 'lucide-react';
import { ThemeConfig } from '../types';
import { DEVELOPER_QUOTES } from '../utils/dateUtils';

interface DeveloperQuotesProps {
  theme: ThemeConfig;
}

export const DeveloperQuotes: React.FC<DeveloperQuotesProps> = ({ theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const quote = DEVELOPER_QUOTES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DEVELOPER_QUOTES.length);
  };

  const handleCopy = () => {
    const text = `"${quote.quote}" — ${quote.author} (${quote.role})`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 p-5 backdrop-blur-md shadow-lg flex flex-col justify-between">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <QuoteIcon className="w-4 h-4 text-orange-400" />
            <span>Günün Yazılımcı İlhamı</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Sözü Kopyala"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Sonraki Söz"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <blockquote className="text-sm sm:text-base text-slate-200 italic font-medium leading-relaxed my-1">
          &ldquo;{quote.quote}&rdquo;
        </blockquote>

        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="font-bold text-white">{quote.author}</span>
          <span className="text-slate-400">{quote.role}</span>
        </div>
      </div>
    </div>
  );
};
