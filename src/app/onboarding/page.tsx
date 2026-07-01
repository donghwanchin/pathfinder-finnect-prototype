"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: 1,
    title: "사업 기본 정보",
    subtitle: "AI 맞춤 분석을 위해 사업 정보가 필요합니다",
    fields: [
      { key: "region", label: "지역", type: "select", options: ["서울", "경기", "인천", "부산", "대구", "광주", "대전"] },
      { key: "industry", label: "업종", type: "select", options: ["제조업", "음식점업", "소매업", "도매업", "서비스업", "숙박업"] },
      { key: "businessType", label: "사업 형태", type: "select", options: ["개인사업자", "법인사업자"] },
      { key: "employees", label: "직원 수", type: "number", unit: "명", placeholder: "3" },
    ],
  },
  {
    id: 2,
    title: "매출 및 소득",
    subtitle: "정확한 분석을 위해 현재 재무 상황을 입력해 주세요",
    fields: [
      { key: "annualRevenue", label: "연매출", type: "currency", unit: "원", placeholder: "180,000,000" },
      { key: "monthlyRevenue", label: "월매출", type: "currency", unit: "원", placeholder: "15,000,000" },
      { key: "monthlyIncome", label: "월 소득", type: "currency", unit: "원", placeholder: "3,200,000" },
    ],
  },
  {
    id: 3,
    title: "대출 현황",
    subtitle: "현재 대출 정보를 입력해 주세요",
    fields: [
      { key: "creditScore", label: "NICE 신용점수", type: "number", unit: "점", placeholder: "642" },
      { key: "totalLoan", label: "총 대출금", type: "currency", unit: "원", placeholder: "72,000,000" },
      { key: "averageRate", label: "평균 금리", type: "number", unit: "%", placeholder: "12.3" },
      { key: "bank", label: "주 금융기관", type: "select", options: ["시중은행", "지방은행", "저축은행", "신협", "새마을금고", "캐피탈"] },
    ],
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({
    region: "서울", industry: "제조업", businessType: "개인사업자", bank: "저축은행",
  });
  const current = steps[step];

  return (
    <main className="min-h-screen gradient-bg flex flex-col items-center justify-center px-4 py-12">
      <div className="relative z-10 w-full max-w-lg">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="text-gray-500 text-sm font-medium">Pathfinder</span>
        </div>

        <div className="flex gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={s.id} className="flex-1 h-1 rounded-full overflow-hidden bg-gray-200">
              <div className="h-full bg-gradient-to-r from-violet-600 to-blue-600 transition-all duration-500" style={{ width: i <= step ? "100%" : "0%" }} />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{current.title}</h1>
            <p className="text-gray-500 text-sm mt-1">{current.subtitle}</p>
          </div>
          <span className="text-gray-400 text-sm">{step + 1} / {steps.length}</span>
        </div>

        <div className="glass-strong rounded-3xl p-8 space-y-5">
          {current.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">{field.label}</label>
              {field.type === "select" ? (
                <select value={values[field.key] || field.options![0]} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-violet-400 transition-colors">
                  {field.options!.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <div className="relative">
                  <input type="text" placeholder={field.placeholder} value={values[field.key] || ""} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-violet-400 focus:bg-white transition-all pr-12" />
                  {field.unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{field.unit}</span>}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 flex gap-3">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors font-medium">이전</button>
            )}
            <button onClick={() => step < steps.length - 1 ? setStep(step + 1) : router.push("/loading")} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-md">
              {step === steps.length - 1 ? "AI 분석 시작" : "다음"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
