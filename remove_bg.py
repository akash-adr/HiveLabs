from PIL import Image

def remove_white_bg(input_path, output_path, threshold=230):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()

        new_data = []
        for item in data:
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print("Successfully removed background and saved to " + output_path)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    remove_white_bg("public/newlogo.jpeg", "public/newlogo.png")
