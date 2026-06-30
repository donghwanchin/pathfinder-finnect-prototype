"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const stages = [
  { label: "마이데이터 연동 중", percent: 15 },
  { label: "신용 정보 분석 중", percent: 32 },
  { label: "정책자금 적합성 계산 중", percent: 55 },
  { label: "금리 역산 로드맵 생성 중", percent: 78 },
  { label: "최적 절감 경로 확정 중", percent: 92 },
  { label: "분석 완료", percent: 100 },
];

export default function Loading() {
  const router = useRouter();
  const [stageIdx, setStageIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIdx((prev) => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setTimeout(() => router.push("/dashboard"), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const target = stages[stageIdx].percent;
    const t = setInterval(() => {
      setProgress((p) => {
        if (Math.abs(p - target) < 1) { clearInterval(t); return target; }
        return p + (target - p) / 20;
      });
    }, 20);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIdx]);

  return (
    <main className="min-h-screen gradient-bg flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-500/8 rounded-full blur-[120px]" />
      <div className="relative z-10 text-center max-w-sm w-full">
        <div className="relative w-28 h-28 mx-auto mb-10">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#e5e7eb" strokeWidth="6" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="url(#grad)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{Math.round(progress)}%</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI 분석 중입니다</h1>
        <p className="text-gray-500 text-sm mb-10">잠시만 기다려 주세요</p>
        <div className="glass-strong rounded-2xl p-5 text-left space-y-3">
          {stages.map((s, i) => (
            <div key={s.label} className={`flex items-center gap-3 transition-all duration-300 ${i > stageIdx ? "opacity-30" : ""}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                i < stageIdx ? "bg-emerald-500" :
                i === stageIdx ? "bg-gradient-to-br from-violet-600 to-blue-600 animate-pulse" :
                "bg-gray-200"
              }`}>
                {i < stageIdx && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${i === stageIdx ? "text-gray-900 font-medium" : i < stageIdx ? "text-gray-500" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
