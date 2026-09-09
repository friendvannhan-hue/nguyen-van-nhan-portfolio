#!/usr/bin/env python3
import argparse
from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image, ImageDraw, ImageFont, ImageOps


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    name = 'Arial Bold.ttf' if bold else 'Arial.ttf'
    return ImageFont.truetype(f'/System/Library/Fonts/Supplemental/{name}', size)


def render_portrait(pdf_path: Path) -> Image.Image:
    document = pdfium.PdfDocument(str(pdf_path))
    page = document[0]
    rendered = page.render(scale=3).to_pil().convert('RGB')
    width, height = rendered.size
    crop = rendered.crop((int(width * .71), 0, int(width * .95), int(height * .22)))
    return ImageOps.fit(crop, (720, 900), method=Image.Resampling.LANCZOS, centering=(.5, .5))


def rounded_portrait(portrait: Image.Image, size: tuple[int, int], radius: int) -> Image.Image:
    fitted = ImageOps.fit(portrait, size, method=Image.Resampling.LANCZOS)
    mask = Image.new('L', size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    fitted.putalpha(mask)
    return fitted


def build_og(portrait: Image.Image) -> Image.Image:
    canvas = Image.new('RGB', (1200, 630), '#F6F7F9')
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((42, 42, 1158, 588), radius=34, fill='#FFFFFF', outline='#DCE2EA', width=2)
    draw.rounded_rectangle((70, 70, 109, 109), radius=10, fill='#2563EB')
    draw.text((82, 76), 'N', font=font(24, True), fill='#FFFFFF')
    draw.text((132, 78), 'NGUYỄN VĂN NHÂN', font=font(22, True), fill='#0B1F3A')
    draw.text((78, 166), 'CUSTOMER GROWTH', font=font(48, True), fill='#0B1F3A')
    draw.text((78, 224), '& BUSINESS OPERATIONS', font=font(48, True), fill='#0B1F3A')
    draw.text((78, 307), 'Strategy · Revenue · People · Process · Data · AI', font=font(24), fill='#475569')
    draw.rounded_rectangle((78, 404, 448, 464), radius=30, fill='#C93D5B')
    draw.text((108, 420), 'FROM STRATEGY TO EXECUTION', font=font(17, True), fill='#FFFFFF')
    draw.text((78, 512), 'Customer Growth · Business Operations', font=font(20, True), fill='#2563EB')
    portrait_card = rounded_portrait(portrait, (330, 460), 28)
    canvas.paste(portrait_card, (790, 86), mask=portrait_card)
    return canvas


def write_favicon(path: Path) -> None:
    path.write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
        '<rect width="64" height="64" rx="16" fill="#0B1F3A"/>'
        '<path d="M17 45V19h7l16 16V19h7v26h-7L24 29v16z" fill="#fff"/>'
        '<circle cx="49" cy="15" r="5" fill="#C93D5B"/>'
        '</svg>',
        encoding='utf-8',
    )


def main() -> None:
    parser = argparse.ArgumentParser(description='Build deterministic portfolio portrait and share assets.')
    parser.add_argument('--pdf', required=True, type=Path)
    parser.add_argument('--output-dir', required=True, type=Path)
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)

    portrait = render_portrait(args.pdf)
    portrait.save(args.output_dir / 'nguyen-van-nhan.webp', 'WEBP', quality=88, method=6)
    build_og(portrait).save(args.output_dir / 'og-portfolio.png', 'PNG', optimize=True)
    write_favicon(args.output_dir / 'favicon.svg')


if __name__ == '__main__':
    main()
