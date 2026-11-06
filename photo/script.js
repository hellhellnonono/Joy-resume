'use strict';

// 照片檔名必須與 GitHub photo 資料夾中的檔名（含大小寫）完全相同。
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
const prevButton = document.querySelector('.project-prev');
const nextButton = document.querySelector('.project-next');
const closeButton = document.querySelector('.project-close');
let currentProject = null;
let currentIndex = 0;
let touchStartX = null;
let loadToken = 0;

function renderImage() {
  if (!currentProject) return;
  const project = projects[currentProject];
  const imageName = project.images[currentIndex];
  const token = ++loadToken;
  title.textContent = project.title;
  counter.textContent = `${currentIndex + 1} / ${project.images.length}`;
  caption.textContent = `載入中：${imageName}`;
  // 先清空舊圖，避免下一張失敗時仍看到上一張。
  fullImage.removeAttribute('src');
  fullImage.style.visibility = 'hidden';
  fullImage.alt = '';
  const loader = new Image();
  loader.onload = () => {
    if (token !== loadToken) return; // 忽略快速切換時較舊的載入結果
    fullImage.src = loader.src;
    fullImage.alt = `${project.title}，第 ${currentIndex + 1} 張，共 ${project.images.length} 張`;
    fullImage.style.visibility = 'visible';
    caption.textContent = `${project.title} — ${currentIndex + 1} / ${project.images.length}（${imageName}）`;
  };
  loader.onerror = () => {
    if (token !== loadToken) return;
    caption.textContent = `無法載入照片：${imageName}。請檢查 GitHub 檔名、大小寫與路徑。`;
    console.error('Photo image failed to load:', imageName);
  };
  loader.src = imageName;
}

function openProject(key) {
  if (!projects[key] || !dialog) return;
  currentProject = key;
  currentIndex = 0;
  dialog.showModal();
  renderImage();
}

function stepImage(delta) {
  if (!currentProject) return;
  const length = projects[currentProject].images.length;
  currentIndex = (currentIndex + delta + length) % length;
  renderImage();
}

// 作品封面張數與 JS 清單同步。
document.querySelectorAll('.project-card[data-project]').forEach(card => {
  const project = projects[card.dataset.project];
  if (!project) return;
  const count = card.querySelector('.project-info small');
  if (count) count.textContent = `${project.images.length} Photographs`;
  card.addEventListener('click', () => openProject(card.dataset.project));
});

if (dialog && fullImage && title && counter && caption && prevButton && nextButton && closeButton) {
  closeButton.addEventListener('click', () => dialog.close());
  prevButton.addEventListener('click', () => stepImage(-1));
  nextButton.addEventListener('click', () => stepImage(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); stepImage(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); stepImage(1); }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => { ++loadToken; });
  fullImage.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  fullImage.addEventListener('touchend', event => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 45) stepImage(delta < 0 ? 1 : -1);
    touchStartX = null;
  }, { passive: true });
}

// Portfolio 下拉選單統一由 ../shared-header.js 處理，避免重複綁定。
