const NatanzSwiper = new Swiper(".NatanzSwiper", {
  loop: false,

  grabCursor: true,

  spaceBetween: 20,

  speed: 800,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    dragSize: "auto",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    768: {
      slidesPerView: 2,
    },

    992: {
      slidesPerView: 3,
    },
  },
});
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){
        scrollBtn.style.display = "block";
    }else{
        scrollBtn.style.display = "none";
    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
const texts = [
    "در حال پیدا کردن کوچه‌های قدیمی نطنز... 🏛️",
    "داریم مسجد جامع رو آماده می‌کنیم... 😄",
    "در حال گردگیری تاریخ نطنز... ✨",
    "تقریباً رسیدیم، چای رو هم آماده کنید ☕😂"
];

let i = 0;

const loaderText = document.querySelector("#loader-text");
const loader = document.querySelector("#loader");

const textInterval = setInterval(() => {
    loaderText.textContent = texts[i];
    i = (i + 1) % texts.length;
}, 700);


window.addEventListener("load", () => {

    setTimeout(() => {

        clearInterval(textInterval);

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 300);

    }, 3000);

}); 