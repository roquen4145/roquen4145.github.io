import re
import sys
from pathlib import Path

CONTENT_ROOT = Path("content")


def main() -> int:
    failures = []
    link_pattern = re.compile(r"(?<!!)\[([^\]]+)\]\(([^)]+)\)")
    for md in CONTENT_ROOT.rglob("*.md"):
        relative = md.relative_to(CONTENT_ROOT)
        if relative.parts and relative.parts[0] == "meta":
            continue

        text = md.read_text(encoding="utf-8")
        in_fence = False
        fence_marker = None
        for line in text.splitlines():
            stripped = line.lstrip()
            if stripped.startswith("```") or stripped.startswith("~~~"):
                marker = stripped[:3]
                if not in_fence:
                    in_fence = True
                    fence_marker = marker
                elif fence_marker == marker:
                    in_fence = False
                    fence_marker = None
                continue

            if in_fence:
                continue

            for match in link_pattern.finditer(line):
                target = match.group(2).strip()
                if target.startswith(("http://", "https://", "mailto:", "#", "{{<", "{{%")):
                    continue
                failures.append(f"{md}: 내부 링크는 relref/ref를 사용해야 합니다 -> {match.group(0)}")

    if failures:
        print("내부 링크 검증 실패:")
        for f in failures:
            print(f"- {f}")
        return 1

    print("내부 링크 검증 성공: 모든 내부 링크가 relref/ref를 사용합니다.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
