$(document).ready(function(){
  $('.slider').slick({
  infinite: true,
	slidesToShow: 5,
	slidesToScroll: 1,
  prevArrow: '<button class="slick-prev"></button>',
  nextArrow: '<button class="slick-next"></button>',
  responsive: [
    {
      breakpoint: 1170,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 719,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
      }
    },
  ]
  });
  $('.slider2').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="slick-prev"></button>',
  nextArrow: '<button class="slick-next"></button>',
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
      }
    },
  ]
  });

  $('.hamburger').on("click", function (){
    $('.block-mob').toggleClass('block-mob-active');
  });

   $('.submenu').on("click","a", function (){
    $('.dropdown').toggleClass('dropdown_show');
  });

  $('.block-mob-up-p').on("click", function (){
    $('.block-mob-up-p').removeClass('block-mob-up-active');  
    $(this).addClass('block-mob-up-active'); 
  });

  $('.study-pagination-center-a').on("click", function (){
    $('.study-pagination-center-a').removeClass('study-pagination-center-active');  
    $(this).addClass('study-pagination-center-active'); 
  });

// Отправка данных на сервер
function send(event, php){
console.log("Отправка запроса");
event.preventDefault ? event.preventDefault() : event.returnValue = false;
var req = new XMLHttpRequest();
req.open('POST', php, true);
req.onload = function() {
  if (req.status >= 200 && req.status < 400) {
  json = JSON.parse(this.response); // Ебанный internet explorer 11
      console.log(json);
        
      // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
      if (json.result == "success") {
        // Если сообщение отправлено
        alert("Сообщение отправлено");
      } else {
        // Если произошла ошибка
        alert("Ошибка. Сообщение не отправлено");
      }
    // Если не удалось связаться с php файлом
    } else {alert("Ошибка сервера. Номер: "+req.status);}}; 

// Если не удалось отправить запрос. Стоит блок на хостинге
req.onerror = function() {alert("Ошибка отправки запроса");};
req.send(new FormData(event.target));
}
});