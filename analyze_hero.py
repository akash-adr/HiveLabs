from PIL import Image

def analyze_brightness(image_path):
    img = Image.open(image_path).convert('L')
    stat = img.getextrema()
    # Let's get the average pixel brightness (0-255)
    histogram = img.histogram()
    pixels = sum(histogram)
    brightness = scale = len(histogram)
    for index in range(0, scale):
        ratio = histogram[index] / pixels
        brightness += ratio * (-scale + index)
    
    print(f"Average Brightness (1=dark, 255=bright): {brightness}")
    
    # Check left side of the image (where text usually goes)
    left_box = (0, 0, img.width // 2, img.height)
    left_img = img.crop(left_box)
    left_hist = left_img.histogram()
    left_pixels = sum(left_hist)
    left_brightness = scale = len(left_hist)
    for index in range(0, scale):
        ratio = left_hist[index] / left_pixels
        left_brightness += ratio * (-scale + index)
    print(f"Left side Brightness: {left_brightness}")

if __name__ == '__main__':
    analyze_brightness('public/newhero.jpeg')
