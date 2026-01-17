---
title: "새 글 작성 가이드 (hugo new)"
date: 2026-01-17T12:00:00+09:00
tags: ["meta", "howto", "writing"]
draft: false
---

## 언제 hugo new를 쓰는가

- 새 Memo를 만들 때 수동으로 날짜를 쓰지 않으려면 `hugo new`를 사용한다. front matter의 `date`가 자동으로 채워진다.

## 기본 명령

- 섹션별 예시:
  - 생각: `hugo new thoughts/my-note.md`
  - 리눅스: `hugo new linux/process-checklist.md`
  - 네트워킹: `hugo new networking/dns-cache.md`
- 루트에서 실행하면 `content/` 아래에 파일이 생성되고, archetypes/default.md 템플릿이 적용된다.

## 작성 흐름

- `hugo new <section>/<slug>.md`
- 템플릿의 필수 섹션을 채운다: 왜/핵심 개념/내 생각/연결된 글.
- 필요하다면 `draft: false`로 바꿔 발행 대기 상태로 둔다.

## 링크와 규칙

- 내부 링크는 `relref/ref`만 사용한다. 그래프 연결은 나중에 추가해도 되지만 PR 전에는 맞춘다.
- 토픽 선택은 [토픽 구조 지도]({{< relref "/meta/topic-map" >}})를 따른다.
- 전체 규칙은 [작성 규칙]({{< relref "/meta/writing-rules" >}})과 [PR 기반 운영과 자동화]({{< relref "/meta/workflow-pr-and-automation" >}})를 참고한다.
