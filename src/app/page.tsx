'use client'

import Link from 'next/link'
import { useLang } from '@/lib/context'
import { sections } from '@/i18n/translations'
import ArticleCard from '@/components/ui/ArticleCard'
import Sidebar from '@/components/sections/Sidebar'
import { useEffect, useState } from 'react'
import type { Article } from '@/types/database'

export default function HomePage() {
  const { lang, t } = useLang()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/articles?limit=100')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setArticles(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const featured = articles.filter(a => a.is_featured)
  const breaking = articles.filter(a => a.is_breaking)
  const heroArticle = featured[0]
  const subFeatured = featured.slice(1, 4)

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">

      {/* 🔥 핫이슈 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="live-dot w-2 h-2 rounded-full inline-block" style={{ background: '#ef4444' }}></span>
          <h1 className="text-lg font-black" style={{ color: '#f97316' }}>🔥 핫이슈 / 실시간</h1>
        </div>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(249,115,22,0.4), transparent)' }} />
        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
          LIVE
        </span>
      </div>

      {loading && (
        <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <div className="text-3xl mb-3">⚡</div>
          <p className="text-sm">최신 AI 뉴스 불러오는 중...</p>
        </div>
      )}

      {!loading && articles.length === 0 && (
        <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <div className="text-4xl mb-3">📰</div>
          <p className="text-sm">아직 등록된 기사가 없습니다.</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(0,217,255,0.4)' }}>어드민에서 첫 번째 기사를 작성해보세요 →</p>
        </div>
      )}

      {!loading && articles.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem' }}>
          <div className="space-y-8">

            {/* 히어로 섹션 */}
            {heroArticle && (
              <section>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1rem' }}>
                  <div>
                    <ArticleCard article={heroArticle} variant="hero" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {subFeatured.map(a => (
                      <ArticleCard key={a.id} article={a} variant="compact" />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 속보 배너 */}
            {breaking.length > 0 && (
              <div className="rounded-xl p-3.5 border overflow-hidden" style={{ background: 'rgba(239,68,68,0.04)', borderColor: 'rgba(239,68,68,0.15)' }}>
                <div className="flex items-center gap-3">
                  <span className="shrink-0 px-2 py-0.5 text-xs font-black rounded" style={{ background: '#ef4444', color: 'white' }}>
                    🔴 속보
                  </span>
                  <div className="overflow-hidden flex-1">
                    <span className="ticker-content text-sm font-medium" style={{ color: 'rgba(252,165,165,0.85)' }}>
                      {breaking.map(a => `  ·  🚨 ${lang === 'ko' ? a.title_ko : (a.title_en || a.title_ko)}`).join('')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 섹션별 카드 그리드 */}
            {sections.map(section => {
              const sectionArticles = articles.filter(a => a.section === section.id)
              if (sectionArticles.length === 0) return null

              return (
                <section key={section.id}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{section.emoji}</span>
                      <h2 className="text-sm font-black" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        {lang === 'ko' ? section.ko : section.en}
                      </h2>
                      <span className="text-xs hidden sm:inline-block" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        {section.desc}
                      </span>
                    </div>
                    <Link href={`/${section.id}`} className="text-xs font-medium flex items-center gap-1 transition-all hover:opacity-100" style={{ color: 'rgba(0,217,255,0.6)' }}>
                      {t.viewAll} →
                    </Link>
                  </div>
                  <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, rgba(0,217,255,0.15), transparent)' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                    {sectionArticles.slice(0, 3).map(a => (
                      <ArticleCard key={a.id} article={a} variant="default" />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          <Sidebar />
        </div>
      )}
    </div>
  )
}
