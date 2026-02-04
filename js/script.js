function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function calculatePrice() {
  const type = document.getElementById('type').value;
  const area = document.getElementById('area').value;
  const pack = document.getElementById('package').value;

  if (!type || !area || !pack) {
    document.getElementById('result').innerText = "Пожалуйста, заполните все поля";
    return;
  }

  const total = area * pack;
  document.getElementById('result').innerText = `Примерная стоимость проекта: ${total}$`;
}

document.getElementById('telegramForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  const text = `Новая заявка с сайта:%0AИмя: ${name}%0AТелефон: ${phone}%0AЗадача: ${message}`;

  const botToken = "PASTE_YOUR_BOT_TOKEN_HERE";
  const chatId = "PASTE_YOUR_CHAT_ID_HERE";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`)
    .then(() => alert("Заявка отправлена! Мы скоро свяжемся с вами."))
    .catch(() => alert("Ошибка отправки. Напишите нам напрямую в Telegram."));
});
