const gallery = document.getElementById('gallery');

files.forEach(file => {
  const div = document.createElement('div');
  div.className = 'grid-item';

  if (file.type === 'image') {
    const img = document.createElement('img');
    img.src = file.src;
    img.alt = file.name;
    div.appendChild(img);
  } else if (file.type === 'video') {
    const video = document.createElement('video');
    video.src = file.src;
    video.controls = true;
    div.appendChild(video);
  } else {
    const link = document.createElement('a');
    link.href = file.src;
    link.textContent = file.name;
    link.target = '_blank';
    div.appendChild(link);
  }

  gallery.appendChild(div);
});
