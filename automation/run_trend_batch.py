"""Batch runner: process all trend candidates, push once at the end."""
import json
import subprocess
import sys
from pathlib import Path

script_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(script_dir))
from pipeline import process_product

candidates = json.load(open(script_dir / "trend_candidates.json"))["candidates"]
ok, failed = 0, []
for c in candidates:
    url = c["amazon_url"]
    try:
        print(f"\n>>> Processing {c['keyword']} ({c['asin']})")
        process_product(url, auto_push=False)
        c["status"] = "published"
        ok += 1
    except Exception as e:
        print(f"FAILED {c['asin']}: {e}")
        c["status"] = f"failed: {e}"
        failed.append(c["asin"])

json.dump({"candidates": candidates}, open(script_dir / "trend_candidates.json", "w"), indent=2)

if ok:
    subprocess.run(["git", "add", "-A"], cwd=script_dir.parent, check=False)
    subprocess.run(["git", "commit", "-m", f"Add {ok} trending products via auto-discovery"], cwd=script_dir.parent, check=False)
    subprocess.run(["git", "push"], cwd=script_dir.parent, check=False)
print(f"\nDONE: {ok} published, {len(failed)} failed {failed}")
