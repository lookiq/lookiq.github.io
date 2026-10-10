import glob
from pathlib import Path

def clean_html_entities():
    files = list(Path('.').rglob('*.html'))
    cleaned_count = 0
    
    for f in sorted(files):
        try:
            with open(f, 'r', encoding='utf-8') as fp:
                content = fp.read()
        except UnicodeDecodeError:
            with open(f, 'r', encoding='utf-8', errors='replace') as fp:
                content = fp.read()
        
        if '\ufffd' in content:
            # Replace replacement char with bullet entity
            new_content = content.replace('\ufffd', '&bull;')
            with open(f, 'w', encoding='utf-8') as fp:
                fp.write(new_content)
            print(f"Cleaned entities in: {f}")
            cleaned_count += 1
            
    print(f"Total files cleaned of replacement char: {cleaned_count}")

if __name__ == '__main__':
    clean_html_entities()
