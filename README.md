# AI Live Now 🤖

**실시간 AI 뉴스 & 인사이트** — 실리콘밸리부터 한인 AI 커뮤니티까지

> Operated by **Kkupo Holdings**

---

## 📋 프로젝트 개요

AI Live Now는 AI 분야의 최신 뉴스를 한국어 기반으로 전달하는 실시간 뉴스 사이트입니다.
8개 전문 섹션, 영문 토글, AI Disclosure 정책, 모바일 반응형 다크 테마를 제공합니다.

## 🗂️ 8개 섹션

| 섹션 | URL | 설명 |
|------|-----|------|
| 🎬 AI 영상 | `/ai-video` | Sora, Runway, 영상 생성 AI |
| 🏥 AI 의료 | `/ai-medical` | FDA 승인, 진단 AI, 바이오텍 |
| ⚖️ AI 법률 | `/ai-legal` | LegalTech, AI 규제 |
| 📰 AI 신규 소프트웨어 | `/ai-software` | 출시/업데이트, 오픈소스 모델 |
| 📱 AI 기기 | `/ai-devices` | AI 폰, 웨어러블, 하드웨어 |
| 💰 AI 기업/투자 | `/ai-business` | 실리콘밸리, 스타트업, VC |
| 🇰🇷 한인 AI 비즈니스 | `/korean-ai` | LA/실리콘밸리 한인 AI |
| 📚 AI 가이드 | `/ai-guide` | 한국어 튜토리얼, 프롬프트 |

---

## 🚀 빠른 시작

```bash
git clone https://github.com/glorycamp42-jpg/ailivenow.git
cd ailivenow
npm install
```

`.env.local` 설정:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mzrtxmxjggnyyomutjsh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SITE_URL=https://ailivenow.com
```

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
```

---

## 🗃️ Supabase 설정

Supabase 대시보드 SQL Editor에서 순서대로 실행:

1. `supabase/migrations/20260417000001_initial_schema.sql`
2. `supabase/seed.sql` (선택 — 더미 기사 24개)

---

## 🛠️ 기술 스택

| 분야 | 기술 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 + shadcn/ui |
| 폰트 | Pretendard (한글) + Inter (영문) |
| 데이터베이스 | Supabase (PostgreSQL + RLS) |
| 배포 | Vercel (Seoul 리전) |
| 디자인 | 다크 테마 (#0a0a0a), 시안 액센트 (#00d9ff) |

---

## 📁 폴더 구조

```
src/
├── app/
│   ├── (sections)/         # 8개 섹션 페이지 (라우트 그룹)
│   ├── article/[slug]/     # 기사 상세 페이지
│   ├── page.tsx            # 핫이슈 메인
│   └── sitemap.ts
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # SectionPage, Sidebar
│   └── ui/                 # ArticleCard
├── i18n/translations.ts    # 한국어/영어 번역
├── lib/
│   ├── context.tsx         # 언어 컨텍스트
│   ├── mockData.ts         # 더미 데이터 24개
│   └── supabase.ts
└── types/database.ts
supabase/
├── migrations/             # DB 마이그레이션
└── seed.sql
```

---

## 🤖 AI Disclosure

이 사이트의 콘텐츠는 AI가 생성 및 큐레이션하며 편집팀이 검수합니다.
사실 오류 또는 저작권 문제 발견 시 즉시 제보해 주세요.
DMCA 신고는 푸터 링크를 통해 접수할 수 있습니다.

---

© 2026 Kkupo Holdings. All rights reserved.
