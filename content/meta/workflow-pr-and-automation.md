---
title: "PR 기반 운영과 자동화"
date: 2026-01-17T10:04:00+09:00
tags: ["meta", "workflow", "automation"]
draft: false
---

## 원칙: 모든 변경은 PR

- Quiet Systems는 Working Memos가 PR로만 업데이트된다. PR은 내용 리뷰가 아니라 규칙 준수 검증 단계다.

## 자동 merge 조건

- Required checks 모두 통과 시 자동 병합. 예시: `hugo-build`, `content-rule-check`, `internal-link-check`.

## GitHub Actions 검사

- Hugo 빌드 성공 여부.
- 필수 섹션/링크 규칙 준수.
- 내부 링크가 `relref/ref`인지 확인.

## 글 발행 흐름

- 브랜치 생성 → PR 생성 → 체크 통과 → 자동 merge → main에서 Hugo 빌드 후 gh-pages 배포.

## 예외 규칙

- 긴급 수정은 작은 PR로 동일한 체크를 거친다.
- 롤백은 이전 커밋을 재적용하는 PR로 수행해 기록을 남긴다.

## 참고

- 작성 규칙은 [작성 규칙]({{< relref "/meta/writing-rules" >}})을 따른다.
- 변경 이력 기록은 [Changelog]({{< relref "/meta/changelog" >}})에 남긴다.
