import os
import sys
import time
import json
import re
import urllib.request
import urllib.parse
from pathlib import Path

script_dir = Path(__file__).resolve().parent
project_root = script_dir.parent
sys.path.insert(0, str(script_dir))

from pipeline import process_product, load_config

def get_bot_token() -> str:
    # First check environment variable, then config.json
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if not token:
        config = load_config()
        token = config.get("telegram_bot_token", "")
    return token.strip()

def telegram_api_request(method: str, data: dict = None, token: str = "") -> dict:
    if not token:
        token = get_bot_token()
    if not token:
        return {}
    url = f"https://api.telegram.org/bot{token}/{method}"
    try:
        if data:
            payload = json.dumps(data).encode("utf-8")
            req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        else:
            req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"[TelegramBot] API Error ({method}): {e}")
        return {}

def send_message(chat_id: int, text: str, token: str = "") -> dict:
    return telegram_api_request("sendMessage", {"chat_id": chat_id, "text": text, "parse_mode": "HTML"}, token)

def send_photo(chat_id: int, photo_path: str, caption: str = "", token: str = "") -> dict:
    if not token:
        token = get_bot_token()
    url = f"https://api.telegram.org/bot{token}/sendPhoto"
    try:
        import mimetypes
        boundary = "----WebKitFormBoundaryLookiQBot7MA4YWxkTrZu0gW"
        body = bytearray()

        # chat_id
        body.extend(f"--{boundary}\r\nContent-Disposition: form-data; name=\"chat_id\"\r\n\r\n{chat_id}\r\n".encode("utf-8"))

        # caption
        if caption:
            body.extend(f"--{boundary}\r\nContent-Disposition: form-data; name=\"caption\"\r\n\r\n{caption}\r\n".encode("utf-8"))
            body.extend(f"--{boundary}\r\nContent-Disposition: form-data; name=\"parse_mode\"\r\n\r\nHTML\r\n".encode("utf-8"))

        # photo
        filename = os.path.basename(photo_path)
        mime = mimetypes.guess_type(photo_path)[0] or "image/jpeg"
        body.extend(f"--{boundary}\r\nContent-Disposition: form-data; name=\"photo\"; filename=\"{filename}\"\r\nContent-Type: {mime}\r\n\r\n".encode("utf-8"))
        with open(photo_path, "rb") as f:
            body.extend(f.read())
        body.extend(f"\r\n--{boundary}--\r\n".encode("utf-8"))

        req = urllib.request.Request(url, data=body, headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"[TelegramBot] Send Photo Error: {e}")
        return {}

def run_bot():
    token = get_bot_token()
    if not token:
        print("\n=======================================================")
        print("ERROR: Telegram Bot Token not set!")
        print("Please set TELEGRAM_BOT_TOKEN in automation/config.json")
        print("or run with environment variable:")
        print("  $env:TELEGRAM_BOT_TOKEN = 'your_bot_token_here'")
        print("=======================================================\n")
        return

    # Check bot identity
    me = telegram_api_request("getMe", token=token)
    if not me.get("ok"):
        print(f"[TelegramBot] Failed to authenticate token: {me}")
        return

    bot_username = me.get("result", {}).get("username", "LookiQBot")
    print(f"\n[TelegramBot] Successfully connected as @{bot_username}")
    print("[TelegramBot] Listening for Amazon product links 24/7. Press Ctrl+C to stop.\n")

    offset = 0
    while True:
        try:
            updates = telegram_api_request("getUpdates", {"offset": offset, "timeout": 20}, token=token)
            if not updates.get("ok"):
                time.sleep(3)
                continue

            for item in updates.get("result", []):
                offset = item["update_id"] + 1
                message = item.get("message", {})
                chat_id = message.get("chat", {}).get("id")
                text = message.get("text", "").strip()

                if not chat_id or not text:
                    continue

                if text == "/start" or text == "/help":
                    welcome_text = (
                        "<b>LOOKIQ Automation Bot Active</b>\n\n"
                        "Send me any Amazon product link (e.g. <code>amzn.to</code>, <code>link.amazon</code>, <code>a.co</code>, or <code>amazon.com</code>).\n\n"
                        "I will automatically:\n"
                        "1. Generate a high-converting Product Page on LOOKIQ.\n"
                        "2. Format a luxury 2:3 Pinterest Pin image.\n"
                        "3. Inject into Pinterest Auto-Publish Feed.\n"
                        "4. Commit and push live to GitHub Pages.\n"
                        "5. Generate ready-to-copy captions for Instagram, Facebook, TikTok &amp; X (Twitter)!"
                    )
                    send_message(chat_id, welcome_text, token)
                    continue

                # Check if text contains an Amazon link
                url_matches = re.findall(r'(https?://[^\s<>"\'()]+)', text)
                amazon_url = None
                for u in url_matches:
                    u_clean = u.rstrip('.,;!?')
                    if any(k in u_clean.lower() for k in ['amazon.', 'amzn.to', 'a.co', 'amzlinks.', 'link.amazon']):
                        amazon_url = u_clean
                        break

                if not amazon_url:
                    send_message(chat_id, "Please send a valid Amazon product URL (e.g. amazon.com, amzn.to, link.amazon, or a.co).", token)
                    continue

                send_message(chat_id, "Processing Amazon product... Please wait ~15 seconds.", token)

                # Execute pipeline
                try:
                    result = process_product(amazon_url, auto_push=True)
                    product = result["product"]
                    pdp_url = result["pdp_url"]
                    pin_img = result["pin_image"]
                    socials = result["socials"]

                    # 1. Send 2:3 Pin Image
                    raw_t = product['raw_title']
                    b_name = product['brand']
                    disp_t = raw_t if raw_t.lower().startswith(b_name.lower()) else f"{b_name} - {raw_t}"
                    pin_caption = (
                        f"<b>{disp_t[:60]}</b>\n"
                        f"Price: {product['price']} | ASIN: {product['asin']}\n\n"
                        f"Live Website URL:\n{pdp_url}\n\n"
                        f"Pinterest RSS Status: Queued for auto-publish"
                    )
                    send_photo(chat_id, pin_img, pin_caption, token)

                    # 2. Send Instagram & Facebook ready text
                    ig_text = (
                        f"<b>Instagram Caption (Ready to Copy):</b>\n\n"
                        f"<code>{socials['instagram']['caption']}</code>"
                    )
                    send_message(chat_id, ig_text, token)

                    fb_text = (
                        f"<b>Facebook Page Post (Ready to Copy):</b>\n\n"
                        f"<code>{socials['facebook']['caption']}</code>"
                    )
                    send_message(chat_id, fb_text, token)

                    # 3. Send TikTok Caption
                    tiktok_text = (
                        f"<b>TikTok Caption (Ready to Copy):</b>\n\n"
                        f"<code>{socials['tiktok']['caption']}</code>"
                    )
                    send_message(chat_id, tiktok_text, token)

                    # 4. Send X (Twitter) Post with 1-Click Intent
                    x_data = socials.get("x", {})
                    x_text = (
                        f"<b>X / Twitter Post (Ready to Copy):</b>\n\n"
                        f"<code>{x_data.get('text', '')}</code>\n\n"
                        f"<a href=\"{x_data.get('intent_url', '')}\">1-Click Post to X (Twitter)</a>"
                    )
                    send_message(chat_id, x_text, token)

                except Exception as err:
                    print(f"[TelegramBot] Pipeline failed: {err}")
                    send_message(chat_id, f"Error processing product: {err}", token)

        except KeyboardInterrupt:
            print("\n[TelegramBot] Stopped by user.")
            break
        except Exception as e:
            print(f"[TelegramBot] Loop error: {e}")
            time.sleep(5)

if __name__ == "__main__":
    run_bot()
