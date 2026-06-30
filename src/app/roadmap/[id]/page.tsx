"use client";

import { use, useState } from "react";
import Link from "next/link";
import { mockOpportunities } from "@/data/mock";
import { formatKRW } from "@/lib/utils";

export default function Roadmap({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const opp = mockOpportunities.find((o) => o.id === id) ?? mockOpportunities[0];
  const [activeStep, setActiveStep] = useState(0);
  const step = opp.steps[activeStep];

  return (
    <main className="min-h-screen gradient-bg pb-24">
      <nav className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 glass border-b border-black/5">
        <Link href={`/opportunity/${opp.id}`} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors text-sm">
          ←
        </Link>
        <div>
          <p className="text-gray-900 font-semibold text-sm">{opp.title} 로드맵</p>
          <p className="text-gray-400 text-xs">{opp.steps.length}단계 실행 계획</p>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Overview */}
        <div className="glass-strong rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs mb-1">달성 시 절감</p>
            <p className="text-2xl font-bold text-emerald-600">+{formatKRW(opp.savingsPerYear)}<span className="text-sm text-gray-400 ml-1">/년</span></p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-1">예상 기간</p>
            <p className="text-2xl font-bold text-gray-900">{opp.estimatedMonths}<span className="text-sm text-gray-400 ml-1">개월</span></p>
          </div>
        </div>

        {/* Step tabs */}
        <div className="flex gap-2">
          {opp.steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(i)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                i === activeStep
                  ? `bg-gradient-to-r ${opp.color} text-white`
                  : "bg-white text-gray-400 border border-gray-200 hover:text-gray-700"
              }`}
            >
              {i + 1}단계
            </button>
          ))}
        </div>

        {/* Active step */}
        <div className="glass-strong rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${opp.color} flex items-center justify-center text-white font-bold shadow-md`}>
              {activeStep + 1}
            </div>
            <div>
              <h2 className="text-gray-900 font-semibold">{step.title}</h2>
              <p className="text-gray-400 text-xs">{step.description}</p>
            </div>
          </div>

          {step.current !== undefined && step.target !== undefined && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-xs">현재</span>
                <span className="text-gray-400 text-xs">목표</span>
              </div>
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full bg-gradient-to-r ${opp.color} rounded-full`}
                  style={{ width: "55%" }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-bold text-xl">{step.current}{step.unit}</span>
                <span className="text-emerald-600 font-bold text-xl">{step.target}{step.unit}</span>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
            <p className="text-gray-400 text-xs mb-1">실행 방법</p>
            <p className="text-gray-700 text-sm font-medium">{step.action}</p>
          </div>

          {step.months > 0 && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              예상 기간: {step.months}개월
            </div>
          )}

          {step.status === "done" && (
            <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm">
              <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">✓</span>
              완료된 단계입니다
            </div>
          )}
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-3">전체 타임라인</h3>
          <div className="glass-strong rounded-2xl p-5">
            <div className="relative">
              <div className="absolute left-3.5 top-4 bottom-4 w-px bg-gray-100" />
              <div className="space-y-5">
                {opp.steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(i)}
                    className={`flex gap-4 w-full text-left transition-opacity ${i === activeStep ? "" : "opacity-50 hover:opacity-75"}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 relative z-10 ${
                      s.status === "done" ? "bg-emerald-500 text-white" :
                      i === activeStep ? `bg-gradient-to-br ${opp.color} text-white` :
                      "bg-gray-100 text-gray-400"
                    }`}>
                      {s.status === "done" ? "✓" : i + 1}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${i === activeStep ? "text-gray-900" : "text-gray-600"}`}>{s.title}</p>
                      <p className="text-gray-400 text-xs">{s.description}</p>
                      {s.months > 0 && <p className="text-gray-300 text-xs mt-0.5">+{s.months}개월</p>}
                    </div>
                  </button>
                ))}
                <div className="flex gap-4">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${opp.color} opacity-40 flex items-center justify-center flex-shrink-0 relative z-10 text-white text-xs`}>🎯</div>
                  <div>
                    <p className="text-emerald-600 text-sm font-medium">{opp.targetRate}% 달성</p>
                    <p className="text-gray-400 text-xs">연간 {formatKRW(opp.savingsPerYear)} 절감</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex gap-3">
          {activeStep > 0 && (
            <button onClick={() => setActiveStep(activeStep - 1)} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors">
              ← 이전 단계
            </button>
          )}
          {activeStep < opp.steps.length - 1 ? (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${opp.color} text-white font-semibold shadow-md`}
            >
              다음 단계 →
            </button>
          ) : (
            <Link href="/dashboard" className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${opp.color} text-white font-semibold text-center shadow-md`}>
              대시보드로 돌아가기
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
