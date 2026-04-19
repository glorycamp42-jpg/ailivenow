const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://lsstwhtkofdwqpdhyifg.supabase.co',
  process.env.SUPABASE_KEY
)

async function run() {
  console.log('Fetching articles...')
  const { data, error } = await supabase.from('articles').select('id, slug')
  if (error) { console.error('Error:', error.message); return }
  console.log(`${data.length} articles found`)

  for (const a of data) {
    // 슬러그 전체를 시드로 사용 -> 기사마다 100% 고유한 이미지
    const url = `https://picsum.photos/seed/${a.slug}/800/450`
    const { error: e } = await supabase.from('articles').update({ image_url: url }).eq('id', a.id)
    console.log(e ? `FAIL: ${a.slug}` : `OK: ${a.slug}`)
  }
  console.log('Done!')
}

run()
