const gallery = document.getElementById('gallery');

async function loadFilesSequentially(files) {
  for (const file of files) {
    const div = document.createElement('div');
    div.className = 'grid-item';

    await new Promise(resolve => {
      if (file.type === 'image') {
        const img = document.createElement('img');
        img.src = file.src;
        img.alt = file.name;
        img.onload = () => resolve(); // attende il caricamento completo
        img.onerror = () => resolve(); // continua anche se errore
        div.appendChild(img);
      } else if (file.type === 'video') {
        const video = document.createElement('video');
        video.src = file.src;
        video.controls = true;
        video.onloadeddata = () => resolve(); // attende il caricamento dei dati principali
        video.onerror = () => resolve();
        div.appendChild(video);
      } else {
        const link = document.createElement('a');
        link.href = file.src;
        link.textContent = file.name;
        link.target = '_blank';
        div.appendChild(link);
        resolve(); // i link non hanno caricamento
      }

      gallery.appendChild(div);
    });
  }
}

// Avvio del caricamento sequenziale
loadFilesSequentially(files);
