-- ============================================================
-- ailivenow — Seed Data (각 섹션당 3개, 총 24개 더미 기사)
-- ============================================================

INSERT INTO articles
  (slug, title_ko, title_en, summary, content, section, source_url, source_name, image_url, ai_generated, is_featured, is_breaking, view_count, tags)
VALUES

-- ── AI 영상 (ai-video) ────────────────────────────────────────
(
  'sora-4k-update-2026',
  'OpenAI Sora, 4K 영상 생성 업데이트 — 실사 수준 퀄리티 달성',
  'OpenAI Sora Updates to 4K Generation — Photorealistic Quality Achieved',
  'OpenAI가 텍스트-영상 AI Sora의 대규모 업데이트를 발표했다. 최대 4K 해상도의 영상 생성이 가능해졌으며 실사에 가까운 퀄리티를 구현했다.',
  '## OpenAI Sora 4K 업데이트

OpenAI가 자사의 텍스트-영상 AI 모델 Sora에 대한 대규모 업데이트를 공개했다. 이번 업데이트의 핵심은 최대 4K 해상도 지원으로, 기존 1080p 대비 4배 선명한 영상을 생성할 수 있게 됐다.

### 주요 기능 개선
- **해상도**: 최대 4K (3840×2160) 지원
- **길이**: 최대 2분 영상 생성 가능
- **일관성**: 장면 전환 시 캐릭터/오브젝트 일관성 대폭 향상
- **속도**: 이전 대비 30% 빠른 생성 속도

OpenAI CEO 샘 알트먼은 "Sora는 창작자들이 상상하는 모든 것을 화면에 구현하는 도구"라고 밝혔다.',
  'ai-video',
  'https://openai.com/sora',
  'OpenAI Blog',
  'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1200&q=80',
  true, true, true, 8420,
  ARRAY['Sora', 'OpenAI', '영상생성', '4K']
),
(
  'runway-gen3-hollywood-deal',
  'Runway Gen-3 Alpha, 할리우드 스튜디오와 파트너십 체결',
  'Runway Gen-3 Alpha Signs Partnership with Hollywood Studios',
  'AI 영상 생성 스타트업 Runway가 주요 할리우드 스튜디오와 Gen-3 Alpha 기술 협업 계약을 체결했다.',
  '## Runway, 엔터테인먼트 시장 공략

AI 영상 스타트업 Runway가 할리우드 주요 스튜디오들과 전략적 파트너십을 체결했다. 이번 파트너십은 Gen-3 Alpha 모델을 영화 제작 파이프라인에 통합하는 것을 목표로 한다.

협약에 따라 스튜디오들은 시각효과(VFX), 애니메이션, 콘셉트 아트 등 여러 분야에서 Runway 기술을 활용할 예정이다.',
  'ai-video',
  'https://runwayml.com',
  'Runway Blog',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80',
  true, false, false, 3210,
  ARRAY['Runway', 'Gen-3', '할리우드', 'VFX']
),
(
  'kling-video-ai-korea-2026',
  'Kling AI, 한국어 프롬프트 지원 — 국내 크리에이터 반응 폭발적',
  'Kling AI Adds Korean Prompt Support — Explosive Response from Korean Creators',
  '중국 AI 스타트업 Kuaishou의 영상 생성 AI Kling이 한국어 프롬프트를 공식 지원하기 시작했다. 국내 크리에이터 커뮤니티에서 큰 반향을 일으키고 있다.',
  '## Kling AI 한국어 지원 시작

Kuaishou의 텍스트-영상 모델 Kling이 한국어 입력을 공식 지원하면서 국내 콘텐츠 창작자들 사이에서 빠르게 확산되고 있다.

특히 유튜브 쇼츠 및 틱톡용 단편 영상 제작에 활발히 활용되고 있으며, 출시 일주일 만에 국내 가입자 10만 명을 돌파했다.',
  'ai-video',
  'https://kling.kuaishou.com',
  'Kling AI',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80',
  true, false, false, 2180,
  ARRAY['Kling', 'Kuaishou', '영상AI', '한국어']
),

-- ── AI 의료 (ai-medical) ──────────────────────────────────────
(
  'fda-ai-cancer-diagnostic-2026',
  'FDA, AI 기반 암 조기 진단 알고리즘 3종 승인 — 정확도 97%',
  'FDA Approves 3 AI Cancer Diagnostic Algorithms with 97% Accuracy',
  'FDA가 AI 기반 암 조기 진단 알고리즘 3종을 공식 승인했다. 임상시험에서 97%의 정확도를 달성한 것으로 확인됐다.',
  '## FDA, AI 의료 기기 승인 확대

FDA(미국식품의약국)가 AI 기반 암 조기 진단 알고리즘 3종에 대한 공식 승인을 발표했다. 이번 승인된 알고리즘은 유방암, 폐암, 대장암 각각을 대상으로 한다.

임상시험 결과 97%의 정확도를 기록했으며, 특히 조기 발견율에서 기존 방법 대비 23% 향상된 성과를 보였다.',
  'ai-medical',
  'https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices',
  'FDA',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
  true, true, false, 11200,
  ARRAY['FDA', 'AI의료', '암진단', '승인']
),
(
  'deepmind-alphafold3-record',
  'Google DeepMind, AlphaFold3로 단백질 예측 정확도 신기록 경신',
  'Google DeepMind Sets New Protein Folding Accuracy Record with AlphaFold3',
  'Google DeepMind가 AlphaFold3를 통해 단백질 구조 예측에서 역대 최고 정확도를 기록했다. 신약 개발 혁명이 예고된다.',
  '## AlphaFold3의 혁신

Google DeepMind가 AlphaFold3 모델로 단백질 구조 예측 정확도에서 새로운 기록을 세웠다. 이번 결과는 Nature 저널에 게재됐으며, 신약 개발 주기를 수년에서 수개월로 단축할 가능성을 보여준다.',
  'ai-medical',
  'https://deepmind.google/alphafold',
  'Google DeepMind',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80',
  true, false, false, 7830,
  ARRAY['DeepMind', 'AlphaFold3', '신약개발', '단백질']
),
(
  'ai-mental-health-therapy-2026',
  'AI 정신건강 상담 앱, 미국 보험 적용 첫 사례 등장',
  'AI Mental Health App Becomes First to Gain US Insurance Coverage',
  'AI 기반 정신건강 상담 플랫폼이 미국 메이저 보험사의 보험 적용을 받는 첫 사례가 등장했다. AI 의료 보험 커버리지의 새로운 이정표다.',
  '## AI 정신건강 앱 보험 적용

AI 기반 정신건강 상담 서비스 Woebot Health가 미국 주요 보험사 3곳에서 보험 적용 대상으로 지정됐다. 월 $30 미만의 공동 부담금으로 AI 상담 서비스를 이용할 수 있게 됐다.',
  'ai-medical',
  'https://woebothealth.com',
  'Woebot Health',
  'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1200&q=80',
  true, false, false, 4560,
  ARRAY['정신건강', 'AI상담', '보험', 'Woebot']
),

-- ── AI 법률 (ai-legal) ──────────────────────────────────────
(
  'eu-ai-act-regulations-2026',
  'EU AI Act 세부 규정 발표 — 고위험 AI 시스템 의무화 조항 확정',
  'EU AI Act Regulations Released — High-Risk AI Requirements Finalized',
  'EU가 AI Act의 세부 구현 규정을 발표했다. 고위험 AI 시스템에 대한 의무 요건이 확정되며 기업들의 대응이 촉구된다.',
  '## EU AI Act 시행 로드맵

EU 집행위원회가 AI Act의 세부 시행 규정을 공표했다. 핵심 내용은 고위험 AI 시스템에 대한 필수 인증 절차 및 투명성 의무다.

주요 시행 일정:
- **2026년 8월**: 금지 AI 관행 적용
- **2027년 1월**: 고위험 AI 요건 완전 시행
- **2027년 하반기**: 범용 AI 모델 규제 시행',
  'ai-legal',
  'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
  'European Commission',
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
  true, true, false, 9870,
  ARRAY['EU AI Act', 'AI규제', 'LegalTech', '컴플라이언스']
),
(
  'ai-copyright-lawsuit-update-2026',
  'AI 저작권 소송 업데이트 — 미국 연방법원, 학습 데이터 사용 판단',
  'AI Copyright Lawsuit Update — US Federal Court Rules on Training Data Use',
  '미국 연방법원이 AI 모델 학습 데이터 사용에 관한 저작권 소송에서 중요한 중간 판결을 내렸다.',
  '## 연방법원 AI 저작권 판결

캘리포니아 북부 연방지방법원이 AI 회사들의 학습 데이터 사용이 공정 이용(Fair Use)에 해당하는지 여부에 대해 부분적 판결을 내렸다. 법원은 학습 데이터 사용 자체는 공정 이용으로 볼 수 있으나, 생성물이 원저작물과 실질적으로 유사한 경우 저작권 침해가 될 수 있다고 판시했다.',
  'ai-legal',
  'https://www.courtlistener.com',
  'CourtListener',
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80',
  true, false, false, 6540,
  ARRAY['저작권', 'AI소송', '공정이용', '연방법원']
),
(
  'korea-ai-law-amendment-2026',
  '한국 AI 기본법 개정안 국회 통과 — 국내 AI 기업 규제 기준 확정',
  'Korea AI Framework Law Amendment Passes National Assembly',
  '대한민국 국회가 AI 기본법 개정안을 통과시켰다. 국내 AI 기업에 대한 구체적인 규제 기준이 확정됐다.',
  '## 한국 AI 기본법 개정 주요 내용

국회를 통과한 AI 기본법 개정안의 핵심 내용:

1. **고위험 AI 사전 신고제**: 의료·금융·교육 분야 AI는 출시 전 정부 신고 의무화
2. **AI 생성 콘텐츠 표시 의무**: 딥페이크 등 AI 생성 콘텐츠 명시 의무화
3. **AI 사고 보고 체계**: 중대 AI 오작동 발생 시 72시간 내 당국 보고',
  'ai-legal',
  'https://www.assembly.go.kr',
  '국회 의안정보시스템',
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80',
  true, false, false, 5120,
  ARRAY['한국AI법', 'AI기본법', '국회', '규제']
),

-- ── AI 신규 소프트웨어 (ai-software) ────────────────────────
(
  'claude-4-launch-2026',
  'Anthropic Claude 4 공식 출시 — 멀티모달 추론 능력 획기적 향상',
  'Anthropic Officially Launches Claude 4 — Multimodal Reasoning Dramatically Improved',
  'Anthropic이 Claude 4를 공식 출시했다. 이미지, 오디오, 코드 처리 능력이 크게 향상됐으며 기업용 API도 함께 공개됐다.',
  '## Claude 4 출시 — AI 업계 지형 변화

Anthropic이 차세대 AI 모델 Claude 4를 공식 출시하며 AI 시장에 파장을 일으키고 있다.

### Claude 4 핵심 성능 지표
| 벤치마크 | Claude 3.5 | Claude 4 | 향상률 |
|--------|-----------|---------|------|
| MMLU   | 88.7%     | 94.2%   | +5.5%p |
| HumanEval | 92%  | 97%     | +5%p  |
| MATH   | 71%       | 83%     | +12%p |

가격은 입력 토큰 $3/1M, 출력 토큰 $15/1M으로 책정됐다.',
  'ai-software',
  'https://anthropic.com/claude',
  'Anthropic',
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
  true, true, true, 18500,
  ARRAY['Anthropic', 'Claude4', '출시', 'LLM']
),
(
  'meta-llama4-open-source',
  'Meta, Llama 4 오픈소스 공개 — 상업적 무료 사용 허용',
  'Meta Releases Llama 4 Open Source — Free for Commercial Use',
  'Meta가 Llama 4 모델을 오픈소스로 공개했다. 상업적 사용도 무료로 허용돼 AI 민주화에 한 발짝 더 다가섰다.',
  '## Llama 4: AI 민주화의 새 장

Meta AI가 Llama 4 모델을 오픈소스로 공개하며 AI 업계의 지형을 다시 한번 뒤흔들었다.

Llama 4는 8B, 70B, 400B 세 가지 파라미터 버전으로 제공되며, 모두 상업적 사용이 무료다. 특히 400B 모델은 GPT-4o와 동등한 수준의 성능을 보인다는 벤치마크 결과가 공개됐다.',
  'ai-software',
  'https://ai.meta.com/llama',
  'Meta AI',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80',
  true, true, false, 15200,
  ARRAY['Meta', 'Llama4', '오픈소스', 'LLM']
),
(
  'google-gemini-2-ultra-update',
  'Google Gemini 2 Ultra, 코딩 능력 1위 달성 — 개발자 도구 강화',
  'Google Gemini 2 Ultra Tops Coding Benchmark — Developer Tools Enhanced',
  'Google이 Gemini 2 Ultra의 업데이트를 발표했다. 코딩 능력 벤치마크에서 1위를 달성하며 개발자 생태계 공략에 나섰다.',
  '## Gemini 2 Ultra 코딩 업데이트

Google의 Gemini 2 Ultra가 HumanEval, SWE-bench 등 주요 코딩 벤치마크에서 1위를 차지하며 개발자 시장에서의 경쟁력을 입증했다.

특히 Google은 이번 업데이트와 함께 VS Code, JetBrains, Android Studio 등 주요 IDE와의 통합을 대폭 강화했다.',
  'ai-software',
  'https://gemini.google.com',
  'Google DeepMind',
  'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=1200&q=80',
  true, false, false, 9340,
  ARRAY['Google', 'Gemini2', '코딩AI', '개발자']
),

-- ── AI 기기 (ai-devices) ────────────────────────────────────
(
  'samsung-galaxy-s25-ultra-ai-benchmark',
  'Samsung Galaxy S25 Ultra, 온디바이스 AI 성능 벤치마크 1위 기록',
  'Samsung Galaxy S25 Ultra Takes Top Spot in On-Device AI Benchmark',
  'Samsung의 Galaxy S25 Ultra가 온디바이스 AI 성능 벤치마크에서 1위를 차지했다. 자체 AI 칩셋 Exynos 3000의 성능이 돋보인다.',
  '## Galaxy S25 Ultra AI 성능

Samsung이 MWC 2026에서 공개한 Galaxy S25 Ultra가 AnTuTu AI 벤치마크에서 역대 최고 점수를 기록했다.

Exynos 3000 칩셋에 내장된 NPU(신경망 처리 장치)는 초당 100TOPS(Tera Operations Per Second)를 달성해 Apple A19 Pro를 앞섰다.',
  'ai-devices',
  'https://samsung.com/galaxy-s25',
  'Samsung Newsroom',
  'https://images.unsplash.com/photo-1598327105854-4a4a62ab3cd8?w=1200&q=80',
  true, false, false, 6730,
  ARRAY['Samsung', 'GalaxyS25', '온디바이스AI', 'Exynos']
),
(
  'apple-vision-pro-2-ai-update',
  'Apple Vision Pro 2 AI 기능 업데이트 — 공간 컴퓨팅의 새 차원',
  'Apple Vision Pro 2 AI Feature Update — New Dimension of Spatial Computing',
  'Apple이 Vision Pro 2의 AI 기능 대규모 업데이트를 공개했다. 공간 인식 AI와 실시간 번역 기능이 추가됐다.',
  '## Vision Pro 2 AI 업데이트 상세

Apple의 최신 Vision Pro 2 소프트웨어 업데이트(visionOS 3.0)에는 다음 기능이 포함됐다:

- **Live Translation**: 실시간 27개 언어 음성 번역 + 자막 오버레이
- **Scene Understanding Pro**: 주변 환경의 3D 공간 인식 정확도 2배 향상
- **AI Eye Contact**: 영상 통화 시 카메라를 보지 않아도 눈을 마주치는 효과',
  'ai-devices',
  'https://apple.com/apple-vision-pro',
  'Apple',
  'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&q=80',
  true, false, false, 5890,
  ARRAY['Apple', 'VisionPro', '공간컴퓨팅', 'AI기기']
),
(
  'humane-ai-pin-2-launch',
  'Humane AI Pin 2세대 출시 — 스마트폰 없이 AI 비서 완성',
  'Humane AI Pin 2nd Gen Launches — Complete AI Assistant Without Smartphone',
  'Humane이 AI Pin 2세대를 공개했다. 배터리 수명과 응답 속도를 대폭 개선해 스마트폰 대체 가능성을 높였다.',
  '## Humane AI Pin 2: 완성형에 가까워지다

1세대의 아쉬움을 보완한 AI Pin 2세대가 공개됐다. 주요 개선 사항:

- 배터리: 6시간 → 14시간 (배터리팩 포함 28시간)
- 응답 속도: 평균 3.2초 → 0.8초
- 카메라: 13MP → 50MP
- 가격: $699 (1세대 $699 대비 동일 유지)',
  'ai-devices',
  'https://humane.com',
  'Humane',
  'https://images.unsplash.com/photo-1508614999368-9260051292e5?w=1200&q=80',
  true, false, false, 4120,
  ARRAY['Humane', 'AIPin', '웨어러블', '스마트기기']
),

-- ── AI 기업/투자 (ai-business) ──────────────────────────────
(
  'openai-300b-valuation-2026',
  'OpenAI 기업가치 $3,000억 돌파 — 역대 최대 VC 펀딩 완료',
  'OpenAI Surpasses $300B Valuation — Largest Ever VC Funding Completed',
  'OpenAI가 최신 펀딩 라운드를 완료하며 기업가치 3,000억 달러를 돌파했다. AI 업계 역대 최고 밸류에이션이다.',
  '## OpenAI $300B 클럽 입성

OpenAI가 SoftBank, Microsoft, NVIDIA 등이 참여한 최신 펀딩 라운드를 완료하며 기업가치 3,000억 달러(약 400조 원)를 달성했다.

이번 라운드에서 조달한 금액은 400억 달러로, 단일 펀딩 라운드로는 역대 최대 규모다.',
  'ai-business',
  'https://openai.com',
  'OpenAI',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
  true, true, false, 21000,
  ARRAY['OpenAI', '투자', '기업가치', 'VC']
),
(
  'anthropic-series-e-2026',
  'Anthropic, Series E 100억 달러 유치 — Google·Amazon 추가 투자',
  'Anthropic Raises $10B Series E — Google and Amazon Lead Follow-On',
  'Anthropic이 구글과 아마존이 주도하는 Series E 라운드에서 100억 달러를 유치했다. 기업가치는 800억 달러로 평가됐다.',
  '## Anthropic의 Series E 투자 유치

Anthropic이 Google과 Amazon이 공동 주도하는 Series E 라운드에서 100억 달러를 성공적으로 유치했다. 이번 라운드를 통해 Anthropic의 기업가치는 800억 달러로 평가됐다.

조달 자금은 Claude 5 개발, 안전 연구, 글로벌 데이터센터 확장에 사용될 예정이다.',
  'ai-business',
  'https://anthropic.com',
  'Anthropic',
  'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&q=80',
  true, false, false, 12300,
  ARRAY['Anthropic', '투자', 'SeriesE', 'Google', 'Amazon']
),
(
  'korea-ai-startup-investment-2026',
  '한국 AI 스타트업 2025 투자 결산 — 총 3조 원 사상 최대 기록',
  'Korean AI Startup Investment 2025 Summary — Record 3 Trillion KRW',
  '2025년 한국 AI 스타트업 투자가 사상 최대인 3조 원을 돌파했다. AI 바이오, AI 제조, AI 교육 분야에 투자가 집중됐다.',
  '## 한국 AI 투자 생태계 2025 결산

중소벤처기업부와 벤처캐피탈협회에 따르면 2025년 국내 AI 스타트업에 대한 투자 총액이 3조 1,200억 원으로 사상 최대치를 기록했다.

분야별 투자 현황:
- AI 바이오: 8,400억 원 (27%)
- AI 제조/로봇: 7,200억 원 (23%)
- AI SaaS: 6,000억 원 (19%)
- AI 교육: 4,800억 원 (15%)
- 기타 AI: 4,800억 원 (16%)',
  'ai-business',
  'https://www.mss.go.kr',
  '중소벤처기업부',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  true, false, false, 8970,
  ARRAY['한국스타트업', 'AI투자', 'VC', '2025결산']
),

-- ── 한인 AI 비즈니스 (korean-ai) ────────────────────────────
(
  'la-koreatown-ai-hub-open',
  'LA 한인타운 AI 스타트업 허브 그랜드 오픈 — 10개사 첫 입주',
  'LA Koreatown AI Startup Hub Grand Opens — 10 Companies Move In',
  'LA 한인타운에 AI 전문 스타트업 허브 "KAI Hub"가 오픈했다. 10개의 한인 AI 스타트업이 첫 입주자로 확정됐다.',
  '## KAI Hub: LA 한인 AI 생태계의 새 중심

로스앤젤레스 한인타운 중심부에 위치한 "KAI Hub(Korean AI Innovation Hub)"가 공식 오픈했다. 15,000 평방피트 규모의 이 공간에는 코워킹 스페이스, 이벤트홀, 투자자 미팅룸, AI 데모 센터가 갖춰져 있다.

첫 입주 10개사는 AI 헬스케어, AI 번역, AI 부동산, AI 교육 등 다양한 분야에 걸쳐 있으며, 모두 한국계 창업자가 이끌고 있다.',
  'korean-ai',
  'https://kaihub.la',
  'KAI Hub',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80',
  true, true, false, 5430,
  ARRAY['LA한인타운', 'KAIHub', 'AI스타트업', '한인커뮤니티']
),
(
  'kai-network-silicon-valley-5000',
  '실리콘밸리 한인 AI 개발자 네트워크 "KAI" 창립 — 회원 5,000명 돌파',
  'Silicon Valley Korean AI Developer Network "KAI" Founded — 5,000 Members',
  '실리콘밸리에서 한인 AI 개발자 네트워크 KAI가 창립됐다. 창립 한 달 만에 5,000명을 모집했다.',
  '## KAI 네트워크 창립 스토리

Google, Meta, OpenAI 등 빅테크에 재직 중인 한인 AI 엔지니어들이 주도해 설립한 KAI(Korean AI professionals) 네트워크가 창립 한 달 만에 회원 5,000명을 달성했다.

KAI는 월 1회 실리콘밸리에서 오프라인 밋업을 개최하며, 한인 AI 스타트업과 대기업 간의 브릿지 역할을 목표로 한다.',
  'korean-ai',
  'https://kainetwork.us',
  'KAI Network',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
  true, true, false, 4210,
  ARRAY['실리콘밸리', '한인개발자', 'KAI', '네트워킹']
),
(
  'korean-ai-startup-y-combinator-2026',
  '한인 AI 스타트업 4곳, YC 2026 봄 배치 동시 선발',
  '4 Korean-Founded AI Startups Selected for YC Spring 2026 Batch',
  'Y Combinator 2026 봄 배치에 한인 창업자가 설립한 AI 스타트업 4곳이 동시에 선발됐다. 역대 최다 기록이다.',
  '## YC 2026 S26 배치 한인 스타트업

Y Combinator의 2026 봄 배치(S26)에 한인 창업자 AI 스타트업 4곳이 선발됐다. 이는 역대 단일 배치 기준 최다 기록이다.

선발된 스타트업:
1. **MediAI Korea** - AI 기반 한국어 의료 차트 자동화
2. **LegalFlow** - 한국 법률 문서 AI 분석 플랫폼
3. **EduMind** - K-12 개인화 학습 AI (한국·미국 동시 타겟)
4. **FactoryBot** - AI 기반 중소기업 제조 공정 최적화',
  'korean-ai',
  'https://ycombinator.com/companies',
  'Y Combinator',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  true, false, false, 7890,
  ARRAY['YC', 'Y컴비네이터', '한인스타트업', '스타트업']
),

-- ── AI 가이드 (ai-guide) ────────────────────────────────────
(
  'chatgpt-prompt-engineering-complete-guide-ko',
  '[완전 가이드] ChatGPT 프롬프트 엔지니어링 A to Z — 한국어 버전',
  '[Complete Guide] ChatGPT Prompt Engineering A to Z — Korean Edition',
  '한국어 사용자를 위한 ChatGPT 프롬프트 엔지니어링 완전 가이드. 기초부터 고급 기법까지 단계별로 설명한다.',
  '## ChatGPT 프롬프트 엔지니어링 완전 정복

### 1단계: 기본 원칙
효과적인 프롬프트의 5가지 핵심 원소:

1. **역할(Role)**: AI에게 역할을 부여하세요
   > "당신은 10년 경력의 마케팅 전문가입니다"

2. **맥락(Context)**: 배경 정보를 제공하세요
   > "우리는 B2B SaaS 스타트업으로 주요 고객은 중소기업 CFO입니다"

3. **지시(Instruction)**: 원하는 것을 명확하게 요청하세요

4. **형식(Format)**: 원하는 출력 형식을 지정하세요
   > "결과를 불릿 포인트 5개로 요약해주세요"

5. **예시(Example)**: Few-shot 예시를 제공하세요

### 2단계: 고급 기법

**Chain of Thought (사고의 연쇄)**
복잡한 문제는 단계별로 생각하도록 유도하세요.',
  'ai-guide',
  null,
  'AI Live Now Editorial',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80',
  true, true, false, 24500,
  ARRAY['ChatGPT', '프롬프트엔지니어링', '튜토리얼', '한국어가이드']
),
(
  'claude-api-korean-beginner-guide',
  '[입문] Claude API로 한국어 AI 앱 만들기 — 30분 완성 튜토리얼',
  '[Beginner] Build a Korean AI App with Claude API — 30-Minute Tutorial',
  'Anthropic Claude API를 사용해 한국어 AI 애플리케이션을 만드는 입문 튜토리얼. 코딩 경험이 없어도 따라할 수 있다.',
  '## Claude API 시작하기

### 준비물
- Anthropic 계정 (anthropic.com)
- API 키
- Python 3.8+ 또는 Node.js 18+

### 설치
```bash
pip install anthropic
```

### 첫 번째 코드
```python
import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

message = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "안녕하세요! 한국어로 대화해 주세요."}
    ]
)

print(message.content[0].text)
```

이 코드를 실행하면 Claude가 한국어로 응답합니다.',
  'ai-guide',
  'https://docs.anthropic.com',
  'Anthropic Docs',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
  true, false, false, 16800,
  ARRAY['Claude', 'API', '튜토리얼', 'Python', '한국어']
),
(
  'local-llm-ollama-korean-guide',
  '[가이드] Ollama로 내 PC에서 LLM 돌리기 — 개인정보 걱정 없는 로컬 AI',
  '[Guide] Run LLM on Your PC with Ollama — Private Local AI',
  'Ollama를 사용해 개인 PC에서 LLM을 무료로 실행하는 방법. 인터넷 연결 없이도 AI를 사용할 수 있다.',
  '## Ollama: 내 컴퓨터에서 AI 돌리기

### Ollama란?
Ollama는 로컬 환경에서 대형 언어 모델(LLM)을 쉽게 실행할 수 있게 해주는 오픈소스 도구입니다.

### 설치 방법

**Windows/Mac:**
[ollama.com](https://ollama.com)에서 설치 파일 다운로드

**Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 한국어 특화 모델 실행
```bash
# EXAONE (LG AI Research 한국어 특화 모델)
ollama run exaone3.5

# Qwen2 (한국어 성능 우수)
ollama run qwen2:7b
```

### 권장 하드웨어
- 8B 모델: RAM 8GB 이상
- 70B 모델: RAM 64GB 또는 GPU VRAM 48GB 이상',
  'ai-guide',
  'https://ollama.com',
  'Ollama',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80',
  true, false, false, 19200,
  ARRAY['Ollama', '로컬LLM', 'EXAONE', '프라이버시', '오픈소스']
);
