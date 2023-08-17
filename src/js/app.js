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
            markers: true,
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
            start: "top center",
            markers: true,
            trigger: element
        }
    });
})
