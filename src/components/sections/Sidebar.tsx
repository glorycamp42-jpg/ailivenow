'use client'

import Link from 'next/link'
import { useLang } from '@/lib/context'
import { sections } from '@/i18n/translations'
import { getTrending, getLatest } from '@/lib/mockData'
import ArticleCard from '@/components/ui/ArticleCard'

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 border" style={{ background: '#111', borderColor: 'rgba(255,255,255,0.05)' }}>
      <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(0,217,255,0.6)' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function Sidebar() {
  const { lang } = useLang()
  const trending = getTrending()
  const latest = getLatest()

  return (
    <aside className="space-y-5">
      {/* 섹션 빠른 이동 */}
      <SidebarSection title="섹션">
        <div className="space-y-0.5">
          <Link href="/" className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-100" style={{ color: '#f97316', background: 'rgba(249,115,22,0.05)', opacity: 0.8 }}>
            🔥 핫이슈
          </Link>
          {sections.map(s => (
            <Link key={s.id} href={`/${s.id}`} className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {s.emoji} {lang === 'ko' ? s.ko : s.en}
            </Link>
          ))}
        </div>
      </SidebarSection>

      {/* 트렌딩 */}
      <SidebarSection title="🔥 트렌딩">
        <div className="space-y-3">
          {trending.map((article, i) => (
            <div key={article.id} className="flex gap-2.5 items-start">
              <span className="shrink-0 w-5 h-5 rounded text-xs font-black flex items-center justify-center mt-0.5" style={{ background: i < 3 ? 'rgba(0,217,255,0.12)' : 'rgba(255,255,255,0.04)', color: i < 3 ? '#00d9ff' : 'rgba(255,255,255,0.25)' }}>
                {i + 1}
              </span>
              <ArticleCard article={article} variant="sidebar" />
            </div>
          ))}
        </div>
      </SidebarSection>

      {/* 최신 */}
      <SidebarSection title="⚡ 최신 뉴스">
        <div className="space-y-3">
          {latest.map(article => (
            <ArticleCard key={article.id} article={article} variant="sidebar" />
          ))}
        </div>
      </SidebarSection>

      {/* AI Disclosure 미니 */}
      <div className="rounded-xl p-4 text-center border" style={{ background: 'rgba(0,217,255,0.03)', borderColor: 'rgba(0,217,255,0.1)' }}>
        <p className="text-xl mb-1">🤖</p>
        <p className="text-xs font-bold mb-1" style={{ color: 'rgba(0,217,255,0.7)' }}>AI Disclosure</p>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
          이 사이트의 콘텐츠는 AI가 생성 및 큐레이션합니다.
        </p>
      </div>
    </aside>
  )
}
