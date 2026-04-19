'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/context'
import { sections } from '@/i18n/translations'
import ArticleCard from '@/components/ui/ArticleCard'
import Sidebar from '@/components/sections/Sidebar'
import type { Article } from '@/types/database'
import { supabase } from '@/lib/supabase'

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { lang } = useLang()
  const [article, setArticle] = useState<Article | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          setArticle(data as Article)
          return supabase
            .from('articles')
            .select('*')
            .eq('section', data.section)
            .limit(4)
        }
      })
      .then(result => {
        if (result && !result.error && result.data) {
          setRelated((result.data as Article[]).filter(a => a.slug !== slug).slice(0, 3))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-24 text-center">
        <p className="text-4xl mb-4">⚡</p>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>기사 불러오는 중...</p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-xl font-bold mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>기사를 찾을 수 없습니다</h1>
        <Link href="/" className="text-sm font-medium" style={{ color: '#00d9ff' }}>← 홈으로 돌아가기</Link>
      </div>
    )
  }

  const sectionMeta = sections.find(s => s.id === article.section)
  const title = lang === 'ko' ? article.title_ko : (article.title_en || article.title_ko)

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 text-xs mb-6 flex-wrap" style={{ color: 'rgba(255,255,255,0.3)' }}>
        <Link href="/" className="transition-colors hover:text-cyan-400">홈</Link>
        <span>›</span>
        {sectionMeta && (
          <>
            <Link href={`/${article.section}`} className="transition-colors hover:text-cyan-400">
              {sectionMeta.emoji} {lang === 'ko' ? sectionMeta.ko : sectionMeta.en}
            </Link>
            <span>›</span>
          </>
        )}
        <span className="truncate max-w-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{title}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: '2rem' }}>
        <article className="min-w-0">
          <div className="mb-6">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {article.is_breaking && (
                <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: '#ef4444', color: 'white' }}>🔴 속보</span>
              )}
              {sectionMeta && (
                <Link href={`/${article.section}`} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,217,255,0.08)', color: '#00d9ff', border: '1px solid rgba(0,217,255,0.15)' }}>
                  {sectionMeta.emoji} {lang === 'ko' ? sectionMeta.ko : sectionMeta.en}
                </Link>
              )}
            </div>
            <h1 className="text-2xl font-black leading-tight mb-4" style={{ color: 'rgba(255,255,255,0.92)' }}>{title}</h1>
            <div className="flex items-center gap-4 text-xs pb-4 border-b flex-wrap" style={{ color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <span>by {article.source_name || 'AI Live Now'}</span>
              <span>{new Date(article.published_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>👁 {article.view_count?.toLocaleString()}회</span>
            </div>
          </div>

          {article.image_url && (
            <div className="rounded-xl overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
              <img src={article.image_url} alt={title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="mb-6 p-4 rounded-xl border" style={{ background: 'rgba(0,217,255,0.03)', borderColor: 'rgba(0,217,255,0.1)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <strong style={{ color: 'rgba(0,217,255,0.7)' }}>🤖 AI Disclosure:</strong> 이 기사는 AI가 작성하고 편집팀이 검수했습니다.
            </p>
          </div>

          <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>{article.summary}</p>

          {article.content ? (
            <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
          ) : (
            <div className="py-8 text-center rounded-xl border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>전문은 준비 중입니다.</p>
            </div>
          )}

          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {article.tags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,217,255,0.06)', color: 'rgba(0,217,255,0.6)' }}>#{tag}</span>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="text-base font-black mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>관련 기사</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: '1rem' }}>
                {related.map(a => <ArticleCard key={a.id} article={a} variant="default" />)}
              </div>
            </div>
          )}
        </article>

        <Sidebar />
      </div>
    </div>
  )
}
