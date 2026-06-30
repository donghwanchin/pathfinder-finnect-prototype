"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(tab === "login" ? "/dashboard" : "/onboarding");
    }, 800);
  };

  return (
    <main className="min-h-screen gradient-bg flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-500/8 rounded-full blur-[100px]" />

      <Link href="/" className="flex items-center gap-2.5 mb-12 relative z-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-md">
          <span className="text-white font-bold">P</span>
        </div>
        <span className="text-gray-900 font-semibold text-xl tracking-tight">Pathfinder</span>
      </Link>

      <div className="relative z-10 w-full max-w-sm">
        <div className="glass-strong rounded-3xl p-8 shadow-xl">
          <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "login" ? "로그인" : "회원가입"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "signup" && (
              <div>
                <label className="block text-gray-500 text-xs font-medium mb-1.5">이름</label>
                <input type="text" placeholder="김민준" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-violet-400 focus:bg-white transition-all" />
              </div>
            )}
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">이메일</label>
              <input type="email" placeholder="example@email.com" defaultValue={tab === "login" ? "minjun@example.com" : ""} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-violet-400 focus:bg-white transition-all" />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">비밀번호</label>
              <input type="password" placeholder="••••••••" defaultValue={tab === "login" ? "••••••••" : ""} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-violet-400 focus:bg-white transition-all" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  처리 중...
                </span>
              ) : tab === "login" ? "로그인" : "시작하기"}
            </button>
          </form>

          {tab === "login" && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-center text-gray-400 text-xs mb-4">또는</p>
              <button onClick={() => { setLoading(true); setTimeout(() => router.push("/dashboard"), 600); }} className="w-full py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-sm hover:bg-gray-100 transition-colors">
                데모로 체험하기
              </button>
            </div>
          )}
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">금융 정보는 분석 목적으로만 사용됩니다</p>
      </div>
    </main>
  );
}
