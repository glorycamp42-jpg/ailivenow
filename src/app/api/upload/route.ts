import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 파일명 중복 방지
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const supabase = createServerClient()

    // Supabase Storage에 업로드 (버킷: article-images)
    const { error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(filename, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      // Storage 실패 시 로컬 fallback
      return await localFallback(buffer, filename)
    }

    // Public URL 가져오기
    const { data: urlData } = supabase.storage
      .from('article-images')
      .getPublicUrl(filename)

    return NextResponse.json({ url: urlData.publicUrl })
  } catch (error) {
    console.error('업로드 오류:', error)
    return NextResponse.json({ error: '업로드 실패' }, { status: 500 })
  }
}

// Supabase Storage 미설정 시 로컬 저장 fallback
async function localFallback(buffer: Buffer, filename: string) {
  try {
    const { writeFile, mkdir } = await import('fs/promises')
    const path = await import('path')
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(path.join(uploadDir, filename), buffer)
    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (err) {
    console.error('Local fallback failed:', err)
    return NextResponse.json({ error: '업로드 실패' }, { status: 500 })
  }
}
