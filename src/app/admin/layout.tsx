'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: '대시보드', icon: '📊', exact: true },
  { href: '/admin/articles', label: '글 관리', icon: '📰' },
  { href: '/admin/articles/new', label: '새 글 작성', icon: '✏️' },
  { href: '/admin/ads', label: '광고 관리', icon: '📢' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex" style={{ background: '#0f0f1a', color: '#f0f0f5' }}>
      {/* 사이드바 */}
      <aside className="w-56 shrink-0 flex flex-col border-r" style={{ background: '#13131f', borderColor: 'rgba(255,255,255,0.06)' }}>
        {/* 로고 */}
        <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Link href="/" className="block">
            <div className="text-xs font-black tracking-widest mb-0.5" style={{ color: 'rgba(0,217,255,0.6)' }}>AI LIVE NOW</div>
            <div className="text-lg font-black" style={{ color: '#f0f0f5' }}>어드민</div>
          </Link>
        </div>

        {/* 네비게이션 */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {navItems.map(item => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && !(item.exact === undefined && item.href === '/admin' && pathname !== '/admin')
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: isActive ? 'rgba(0,217,255,0.1)' : 'transparent',
                  color: isActive ? '#00d9ff' : 'rgba(255,255,255,0.55)',
                  border: isActive ? '1px solid rgba(0,217,255,0.2)' : '1px solid transparent',
                }}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* 사이트 바로가기 */}
        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all"
            style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.03)' }}
          >
            <span>🌐</span> 사이트 보기 ↗
          </Link>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
