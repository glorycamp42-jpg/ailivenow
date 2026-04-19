'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLang } from '@/lib/context'
import type { Article } from '@/types/database'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'hero' | 'compact' | 'sidebar'
}

// 이미지 깨짐 방지 컴포넌트 — 실패 시 항상 플레이스홀더 표시
function SafeImage({ src, alt, className, style }: { src: string | null | undefined; alt: string; className?: string; style?: React.CSSProperties }) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <span style={{ fontSize: 28, opacity: 0.4 }}>📰</span>
        <span style={{ fontSize: 10, color: 'rgba(0,217,255,0.4)', fontWeight: 700, letterSpacing: '0.1em' }}>AI LIVE NOW</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
    />
  )
}

function AiBadge({ ai_generated }: { ai_generated: boolean }) {
  return (
    <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: ai_generated ? 'rgba(0,217,255,0.08)' : 'rgba(255,255,255,0.06)', color: ai_generated ? 'rgba(0,217,255,0.7)' : 'rgba(255,255,255,0.4)', border: `1px solid ${ai_generated ? 'rgba(0,217,255,0.12)' : 'rgba(255,255,255,0.08)'}` }}>
      {ai_generated ? 'AI 분석' : '✍️ 에디터'}
    </span>
  )
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const { lang } = useLang()
  const title = lang === 'ko' ? article.title_ko : (article.title_en || article.title_ko)
  const href = `/article/${article.slug}`

  if (variant === 'sidebar') {
    return (
      <Link href={href} className="flex gap-3 group">
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
          <SafeImage
            src={article.image_url}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {title}
          </p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {article.view_count.toLocaleString()}회
          </p>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={href} className="flex gap-3 group p-3 rounded-xl card-hover border" style={{ background: '#252540', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
          <SafeImage
            src={article.image_url}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            {article.is_breaking && (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>속보</span>
            )}
            <AiBadge ai_generated={article.ai_generated} />
          </div>
          <p className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {title}
          </p>
          <p className="text-xs mt-1 line-clamp-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{article.summary}</p>
        </div>
      </Link>
    )
  }

  if (variant === 'hero') {
    return (
      <Link href={href} className="relative block rounded-2xl overflow-hidden group" style={{ height: '280px' }}>
        <SafeImage
          src={article.image_url}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 img-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {article.is_breaking && (
              <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: '#ef4444', color: 'white', letterSpacing: '0.05em' }}>🔴 속보</span>
            )}
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,217,255,0.15)', color: '#00d9ff', border: '1px solid rgba(0,217,255,0.2)' }}>
              AI 분석
            </span>
            {article.source_name && (
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>via {article.source_name}</span>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-black leading-tight text-white group-hover:text-cyan-300 transition-colors">
            {title}
          </h2>
          <p className="text-sm mt-2 line-clamp-2 hidden sm:block" style={{ color: 'rgba(255,255,255,0.55)' }}>{article.summary}</p>
        </div>
      </Link>
    )
  }

  // default
  return (
    <Link href={href} className="block rounded-xl overflow-hidden card-hover border group" style={{ background: '#252540', borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="overflow-hidden" style={{ height: '180px' }}>
        <SafeImage
          src={article.image_url}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          {article.is_breaking && (
            <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}>속보</span>
          )}
          <AiBadge ai_generated={article.ai_generated} />
        </div>
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
          {title}
        </h3>
        <p className="text-xs line-clamp-2 mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>{article.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {article.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,217,255,0.06)', color: 'rgba(0,217,255,0.5)' }}>
                #{tag}
              </span>
            ))}
          </div>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{article.view_count.toLocaleString()}회</span>
        </div>
      </div>
    </Link>
  )
}
