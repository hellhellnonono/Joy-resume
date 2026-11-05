'use strict';

const projects = {
  earphone: { title: 'Earphones', images: ['earphone-01.JPG', 'earphone-02.JPG'] },
  coffee: { title: 'Coffee Gift Set', images: ['coffeeset-02.jpg', 'coffeeset-03.JPG'] },
  nougat: { title: 'Nougat', images: ['nugat-01.jpg', 'nugat-02.jpg', 'nugat-03.jpg', 'nugat-04.jpg'] },
  portrait: { title: 'Portrait Photography', images: ['Portrait Photography-01.JPG', 'Portrait Photography-02.JPG'] },
  birthday: { title: 'First Birthday Celebration', images: ['one-year-old catch-01.jpg', 'one-year-old catch-02.jpg'] },
  commercial: { title: 'Commercial Editorial', images: ['commercial-01.jpg', 'commercial-02.jpg'] }
};

const dialog = document.getElementById('projectLightbox');
const fullImage = document.getElementById('projectFullImage');
const title = document.getElementById('projectTitle');
const counter = document.getElementById('projectCounter');
const caption = document.getElementById('projectImageCaption');
let currentProject = null;
let currentIndex = 0;
let touchStartX = null;

function renderImage() {
  if (!currentProject) return;
  const project = projects[currentProject];
  const imageName = project.images[currentIndex];
  title.textContent = project.title;
  counter.textContent = `${currentIndex + 1} / ${project.images.length}`;
  caption.textContent = `${project.title} — ${currentIndex + 1} of ${project.images.length}`;
  fullImage.src = imageName;
  fullImage.alt = `${project.title}，第 ${currentIndex + 1} 張，共 ${project.images.length} 張`;
}
function openProject(key) {
  if (!projects[key]) return;
  currentProject = key;
  currentIndex = 0;
  renderImage();
  dialog.showModal();
}
function stepImage(delta) {
  if (!currentProject) return;
  const length = projects[currentProject].images.length;
  currentIndex = (currentIndex + delta + length) % length;
  renderImage();
}

document.querySelectorAll('.project-card[data-project]').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
});
document.querySelector('.project-close').addEventListener('click', () => dialog.close());
document.querySelector('.project-prev').addEventListener('click', () => stepImage(-1));
document.querySelector('.project-next').addEventListener('click', () => stepImage(1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); stepImage(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); stepImage(1); }
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
fullImage.addEventListener('touchstart', event => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });
fullImage.addEventListener('touchend', event => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 45) stepImage(delta < 0 ? 1 : -1);
  touchStartX = null;
}, { passive: true });
