function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function loadPrices() {
  const priceBasic = localStorage.getItem('priceBasic') || 15;
  const priceFull = localStorage.getItem('priceFull') || 25;
  const priceTurnkey = localStorage.getItem('priceTurnkey') || 35;

  document.querySelector('#package option[value="15"]').text = `Базовый (${priceBasic}$ / м²)`;
  document.querySelector('#package option[value="25"]').text = `Полный проект (${priceFull}$ / м²)`;
  document.querySelector('#package option[value="35"]').text = `Под ключ (${priceTurnkey}$ / м²)`;
}

function calculatePrice() {
  const type = document.getElementById('type').value;
  const area = parseFloat(document.getElementById('area').value);
  const pack = parseFloat(document.getElementById('package').value);
  const resultBlock = document.getElementById('result');

  if (!type) { resultBlock.innerText = "Выберите тип помещения"; return; }
  if (isNaN(area) || area <= 0) { resultBlock.innerText = "Введите корректную площадь"; return; }
  if (isNaN(pack)) { resultBlock.innerText = "Выберите пакет услуг"; return; }

  const total = Math.round(area * pack);

  resultBlock.innerHTML = `
    <p>Объект: <b>${type}</b></p>
    <p>Площадь: <b>${area} м²</b></p>
    <p>Пакет: <b>${pack}$ / м²</b></p>
    <p style="font-size:20px;">Итого: <b>${total}$</b></p>
    <button class="btn" onclick="scrollToContact()">Заказать проект</button>
  `;

  sendQuizToTelegram(type, area, pack, total);
}

function sendQuizToTelegram(type, area, pack, total) {
  const text = `Новый расчёт:%0AТип: ${type}%0AПлощадь: ${area} м²%0AПакет: ${pack}$/м²%0AИтого: ${total}$`;
  const botToken = "123456789:ABCdefGhIJKlmNoPQRstuVWXyz123456789"; // твой токен
  const chatId = "@Dmitriybyl";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`)
    .catch(() => console.log('Ошибка отправки расчёта в Telegram'));
}

document.getElementById('telegramForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  const text = `Новая заявка:%0AИмя: ${name}%0AТелефон: ${phone}%0AЗадача: ${message}`;
  const botToken = "123456789:ABCdefGhIJKlmNoPQRstuVWXyz123456789";
  const chatId = "@Dmitriybyl";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`)
    .then(() => alert("Заявка отправлена!"))
    .catch(() => alert("Ошибка отправки"));
});

window.onload = () => {
  loadPrices();
};
