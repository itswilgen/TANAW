"""
Builds the Fraunces files in src/assets/fonts/ from @fontsource-variable/fraunces.

The site uses Fraunces at a single weight (450), so the weight axis is pinned and only
the optical-size axis stays variable. That halves the files on the critical path.
The ₱ sign lives in Fraunces' latin-ext subset, so it gets its own tiny file instead
of pulling in the whole 60 kB latin-ext font.

Re-run after upgrading @fontsource-variable/fraunces or changing the weight:
    pip install fonttools brotli
    python3 scripts/subset-fonts.py
"""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

WEIGHT = 450  # keep in sync with the @font-face rules and h1–h3 weight in src/index.css
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "node_modules/@fontsource-variable/fraunces/files"
OUT = ROOT / "src/assets/fonts"


def pin_weight(src: Path) -> TTFont:
    return instancer.instantiateVariableFont(TTFont(src), {"wght": WEIGHT})


def save(font: TTFont, name: str) -> None:
    font.flavor = "woff2"
    path = OUT / name
    font.save(path)
    print(f"✓ {name}  {path.stat().st_size / 1024:.1f} kB")


OUT.mkdir(parents=True, exist_ok=True)
for style in ("normal", "italic"):
    save(pin_weight(SRC / f"fraunces-latin-opsz-{style}.woff2"), f"fraunces-{style}.woff2")

peso = pin_weight(SRC / "fraunces-latin-ext-opsz-normal.woff2")
subsetter = subset.Subsetter(subset.Options())
subsetter.populate(unicodes=[0x20B1])
subsetter.subset(peso)
save(peso, "fraunces-peso.woff2")
