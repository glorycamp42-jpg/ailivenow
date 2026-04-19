'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { Lang } from '@/i18n/translations'
import { translations } from '@/i18n/translations'

interface LangContextType {
  lang: Lang
  t: typeof translations.ko
  toggleLang: () => void
}

const LangContext = createContext<LangContextType>({
  lang: 'ko',
  t: translations.ko,
  toggleLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko')
  const t = translations[lang]
  const toggleLang = () => setLang(l => (l === 'ko' ? 'en' : 'ko'))
  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
