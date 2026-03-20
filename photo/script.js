document.addEventListener("DOMContentLoaded", () => {
    // 取得所有必要的元素
    const galleryImages = document.querySelectorAll('.gallery img');
    const overlayBg = document.querySelector('.overlay-bg');
    const focusedImage = document.querySelector('.focused-image');
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');

    // 判斷是否為觸控裝置 (手機或平板)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    galleryImages.forEach(img => {
        
        // --- 1. 電腦版 Hover 預覽邏輯 ---
        // 只有在非觸控裝置（電腦）上才執行預覽功能
        if (!isTouchDevice && overlayBg && focusedImage) {
            img.addEventListener('mouseenter', () => {
                focusedImage.src = img.src;
                overlayBg.classList.add('active');
                focusedImage.classList.add('active');
            });

            img.addEventListener('mouseleave', () => {
                overlayBg.classList.remove('active');
                focusedImage.classList.remove('active');
            });
        }

        // --- 2. 通用 Lightbox 點擊放大邏輯 ---
        img.addEventListener('click', () => {
            // 將點擊的圖片路徑傳給燈箱
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            
            // 點擊後確保電腦版的預覽層會消失，避免層級衝突
            if (overlayBg) overlayBg.classList.remove('active');
            if (focusedImage) focusedImage.classList.remove('active');
        });
    });

    // --- 3. 關閉燈箱功能 ---
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        // 延遲清空圖片路徑，避免關閉動畫時看到圖片突然消失
        setTimeout(() => { lightboxImg.src = ""; }, 300);
    };

    // 點擊關閉按鈕
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // 點擊燈箱背景處（非圖片區域）也可關閉
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 按下鍵盤 Esc 鍵關閉
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});
