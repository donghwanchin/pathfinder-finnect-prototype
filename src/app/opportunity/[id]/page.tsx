"use client";

import { use } from "react";
import Link from "next/link";
import { mockOpportunities } from "@/data/mock";
import { formatKRW } from "@/lib/utils";

export default function OpportunityDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const opp = mockOpportunities.find((o) => o.id === id) ?? mockOpportunities[0];

  return (
    <main className="min-h-screen gradient-bg pb-24">
      <nav className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 glass border-b border-black/5">
        <Link href="/dashboard" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors text-sm">
          ←
        </Link>
        <span className="text-gray-900 font-semibold">{opp.title}</span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Hero */}
        <div className={`relative rounded-3xl p-7 overflow-hidden bg-gradient-to-br ${opp.color} shadow-lg`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[60px]" />
          <div className="relative z-10">
            <div className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white text-xs mb-4 font-medium">
              {opp.badge} · {opp.subtitle}
            </div>
            <p className="text-white/70 text-sm mb-1">연간 절감액</p>
            <p className="text-4xl font-bold text-white mb-6">+{formatKRW(opp.savingsPerYear)}</p>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-white/60 text-xs mb-1">현재 금리</p>
                <p className="text-2xl font-semibold text-white">{opp.currentRate}%</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-px bg-white/30" />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/50">
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex-1 h-px bg-white/30" />
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">목표 금리</p>
                <p className="text-2xl font-semibold text-white">{opp.targetRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="glass-strong rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-900 font-medium">진행률</span>
            <span className="text-gray-500 text-sm">{opp.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className={`h-full bg-gradient-to-r ${opp.color} rounded-full`} style={{ width: `${opp.progress}%` }} />
          </div>
          <p className="text-gray-400 text-xs">{opp.status} · 예상 {opp.estimatedMonths}개월</p>
        </div>

        {/* Roadmap preview */}
        <div>
          <h2 className="text-gray-900 font-semibold text-lg mb-3">실행 로드맵</h2>
          <Link href={`/roadmap/${opp.id}`} className="block glass-strong rounded-2xl p-5 card-hover">
            <div className="space-y-4">
              {opp.steps.map((step, idx) => (
                <div key={step.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                      step.status === "done" ? "bg-emerald-500 text-white" :
                      step.status === "in-progress" ? `bg-gradient-to-br ${opp.color} text-white` :
                      "bg-gray-100 text-gray-400"
                    }`}>
                      {step.status === "done" ? "✓" : idx + 1}
                    </div>
                    {idx < opp.steps.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-2 min-h-[16px]" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-gray-900 font-medium text-sm">{step.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{step.description}</p>
                    {step.current !== undefined && step.target !== undefined && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-gray-500 text-xs font-mono">{step.current}{step.unit}</span>
                        <span className="text-gray-300 text-xs">→</span>
                        <span className="text-emerald-600 text-xs font-mono font-semibold">{step.target}{step.unit}</span>
                      </div>
                    )}
                    <div className="mt-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 inline-block">
                      <p className="text-gray-500 text-xs">{step.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs text-right mt-2">자세한 로드맵 보기 →</p>
          </Link>
        </div>

        {/* Before / After */}
        <div>
          <h2 className="text-gray-900 font-semibold text-lg mb-3">Before / After</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-strong rounded-2xl p-5">
              <p className="text-gray-400 text-xs mb-3">현재</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{opp.currentRate}%</p>
              <p className="text-gray-400 text-xs">연 이자</p>
              <p className="text-red-500 text-lg font-semibold mt-1">
                {formatKRW(Math.round(72000000 * opp.currentRate / 100))}
              </p>
            </div>
            <div className="glass-strong rounded-2xl p-5 border-2 border-emerald-200">
              <p className="text-emerald-600 text-xs mb-3 font-medium">목표</p>
              <p className="text-3xl font-bold text-emerald-600 mb-1">{opp.targetRate}%</p>
              <p className="text-gray-400 text-xs">연 이자</p>
              <p className="text-emerald-600 text-lg font-semibold mt-1">
                {formatKRW(Math.round(72000000 * opp.targetRate / 100))}
              </p>
            </div>
          </div>
          <div className="mt-3 glass-strong rounded-2xl p-4 flex items-center justify-between">
            <span className="text-gray-500 text-sm">연간 절감액</span>
            <span className="text-emerald-600 font-bold text-xl">+{formatKRW(opp.savingsPerYear)}</span>
          </div>
        </div>

        <Link
          href={`/roadmap/${opp.id}`}
          className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r ${opp.color} text-white font-semibold hover:opacity-90 transition-opacity shadow-lg`}
        >
          로드맵 시작하기 →
        </Link>
      </div>
    </main>
  );
}
