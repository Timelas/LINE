$(document).ready(function () {
	$('.header__burger').click(function (event) {
		 $('.header__burger, .header__menu').toggleClass('active');
		 $('body').toggleClass('lock'); // Добавляем/убираем класс lock
	});

	// Обработчик клика на ссылки в меню
	$('.header__link').click(function (event) {
		 // Закрываем меню
		 $('.header__burger, .header__menu').removeClass('active');
		 $('body').removeClass('lock'); // Убираем класс lock при закрытии меню
	});
});


// -------------------- функция тайминг-------------------
document.addEventListener('DOMContentLoaded', function() {
  // конечная дата
  const deadline = new Date("April 9, 2026 14:46:00").getTime();
  // id таймера
  let timerId = null;
  // склонение числительных
  function declensionNum(num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }
  // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
  function change() {
    const timer = deadline - new Date();
    if (timer > 0) {
      const diff = deadline - new Date();
      return countdown(diff);
    } else {
      const diff = new Date() - deadline;
      document.getElementById("timer").innerHTML = "Мы женаты";
      return countdown(diff);

    }
  }

  function countdown(diff) {
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    $days.textContent = days;
    $hours.textContent = hours;
    $minutes.textContent = minutes;
    $seconds.textContent = seconds;
    $daystext.textContent = declensionNum(days, ['день', 'дня', 'дней']);
    $hourstext.textContent = declensionNum(hours, ['час', 'часа', 'часов']);
    $minutestext.textContent = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    $secondstext.textContent = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
  }

  // получаем элементы, содержащие компоненты даты
  const $daystext = document.querySelector('.timer__text_var_day');
  const $hourstext = document.querySelector('.timer__text_var_hour');
  const $minutestext = document.querySelector('.timer__text_var_min');
  const $secondstext = document.querySelector('.timer__text_var_sec');

  const $days = document.querySelector('.timer__number_var_day');
  const $hours = document.querySelector('.timer__number_var_hour');
  const $minutes = document.querySelector('.timer__number_var_min');
  const $seconds = document.querySelector('.timer__number_var_sec');
  change();
  timerId = setInterval(change, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  const yesRadio = document.getElementById("yes");
  const noRadio = document.getElementById("not");

  const form = document.getElementById("survey-form");
  const thankyou = document.getElementById("thankyou");
  const newGuestBtn = document.getElementById("newGuest");

  const extraBlocks = document.querySelectorAll(
    ".question__check-block, .question__input__block"
  );

  // скрытие/показ блоков
  function toggleBlocks() {
    if (noRadio.checked) {
      extraBlocks.forEach(block => {
        block.classList.add("hidden");
        block.style.display = "none";
      });
    } else {
      extraBlocks.forEach(block => {
        block.style.display = "";
        block.classList.remove("hidden");
      });
    }
  }

  yesRadio.addEventListener("change", toggleBlocks);
  noRadio.addEventListener("change", toggleBlocks);
  toggleBlocks();

  // валидация и отправка
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const name = form.elements["name"];
    const alcohol = form.elements["alcohol"];
    let valid = true;
  
    // очищаем предыдущие ошибки
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    name.classList.remove("error");
    alcohol.classList.remove("error");
  
    // проверка имени
    if (!name.value.trim()) {
      const error = document.createElement("div");
      error.className = "error-message";
      error.innerText = "Введите имя и фамилию";
      name.after(error);
      name.classList.add("error");
      valid = false;
    }
  
    // проверка алкоголя, если выбран yesRadio
    if (yesRadio.checked && !alcohol.value.trim()) {
      const error = document.createElement("div");
      error.className = "error-message";
      error.innerText = "Заполните предпочтение по алкоголю";
      alcohol.after(error);
      alcohol.classList.add("error");
      valid = false;
    }
  
    if (!valid) return;
  
    // форма валидна → показываем заглушку
    form.style.display = "none";
    thankyou.style.display = "flex";
  });
  
  // новая анкета
  newGuestBtn.addEventListener("click", () => {
    form.reset();
    toggleBlocks();
    thankyou.style.display = "none";
    form.style.display = "flex";
  
    // очищаем ошибки
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    form.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
  });  
});



