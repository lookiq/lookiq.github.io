import sys
from pathlib import Path

script_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(script_dir))

from pipeline import process_product

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python automation/run_local.py <AMAZON_PRODUCT_URL>")
        print("Example: python automation/run_local.py https://amzn.to/4yj1hFV")
        sys.exit(1)

    url = sys.argv[1]
    process_product(url, auto_push=True)
