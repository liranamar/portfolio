# Bake a 90s-sticker look into cut-out PNGs: rounded white die-cut border + soft shadow.
# usage: bake_stickers.py <img dir> name1 name2 ...   -> writes <name>-sticker.png
import sys
from PIL import Image, ImageFilter, ImageChops
OUT, BLUR, SHADOW_Y, PAD = 6, 6, 5, 20
d = sys.argv[1]
# a name ending in "!" keeps fine detail (e.g. small text): no speck removal
for name in sys.argv[2:]:
    keep_fine = name.endswith("!")
    name = name.rstrip("!")
    src = Image.open(f"{d}/{name}.png").convert("RGBA")
    w, h = src.size
    canvas = Image.new("RGBA", (w + 2 * PAD, h + 2 * PAD), (0, 0, 0, 0))
    a = Image.new("L", canvas.size, 0)
    a.paste(src.getchannel("A"), (PAD, PAD))
    # round dilation: blur the alpha, then threshold low -> border grows ~OUT px with round corners
    # drop stray specks (< ~7px) so they don't get a border of their own
    solid = a.point(lambda v: 255 if v > 100 else 0)
    if not keep_fine:
        solid = solid.filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(7))
    grown = solid.filter(ImageFilter.GaussianBlur(OUT * 0.75)).point(lambda v: 255 if v > 12 else 0)
    grown = ImageChops.lighter(grown, solid)
    grown = grown.filter(ImageFilter.GaussianBlur(0.8))  # anti-alias the border edge
    shadow = grown.filter(ImageFilter.GaussianBlur(BLUR)).point(lambda v: int(v * 0.38))
    out = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sh = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sh.putalpha(shadow)
    out.alpha_composite(sh, (0, SHADOW_Y))
    white = Image.new("RGBA", canvas.size, (255, 255, 255, 0))
    white.putalpha(grown)
    out.alpha_composite(white)
    out.alpha_composite(src, (PAD, PAD))
    out.save(f"{d}/{name}-sticker.png", optimize=True)
    print(name, out.size)
