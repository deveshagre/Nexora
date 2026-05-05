import sys
import os
from PIL import Image

file1 = r"C:\Users\deves\.gemini\antigravity\brain\d8b4eaa5-656d-4777-a68b-8576b9a9dfd6\media__1778003009134.png"
file2 = r"C:\Users\deves\.gemini\antigravity\brain\d8b4eaa5-656d-4777-a68b-8576b9a9dfd6\media__1778003046228.png"

def get_aspect(f):
    img = Image.open(f)
    w, h = img.size
    return w / h

asp1 = get_aspect(file1)
asp2 = get_aspect(file2)

print(f"File 1: {asp1:.2f} aspect ratio")
print(f"File 2: {asp2:.2f} aspect ratio")

if asp1 > asp2:
    header_file = file1
    icon_file = file2
else:
    header_file = file2
    icon_file = file1

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if r > 210 and g > 210 and b > 210:
                # Blend the white into transparency to reduce halo
                brightness = max(r, g, b)
                # Map brightness 210-255 to alpha 255-0
                # brightness=210 -> alpha=255
                # brightness=255 -> alpha=0
                alpha = int(255 * (255 - brightness) / 45.0)
                pixels[x, y] = (r, g, b, alpha)
            
    img.save(output_path, "PNG")

out_header = r"d:\Codes\agency\assets\header-logo.png"
out_icon = r"d:\Codes\agency\assets\standalone-logo.png"

remove_white_bg(header_file, out_header)
remove_white_bg(icon_file, out_icon)

print(f"Saved {out_header} and {out_icon}")
