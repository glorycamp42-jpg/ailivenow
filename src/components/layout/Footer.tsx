'use client'

import Link from 'next/link'
import { useLang } from '@/lib/context'
import { sections } from '@/i18n/translations'

export default function Footer() {
  const { lang } = useLang()

  return (
    <footer style={{ background: '#060606', borderTop: '1px solid rgba(0,217,255,0.08)' }}>
      {/* AI Disclosure 배너 */}
      <div className="py-4 px-4" style={{ background: 'rgba(0,217,255,0.04)', borderBottom: '1px solid rgba(0,217,255,0.08)' }}>
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="text-2xl shrink-0">🤖</span>
          <div>
            <p className="text-sm font-bold" style={{ color: '#00d9ff' }}>AI Disclosure — AI 콘텐츠 공개</p>
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              이 사이트의 모든 콘텐츠는 AI가 생성 및 큐레이션합니다. 최종 검토는 편집팀이 수행하며, 각 기사에는 AI 생성 여부가 명시됩니다.
              사실 오류 또는 저작권 문제를 발견하시면 즉시 제보해 주세요.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: 'linear-gradient(135deg, #00d9ff, #0096ff)', color: '#0a0a0a' }}>
                AI
              </div>
              <span className="font-black text-base" style={{ color: '#00d9ff' }}>AI Live Now</span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
              실리콘밸리부터 한인 AI 커뮤니티까지, AI 분야의 모든 뉴스를 한국어로 실시간 전달합니다.
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Operated by <span style={{ color: 'rgba(0,217,255,0.6)' }}>Kkupo Holdings</span>
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="live-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#ef4444' }}></span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>24/7 실시간</span>
            </div>
          </div>

          {/* 섹션 링크 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#00d9ff', opacity: 0.7 }}>뉴스 섹션 I</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  🔥 핫이슈 / 실시간
                </Link>
              </li>
              {sections.slice(0, 4).map(s => (
                <li key={s.id}>
                  <Link href={`/${s.id}`} className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {s.emoji} {lang === 'ko' ? s.ko : s.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 섹션 링크 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#00d9ff', opacity: 0.7 }}>뉴스 섹션 II</h4>
            <ul className="space-y-2">
              {sections.slice(4).map(s => (
                <li key={s.id}>
                  <Link href={`/${s.id}`} className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {s.emoji} {lang === 'ko' ? s.ko : s.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 정보 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#00d9ff', opacity: 0.7 }}>Kkupo Holdings</h4>
            <ul className="space-y-2">
              {[
                { label: '회사 소개', href: '#' },
                { label: '광고 문의', href: '#' },
                { label: '제보하기', href: '#' },
                { label: '개인정보처리방침', href: '#' },
                { label: '이용약관', href: '#' },
                { label: 'DMCA 신고', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2026 <span style={{ color: 'rgba(0,217,255,0.5)' }}>Kkupo Holdings</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(0,217,255,0.08)', color: 'rgba(0,217,255,0.6)', border: '1px solid rgba(0,217,255,0.12)' }}>
              🤖 AI Generated
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(139,92,246,0.08)', color: 'rgba(167,139,250,0.7)', border: '1px solid rgba(139,92,246,0.12)' }}>
              ✨ AI Curated
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
              DMCA Protected
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
