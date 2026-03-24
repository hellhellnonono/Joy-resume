document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 下載按鈕點擊效果
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            alert('正在準備下載 Joy Sun 的完整簡歷檔案...');
            // 實際使用時請取消註釋並修改路徑
            // window.location.href = 'assets/joy_sun_resume.pdf';
        });
    }

    // 2. 導覽列 Active 狀態邏輯
    // 雖然你在 HTML 已經手動加了 active，但這裡保留點擊切換邏輯以增加互動感
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 3. 可選：手機版捲動顯示效果 (讓閱讀體驗更好)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 95, 95, 0.9)';
            header.style.transition = '0.3s';
        } else {
            header.style.background = 'transparent';
        }
    });
});
