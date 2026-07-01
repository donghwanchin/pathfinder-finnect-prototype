"use client";

import Link from "next/link";
import { mockUser, mockOpportunities, totalSavings } from "@/data/mock";
import { formatKRW } from "@/lib/utils";

export default function Profile() {
  const fields = [
    { label: "지역", value: mockUser.region },
    { label: "업종", value: mockUser.industry },
    { label: "사업 형태", value: mockUser.businessType },
    { label: "직원 수", value: `${mockUser.employees}명` },
    { label: "연매출", value: formatKRW(mockUser.annualRevenue) },
    { label: "월 소득", value: formatKRW(mockUser.monthlyIncome) },
    { label: "신용점수", value: `${mockUser.creditScore}점 (${mockUser.creditGrade})` },
    { label: "총 대출금", value: formatKRW(mockUser.totalLoan) },
    { label: "평균 금리", value: `${mockUser.averageRate}%` },
    { label: "주 금융기관", value: mockUser.bank },
    { label: "연체 여부", value: mockUser.hasOverdue ? "있음" : "없음" },
  ];

  return (
    <main className="min-h-screen gradient-bg pb-24">
      <nav className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 glass border-b border-black/5">
        <Link href="/dashboard" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors text-sm">←</Link>
        <span className="text-gray-900 font-semibold">내 프로필</span>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <div className="glass-strong rounded-3xl p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-[0_4px_20px_rgba(109,40,217,0.35)]">
            {mockUser.name[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{mockUser.name}</h1>
            <p className="text-gray-500 text-sm">{mockUser.businessName}</p>
            <p className="text-gray-400 text-xs mt-0.5">{mockUser.region} · 만 {mockUser.age}세 · 사업 2년 7개월</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-strong rounded-2xl p-4 text-center">
            <p className="text-gray-400 text-xs mb-1">절감 가능</p>
            <p className="text-gray-900 font-bold text-base">{formatKRW(totalSavings)}</p>
            <p className="text-gray-400 text-xs">연간</p>
          </div>
          <div className="glass-strong rounded-2xl p-4 text-center">
            <p className="text-gray-400 text-xs mb-1">기회</p>
            <p className="text-gray-900 font-bold text-2xl">{mockOpportunities.length}</p>
            <p className="text-gray-400 text-xs">발견</p>
          </div>
          <div className="glass-strong rounded-2xl p-4 text-center">
            <p className="text-gray-400 text-xs mb-1">신용점수</p>
            <p className="text-gray-900 font-bold text-2xl">{mockUser.creditScore}</p>
            <p className="text-gray-400 text-xs">NICE</p>
          </div>
        </div>
        <div>
          <h2 className="text-gray-900 font-semibold text-lg mb-3">사업자 정보</h2>
          <div className="glass-strong rounded-2xl overflow-hidden">
            {fields.map((f, i) => (
              <div key={f.label} className={`flex items-center justify-between px-5 py-3.5 ${i < fields.length - 1 ? "border-b border-gray-100" : ""}`}>
                <span className="text-gray-400 text-sm">{f.label}</span>
                <span className="text-gray-900 text-sm font-medium">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
        <Link href="/onboarding" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors font-medium">
          정보 업데이트 후 재분석
        </Link>
        <Link href="/login" className="flex items-center justify-center w-full py-3 text-gray-400 hover:text-gray-600 text-sm transition-colors">
          로그아웃
        </Link>
      </div>
    </main>
  );
}
