'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Article } from '@/types/database'

const sectionLabels: Record<string, string> = {
  'ai-video': 'AI 영상', 'ai-medical': 'AI 의료', 'ai-legal': 'AI 법률',
  'ai-software': 'AI 소프트웨어', 'ai-devices': 'AI 기기', 'ai-business': 'AI 기업/투자',
  'korean-ai': '한인 AI', 'ai-guide': 'AI 가이드',
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  const fetchArticles = () => {
    setLoading(true)
    fetch('/api/articles?limit=200')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setArticles(data) : [])
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchArticles() }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 기사를 삭제할까요?`)) return
    const res = await fetch(`/api/articles?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      setArticles(prev => prev.filter(a => a.id !== id))
    } else {
      alert('삭제 실패')
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: '#f0f0f5' }}>글 관리</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>전체 {articles.length}건</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2.5 rounded-lg text-sm font-bold"
          style={{ background: 'rgba(0,217,255,0.15)', color: '#00d9ff', border: '1px solid rgba(0,217,255,0.25)' }}
        >
          ✏️ 새 글 작성
        </Link>
      </div>

      {loading && (
        <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.3)' }}>불러오는 중...</div>
      )}

      {!loading && articles.length === 0 && (
        <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <p>기사가 없습니다. 첫 번째 기사를 작성해보세요!</p>
        </div>
      )}

      {!loading && articles.length > 0 && (
        <div className="rounded-xl border overflow-hidden" style={{ background: '#1a1a2e', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="grid text-xs font-bold px-4 py-3 border-b" style={{ gridTemplateColumns: '2fr 1fr 80px 80px 80px 100px', color: 'rgba(255,255,255,0.35)', borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
            <span>제목</span>
            <span>섹션</span>
            <span className="text-center">피처드</span>
            <span className="text-center">속보</span>
            <span className="text-right">조회수</span>
            <span className="text-right">관리</span>
          </div>

          {articles.map((a, i) => (
            <div
              key={a.id}
              className="grid items-center px-4 py-3 border-b transition-colors"
              style={{
                gridTemplateColumns: '2fr 1fr 80px 80px 80px 100px',
                borderColor: 'rgba(255,255,255,0.04)',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
              }}
            >
              <div className="min-w-0 pr-4">
                <p className="text-sm font-medium truncate" style={{ color: 'rgba(255,255,255,0.8)' }}>{a.title_ko}</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>{a.source_name || '—'}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full w-fit" style={{ background: 'rgba(0,217,255,0.08)', color: 'rgba(0,217,255,0.7)', border: '1px solid rgba(0,217,255,0.12)' }}>
                {sectionLabels[a.section] || a.section}
              </span>
              <span className="text-center text-base">{a.is_featured ? '⭐' : '—'}</span>
              <span className="text-center text-base">{a.is_breaking ? '🔴' : '—'}</span>
              <span className="text-xs text-right font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {(a.view_count || 0).toLocaleString()}
              </span>
              <div className="flex justify-end gap-2">
                <Link href={`/article/${a.slug}`} target="_blank" className="text-xs px-2 py-1 rounded" style={{ color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.04)' }}>
                  보기
                </Link>
                <button
                  onClick={() => handleDelete(a.id, a.title_ko)}
                  className="text-xs px-2 py-1 rounded"
                  style={{ color: 'rgba(239,68,68,0.6)', background: 'rgba(239,68,68,0.06)' }}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
