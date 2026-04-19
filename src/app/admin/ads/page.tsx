'use client'

import { useState } from 'react'
import type { AdPosition } from '@/types/database'

const positionLabels: Record<AdPosition, { label: string; desc: string; icon: string }> = {
  banner_top:    { label: '상단 배너', desc: '사이트 최상단 풀 너비 배너 (728×90)', icon: '📌' },
  banner_bottom: { label: '하단 배너', desc: '콘텐츠 하단 풀 너비 배너 (728×90)', icon: '📎' },
  sidebar:       { label: '사이드바', desc: '우측 사이드바 박스 광고 (300×250)', icon: '📐' },
  inline:        { label: '인라인', desc: '기사 사이 삽입 광고 (네이티브 형식)', icon: '📄' },
}

interface AdForm {
  name: string
  advertiser: string
  position: AdPosition
  image_url: string
  link_url: string
  start_date: string
  end_date: string
  notes: string
  is_active: boolean
}

const defaultForm: AdForm = {
  name: '', advertiser: '', position: 'banner_top',
  image_url: '', link_url: '', start_date: '', end_date: '',
  notes: '', is_active: true,
}

interface AdSlot {
  id: string; name: string; advertiser: string; position: AdPosition
  link_url: string; image_url: string; is_active: boolean
  impressions: number; clicks: number; start_date: string; end_date: string | null
}

// 샘플 광고 슬롯 (Supabase 연동 전 로컬 상태)
const sampleAds: AdSlot[] = [
  { id: '1', name: '런칭 기념 배너', advertiser: 'ello care', position: 'banner_top', link_url: 'https://ellocare.com', image_url: '', is_active: true, impressions: 0, clicks: 0, start_date: new Date().toISOString().slice(0, 10), end_date: null },
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

export default function AdsPage() {
  const [ads, setAds] = useState(sampleAds)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<AdForm>(defaultForm)
  const [saving, setSaving] = useState(false)

  const set = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const newAd = {
      id: Date.now().toString(),
      ...form,
      impressions: 0,
      clicks: 0,
      end_date: form.end_date || null,
    }

    setAds(prev => [newAd, ...prev])
    setForm(defaultForm)
    setShowForm(false)
    setSaving(false)
    alert('✅ 광고 슬롯 등록 완료!\n\n※ Supabase 연동 후 실제 사이트에 반영됩니다.')
  }

  const toggleAd = (id: string) => {
    setAds(prev => prev.map(a => a.id === id ? { ...a, is_active: !a.is_active } : a))
  }

  const deleteAd = (id: string) => {
    if (confirm('이 광고를 삭제하시겠습니까?')) {
      setAds(prev => prev.filter(a => a.id !== id))
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: '#f0f0f5' }}>광고 관리</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>광고 슬롯 등록 및 현황 관리</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-lg text-sm font-bold"
          style={{ background: 'rgba(0,217,255,0.15)', color: '#00d9ff', border: '1px solid rgba(0,217,255,0.25)' }}
        >
          {showForm ? '✕ 닫기' : '📢 새 광고 등록'}
        </button>
      </div>

      {/* 광고 슬롯 안내 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
        {(Object.entries(positionLabels) as [AdPosition, typeof positionLabels[AdPosition]][]).map(([pos, info]) => {
          const count = ads.filter(a => a.position === pos && a.is_active).length
          return (
            <div key={pos} className="rounded-xl p-4 border" style={{ background: '#1a1a2e', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{info.icon}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: count > 0 ? 'rgba(0,217,255,0.1)' : 'rgba(255,255,255,0.04)', color: count > 0 ? '#00d9ff' : 'rgba(255,255,255,0.3)' }}>
                  {count}개 활성
                </span>
              </div>
              <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>{info.label}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{info.desc}</p>
            </div>
          )
        })}
      </div>

      {/* 새 광고 등록 폼 */}
      {showForm && (
        <div className="rounded-xl border p-6 mb-8" style={{ background: '#1a1a2e', borderColor: 'rgba(0,217,255,0.2)' }}>
          <h2 className="text-base font-black mb-5" style={{ color: '#00d9ff' }}>📢 새 광고 슬롯 등록</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>광고명 *</label>
                <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="예: ello care 런칭 배너" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>광고주 *</label>
                <input required value={form.advertiser} onChange={e => set('advertiser', e.target.value)} placeholder="예: ello care" style={inputStyle} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>광고 위치 *</label>
                <select value={form.position} onChange={e => set('position', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {(Object.entries(positionLabels) as [AdPosition, typeof positionLabels[AdPosition]][]).map(([pos, info]) => (
                    <option key={pos} value={pos}>{info.icon} {info.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>클릭 연결 URL *</label>
                <input required type="url" value={form.link_url} onChange={e => set('link_url', e.target.value)} placeholder="https://ellocare.com" style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>광고 이미지 URL</label>
              <input type="url" value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://... (배너 이미지 URL)" style={inputStyle} />
              {form.image_url && (
                <img src={form.image_url} alt="광고 미리보기" className="mt-2 rounded-lg object-cover" style={{ height: 80 }} />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>시작일 *</label>
                <input required type="date" value={form.start_date} onChange={e => set('start_date', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>종료일 (없으면 무기한)</label>
                <input type="date" value={form.end_date} onChange={e => set('end_date', e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>메모 (내부용)</label>
              <textarea rows={2} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="단가, 계약 조건 등 내부 메모" style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} className="accent-cyan-400" />
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>등록 즉시 활성화</span>
            </label>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-lg text-sm font-bold" style={{ background: 'rgba(0,217,255,0.2)', color: '#00d9ff', border: '1px solid rgba(0,217,255,0.3)' }}>
                {saving ? '저장 중...' : '✅ 광고 등록'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 광고 목록 */}
      <div className="rounded-xl border overflow-hidden" style={{ background: '#1a1a2e', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="px-5 py-3 border-b text-xs font-bold" style={{ color: 'rgba(255,255,255,0.35)', borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          등록된 광고 ({ads.length}건)
        </div>
        {ads.length === 0 ? (
          <div className="py-12 text-center text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>등록된 광고가 없습니다</div>
        ) : (
          ads.map(ad => (
            <div key={ad.id} className="flex items-center gap-4 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.85)' }}>{ad.name}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,217,255,0.08)', color: 'rgba(0,217,255,0.7)' }}>
                    {positionLabels[ad.position]?.label}
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  광고주: {ad.advertiser} · 시작: {ad.start_date} · 노출: {ad.impressions} · 클릭: {ad.clicks}
                </p>
              </div>

              {/* 활성/비활성 토글 */}
              <button
                onClick={() => toggleAd(ad.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: ad.is_active ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)',
                  color: ad.is_active ? '#22c55e' : 'rgba(255,255,255,0.3)',
                  border: `1px solid ${ad.is_active ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {ad.is_active ? '● 활성' : '○ 비활성'}
              </button>

              <button
                onClick={() => deleteAd(ad.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{ background: 'rgba(239,68,68,0.06)', color: 'rgba(239,68,68,0.6)', border: '1px solid rgba(239,68,68,0.1)' }}
              >
                삭제
              </button>
            </div>
          ))
        )}
      </div>

      {/* 안내 */}
      <div className="mt-6 rounded-xl p-4 border" style={{ background: 'rgba(0,217,255,0.03)', borderColor: 'rgba(0,217,255,0.1)' }}>
        <p className="text-xs font-bold mb-1" style={{ color: 'rgba(0,217,255,0.7)' }}>💡 광고 연동 안내</p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          등록된 광고는 Supabase <code style={{ color: 'rgba(0,217,255,0.6)' }}>ads</code> 테이블 연동 후 사이트에 자동 노출됩니다.
          상단 배너·사이드바·인라인 광고 컴포넌트는 별도로 추가해드릴 수 있습니다.
        </p>
      </div>
    </div>
  )
}
