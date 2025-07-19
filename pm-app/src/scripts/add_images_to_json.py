import json
import uuid
import base64
import os
from mimetypes import guess_type

# Đọc file JSON hiện có
def read_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"File {file_path} không tồn tại.")
        return []
    except json.JSONDecodeError:
        print("Lỗi khi giải mã file JSON.")
        return []

# Ghi dữ liệu vào file JSON
def write_json_file(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

# Chuyển đổi file hình ảnh thành base64
def image_to_base64(image_path):
    try:
        # Kiểm tra xem file có tồn tại không
        if not os.path.exists(image_path):
            print(f"File {image_path} không tồn tại.")
            return None
        
        # Xác định kiểu MIME của file (jpeg, png, v.v.)
        mime_type, _ = guess_type(image_path)
        if not mime_type or not mime_type.startswith('image'):
            print(f"File {image_path} không phải là hình ảnh.")
            return None

        # Đọc file hình ảnh và mã hóa thành base64
        with open(image_path, 'rb') as image_file:
            base64_string = base64.b64encode(image_file.read()).decode('utf-8')
            return f"data:{mime_type};base64,{base64_string}"
    except Exception as e:
        print(f"Lỗi khi chuyển đổi {image_path} thành base64: {e}")
        return None

# Tạo đối tượng ImageType
def create_image_object(base64_string):
    return {
        "id": str(uuid.uuid4()),
        "type": "image",
        "url": base64_string
    }

# Danh sách đường dẫn đến các file hình ảnh (thay thế bằng đường dẫn thực tế của bạn)
image_paths = [
    r"C:\New folder\PresentationMaker\pm-app\src\images\49937752_1146409172203131_8090057530400571392_n.jpg",
    r"C:\New folder\PresentationMaker\pm-app\src\images\425471526_3972147706346159_3680664994723662633_n.jpg",
    r"C:\New folder\PresentationMaker\pm-app\src\images\496545081_4357267257834200_987861241259986174_n.jpg"
]

# Đường dẫn đến file JSON
json_file_path = r"C:\New folder\PresentationMaker\pm-app\src\data\output\output.json"

# Đọc dữ liệu hiện có từ file JSON
data = read_json_file(json_file_path)

# Tạo danh sách các đối tượng hình ảnh từ các file
image_objects = []
for image_path in image_paths:
    base64_string = image_to_base64(image_path)
    if base64_string:
        image_objects.append(create_image_object(base64_string))

# Thêm các đối tượng hình ảnh vào dữ liệu JSON
data.extend(image_objects)

# Ghi lại dữ liệu vào file JSON
write_json_file(json_file_path, data)

print("Đã thêm các đối tượng hình ảnh vào file JSON thành công!")