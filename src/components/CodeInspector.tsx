import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, Play, Sparkles } from 'lucide-react';
import { ThemeConfig } from '../types';

interface CodeInspectorProps {
  theme: ThemeConfig;
  userName: string;
}

const VANILLA_JS_CODE = `// ----------------------------------------------------
// Kodluyoruz & Patika - JavaScript Bölüm Sonu Ödevi #1
// Geliştirici: Enes Öztürk
// ----------------------------------------------------

// 1. Kullanıcıdan prompt ile isim alınması
let myName = prompt("Lütfen adınızı giriniz:");
let nameDOM = document.querySelector("#myName");

if (myName) {
  nameDOM.innerHTML = myName;
} else {
  nameDOM.innerHTML = "Misafir Geliştirici";
}

// 2. Anlık saati ve Türkçe günü gösteren fonksiyon
function showTime() {
  const date = new Date();
  
  // Saat, dakika, saniye formatlama
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  
  // Tek haneli sayıların başına 0 ekleme (01, 02... 09)
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  
  // Türkçe gün isimleri dizisi
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi"
  ];
  let dayName = days[date.getDay()];
  
  // Ekrana saat ve günün yazdırılması
  let clockDOM = document.querySelector("#myClock");
  clockDOM.innerHTML = \`\${h}:\${m}:\${s} \${dayName}\`;
}

// 3. Her 1 saniyede (1000ms) bir saatin güncellenmesi
setInterval(showTime, 1000);
showTime();`;

const REACT_TS_SNIPPET = `// Modern React + TypeScript Reaktif Yaklaşım
import React, { useState, useEffect } from 'react';

export const LiveClock = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    // 1000ms aralıkla state tetikleme
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {date.toLocaleTimeString('tr-TR')} {TURKISH_DAYS[date.getDay()]}
    </div>
  );
};`;

export const CodeInspector: React.FC<CodeInspectorProps> = ({ theme, userName }) => {
  const [activeTab, setActiveTab] = useState<'vanilla' | 'react'>('vanilla');
  const [copied, setCopied] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);

  const handleCopy = () => {
    const textToCopy = activeTab === 'vanilla' ? VANILLA_JS_CODE : REACT_TS_SNIPPET;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRunTest = () => {
    const d = new Date();
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    const s = d.getSeconds().toString().padStart(2, '0');
    const res = `[Vanilla JS Test Başarılı]: Merhaba ${userName || 'Enes Öztürk'}! Çıktı: ${h}:${m}:${s} ${days[d.getDay()]}`;
    setTestOutput(res);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-orange-400" />
          <div>
            <h3 className="text-base font-bold text-white font-display">
              Ödev Kaynak Kodu & Mimari İnceleme
            </h3>
            <p className="text-xs text-slate-400">
              Kodluyoruz kriterlerine tam uyumlu temiz Vanilla JS ve Modern React kodu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab switcher */}
          <div className="flex bg-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setActiveTab('vanilla')}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                activeTab === 'vanilla' ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Vanilla JS (Ödev 1)
            </button>
            <button
              onClick={() => setActiveTab('react')}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                activeTab === 'react' ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              React & TS
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
            title="Kodu Kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="relative rounded-2xl bg-black/70 border border-slate-800 p-4 font-mono-code text-xs text-slate-300 overflow-x-auto max-h-96 leading-relaxed">
        <pre>{activeTab === 'vanilla' ? VANILLA_JS_CODE : REACT_TS_SNIPPET}</pre>
      </div>

      {/* Interactive test trigger */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Bu kod parçasını tarayıcı motorunda test edebilirsiniz.</span>
        </div>

        <button
          onClick={handleRunTest}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 ${theme.accentBg} hover:opacity-90 transition-all shadow-md`}
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>Mantığı Canlı Test Et</span>
        </button>
      </div>

      {testOutput && (
        <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono animate-fadeIn">
          {testOutput}
        </div>
      )}
    </div>
  );
};
