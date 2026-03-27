document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // 攔截傳統提交行為

            const submitBtn = contactForm.querySelector('.submit-btn');
            const formData = new FormData(contactForm);
            
            // 介面反饋：傳送中
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "傳送中...";
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.innerText = "感謝您的訊息！我已收到並會盡快回覆。";
                    formStatus.style.color = "#7ce0ef";
                    contactForm.reset(); // 成功後清空表單
                } else {
                    formStatus.innerText = "傳送失敗，請稍後再試。";
                    formStatus.style.color = "#ff6b6b";
                }
            } catch (error) {
                formStatus.innerText = "連線錯誤，請檢查網路。";
                formStatus.style.color = "#ff6b6b";
            } finally {
                // 恢復按鈕狀態
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});