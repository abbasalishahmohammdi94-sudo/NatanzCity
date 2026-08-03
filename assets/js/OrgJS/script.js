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