/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import MousePRLX from './libs/parallaxMouse'
// import AOS from 'aos'
// import Swiper, { Navigation, Pagination } from 'swiper';

import BaseHelpers from './helpers/BaseHelpers.js';
import PopupManager from './modules/PopupManager';
import BurgerMenu from './modules/BurgerMenu';
// import Tabs from './modules/Tabs';
import Accordion from './modules/Accordion.js';

BaseHelpers.checkWebpSupport();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
new PopupManager();

/**
 *  Модуль для работы с меню (Бургер)
 * */
new BurgerMenu().init();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
// AOS.init();

/**
 * Параллакс мышей
 * */
// new MousePRLX();

// new Tabs('tabs-example', {});

new Accordion('.accordion', {
    shouldOpenAll: false, // true
    defaultOpen: [], // [0,1]
    collapsedClass: 'open',
});

let button = document.querySelector(".burger");
const header = document.querySelector('.header')
let cross = document.querySelector(".cross");

button.addEventListener("click", function () {
    header.classList.toggle("active");
});


let marquee = document.querySelector(".ticker__subscription");
let modal = document.querySelector(".ticker-modal")
let crossModal = document.querySelector(".cross-modal")


if (marquee) {
    marquee.addEventListener("click", function () {
        modal.style.display = "flex";
    });
}

if (modal && crossModal) {
    crossModal.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

// modal.addEventListener("click", function () {
//   modal.style.display = "none";
// });


//Анимация хедера на скролл (фон)
document.addEventListener('scroll', (e) => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }
})


try {
    //Анимация секции about
    const panelsContainer = document.querySelector('.about__wrapper')
    const scrollbar = document.querySelector('.about__scrollWrap')
    gsap.to('.about__scrollWrap', {
        x: -(scrollbar.offsetWidth - panelsContainer.offsetWidth),
        ease: "none",
        scrollTrigger: {
            trigger: ".about",
            pin: true,
            start: "top " + String(header.offsetHeight + 16),
            // markers: true,
            scrub: true,
        }
    });
} catch (e) {

}

const fadeInAnimation = gsap.utils.toArray('.fadeInAnimation').forEach((element) => {
    gsap.from(element, {
        y: 20,
        opacity: 0,
        ease: "ease",
        scrollTrigger: {
            start: "top 70%",
            // markers: true,
            trigger: element
        }
    });
})


//Валидация email
const subscribeButton = document.querySelector(".ticker-modal__btn")
const subscribeInput = document.querySelector(".ticker-modal__input")
const subscribeNotification = document.querySelector(".ticker-modal__notification")
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

if(subscribeButton){
    subscribeButton.addEventListener("click", () => {
        subscribeNotification.style.marginBottom = "20px"
        if(!subscribeInput.value.match(emailRegex)){
            subscribeNotification.innerHTML = "Введите корректный email"
        } else {
            try {
                //...APi call
                subscribeNotification.innerHTML = "Вы успешно подписались на рассылку"
            } catch (e) {
                console.log(e)
            }
        }
    })
}

//Маска телефона
const phoneInput = document.getElementById('modal-window__phoneInput');
const maskOptions = {
    mask: '+{7}(000)000-00-00'
};
const mask = IMask(phoneInput, maskOptions);