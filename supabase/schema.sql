-- ailivenow Supabase Schema
-- 프로젝트 ID: mzrtxmxjggnyyomutjsh

-- 카테고리 타입
CREATE TYPE category_type AS ENUM (
  'ai-video',
  'ai-medical',
  'ai-legal',
  'ai-programs',
  'ai-devices',
  'ai-business',
  'korean-ai',
  'ai-guide',
  'hot-issue'
);

-- 소스 테이블
CREATE TABLE IF NOT EXISTS sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category category_type NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기사 테이블
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ko TEXT NOT NULL,
  title_en TEXT,
  summary_ko TEXT NOT NULL DEFAULT '',
  summary_en TEXT,
  content_ko TEXT,
  content_en TEXT,
  category category_type NOT NULL,
  source_url TEXT,
  image_url TEXT,
  author TEXT DEFAULT 'AI Live Now',
  is_ai_generated BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_breaking BOOLEAN DEFAULT false
);

-- 인덱스
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_is_featured ON articles(is_featured) WHERE is_featured = true;
CREATE INDEX idx_articles_is_breaking ON articles(is_breaking) WHERE is_breaking = true;
CREATE INDEX idx_articles_view_count ON articles(view_count DESC);

-- RLS 활성화
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read sources" ON sources FOR SELECT USING (true);

-- 조회수 업데이트 함수
CREATE OR REPLACE FUNCTION increment_view_count(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE articles SET view_count = view_count + 1 WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 업데이트 타임스탬프 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 샘플 데이터 (소스)
INSERT INTO sources (name, url, category) VALUES
  ('TechCrunch', 'https://techcrunch.com', 'ai-business'),
  ('MIT Technology Review', 'https://technologyreview.com', 'ai-programs'),
  ('STAT News', 'https://statnews.com', 'ai-medical'),
  ('The Verge', 'https://theverge.com', 'ai-devices'),
  ('Wired', 'https://wired.com', 'ai-video'),
  ('Bloomberg Law', 'https://bloomberglaw.com', 'ai-legal'),
  ('Korea JoongAng Daily', 'https://koreajoongangdaily.joins.com', 'korean-ai'),
  ('Towards Data Science', 'https://towardsdatascience.com', 'ai-guide');
