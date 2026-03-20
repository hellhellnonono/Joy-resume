document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.video-item');

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            // 1. 切換焦點樣式 (讓選中的項目變寬/亮起)
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 2. 獲取網址並跳轉
            const youtubeUrl = item.getAttribute('data-link');
            
            if (youtubeUrl) {
                // 使用 setTimeout 稍微延遲 200ms，讓使用者能看到點擊後的視覺反饋(變寬動畫)再跳轉
                setTimeout(() => {
                    window.open(youtubeUrl, '_blank');
                }, 200);
            }
        });
    });
});