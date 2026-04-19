'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Section } from '@/types/database'

const sections: { id: Section; label: string }[] = [
  { id: 'ai-video', label: 'AI 영상' },
  { id: 'ai-medical', label: 'AI 의료' },
  { id: 'ai-legal', label: 'AI 법률' },
  { id: 'ai-software', label: 'AI 신규 소프트웨어' },
  { id: 'ai-devices', label: 'AI 기기' },
  { id: 'ai-business', label: 'AI 기업/투자' },
  { id: 'korean-ai', label: '한인 AI 비즈니스' },
  { id: 'ai-guide', label: 'AI 가이드' },
]

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#f0f0f5',
  padding: '10px 14px',
  fontSize: '14px',
  width: '100%',
  outline: 'none',
}

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 700,
  color: 'rgba(255,255,255,0.5)',
  marginBottom: '6px',
  letterSpacing: '0.05em',
}

export default function NewArticlePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    title_ko: '',
    title_en: '',
    summary: '',
    content: '',
    section: 'ai-video' as Section,
    source_url: '',
    source_name: '',
    image_url: '',
    tags: '',
    is_featured: false,
    is_breaking: false,
    ai_generated: true,
  })

  const set = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }))

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) set('image_url', data.url)
    } catch {
      alert('이미지 업로드 실패')
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // slug 자동 생성
    const slug = form.title_ko
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 80) + '-' + Date.now()

    const article = {
      ...form,
      slug,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    })

    if (res.ok) {
      alert(`✅ 기사가 사이트에 바로 올라갔습니다!\n\n제목: ${form.title_ko}`)
      router.push('/')
    } else {
      alert('❌ 저장 실패. 다시 시도해주세요.')
    }
    setSaving(false)
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{ color: '#f0f0f5' }}>새 글 작성</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>헤드라인 뉴스 직접 등록</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* 제목 */}
        <div>
          <label style={labelStyle}>제목 (한국어) *</label>
          <input
            required
            value={form.title_ko}
            onChange={e => set('title_ko', e.target.value)}
            placeholder="예: ello care, AI 기반 노인 케어 서비스 출시"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>제목 (영어)</label>
          <input
            value={form.title_en}
            onChange={e => set('title_en', e.target.value)}
            placeholder="English title (optional)"
            style={inputStyle}
          />
        </div>

        {/* 요약 */}
        <div>
          <label style={labelStyle}>요약 (1~2문장) *</label>
          <textarea
            required
            rows={3}
            value={form.summary}
            onChange={e => set('summary', e.target.value)}
            placeholder="기사의 핵심 내용을 1~2문장으로 요약하세요."
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* 본문 */}
        <div>
          <label style={labelStyle}>본문 (선택)</label>
          <textarea
            rows={8}
            value={form.content}
            onChange={e => set('content', e.target.value)}
            placeholder="기사 전체 본문을 입력하세요. (없으면 요약만 표시됩니다)"
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* 섹션 + 출처 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>섹션 *</label>
            <select
              value={form.section}
              onChange={e => set('section', e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {sections.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>출처 이름</label>
            <input
              value={form.source_name}
              onChange={e => set('source_name', e.target.value)}
              placeholder="예: ello care, TechCrunch"
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>출처 URL</label>
          <input
            type="url"
            value={form.source_url}
            onChange={e => set('source_url', e.target.value)}
            placeholder="https://..."
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>대표 이미지</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={form.image_url}
              onChange={e => set('image_url', e.target.value)}
              placeholder="URL 직접 입력 또는 파일 업로드"
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 rounded-lg text-sm font-bold shrink-0"
              style={{ background: 'rgba(0,217,255,0.12)', color: '#00d9ff', border: '1px solid rgba(0,217,255,0.25)', whiteSpace: 'nowrap' }}
            >
              {uploading ? '업로드 중...' : '📁 파일 선택'}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          {form.image_url && (
            <img src={form.image_url} alt="미리보기" className="mt-2 rounded-lg object-cover" style={{ height: 120, width: '100%' }} />
          )}
        </div>

        <div>
          <label style={labelStyle}>태그 (쉼표로 구분)</label>
          <input
            value={form.tags}
            onChange={e => set('tags', e.target.value)}
            placeholder="AI, 케어, 헬스케어, 노인복지"
            style={inputStyle}
          />
        </div>

        {/* 옵션 토글 */}
        <div className="rounded-xl p-5 border space-y-3" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>게시 옵션</p>

          {[
            { key: 'is_featured', label: '⭐ 피처드 (메인 상단 노출)', desc: '홈 화면 히어로 영역에 표시됩니다' },
            { key: 'is_breaking', label: '🔴 속보 (티커 노출)', desc: '상단 속보 배너와 티커에 표시됩니다' },
            { key: 'ai_generated', label: 'AI 분석 뱃지 표시', desc: 'AI 분석 라벨을 기사에 붙입니다' },
          ].map(opt => (
            <label key={opt.key} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form[opt.key as keyof typeof form] as boolean}
                onChange={e => set(opt.key, e.target.checked)}
                className="mt-0.5 accent-cyan-400"
              />
              <div>
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{opt.label}</span>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{opt.desc}</p>
              </div>
            </label>
          ))}
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-lg text-sm font-bold transition-all"
            style={{ background: saving ? 'rgba(0,217,255,0.1)' : 'rgba(0,217,255,0.2)', color: '#00d9ff', border: '1px solid rgba(0,217,255,0.3)' }}
          >
            {saving ? '저장 중...' : '✅ 기사 저장'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/articles')}
            className="px-6 py-3 rounded-lg text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  )
}
