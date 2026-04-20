/**
 * generate-news.js
 * Claude AI로 상세한 AI 뉴스 기사를 자동 생성하고 Supabase에 업로드
 *
 * 사용법:
 *   node scripts/generate-news.js
 *
 * 필요 환경변수 (.env.local):
 *   ANTHROPIC_API_KEY=sk-ant-...
 *   NEXT_PUBLIC_SUPABASE_URL=https://...
 *   SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
 */

const fs = require('fs')
const path = require('path')

// ──────────────────────────────────────────
// 오늘 생성할 뉴스 주제 목록 (여기에 추가)
// ──────────────────────────────────────────
const NEWS_TOPICS = [
  {
    title_ko: 'OpenAI GPT-5 출시 임박, 성능 벤치마크 유출',
    title_en: 'OpenAI GPT-5 Launch Imminent as Benchmark Leaks Emerge',
    section: 'ai-software',
    source_name: 'The Information',
    tags: ['OpenAI', 'GPT-5', 'LLM', '벤치마크'],
    is_featured: true,
    is_breaking: false,
  },
  {
    title_ko: 'Google DeepMind, 단백질 구조 예측 AI AlphaFold 3 업그레이드',
    title_en: 'Google DeepMind Upgrades AlphaFold 3 for Protein Structure Prediction',
    section: 'ai-medical',
    source_name: 'Nature',
    tags: ['DeepMind', 'AlphaFold', '바이오AI', '신약개발'],
    is_featured: false,
    is_breaking: false,
  },
  {
    title_ko: '엔비디아 GB300 칩 공개, AI 추론 성능 40% 향상',
    title_en: 'NVIDIA Unveils GB300 Chip with 40% Better AI Inference Performance',
    section: 'ai-devices',
    source_name: 'Tom\'s Hardware',
    tags: ['엔비디아', 'GB300', 'GPU', 'AI반도체'],
    is_featured: true,
    is_breaking: true,
  },
]

// ──────────────────────────────────────────
// 유틸 함수
// ──────────────────────────────────────────
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

function generateSlug(title) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'article'
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.random().toString(36).slice(2, 7)
  return `${base}-${date}-${random}`
}

// ──────────────────────────────────────────
// Claude API로 기사 본문 생성
// ──────────────────────────────────────────
async function generateArticleContent(topic, apiKey) {
  const prompt = `당신은 AI 전문 뉴스 기자입니다. 아래 주제로 한국어 AI 뉴스 기사를 작성해주세요.

주제: ${topic.title_ko}
영문 제목: ${topic.title_en}
섹션: ${topic.section}

아래 형식으로 정확히 응답해주세요. 태그 사이에 내용만 넣어주세요:

<SUMMARY>
2-3문장의 핵심 요약 (150자 이상)
</SUMMARY>

<CONTENT>
본문 기사 전체 (최소 1500자, 아래 구조 준수):

[리드] 핵심 사실을 간결하고 임팩트 있게 전달 (200자)

[배경] 이 뉴스가 왜 중요한지, 관련 맥락 설명 (300자)

[주요 내용] 기술적 세부사항, 수치, 스펙 등 구체적으로 (400자)

[업계 반응] 전문가 의견 및 시장 영향 분석 (300자)

[경쟁 구도] 관련 기업들의 동향 비교 (250자)

[향후 전망] 이 기술이 AI 산업에 미칠 영향 (250자)
</CONTENT>

주의: 따옴표나 특수문자 없이 자연스러운 문어체로 작성`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Claude API 오류: ${response.status} ${await response.text()}`)
  }

  const data = await response.json()
  const text = data.content[0].text

  // XML 태그로 파싱 (JSON보다 안정적)
  const summaryMatch = text.match(/<SUMMARY>([\s\S]*?)<\/SUMMARY>/)
  const contentMatch = text.match(/<CONTENT>([\s\S]*?)<\/CONTENT>/)

  if (!summaryMatch || !contentMatch) {
    throw new Error(`태그 파싱 실패. 응답: ${text.slice(0, 200)}`)
  }

  return {
    summary: summaryMatch[1].trim(),
    content: contentMatch[1].trim(),
  }
}

// ──────────────────────────────────────────
// Supabase에 기사 업로드
// ──────────────────────────────────────────
async function uploadArticle(article, supabaseUrl, supabaseKey) {
  // 중복 확인
  const checkRes = await fetch(
    `${supabaseUrl}/rest/v1/articles?slug=eq.${encodeURIComponent(article.slug)}&select=id`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
  )
  const existing = await checkRes.json()
  if (existing.length > 0) return 'skip'

  const res = await fetch(`${supabaseUrl}/rest/v1/articles`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(article),
  })

  return res.ok ? 'ok' : `fail:${await res.text()}`
}

// ──────────────────────────────────────────
// 메인
// ──────────────────────────────────────────
async function main() {
  const env = loadEnv()
  const ANTHROPIC_KEY = env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY
  const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!ANTHROPIC_KEY || ANTHROPIC_KEY.includes('여기에') || !ANTHROPIC_KEY.startsWith('sk-')) {
    console.error('❌ Anthropic API 키가 올바르지 않습니다.')
    console.error('')
    console.error('   1. https://console.anthropic.com 접속')
    console.error('   2. API Keys → Create Key')
    console.error('   3. .env.local 파일에 추가:')
    console.error('      ANTHROPIC_API_KEY=sk-ant-api03-...')
    console.error('')
    process.exit(1)
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Supabase 환경변수가 없습니다.')
    process.exit(1)
  }

  console.log(`🤖 Claude AI로 기사 ${NEWS_TOPICS.length}개 생성 시작...\n`)

  const results = []
  for (const topic of NEWS_TOPICS) {
    try {
      process.stdout.write(`⚡ 생성 중: ${topic.title_ko.slice(0, 35)}... `)

      const { summary, content } = await generateArticleContent(topic, ANTHROPIC_KEY)

      const slug = generateSlug(topic.title_en)
      const article = {
        slug,
        title_ko: topic.title_ko,
        title_en: topic.title_en,
        summary,
        content,
        section: topic.section,
        source_name: topic.source_name,
        source_url: null,
        image_url: `https://picsum.photos/seed/${slug}/800/450`,
        ai_generated: true,
        is_featured: topic.is_featured ?? false,
        is_breaking: topic.is_breaking ?? false,
        tags: topic.tags || [],
        published_at: new Date().toISOString(),
      }

      const uploadResult = await uploadArticle(article, SUPABASE_URL, SUPABASE_KEY)

      if (uploadResult === 'ok') {
        console.log(`✅ (${content.length}자)`)
        results.push({ status: 'ok', article })
      } else if (uploadResult === 'skip') {
        console.log(`⏭️  이미 존재`)
        results.push({ status: 'skip', title: topic.title_ko })
      } else {
        console.log(`❌ ${uploadResult}`)
        results.push({ status: 'fail', title: topic.title_ko })
      }

      // API 레이트 리밋 방지
      await new Promise(r => setTimeout(r, 1000))
    } catch (e) {
      console.log(`❌ 오류: ${e.message}`)
      results.push({ status: 'fail', title: topic.title_ko })
    }
  }

  const ok = results.filter(r => r.status === 'ok').length
  const skip = results.filter(r => r.status === 'skip').length
  const fail = results.filter(r => r.status === 'fail').length

  // 성공한 기사를 content/news/에 백업 저장
  const successArticles = results.filter(r => r.status === 'ok').map(r => r.article)
  if (successArticles.length > 0) {
    const today = new Date().toISOString().slice(0, 10)
    const backupPath = path.join(__dirname, '..', 'content', 'news', `ai_news_${today.replace(/-/g, '')}.json`)
    const existing = fs.existsSync(backupPath) ? JSON.parse(fs.readFileSync(backupPath)) : []
    fs.writeFileSync(backupPath, JSON.stringify([...existing, ...successArticles], null, 2), 'utf-8')
    console.log(`\n💾 백업 저장: content/news/ai_news_${today.replace(/-/g, '')}.json`)
  }

  console.log(`\n🎉 완료! 생성: ${ok}개, 건너뜀: ${skip}개, 실패: ${fail}개`)
  console.log('🌐 사이트에서 확인: https://ailivenow.vercel.app')
}

main()
