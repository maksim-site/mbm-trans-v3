#!/usr/bin/env python3
"""Remove the white JPEG matte from the official MBM Trans wordmark.

The source artwork is a single-colour logo (#025194) composited onto white.
Reconstructing alpha from that known composite keeps the official colour and
silhouette while avoiding pale edge pixels on the dark site header.
"""

from pathlib import Path
from statistics import median

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets" / "css" / "imgs"
BRAND_RGB = (2, 81, 148)


def recover_alpha(channel_values: tuple[int, int, int]) -> int:
    estimates = []
    for observed, foreground in zip(channel_values, BRAND_RGB):
        estimates.append((255 - observed) / (255 - foreground))
    alpha = max(0.0, min(1.0, median(estimates)))
    value = round(alpha * 255)
    return 0 if value < 4 else value


def clean_logo(source_name: str, output_name: str) -> None:
    source = Image.open(ASSET_DIR / source_name).convert("RGB")
    cleaned = Image.new("RGBA", source.size)
    cleaned.putdata([
        (*BRAND_RGB, recover_alpha(pixel))
        for pixel in source.getdata()
    ])
    cleaned.save(ASSET_DIR / output_name, optimize=True)


if __name__ == "__main__":
    clean_logo("logo_h.jpg", "logo_h-clean.png")
    clean_logo("logo_h@2x.jpg", "logo_h-clean@2x.png")
