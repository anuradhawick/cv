#!/usr/bin/env python3
"""
Sync publications from Google Scholar profile for Anuradha Wickramarachchi.
Usage:
  python3 scripts/sync_scholar.py
  python3 scripts/sync_scholar.py --file path/to/scholar.html
"""

import sys
import os
import json
import re
import urllib.request
from datetime import datetime
from bs4 import BeautifulSoup

SCHOLAR_USER_ID = "u-rFXwUAAAAJ"
SCHOLAR_URL = f"https://scholar.google.com/citations?hl=en&user={SCHOLAR_USER_ID}&pagesize=100"
DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "publications.json")

def parse_scholar_html(html_content):
    soup = BeautifulSoup(html_content, "html.parser")
    tbody = soup.find("tbody", id="gsc_a_b")
    if not tbody:
        return []

    items = []
    for tr in tbody.find_all("tr", class_="gsc_a_tr"):
        t_td = tr.find("td", class_="gsc_a_t")
        if not t_td:
            continue
        
        title_a = t_td.find("a")
        title = re.sub(r"\s+", " ", title_a.text.strip()) if title_a else ""
        if not title:
            continue

        raw_title_url = title_a.get("href", "") if title_a else ""
        if raw_title_url.startswith("http"):
            title_url = raw_title_url
        elif raw_title_url:
            title_url = "https://scholar.google.com" + ("/" if not raw_title_url.startswith("/") else "") + raw_title_url.lstrip("/")
        else:
            title_url = ""

        grays = t_td.find_all("div", class_="gs_gray")
        authors = re.sub(r"\s+", " ", grays[0].text.strip()) if len(grays) > 0 else ""
        venue = re.sub(r"\s+", " ", grays[1].text.strip()) if len(grays) > 1 else ""

        c_td = tr.find("td", class_="gsc_a_c")
        c_a = c_td.find("a") if c_td else None
        cites_text = c_a.text.strip() if c_a else ""
        citations = int(cites_text) if cites_text.isdigit() else 0
        cites_url = c_a.get("href", "") if c_a else ""
        if cites_url and not cites_url.startswith("http"):
            cites_url = "https://scholar.google.com" + ("/" if not cites_url.startswith("/") else "") + cites_url.lstrip("/")

        y_td = tr.find("td", class_="gsc_a_y")
        year_span = y_td.find("span") if y_td else None
        year_text = year_span.text.strip() if year_span else ""
        year = int(year_text) if year_text.isdigit() else 0

        items.append({
            "title": title,
            "titleUrl": title_url,
            "authors": authors,
            "venue": venue,
            "citations": citations,
            "citationsUrl": cites_url,
            "year": year
        })

    return items

def main():
    target_path = os.path.abspath(DATA_FILE)
    html = ""

    if len(sys.argv) > 2 and sys.argv[1] in ("--file", "-f"):
        filepath = sys.argv[2]
        print(f"Reading citations from local file: {filepath}")
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            html = f.read()
    else:
        print(f"Fetching Google Scholar profile for user: {SCHOLAR_USER_ID}...")
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9"
        }
        req = urllib.request.Request(SCHOLAR_URL, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                html = resp.read().decode("utf-8", errors="ignore")
        except Exception as e:
            print(f"[WARN] Failed to fetch from Google Scholar: {e}")
            print(f"[INFO] Keeping existing publications file intact at: {target_path}")
            sys.exit(0)

    publications = parse_scholar_html(html)
    if not publications:
        print("[WARN] No publications found in the response HTML. Keeping existing data intact.")
        sys.exit(0)

    today_str = datetime.now().strftime("%Y-%m-%d")
    output_data = {
        "lastUpdated": today_str,
        "scholarProfileUrl": f"https://scholar.google.com/citations?hl=en&user={SCHOLAR_USER_ID}",
        "publications": publications
    }

    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, "w", encoding="utf-8") as out:
        json.dump(output_data, out, indent=2, ensure_ascii=False)

    print(f"✅ Successfully updated {len(publications)} publications in {target_path} (updated: {today_str})")

if __name__ == "__main__":
    main()
