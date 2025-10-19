const gallery = document.getElementById('gallery');

// Barra di progresso
const progressContainer = document.createElement('div');
progressContainer.className = 'progress-container';
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
progressContainer.appendChild(progressBar);
document.body.insertBefore(progressContainer, gallery);

// Caricamento sequenziale con icona personalizzata
async function loadFilesSequentially(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const div = document.createElement('div');
    div.className = 'grid-item';

    // Loader iniziale
    const loader = document.createElement('div');
    loader.className = 'loader';
    div.appendChild(loader);
    gallery.appendChild(div);

    await new Promise(resolve => {
      let media;
      if (file.type === 'image') {
        media = document.createElement('img');
        media.src = file.src;
        media.alt = file.name;
        media.onload = resolve;
        media.onerror = resolve;
      } else if (file.type === 'video') {
        media = document.createElement('video');
        media.src = file.src;
        media.controls = true;
        media.onloadeddata = resolve;
        media.onerror = resolve;
      } else {
        media = document.createElement('a');
        media.href = file.src;
        media.textContent = file.name;
        media.target = '_blank';
        resolve();
      }
      media.style.display = 'none';
      div.appendChild(media);
    });

    // Rimuove loader e mostra media
    div.querySelector('.loader')?.remove();
    const mediaElement = div.querySelector('img,video,a');
    mediaElement.style.display = 'block';

    // --- Bottone download con icona ---
    const downloadBtn = document.createElement('a');
    downloadBtn.className = 'download-btn';
    downloadBtn.href = file.src;
    downloadBtn.download = file.name || 'media';
    downloadBtn.title = 'Scarica';
    
    const icon = document.createElement('img');
    icon.src = 'icona.png'; // 👈 percorso dell’icona
    icon.alt = 'Download';
    downloadBtn.appendChild(icon);
    
    div.appendChild(downloadBtn);
    div.classList.add('loaded');

    // Aggiorna barra di progresso
    progressBar.style.width = `${((i + 1) / files.length) * 100}%`;
  }

  setTimeout(() => {
    progressContainer.style.opacity = '0';
  }, 800);
}

// Avvio caricamento
loadFilesSequentially(files);
