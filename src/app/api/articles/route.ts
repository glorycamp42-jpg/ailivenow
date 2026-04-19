import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

// GET /api/articles - 기사 목록 조회
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')
    const featured = searchParams.get('featured')
    const breaking = searchParams.get('breaking')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit)

    const slug = searchParams.get('slug')
    if (slug) query = query.eq('slug', slug)
    if (section) query = query.eq('section', section)
    if (featured === 'true') query = query.eq('is_featured', true)
    if (breaking === 'true') query = query.eq('is_breaking', true)

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/articles - 기사 생성
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    const slug = body.slug || generateSlug(body.title_ko)

    const articleData = {
      slug,
      title_ko: body.title_ko,
      title_en: body.title_en || null,
      summary: body.summary || '',
      content: body.content || null,
      section: body.section,
      source_url: body.source_url || null,
      source_name: body.source_name || null,
      image_url: body.image_url || null,
      ai_generated: body.ai_generated ?? true,
      is_featured: body.is_featured ?? false,
      is_breaking: body.is_breaking ?? false,
      tags: body.tags || [],
      published_at: body.published_at || new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('articles')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(articleData as any)
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, article: data })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/articles?id=xxx - 기사 삭제
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    let id = searchParams.get('id')

    // body에서도 id 읽기 지원
    if (!id) {
      try {
        const body = await request.json()
        id = body.id
      } catch {}
    }

    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 })
    }

    const { error } = await supabase.from('articles').delete().eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateSlug(title: string): string {
  // 한글 제거, 영어/숫자만 남겨서 URL-safe slug 생성
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.random().toString(36).slice(2, 7)
  const prefix = base || 'article'
  return `${prefix}-${date}-${random}`
}
