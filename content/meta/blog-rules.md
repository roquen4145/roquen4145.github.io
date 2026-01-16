---
title: "블로그 운영 메모"
date: 2026-01-16T21:49:00+09:00
summary: "Hugo 기반 지식 블로그 운영 원칙과 PR/Action 규칙."
draft: false
---

## 운영 목적

- 개념 중심 지식 베이스와 생각 로그를 Hugo로 빌드한다.
- 모든 변경은 PR을 통해 main에 반영되며, 규칙 검증을 통과하면 자동 병합된다.

## 글 작성 규칙

- 디렉터리는 개념 영역으로 사용한다(`content/storage`, `linux`, `networking`, `thoughts`, `meta`).
- 날짜 기반 경로는 금지.
- 모든 글은 다음 섹션을 포함해야 한다: `## 왜 이걸 정리하는가`, `## 핵심 개념 (잊지 말아야 할 것)`, `## 내 생각`, `## 연결된 글`.
- 내부 링크는 반드시 `relref`/`ref`를 사용하며, `## 연결된 글`에서 최소 2개 이상을 연결하고, 적어도 1개는 확장 또는 반대 관점을 라벨링한다.

## PR과 GitHub Actions

- PR 생성/업데이트 시: `hugo-build`, `content-rule-check`, `internal-link-check`가 모두 통과해야 한다.
- main 병합 시: Hugo 빌드 후 `gh-pages` 브랜치에 배포한다.

## 구조 변경 이력 메모

- 초기 생성: 기본 레이아웃, 정적 검색 인덱스(`index.json`), 내부 링크 규칙 검증 스크립트 도입.
