#!/usr/bin/env python3
"""Generate opaque iOS icon + splash from the repository's existing ReputationFlow brand mark.
Requires Pillow (development only). Web assets remain untouched.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
source = Image.open(ROOT / 'public/icon-512.png').convert('RGBA')
canvas = Image.new('RGB', (1024, 1024), '#F7F9FC')
mark = source.resize((760, 760), Image.Resampling.LANCZOS)
canvas.paste(mark, ((1024 - 760) // 2, (1024 - 760) // 2), mark)
(ROOT / 'resources').mkdir(exist_ok=True)
canvas.save(ROOT / 'resources/icon-1024.png')
canvas.save(ROOT / 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png')

splash = Image.new('RGB', (2732, 2732), '#F7F9FC')
mark = source.resize((800, 800), Image.Resampling.LANCZOS)
splash.paste(mark, ((2732 - 800) // 2, (2732 - 800) // 2), mark)
splash.save(ROOT / 'resources/splash-2732.png')
for name in ('splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png'):
    splash.save(ROOT / 'ios/App/App/Assets.xcassets/Splash.imageset' / name)
