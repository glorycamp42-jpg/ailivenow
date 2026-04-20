/**
 * publish-news.js
 * JSON 파일의 기사를 Supabase에 업로드하는 스크립트
 *
 * 사용법: node scripts/publish-news.js [json파일경로]
 * 예시:  node scripts/publish-news.js ai_news_20260419.json
 */

const fs = require('fs')
const path = require('path')

// .env.local 파일에서 환경변수 읽기
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '..', '.env.local')
    const content = fs.readFileSync(envPath, 'utf-8')
    const env = {}
    content.split('\n').forEach(line => {
      const [key, ...vals] = line.split('=')
      if (key && vals.length) env[key.trim()] = vals.join('=').trim()
    })
    return env
  } catch {
    return {}
  }
}

async function main() {
  const env = loadEnv()
  const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Supabase URL 또는 키가 없습니다. .env.local 파일을 확인하세요.')
    process.exit(1)
  }

  // JSON 파일 경로
  const jsonFile = process.argv[2]
  if (!jsonFile) {
    console.error('❌ JSON 파일 경로를 입력하세요.')
    console.error('   사용법: node scripts/publish-news.js ai_news_20260419.json')
    process.exit(1)
  }

  const filePath = path.resolve(process.cwd(), jsonFile)
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 파일을 찾을 수 없습니다: ${filePath}`)
    process.exit(1)
  }

  const articles = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  console.log(`📰 총 ${articles.length}개 기사를 업로드합니다...\n`)

  let success = 0, fail = 0, skip = 0

  for (const article of articles) {
    try {
      // 중복 확인
      const checkRes = await fetch(
        `${SUPABASE_URL}/rest/v1/articles?slug=eq.${encodeURIComponent(article.slug)}&select=id`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      )
      const existing = await checkRes.json()
      if (existing.length > 0) {
        console.log(`⏭️  이미 존재: ${article.slug}`)
        skip++
        continue
      }

      // 삽입
      const res = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(article)
      })

      if (res.ok) {
        console.log(`✅ 업로드 완료: ${article.title_ko?.slice(0, 40)}`)
        success++
      } else {
        const err = await res.text()
        console.log(`❌ 실패: ${article.slug} - ${err}`)
        fail++
      }
    } catch (e) {
      console.log(`❌ 오류: ${article.slug} - ${e.message}`)
      fail++
    }
  }

  console.log(`\n🎉 완료! 성공: ${success}개, 건너뜀: ${skip}개, 실패: ${fail}개`)
}

main()
