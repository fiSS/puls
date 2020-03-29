//slider native js
let slideIndex = 1, //переменная отвечает за тот слайд который показывается в данный момент
    slides = document.querySelectorAll('.slider__item'),
    prev = document.querySelector('.slider__prev'),
    next = document.querySelector('.slider__next'),
    dotsWrap = document.querySelector('.slider__dots'),
    dots = document.querySelectorAll('.dot');

showSlides(slideIndex);

function showSlides(n) { //сюда вместо n попадает 2 из showSlides(slideIndex += n);

    if (n > slides.length) { //если слайды закончились, то возвращаемся к 1 слайду
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length; //возвращаемся к самому последнему слайду
    }

    slides.forEach((item) => item.style.display = 'none'); //скрываем все слайды 1 способ более современный
    // for (let i = 0; i < slider.length; i++) { //через цикл
    //     slider[i].style.display = 'none';
    dots.forEach((item) => item.classList.remove('dot-active')); //способ более современный

    slides[slideIndex - 1].style.display = 'block'; //конвертация нормальной нумерации в js
    dots[slideIndex - 1].classList.add('dot-active');
}

function plusSlides(n) { //будет изменять слайд индекс в зависимости от того в какцю сторону идём
    showSlides(slideIndex += n); //увеличиваем слайд на 1 и сразу вызываем функцию showSlides уже с 2 как аргумент
}

//функция которая будет вычисляь текущий слайд и устанавливать его
function currentSlide(n) {
    showSlides(slideIndex = n); //когда кликаем например на 4 точку сюда будет передаваться цифра 4 и ф-я showSlides запускается с 4-ой и мы видим 4 слайд
}

prev.addEventListener('click', function () { //уменьшаем на 1 и идём на слайд назад
    plusSlides(-1);
});

next.addEventListener('click', function () {
    plusSlides(1);
});

//делегирование событий, если слайды будут автоматически добавляться на страницу, то мы будем генерить новые точки и на них будут висеть уже обработчики событий
dotsWrap.addEventListener('click', function (event) {
    for (let i = 0; i < dots.length + 1; i++) {
        if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
            currentSlide(i);
        }
    }


});

//табы для каталога пульсометров https://denis-creative.com/jquery-tabs/
$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

$('.catalog-item__link').each(function(i) {
    $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    });
});

$('.catalog-item__back').each(function(i) {
    $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    });
});

    //modal
    //открывам модал
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn("slow");
    });
    //закрываем модал
    $('.modal__close').on('click', function() {
        $('.overlay, #conultation, #thanks, #order').fadeOut('slow');
    });
    
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });
    
    //mask input number
    $("input[name=phone]").mask("+7(999) 999-99-99");

    //send mail ajax
    $('form').submit(function(event){
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").value("");

            $('form').trigger('reset');
        });
        return false;
    });

    //smooth scroll and pageUp
    //1 pageup
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    //smoth scrolling, необходимо к элементу на странице добавить class wow(плавно выезжают элементы при скролле)
    new WOW().init();







// slick slider
// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//         responsive: [
//             {
//                 breakpoint: 768,
//                 settings: {
//                     dots: true,
//                     arrows: false
//                 }
//               }
//         ]
//     });
//   });


// const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false
// });

// document.querySelector('.prev').addEventListener('click', function () {
//     slider.goTo('prev');
//   });
//   document.querySelector('.next').addEventListener('click', function () {
//     slider.goTo('next');
//   });