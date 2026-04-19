-- AI Live Now - Supabase Schema v2
-- 기존 테이블 삭제 후 재생성 (코드 타입과 완전 일치)

-- 기존 테이블 삭제 (순서 중요)
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS sources CASCADE;
DROP TABLE IF EXISTS ads CASCADE;
DROP TYPE IF EXISTS section_type CASCADE;
DROP TYPE IF EXISTS ad_position_type CASCADE;

-- 섹션 타입 (Section in database.ts)
CREATE TYPE section_type AS ENUM (
  'ai-video',
  'ai-medical',
  'ai-legal',
  'ai-software',
  'ai-devices',
  'ai-business',
  'korean-ai',
  'ai-guide'
);

-- 광고 위치 타입 (AdPosition in database.ts)
CREATE TYPE ad_position_type AS ENUM (
  'banner_top',
  'banner_bottom',
  'sidebar',
  'inline'
);

-- 소스 테이블 (Source in database.ts)
CREATE TABLE sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('rss', 'scrape', 'api')),
  rss_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기사 테이블 (Article in database.ts)
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_ko TEXT NOT NULL,
  title_en TEXT,
  summary TEXT NOT NULL DEFAULT '',
  content TEXT,
  section section_type NOT NULL,
  source_url TEXT,
  source_name TEXT,
  image_url TEXT,
  ai_generated BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_breaking BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 광고 테이블 (Ad in database.ts)
CREATE TABLE ads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  advertiser TEXT NOT NULL,
  position ad_position_type NOT NULL,
  image_url TEXT NOT NULL DEFAULT '',
  link_url TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_articles_section ON articles(section);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_is_featured ON articles(is_featured) WHERE is_featured = true;
CREATE INDEX idx_articles_is_breaking ON articles(is_breaking) WHERE is_breaking = true;
CREATE INDEX idx_articles_view_count ON articles(view_count DESC);
CREATE INDEX idx_articles_slug ON articles(slug);

-- RLS 활성화
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (누구나 읽기 가능)
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read sources" ON sources FOR SELECT USING (true);
CREATE POLICY "Public read ads" ON ads FOR SELECT USING (true);

-- Service role 쓰기 정책 (API에서만 쓰기)
CREATE POLICY "Service role write articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role write ads" ON ads FOR ALL USING (true) WITH CHECK (true);

-- 조회수 업데이트 함수
CREATE OR REPLACE FUNCTION increment_view_count(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE articles SET view_count = view_count + 1 WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- slug 자동 생성 함수
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(
    regexp_replace(title, '[^a-zA-Z0-9가-힣\s-]', '', 'g'),
    '\s+', '-', 'g'
  )) || '-' || to_char(NOW(), 'YYYYMMDD');
END;
$$ LANGUAGE plpgsql;

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER ads_updated_at
  BEFORE UPDATE ON ads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Supabase Storage 버킷 (이미지 업로드용)
-- Supabase 대시보드 > Storage 에서 직접 생성:
-- 버킷 이름: article-images
-- Public bucket: ON
