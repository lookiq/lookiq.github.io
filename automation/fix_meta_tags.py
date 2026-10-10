import glob
import re

def fix_meta_tags():
    files = sorted(glob.glob('products/*.html'))
    fixed_count = 0
    for f in files:
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
        
        lines = content.splitlines()
        new_lines = []
        file_changed = False
        
        for i, line in enumerate(lines):
            if '<meta name="description"' in line:
                # Match the first valid <meta name="description" content="...">
                m = re.search(r'(<meta name="description"\s+content="[^"]+">)', line)
                if m:
                    clean_line = '  ' + m.group(1)
                    if line.strip() != clean_line.strip():
                        print(f"Fixed {f}:")
                        print(f"  Old: {line}")
                        print(f"  New: {clean_line}")
                        new_lines.append(clean_line)
                        file_changed = True
                        continue
            new_lines.append(line)
        
        if file_changed:
            with open(f, 'w', encoding='utf-8') as fp:
                fp.write('\n'.join(new_lines) + '\n')
            fixed_count += 1

    print(f"\nTotal files fixed: {fixed_count}")

if __name__ == '__main__':
    fix_meta_tags()
