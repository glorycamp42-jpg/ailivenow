export type Section =
  | 'ai-video'
  | 'ai-medical'
  | 'ai-legal'
  | 'ai-software'
  | 'ai-devices'
  | 'ai-business'
  | 'korean-ai'
  | 'ai-guide'

export interface Article {
  id: string
  slug: string
  title_ko: string
  title_en: string | null
  summary: string
  content: string | null
  section: Section
  source_url: string | null
  source_name: string | null
  image_url: string | null
  ai_generated: boolean
  is_featured: boolean
  is_breaking: boolean
  view_count: number
  tags: string[]
  published_at: string
  created_at: string
  updated_at: string
}

export interface SectionMeta {
  id: number
  slug: Section
  name_ko: string
  name_en: string
  icon: string
  description: string | null
  order: number
  created_at: string
}

export interface Source {
  id: string
  name: string
  url: string
  type: 'rss' | 'scrape' | 'api'
  rss_url: string | null
  active: boolean
  created_at: string
}

export type AdPosition = 'banner_top' | 'banner_bottom' | 'sidebar' | 'inline'

export interface Ad {
  id: string
  name: string
  advertiser: string
  position: AdPosition
  image_url: string
  link_url: string
  is_active: boolean
  start_date: string
  end_date: string | null
  impressions: number
  clicks: number
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: Article
        Insert: Omit<Article, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Article, 'id' | 'created_at'>>
      }
      sections: {
        Row: SectionMeta
        Insert: Omit<SectionMeta, 'id' | 'created_at'>
        Update: Partial<Omit<SectionMeta, 'id' | 'created_at'>>
      }
      sources: {
        Row: Source
        Insert: Omit<Source, 'id' | 'created_at'>
        Update: Partial<Omit<Source, 'id' | 'created_at'>>
      }
      ads: {
        Row: Ad
        Insert: Omit<Ad, 'id' | 'created_at' | 'updated_at' | 'impressions' | 'clicks'>
        Update: Partial<Omit<Ad, 'id' | 'created_at'>>
      }
    }
  }
}
