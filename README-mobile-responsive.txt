Joy-resume：手機版響應式調整安裝說明

這份 mobile-responsive.css 是一份「共用覆蓋樣式」，用來補強現有網站在手機上的排版。它不會自動生效，必須放進 GitHub repo 並在各頁面的 HTML 引用。

一、將 mobile-responsive.css 上傳到 GitHub repo 的最外層（和首頁 index.html、style.css 放在同一層）。

二、在以下五個 HTML 檔的 <head> 區段，放在原本 style.css 連結的下一行：

1. 根目錄 index.html：
<link rel="stylesheet" href="mobile-responsive.css">

2. video/index.html：
<link rel="stylesheet" href="../mobile-responsive.css">

3. photo/photo-index.html：
<link rel="stylesheet" href="../mobile-responsive.css">

4. personal/index.html：
<link rel="stylesheet" href="../mobile-responsive.css">

5. contact/contact-index.html：
<link rel="stylesheet" href="../mobile-responsive.css">

三、Commit 後開啟網站測試。若手機仍顯示舊版，可先強制重新整理或清除瀏覽器快取；GitHub Pages 更新通常需要一點時間。

四、用 Chrome 桌面版測試：開啟網站後按 F12，再點「切換裝置工具列」（手機/平板圖示），測試 375px、390px、430px 等寬度。也請實際用手機確認導覽、縮圖點擊、相片 Lightbox 與聯絡表單。

注意：本檔只處理響應式版面，不會替換圖片、不會修正功能連結，也不會讓尚未串接服務端點的聯絡表單自動寄信。
