function initPopupForm() {
    const heroButton = document.querySelector('.hero-button');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popup = document.querySelector('.call-popup');
    const closeBtn = document.querySelector('.call-popup__close');
    const form = document.getElementById('popupForm');

    if (!heroButton || !popupOverlay || !popup || !closeBtn || !form) return;

    // открыть
    heroButton.addEventListener('click', () => {
        popupOverlay.classList.remove('hidden');
        document.body.classList.add('noscroll');
    });

    // закрыть по крестику
    closeBtn.addEventListener('click', () => {
        popupOverlay.classList.add('hidden');
        document.body.classList.remove('noscroll');
    });

    // закрыть вне формы
    popupOverlay.addEventListener('click', (e) => {
        if (!popup.contains(e.target)) {
            popupOverlay.classList.add('hidden');
            document.body.classList.remove('noscroll');
        }
    });

    // отправка в тг
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const token = '7523368807:AAHIWfGaAawonX6cocOWSmgafzI40woeWXQ';
        const chatId = '1786114744';

        const formData = new FormData(form);
        const email = formData.get('email');
        const name = formData.get('name');
        const phone = formData.get('phone');

        const message = `
Новая заявка:
Имя: ${name}
Email: ${email}
Телефон: ${phone}
`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML',
                }),
            });

            if (response.ok) {
                alert('Заявка успешно отправлена!');
                form.reset();
                popupOverlay.classList.add('hidden');
                document.body.classList.remove('noscroll');
            } else {
                alert('Ошибка при отправке. Попробуйте позже.');
            }
        } catch (error) {
            alert('Ошибка соединения. Проверьте интернет.');
        }
    });
}

initPopupForm();
