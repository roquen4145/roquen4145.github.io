---
title: "트래픽 분석 확인 방법"
date: 2026-01-17T10:30:00+09:00
tags: ["meta", "analytics"]
draft: false
---

## 개요

- Quiet Systems는 Plausible를 이용해 쿠키 없이 집계한다. 로그인 후 도메인 `roquen4145.github.io` 대시보드를 보면 된다.

## 확인 절차

- plausible.io/login → 도메인 선택 → 기간(Last 7/30 days) 설정.
- 주요 지표: 페이지뷰, 인기 글, 리퍼러, 검색 유입 여부. 개인 식별 데이터는 없다.
- 스크립트는 `config.toml`의 `[params.analytics]`로 제어하며, 필요 시 `enabled=false`로 끈다.

## 주기와 사용법

- 주 1회 PV/인기 글을 보고 연결이 부족한 글을 보완한다.
- 리퍼러/검색 유입이 의미 있을 때에만 구조 조정을 고려한다. 광고/리마케팅은 사용하지 않는다.

## 참고

- 정책은 [프라이버시와 트래픽 분석]({{< relref "/meta/privacy-and-analytics" >}})을 따른다.
- 변경과 배포 흐름은 [PR 기반 운영과 자동화]({{< relref "/meta/workflow-pr-and-automation" >}})를 참고한다.
