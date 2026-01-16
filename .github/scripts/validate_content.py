import re
import sys
from pathlib import Path

CONTENT_ROOT = Path("content")
REQUIRED_HEADINGS = [
    "## 왜 이걸 정리하는가",
    "## 핵심 개념 (잊지 말아야 할 것)",
    "## 내 생각",
    "## 연결된 글",
]


def load_section_block(text: str, heading: str) -> str:
    pattern = rf"{re.escape(heading)}(.*?)(?:\n## |\Z)"
    match = re.search(pattern, text, flags=re.S | re.M)
    return match.group(1) if match else ""


def main() -> int:
    failures = []
    for md in CONTENT_ROOT.rglob("*.md"):
        relative = md.relative_to(CONTENT_ROOT)
        if relative.parts and relative.parts[0] == "meta":
            continue

        text = md.read_text(encoding="utf-8")

        missing = [h for h in REQUIRED_HEADINGS if h not in text]
        if missing:
            failures.append(f"{md}: 필수 섹션 누락 -> {', '.join(missing)}")

        links_block = load_section_block(text, "## 연결된 글")
        relref_matches = re.findall(r"\{\{<\s*(relref|ref)\s+\"([^\"]+)\"\s*>\}\}", links_block)
        if len(relref_matches) < 2:
            failures.append(f"{md}: 내부 링크는 최소 2개 relref/ref 필요 (현재 {len(relref_matches)})")

        label_match = re.search(r"\[(확장|반대)[^\]]*\]\(\{\{<\s*(relref|ref)\s+", links_block)
        if not label_match:
            failures.append(f"{md}: 연결된 글에 최소 1개의 [확장] 또는 [반대] 라벨이 필요")

    if failures:
        print("콘텐츠 규칙 검증 실패:")
        for f in failures:
            print(f"- {f}")
        return 1

    print("콘텐츠 규칙 검증 성공: 모든 글이 필수 섹션과 내부 링크 규칙을 충족합니다.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
