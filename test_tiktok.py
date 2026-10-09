import urllib.request
import re

url = 'https://www.tiktok.com/@lookiqfashion?is_from_webapp=1&sender_device=pc'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print('Final URL:', resp.geturl())
        titles = re.findall(r'<title>(.*?)</title>', html)
        print('Titles:', titles)
        user_ids = re.findall(r'"uniqueId":"([^"]+)"', html)
        print('Unique IDs:', set(user_ids))
        if 'Couldn\'t find this account' in html:
            print('Contains Couldn\'t find this account: YES')
        else:
            print('Contains Couldn\'t find this account: NO')
except Exception as e:
    print('Error:', e)
