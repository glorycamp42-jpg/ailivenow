'use client'

import Link from 'next/link'
import { mockArticles } from '@/lib/mockData'

const sectionLabels: Record<string, string> = {
  'ai-video': 'AI 영상',
  'ai-medical': 'AI 의료',
  'ai-legal': 'AI 법률',
  'ai-software': 'AI 신규 소프트웨어',
  'ai-devices': 'AI 기기',
  'ai-business': 'AI 기업/투자',
  'korean-ai': '한인 AI 비즈니스',
  'ai-guide': 'AI 가이드',
}

export default function AdminDashboard() {
  const totalArticles = mockArticles.length
  const featured = mockArticles.filter(a => a.is_featured).length
  const breaking = mockArticles.filter(a => a.is_breaking).length
  const totalViews = mockArticles.reduce((sum, a) => sum + a.view_count, 0)

  const bySection = Object.entries(
    mockArticles.reduce((acc, a) => {
      acc[a.section] = (acc[a.section] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1])

  const topArticles = [...mockArticles].sort((a, b) => b.view_count - a.view_count).slice(0, 5)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{ color: '#f0f0f5' }}>대시보드</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>AI Live Now 콘텐츠 현황</p>
      </div>

      {/* 통계 카드 4개 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { label: '전체 기사', value: totalArticles, icon: '📰', color: '#00d9ff' },
          { label: '피처드', value: featured, icon: '⭐', color: '#f59e0b' },
          { label: '속보', value: breaking, icon: '🔴', color: '#ef4444' },
          { label: '총 조회수', value: totalViews.toLocaleString(), icon: '👁', color: '#a78bfa' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl p-5 border" style={{ background: '#1a1a2e', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>
                {stat.label}
              </span>
            </div>
            <div className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 섹션별 기사 수 */}
        <div className="rounded-xl border p-6" style={{ background: '#1a1a2e', borderColor: 'rgba(255,255,255,0.08)' }}>
          <h2 className="text-sm font-black mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>섹션별 기사 수</h2>
          <div className="space-y-3">
            {bySection.map(([section, count]) => (
              <div key={section} className="flex items-center gap-3">
                <span className="text-xs w-32 truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>{sectionLabels[section] || section}</span>
                <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(count / totalArticles) * 100}%`, background: 'linear-gradient(90deg, #00d9ff, #0096ff)' }}
                  />
                </div>
                <span className="text-xs font-bold w-5 text-right" style={{ color: '#00d9ff' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 인기 기사 TOP 5 */}
        <div className="rounded-xl border p-6" style={{ background: '#1a1a2e', borderColor: 'rgba(255,255,255,0.08)' }}>
          <h2 className="text-sm font-black mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>인기 기사 TOP 5</h2>
          <div className="space-y-3">
            {topArticles.map((a, i) => (
              <div key={a.id} className="flex items-start gap-3">
                <span className="text-lg font-black w-6 shrink-0" style={{ color: i === 0 ? '#f59e0b' : 'rgba(255,255,255,0.2)' }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-snug truncate" style={{ color: 'rgba(255,255,255,0.75)' }}>{a.title_ko}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{a.view_count.toLocaleString()} 조회</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="mt-6 flex gap-3">
        <Link href="/admin/articles/new" className="px-4 py-2.5 rounded-lg text-sm font-bold transition-all" style={{ background: 'rgba(0,217,255,0.15)', color: '#00d9ff', border: '1px solid rgba(0,217,255,0.25)' }}>
          ✏️ 새 글 작성
        </Link>
        <Link href="/admin/ads" className="px-4 py-2.5 rounded-lg text-sm font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
          📢 광고 관리
        </Link>
      </div>
    </div>
  )
}
