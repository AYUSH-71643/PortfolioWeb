import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

hero_match = re.search(r'<header class="hero">.*?</header>', content, re.DOTALL)
about_match = re.search(r'<!-- About & Experience Section -->.*?</section>', content, re.DOTALL)
games_match = re.search(r'<!-- Games Section -->.*?</section>', content, re.DOTALL)
contact_match = re.search(r'<!-- Contact Section -->.*?</main>', content, re.DOTALL)
footer_match = re.search(r'<footer.*?</footer>', content, re.DOTALL)

if hero_match and about_match and games_match and contact_match and footer_match:
    hero = hero_match.group(0)
    about = about_match.group(0)
    games = games_match.group(0)
    contact = contact_match.group(0).replace('</main>', '')
    footer = footer_match.group(0)

    games_html = f'''---
layout: default
title: Featured Games
---
{hero}
<main>
{games}
</main>
{footer}
'''
    with open('games.html', 'w', encoding='utf-8') as f:
        f.write(games_html)

    about_modified = about.replace('</div>\n    </section>', '</div>\n        <div style="text-align: center; margin-top: 50px;">\n            <a href="{{ site.baseurl }}/games.html" class="btn" style="font-size: 1.2rem; padding: 15px 40px; box-shadow: 0 10px 20px rgba(0, 242, 254, 0.4);">Explore My Featured Games</a>\n        </div>\n    </section>')
    
    index_html = f'''---
layout: default
---
<main style="padding-top: 60px; background: linear-gradient(135deg, #f8f9fa 0%, #e0e5ec 100%);">
{about_modified}
{contact}
</main>
{footer}
'''
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)
    print('Split successful')
else:
    print('Regex failed to match sections')
