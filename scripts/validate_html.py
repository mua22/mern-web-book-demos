#!/usr/bin/env python3
"""Structural HTML validation for every demo in this repo.

This is deliberately lightweight: it does not download anything and has no
dependencies beyond the Python standard library, so it runs the same way for
every contributor and every CI machine. It checks that each .html file:

  - Parses cleanly (no unclosed/mismatched tags Python's parser can detect)
  - Declares <!DOCTYPE html>
  - Has a non-empty <title>

Usage:
    python scripts/validate_html.py                 # validate every demo
    python scripts/validate_html.py 01-html/02-*     # validate a subset (glob)
"""
import glob
import sys
from html.parser import HTMLParser
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


class _StrictValidator(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []
        self.has_title = False
        self.title_text = ""
        self._in_title = False

    VOID_ELEMENTS = {
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr",
    }

    def handle_starttag(self, tag, attrs):
        if tag == "title":
            self._in_title = True
            self.has_title = True
        if tag not in self.VOID_ELEMENTS:
            self.stack.append(tag)

    def handle_startendtag(self, tag, attrs):
        pass  # self-closed tags (e.g. <br />) need no stack bookkeeping

    def handle_data(self, data):
        if self._in_title:
            self.title_text += data

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        if tag in self.VOID_ELEMENTS:
            return
        if not self.stack:
            self.errors.append(f"Unexpected closing tag </{tag}> with no matching open tag")
            return
        if self.stack[-1] != tag:
            self.errors.append(
                f"Mismatched tag: expected </{self.stack[-1]}> but found </{tag}>"
            )
            # Best-effort recovery: pop until we find a match, or give up
            if tag in self.stack:
                while self.stack and self.stack[-1] != tag:
                    self.stack.pop()
                if self.stack:
                    self.stack.pop()
        else:
            self.stack.pop()


def validate_file(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    problems = []

    if not text.lstrip().lower().startswith("<!doctype html>"):
        problems.append("Missing <!DOCTYPE html> at the top of the file")

    parser = _StrictValidator()
    try:
        parser.feed(text)
        parser.close()
    except Exception as exc:  # pragma: no cover - HTMLParser rarely raises
        problems.append(f"Parser error: {exc}")
        return problems

    problems.extend(parser.errors)
    if parser.stack:
        problems.append(f"Unclosed tag(s) at end of file: {', '.join(parser.stack)}")
    if not parser.has_title or not parser.title_text.strip():
        problems.append("Missing or empty <title>")

    return problems


def main() -> int:
    patterns = sys.argv[1:] or ["*/*/*.html"]
    files: set[Path] = set()
    for pattern in patterns:
        for match in glob.glob(str(REPO_ROOT / pattern), recursive=True):
            p = Path(match)
            if p.suffix == ".html":
                files.add(p)

    if not files:
        print("No HTML files matched.")
        return 1

    failed = 0
    for path in sorted(files):
        problems = validate_file(path)
        rel = path.relative_to(REPO_ROOT)
        if problems:
            failed += 1
            print(f"FAIL {rel}")
            for problem in problems:
                print(f"       - {problem}")
        else:
            print(f"OK   {rel}")

    print(f"\n{len(files) - failed}/{len(files)} files passed.")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
