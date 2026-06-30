"use client";

import Link from "next/link";
import { mockOpportunities, mockUser, totalSavings } from "@/data/mock";
import { formatKRW } from "@/lib/utils";

export default function Dashboard() {
  return (
    <main className="min-h-screen gradient-bg">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-black/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="text-gray-900 font-semibold tracking-tight">Pathfinder</span>
        </div>
        <Link href="/profile" className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-100 to-blue-100 border border-violet-200 flex items-center justify-center text-violet-700 text-sm font-semibold hover:border-violet-400 transition-colors">
          김
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 pb-28">
        <div className="mb-7">
          <p className="text-gray-400 text-sm mb-0.5">안녕하세요, {mockUser.name} 대표님 👋</p>
          <p className="text-gray-500 text-sm">{mockUser.businessName} · {mockUser.region}</p>
        </div>

        <div className="relative rounded-3xl p-8 mb-5 overflow-hidden bg-gradient-to-br from-violet-600 to-blue-600 shadow-[0_8px_32px_rgba(109,40,217,0.3)]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px]" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-white/70 text-sm mb-2">연간 절감 가능 금액</p>
            <span className="text-5xl font-bold text-white tracking-tight">{formatKRW(totalSavings)}</span>
            <p className="text-white/50 text-xs mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse inline-block" />
              AI가 {mockOpportunities.length}개 기회를 발견했습니다
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="glass-strong rounded-2xl p-4">
            <p className="text-gray-400 text-xs mb-1">신용점수</p>
            <p className="text-gray-900 font-bold text-xl">{mockUser.creditScore}</p>
            <p className="text-gray-400 text-xs mt-0.5">NICE</p>
          </div>
          <div className="glass-strong rounded-2xl p-4">
            <p className="text-gray-400 text-xs mb-1">평균 금리</p>
            <p className="text-gray-900 font-bold text-xl">{mockUser.averageRate}%</p>
            <p className="text-gray-400 text-xs mt-0.5">{mockUser.bank}</p>
          </div>
          <div className="glass-strong rounded-2xl p-4">
            <p className="text-gray-400 text-xs mb-1">대출 잔액</p>
            <p className="text-gray-900 font-bold text-xl">7,200<span className="text-sm font-normal text-gray-400">만</span></p>
            <p className="text-gray-400 text-xs mt-0.5">원</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900 font-semibold text-lg">절감 기회</h2>
          <span className="text-gray-400 text-xs">우선순위 순</span>
        </div>

        <div className="space-y-3">
          {mockOpportunities.map((opp) => (
            <Link key={opp.id} href={`/opportunity/${opp.id}`} className="block glass-strong rounded-2xl p-5 card-hover group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${opp.iconBg} flex items-center justify-center`}>
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${opp.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-gray-900 font-semibold text-base">{opp.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        opp.priority === 1 ? "bg-violet-100 text-violet-700" :
                        opp.priority === 2 ? "bg-blue-100 text-blue-700" :
                        opp.priority === 3 ? "bg-emerald-100 text-emerald-700" :
                        "bg-orange-100 text-orange-700"
                      }`}>{opp.badge}</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">{opp.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-600 font-bold text-lg">+{formatKRW(opp.savingsPerYear)}</p>
                  <p className="text-gray-400 text-xs">연간</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500 text-sm font-mono">{opp.currentRate}%</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-300">
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-emerald-600 text-sm font-mono font-semibold">{opp.targetRate}%</span>
                <span className="text-gray-400 text-xs ml-1">{opp.estimatedMonths}개월 후</span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-gray-400 text-xs">진행률</span>
                  <span className="text-gray-500 text-xs">{opp.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${opp.color} rounded-full`} style={{ width: `${opp.progress}%` }} />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-gray-400 text-xs">{opp.status}</span>
                <span className="text-gray-300 text-xs group-hover:text-gray-500 transition-colors">로드맵 보기 →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 glass border-t border-black/5 px-8 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-around">
          {[
            { label: "홈", active: true, href: "/dashboard" },
            { label: "로드맵", active: false, href: "/opportunity/haetsallon" },
            { label: "프로필", active: false, href: "/profile" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className={`flex flex-col items-center gap-1 text-xs font-medium ${item.active ? "text-violet-600" : "text-gray-400"}`}>
              <div className={`w-6 h-6 rounded-lg ${item.active ? "bg-violet-100" : ""} flex items-center justify-center`}>
                <div className={`w-3 h-3 rounded ${item.active ? "bg-violet-600" : "bg-gray-300"}`} />
              </div>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
