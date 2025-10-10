import os
import json

# Percorso della cartella dei file
media_folder = "videos"

# Ottieni tutti i file nella cartella
files = [f for f in os.listdir(media_folder) if os.path.isfile(os.path.join(media_folder, f))]

# Crea un array di oggetti
entries = []
for f in files:
    ext = f.lower().split('.')[-1]
    file_type = 'image' if ext in ['jpg', 'jpeg', 'png', 'gif', 'webp'] else \
                'video' if ext in ['mp4', 'mov', 'avi', 'webm', 'mkv'] else \
                'file'
    entries.append({
        "type": file_type,
        "src": f"{media_folder}/{f}",
        "name": f
    })

# Scrivi il file JS
with open("files.js", "w", encoding="utf-8") as f:
    f.write("const files = ")
    json.dump(entries, f, indent=2)
    f.write(";")
