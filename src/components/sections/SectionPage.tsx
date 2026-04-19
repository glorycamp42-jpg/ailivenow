'use client'

import Link from 'next/link'
import { useLang } from '@/lib/context'
import { getBySection } from '@/lib/mockData'
import { sections } from '@/i18n/translations'
import ArticleCard from '@/components/ui/ArticleCard'
import Sidebar from '@/components/sections/Sidebar'
import type { Section } from '@/types/database'

export default function SectionPage({ sectionId }: { sectionId: Section }) {
  const { lang, t } = useLang()
  const articles = getBySection(sectionId)
  const meta = sections.find(s => s.id === sectionId)

  if (!meta) return null

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
        <Link href="/" className="transition-colors hover:text-cyan-400">홈</Link>
        <span>›</span>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>{lang === 'ko' ? meta.ko : meta.en}</span>
      </div>

      {/* 섹션 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{meta.emoji}</span>
          <div>
            <h1 className="text-2xl font-black" style={{ color: '#00d9ff' }}>
              {lang === 'ko' ? meta.ko : meta.en}
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{meta.desc}</p>
          </div>
        </div>
        <div className="h-px mt-4" style={{ background: 'linear-gradient(90deg, rgba(0,217,255,0.4), transparent)' }} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">
        <div>
          {articles.length === 0 ? (
            <div className="text-center py-24 rounded-2xl border" style={{ background: '#111', borderColor: 'rgba(255,255,255,0.05)' }}>
              <p className="text-5xl mb-4">{meta.emoji}</p>
              <p className="font-bold mb-1 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.noArticles}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>곧 새로운 기사가 업데이트됩니다.</p>
            </div>
          ) : (
            <>
              {articles[0] && (
                <div className="mb-6">
                  <ArticleCard article={articles[0]} variant="hero" />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.slice(1).map(a => (
                  <ArticleCard key={a.id} article={a} variant="default" />
                ))}
              </div>
            </>
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  )
}
