import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ailivenow.com'

const sections = [
  'ai-video',
  'ai-medical',
  'ai-legal',
  'ai-programs',
  'ai-devices',
  'ai-business',
  'korean-ai',
  'ai-guide',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sectionRoutes = sections.map(s => ({
    url: `${BASE_URL}/${s}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    ...sectionRoutes,
  ]
}
