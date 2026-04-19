'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLang } from '@/lib/context'
import { sections } from '@/i18n/translations'

export default function Navbar() {
  const { lang, t, toggleLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50" style={{ background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,217,255,0.1)' }}>
      {/* 속보 티커 */}
      <div className="overflow-hidden py-1" style={{ background: 'linear-gradient(90deg, #0f0f0f, #0a1a20, #0f0f0f)', borderBottom: '1px solid rgba(0,217,255,0.08)' }}>
        <div className="flex items-center">
          <span className="shrink-0 px-3 py-0.5 text-xs font-black tracking-widest" style={{ background: 'rgba(0,217,255,0.12)', color: '#00d9ff', borderRight: '1px solid rgba(0,217,255,0.15)' }}>
            🔴 LIVE
          </span>
          <div className="overflow-hidden flex-1 ml-3">
            <span className="ticker-content text-xs" style={{ color: 'rgba(0,217,255,0.7)' }}>
              &nbsp;&nbsp;🚨 Claude 4 공식 출시 — 멀티모달 추론 획기적 향상&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;🚨 OpenAI Sora 4K 영상 생성 공개&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;🚨 FDA, AI 암진단 알고리즘 3종 승인&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;🚨 EU AI Act 세부 규정 확정
            </span>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <nav className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: 'linear-gradient(135deg, #00d9ff, #0096ff)', color: '#0a0a0a' }}>
              AI
            </div>
            <div>
              <div className="font-black text-base leading-tight tracking-tight" style={{ color: '#00d9ff' }}>
                AI Live Now
              </div>
              <div className="flex items-center gap-1 -mt-0.5">
                <span className="live-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#ef4444' }}></span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>실시간</span>
              </div>
            </div>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex items-center gap-0.5">
            <Link href="/" className="px-3 py-1.5 rounded-md text-sm font-semibold transition-all hover:opacity-100" style={{ color: '#f97316', background: 'rgba(249,115,22,0.06)' }}>
              🔥 핫이슈
            </Link>
            {sections.map(s => (
              <Link
                key={s.id}
                href={`/${s.id}`}
                className="px-2.5 py-1.5 rounded-md text-xs font-medium transition-all hover:text-white"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {s.emoji} {lang === 'ko' ? s.ko : s.en}
              </Link>
            ))}
          </div>

          {/* 우측 액션 */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold border transition-all hover:opacity-100"
              style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.03)' }}
            >
              ⚙️ 어드민
            </Link>
            <button
              onClick={toggleLang}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold border transition-all hover:opacity-100"
              style={{ borderColor: 'rgba(0,217,255,0.25)', color: '#00d9ff', background: 'rgba(0,217,255,0.05)', opacity: 0.7 }}
            >
              🌐 {t.language}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2" style={{ color: 'rgba(255,255,255,0.5)' }} aria-label="메뉴">
              <div className="space-y-1.5">
                <div className="w-5 h-0.5 rounded" style={{ background: 'currentColor' }}></div>
                <div className="w-5 h-0.5 rounded" style={{ background: 'currentColor' }}></div>
                <div className="w-5 h-0.5 rounded" style={{ background: 'currentColor' }}></div>
              </div>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {menuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t" style={{ borderColor: 'rgba(0,217,255,0.08)' }}>
            <div className="grid grid-cols-2 gap-1.5">
              <Link href="/" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold" style={{ color: '#f97316', background: 'rgba(249,115,22,0.06)' }} onClick={() => setMenuOpen(false)}>
                🔥 핫이슈 / 실시간
              </Link>
              {sections.map(s => (
                <Link key={s.id} href={`/${s.id}`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm" style={{ color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.03)' }} onClick={() => setMenuOpen(false)}>
                  {s.emoji} {lang === 'ko' ? s.ko : s.en}
                </Link>
              ))}
            </div>
            <button onClick={toggleLang} className="mt-3 w-full px-3 py-2 rounded-lg text-sm font-bold border" style={{ borderColor: 'rgba(0,217,255,0.2)', color: '#00d9ff', background: 'rgba(0,217,255,0.04)' }}>
              🌐 {t.language}로 전환
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
