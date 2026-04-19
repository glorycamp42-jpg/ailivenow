import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/context'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'AI Live Now — 실시간 AI 뉴스 & 인사이트',
  description: '실리콘밸리부터 한인 AI 커뮤니티까지, AI 영상·의료·법률·소프트웨어·기기·투자·한인 AI 비즈니스·가이드를 실시간으로 전달합니다.',
  keywords: ['AI뉴스', 'AI', '인공지능', '한국어AI', '실리콘밸리', 'AI의료', 'AI법률', 'AI투자'],
  openGraph: {
    title: 'AI Live Now — 실시간 AI 뉴스',
    description: '한국어로 읽는 실시간 AI 뉴스',
    siteName: 'AI Live Now',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <LangProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  )
}
