-- ============================================================
-- ailivenow — Initial Schema
-- 프로젝트: mzrtxmxjggnyyomutjsh
-- ============================================================

-- 섹션 슬러그 타입
CREATE TYPE section_slug AS ENUM (
  'ai-video',
  'ai-medical',
  'ai-legal',
  'ai-software',
  'ai-devices',
  'ai-business',
  'korean-ai',
  'ai-guide'
);

-- ── sections 테이블 ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sections (
  id          SERIAL PRIMARY KEY,
  slug        section_slug UNIQUE NOT NULL,
  name_ko     TEXT NOT NULL,
  name_en     TEXT NOT NULL,
  icon        TEXT NOT NULL,
  description TEXT,
  "order"     INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── sources 테이블 ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sources (
  id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name     TEXT NOT NULL,
  url      TEXT NOT NULL,
  type     TEXT NOT NULL DEFAULT 'rss',  -- 'rss' | 'scrape' | 'api'
  rss_url  TEXT,
  active   BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── articles 테이블 ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title_ko     TEXT NOT NULL,
  title_en     TEXT,
  summary      TEXT NOT NULL DEFAULT '',
  content      TEXT,
  section      section_slug NOT NULL,
  source_url   TEXT,
  source_name  TEXT,
  image_url    TEXT,
  ai_generated BOOLEAN DEFAULT true,
  is_featured  BOOLEAN DEFAULT false,
  is_breaking  BOOLEAN DEFAULT false,
  view_count   INTEGER DEFAULT 0,
  tags         TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── 인덱스 ──────────────────────────────────────────────────
CREATE INDEX idx_articles_section     ON articles(section);
CREATE INDEX idx_articles_published   ON articles(published_at DESC);
CREATE INDEX idx_articles_featured    ON articles(is_featured) WHERE is_featured = true;
CREATE INDEX idx_articles_breaking    ON articles(is_breaking) WHERE is_breaking = true;
CREATE INDEX idx_articles_views       ON articles(view_count DESC);
CREATE INDEX idx_articles_slug        ON articles(slug);

-- ── RLS ─────────────────────────────────────────────────────
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "공개 읽기 — articles" ON articles FOR SELECT USING (true);
CREATE POLICY "공개 읽기 — sections" ON sections FOR SELECT USING (true);
CREATE POLICY "공개 읽기 — sources"  ON sources  FOR SELECT USING (true);

-- ── 조회수 증가 함수 ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION increment_view(p_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE articles SET view_count = view_count + 1 WHERE slug = p_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── updated_at 자동 갱신 트리거 ─────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── sections 기본 데이터 ─────────────────────────────────────
INSERT INTO sections (slug, name_ko, name_en, icon, description, "order") VALUES
  ('ai-video',    'AI 영상',          'AI Video',      '🎬', 'Sora, Runway, 영상 생성 AI',              1),
  ('ai-medical',  'AI 의료',          'AI Medical',    '🏥', 'FDA 승인, 진단 AI, 바이오텍',              2),
  ('ai-legal',    'AI 법률',          'AI Legal',      '⚖️', 'LegalTech, AI 규제, 컴플라이언스',         3),
  ('ai-software', 'AI 신규 소프트웨어','AI Software',   '📰', '출시/업데이트, 오픈소스 모델',              4),
  ('ai-devices',  'AI 기기',          'AI Devices',    '📱', 'AI 폰, 웨어러블, AI 하드웨어',             5),
  ('ai-business', 'AI 기업/투자',     'AI Business',   '💰', '실리콘밸리, 스타트업, VC 투자',            6),
  ('korean-ai',   '한인 AI 비즈니스', 'Korean AI Biz', '🇰🇷', 'LA/실리콘밸리 한인 AI 스타트업 & 커뮤니티', 7),
  ('ai-guide',    'AI 가이드',        'AI Guide',      '📚', '한국어 튜토리얼, 프롬프트 엔지니어링',      8);

-- ── sources 기본 데이터 ──────────────────────────────────────
INSERT INTO sources (name, url, type, rss_url, active) VALUES
  ('TechCrunch AI',         'https://techcrunch.com',            'rss', 'https://techcrunch.com/category/artificial-intelligence/feed/', true),
  ('MIT Technology Review', 'https://technologyreview.com',      'rss', 'https://www.technologyreview.com/feed/',                        true),
  ('STAT News',             'https://statnews.com',              'rss', 'https://www.statnews.com/feed/',                                true),
  ('The Verge AI',          'https://theverge.com',              'rss', 'https://www.theverge.com/rss/index.xml',                       true),
  ('Wired',                 'https://wired.com',                 'rss', 'https://www.wired.com/feed/rss',                               true),
  ('VentureBeat AI',        'https://venturebeat.com',           'rss', 'https://venturebeat.com/feed/',                                true),
  ('Korea JoongAng Daily',  'https://koreajoongangdaily.joins.com', 'scrape', null,                                                     true),
  ('Towards Data Science',  'https://towardsdatascience.com',    'rss', 'https://towardsdatascience.com/feed',                          true);
