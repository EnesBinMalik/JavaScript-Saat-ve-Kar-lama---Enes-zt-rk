import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag, Timer } from 'lucide-react';
import { ThemeConfig } from '../types';
import { padZero } from '../utils/dateUtils';

interface StopwatchProps {
  theme: ThemeConfig;
  soundEnabled: boolean;
}

interface Lap {
  id: number;
  timeMs: number;
  lapTimeMs: number;
}

export const Stopwatch: React.FC<StopwatchProps> = ({ theme }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeMs, setTimeMs] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      const update = () => {
        const now = performance.now();
        const currentElapsed = accumulatedTimeRef.current + (now - startTimeRef.current);
        setTimeMs(currentElapsed);
        requestRef.current = requestAnimationFrame(update);
      };
      requestRef.current = requestAnimationFrame(update);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      accumulatedTimeRef.current = timeMs;
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeMs(0);
    accumulatedTimeRef.current = 0;
    setLaps([]);
  };

  const handleLap = () => {
    if (!isRunning) return;
    const lastLapTotal = laps.length > 0 ? laps[0].timeMs : 0;
    const newLap: Lap = {
      id: laps.length + 1,
      timeMs,
      lapTimeMs: timeMs - lastLapTotal
    };
    setLaps([newLap, ...laps]);
  };

  // Format time
  const totalSeconds = Math.floor(timeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((timeMs % 1000) / 10);

  const formatLapTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    const cs = Math.floor((ms % 1000) / 10);
    return `${padZero(m)}:${padZero(sec)}.${padZero(cs)}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <Timer className="w-4 h-4 text-orange-400" />
        <span>Hassas Kronometre (Stopwatch)</span>
      </div>

      {/* Digits Display */}
      <div className="font-mono-code font-extrabold text-5xl sm:text-6xl text-white tracking-tight my-4">
        <span>{padZero(minutes)}</span>
        <span className={theme.accentColor}>:</span>
        <span>{padZero(seconds)}</span>
        <span className="text-3xl sm:text-4xl text-slate-400">.{padZero(centiseconds)}</span>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 my-4">
        <button
          onClick={handleStartPause}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-slate-950 transition-all shadow-lg text-sm cursor-pointer ${
            isRunning ? 'bg-amber-400 hover:bg-amber-300' : `${theme.accentBg} hover:opacity-95`
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-slate-950" />
              <span>Durdur</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{timeMs > 0 ? 'Devam Et' : 'Başlat'}</span>
            </>
          )}
        </button>

        <button
          onClick={handleLap}
          disabled={!isRunning}
          className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-all"
        >
          <Flag className="w-4 h-4 text-orange-400" />
          <span>Tur (Lap)</span>
        </button>

        <button
          onClick={handleReset}
          disabled={timeMs === 0 && laps.length === 0}
          className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 hover:text-white text-sm font-medium transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* Laps List */}
      {laps.length > 0 && (
        <div className="w-full mt-4 pt-4 border-t border-white/10 max-h-48 overflow-y-auto space-y-2 pr-1">
          <div className="flex justify-between text-xs font-semibold text-slate-400 px-3 uppercase tracking-wider">
            <span>Tur #</span>
            <span>Tur Süresi</span>
            <span>Toplam Süre</span>
          </div>
          {laps.map((lap) => (
            <div
              key={lap.id}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-mono"
            >
              <span className="font-semibold text-orange-400">Tur {lap.id}</span>
              <span className="text-white font-medium">+{formatLapTime(lap.lapTimeMs)}</span>
              <span className="text-slate-400">{formatLapTime(lap.timeMs)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
