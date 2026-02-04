/* ===== ПЛАВНАЯ ПРОКРУТКА ===== */
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

/* ===== КАЛЬКУЛЯТОР СТОИМОСТИ ===== */
function calculatePrice() {
  const type = document.getElementById('type').value;
  const area = parseFloat(document.getElementById('area').value);
  const pack = parseFloat(document.getElementById('package').value);
  const resultBlock = document.getElementById('result');

  if (!type) {
    resultBlock.innerText = "Пожалуйста, выберите тип помещения";
    return;
  }

  if (isNaN(area) || area <= 0) {
    resultBlock.innerText = "Введите корректную площадь в м²";
    return;
  }

  if (isNaN(pack)) {
    resultBlock.innerText = "Выберите пакет услуг";
    return;
  }

  const total = Math.round(area * pack);

  // Показываем пользователю
  resultBlock.innerHTML = `
    Стоимость проекта для объекта <b>${type}</b><br>
    Площадь: <b>${area} м²</b><br>
    Пакет: <b>${pack}$ / м²</b><br><br>
    <span style="font-size:20px;">Итого: <b>${total}$</b></span>
  `;

  // Отправляем расчёт в Telegram
  sendQuizToTelegram(type, area, pack, total);
}

/* ===== ОТПРАВКА РАСЧЁТА В TELEGRAM ===== */
function sendQuizToTelegram(type, area, pack, total) {
  const text = `Новый расчёт стоимости:%0AТип: ${type}%0AПлощадь: ${area} м²%0AПакет: ${pack}$/м²%0AИтого: ${total}$`;

  const botToken = "PASTE_BOT_TOKEN";
  const chatId = "PASTE_CHAT_ID";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`)
    .catch(() => console.log('Ошибка отправки квиза'));
}

/* ===== ФОРМА ОБРАТНОЙ СВЯЗИ ===== */
document.getElementById('telegramForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  const text = `Новая заявка:%0AИмя: ${name}%0AТелефон: ${phone}%0AЗадача: ${message}`;

  const botToken = "PASTE_BOT_TOKEN";
  const chatId = "PASTE_CHAT_ID";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`)
    .then(() => alert("Заявка отправлена! Мы скоро свяжемся с вами."))
    .catch(() => alert("Ошибка отправки. Попробуйте позже."));
});

/* ===== АДМИНКА ===== */
function loginAdmin() {
  if (document.getElementById('adminPass').value === 'admin123') {
    document.getElementById('adminControls').style.display = 'block';
  } else {
    alert('Неверный пароль');
  }
}

function savePrices() {
  localStorage.setItem('priceBasic', document.getElementById('priceBasic').value);
  localStorage.setItem('priceFull', document.getElementById('priceFull').value);
  localStorage.setItem('priceTurnkey', document.getElementById('priceTurnkey').value);
  alert('Цены сохранены');
  loadPrices();
}

function saveHeroTitle() {
  const title = document.getElementById('heroTitleInput').value;
  localStorage.setItem('heroTitle', title);
  document.getElementById('heroTitle').innerText = title;
  alert('Заголовок обновлён');
}

function loadPrices() {
  const b = localStorage.getItem('priceBasic');
  const f = localStorage.getItem('priceFull');
  const t = localStorage.getItem('priceTurnkey');

  if (b) document.getElementById('priceBasicText').innerHTML = `<strong>от ${b}$ / м²</strong>`;
  if (f) document.getElementById('priceFullText').innerHTML = `<strong>от ${f}$ / м²</strong>`;
  if (t) document.getElementById('priceTurnkeyText').innerHTML = `<strong>от ${t}$ / м²</strong>`;
}

/* ===== ЗАГРУЗКА СОХРАНЕННЫХ ДАННЫХ ===== */
window.onload = () => {
  if (localStorage.getItem('heroTitle')) {
    document.getElementById('heroTitle').innerText = localStorage.getItem('heroTitle');
  }
  loadPrices();
};
