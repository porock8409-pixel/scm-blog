# PKM System Design - SCM Blog

> NAK-3 | 2026-04-01 | Won (CEO)

## 1. Overview

SCM 실무 지식을 체계적으로 축적하고, 블로그 콘텐츠로 변환하는 개인 지식 관리(PKM) 시스템.

**핵심 원칙:**
- 지식은 에이전트 워크스페이스(PARA)에서 축적
- 블로그 콘텐츠는 프로젝트 `content/` 디렉토리에서 발행
- 파이프라인이 두 세계를 연결

## 2. PARA Folder Structure

에이전트 워크스페이스(`$AGENT_HOME/para/`)에 PARA 구조를 구성한다.

```
$AGENT_HOME/
├── para/
│   ├── projects/              # 진행 중인 블로그 시리즈/캠페인
│   │   ├── scm-basics/        # SCM 기초 시리즈
│   │   └── scor-deep-dive/    # SCOR 모델 심화 시리즈
│   │
│   ├── areas/                 # 지속 관리하는 SCM 도메인
│   │   ├── procurement.md     # 조달/구매
│   │   ├── logistics.md       # 물류/운송
│   │   ├── manufacturing.md   # 생산/제조
│   │   ├── demand-planning.md # 수요 예측
│   │   ├── inventory.md       # 재고 관리
│   │   └── strategy.md        # SCM 전략
│   │
│   ├── resources/             # 참고 자료/프레임워크
│   │   ├── frameworks/        # SCOR, APICS, S&OP 등
│   │   ├── case-studies/      # 실무 사례
│   │   └── glossary.md        # SCM 용어 사전
│   │
│   └── archives/              # 완료/비활성 항목
```

**노트 파일 포맷 (`.md`):**

```yaml
---
title: "노트 제목"
domain: "procurement"          # SCM 도메인
status: "seed | growing | ripe" # 성숙도
blog_candidate: true           # 블로그 변환 후보 여부
created: "2026-04-01"
updated: "2026-04-01"
---
```

- `seed`: 초기 아이디어/메모
- `growing`: 내용 보강 중
- `ripe`: 블로그 포스트로 변환 가능

## 3. Content Pipeline

```
[PARA Notes] → [Drafts] → [Published]
   seed         growing      ripe → content/*.mdx
```

### 3.1 Stage 1: Capture (PARA Notes)

에이전트가 SCM 지식을 `para/` 디렉토리에 노트로 축적한다.
- 프로젝트별 시리즈 기획은 `projects/`
- 도메인 지식은 `areas/`
- 참고 자료/프레임워크는 `resources/`

### 3.2 Stage 2: Mature (Drafts)

`status: ripe`인 노트를 블로그 포스트 초안으로 변환한다.
- 프로젝트 `content/_drafts/` 디렉토리에 MDX 파일 생성
- frontmatter에 category, tags, series 추가
- `published: false`로 설정

### 3.3 Stage 3: Publish

초안 검토 후 발행한다.
- `_drafts/`에서 `content/` 루트로 이동
- `published: true`로 변경
- sitemap/RSS에 자동 포함

### 3.4 Pipeline 규칙

1. 모든 포스트는 PARA 노트에서 출발한다 (즉흥 발행 금지)
2. 드래프트 단계에서 SEO 메타(title, description) 확정
3. 시리즈물은 `series` frontmatter로 묶는다
4. `lib/mdx.ts`에서 `_drafts/` 하위는 빌드에서 제외 (기존 `published` 필터 활용)

## 4. Tagging & Category System

### 4.1 Categories (1 per post, 필수)

| Category | 한글명 | 설명 |
|---|---|---|
| `fundamentals` | SCM 기초 | 입문 개념, 정의 |
| `procurement` | 조달/구매 | 소싱, 공급업체 관리 |
| `logistics` | 물류/운송 | 배송, 운송, 3PL |
| `manufacturing` | 생산/제조 | 생산계획, 품질 |
| `demand-planning` | 수요 예측 | 수요 계획, S&OP |
| `inventory` | 재고 관리 | 안전재고, 회전율 |
| `strategy` | SCM 전략 | 경영 전략, 리스크 |
| `technology` | SCM 기술 | ERP, AI, 디지털 |

### 4.2 Tags (다수 가능, 자유)

**프레임워크:** `SCOR`, `APICS`, `S&OP`, `CPFR`, `DDMRP`
**개념:** `bullwhip-effect`, `JIT`, `lean`, `agile`, `resilience`
**도구:** `ERP`, `WMS`, `TMS`, `APS`, `MES`
**산업:** `automotive`, `electronics`, `FMCG`, `pharma`

### 4.3 Series (선택)

시리즈 frontmatter로 연재물을 그룹화한다.

```yaml
---
series: "scm-basics"
seriesOrder: 1
---
```

### 4.4 확장된 Frontmatter 스키마

```yaml
---
title: string          # 포스트 제목
description: string    # SEO 설명 (160자 이내)
date: string           # 발행일 YYYY-MM-DD
category: string       # 카테고리 (1개, 필수)
tags: string[]         # 태그 (1개 이상)
series?: string        # 시리즈 식별자
seriesOrder?: number   # 시리즈 내 순서
published: boolean     # 발행 여부
---
```

## 5. Memory System Integration

에이전트 메모리(`para-memory-files` skill)와 PKM을 연동한다.

### 5.1 Content Registry

에이전트 메모리에 콘텐츠 현황을 기록한다.

```
# 기록 항목
- 발행된 포스트 목록과 카테고리
- 진행 중인 시리즈와 남은 편수
- 다음 콘텐츠 후보 (ripe 노트 목록)
- 카테고리별 포스트 수 (균형 확인용)
```

### 5.2 Domain Knowledge Graph

PARA `areas/` 노트를 도메인 지식 그래프의 원천으로 활용한다.
- 각 area 노트에 핵심 개념, 관련 용어, 참고 링크 축적
- 블로그 작성 시 area 노트에서 전문 지식 참조

### 5.3 Content Planning Cycle

1. **주간 리뷰**: 노트 성숙도 점검, ripe 노트 확인
2. **발행 결정**: 카테고리 균형과 시리즈 진행 상태 고려
3. **발행 후**: 메모리에 콘텐츠 레지스트리 업데이트

## 6. Implementation Checklist

- [ ] `$AGENT_HOME/para/` 디렉토리 구조 생성
- [ ] `content/_drafts/` 디렉토리 생성
- [ ] `lib/mdx.ts`에 `category`, `series` 필드 지원 추가
- [ ] 기존 `hello-scm.mdx`에 `category` frontmatter 추가
- [ ] `para/areas/` 초기 도메인 노트 생성
- [ ] `para/resources/glossary.md` SCM 용어 사전 초안
- [ ] 에이전트 메모리에 콘텐츠 레지스트리 초기화
