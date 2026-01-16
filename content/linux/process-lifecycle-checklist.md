---
title: "리눅스 프로세스 라이프사이클 운영 체크리스트"
date: 2026-01-16T21:46:00+09:00
summary: "배포-관측-종료까지 프로세스 라이프사이클을 반복적으로 점검할 수 있는 최소 항목을 정리한다."
tags: ["linux", "observability", "operations"]
---

## 왜 이걸 정리하는가

- 장애 후 원인 분석에서 프로세스 상태 전이가 빠졌다는 이유로 재발하는 일이 잦았다.
- check list를 코드 리뷰 템플릿과 합쳐 운영 편차를 줄이려는 목적이다.

## 핵심 개념 (잊지 말아야 할 것)

- 시작 단계: systemd unit 또는 supervisor 설정에서 `Restart`, `StartLimit` 값이 의도대로인지 확인하고, 시작 시 환경 변수는 `/etc/default` 등 단일 소스에서 관리한다.
- 실행 중: 헬스체크 엔드포인트는 CPU/메모리 임계치 감지와 별개로 구현한다. SIGTERM 시 cleanup 훅이 5초 내 완료되는지 측정치를 남긴다.
- 종료/재시작: Graceful 종료 실패 시 강제 종료 전 backoff를 둔다. core dump 정책(위치, 크기 제한)과 보관 기간을 문서화한다.
- 관측: PID 재사용을 대비해 프로세스명 + start time 조합을 로깅하고, `cgroups` 메트릭을 기본 수집 항목에 포함한다.

## 내 생각

- 운영 자동화 도구를 써도 SIGTERM 처리기를 직접 확인하는 것이 가장 확실했다. "기본 설정이면 된다"는 가정은 대부분 거짓이다.
- 배포 시점마다 core dump 수집 정책을 검증하는 작은 스크립트를 CI에 넣는 편이 마음이 놓인다.

## 연결된 글
- [확장: 객체 스토리지 재시작 시 메타데이터 일관성 고려]({{< relref "/storage/object-storage-building-blocks.md" >}})
- [반대: DNS 캐시 타임라인과 프로세스 헬스체크 신뢰도]({{< relref "/networking/dns-caching-strategy.md" >}})
- [확장: 사고 그래프 관점에서 체크리스트 유지 전략]({{< relref "/thoughts/knowledge-graph-thinking.md" >}})
