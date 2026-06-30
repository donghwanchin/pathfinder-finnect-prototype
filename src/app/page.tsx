"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col gradient-bg">
      <nav className="flex items-center justify-between px-8 py-5 glass border-b border-black/5 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-gray-900 font-semibold text-lg tracking-tight">Pathfinder</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-500 hover:text-gray-900 text-sm transition-colors font-medium">
            로그인
          </Link>
          <Link href="/login" className="px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors shadow-sm">
            무료로 시작하기
          </Link>
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/6 text-gray-500 text-sm mb-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AI 금융 분석 가동 중
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
            금융 혜택을<br />
            <span className="gradient-text">먼저 계산합니다</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed">
            Pathfinder는 소상공인의 현재 상황을 분석해<br />
            절감 가능한 금액부터 역산해 드립니다.
          </p>
          <Link href="/login" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-[0_4px_24px_rgba(109,40,217,0.35)]">
            내 절감 금액 확인하기
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 10h6M10 7l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <section className="px-8 pb-20 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "🧭", title: "역산 로드맵", desc: "목표 금리에서 거꾸로 계산해 지금 해야 할 것을 알려드립니다" },
            { icon: "⚡", title: "즉시 분석", desc: "사업자 정보 입력 후 30초 안에 AI가 기회를 분석합니다" },
            { icon: "🎯", title: "맞춤 추천", desc: "햇살론, 새출발기금, 금리인하요구권 등 최적 조합을 제시합니다" },
          ].map((f) => (
            <div key={f.title} className="glass-strong rounded-2xl p-7 card-hover">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-gray-900 font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 pb-24 max-w-5xl mx-auto w-full">
        <div className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/6 rounded-full blur-[60px]" />
          <div className="relative z-10">
            <p className="text-gray-400 text-sm mb-1">예상 절감액 (연간)</p>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">2,340,000</span>
              <span className="text-xl text-gray-400 mb-1.5">원</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">김○○ 대표님 · 서울 마포구 음식점</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "햇살론 전환", amount: "+120만원", color: "bg-violet-50 text-violet-700 border-violet-200" },
                { label: "대출 갈아타기", amount: "+70만원", color: "bg-blue-50 text-blue-700 border-blue-200" },
                { label: "금리인하요구권", amount: "+45만원", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { label: "정책자금", amount: "+32만원", color: "bg-orange-50 text-orange-700 border-orange-200" },
              ].map((tag) => (
                <div key={tag.label} className={`px-4 py-2 rounded-full border text-sm font-medium ${tag.color}`}>
                  {tag.label} <span className="opacity-60 ml-1">{tag.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/6 px-8 py-8 text-center text-gray-400 text-sm">
        © 2026 Pathfinder · AI Financial Navigator for Small Business Owners
      </footer>
    </main>
  );
}
