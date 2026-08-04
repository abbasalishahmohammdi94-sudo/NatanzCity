document.addEventListener("error", (event) => {

    const img = event.target;

    if (img.tagName !== "IMG") return;

    if (img.dataset.fallback) return;

    img.dataset.fallback = "true";

    const slide = img.closest(".carousel-item");


    if (slide) {

        const carousel = slide.closest(".carousel");

        const wasActive = slide.classList.contains("active");

        slide.remove();

        if (wasActive && carousel) {

            const nextSlide = carousel.querySelector(".carousel-item");

            if (nextSlide) {
                nextSlide.classList.add("active");
            }

        }

        if (carousel && !carousel.querySelector(".carousel-item")) {
            carousel.style.display = "none";
        }

    } else {

        img.src = "../assets/images/not-found.webp";
        img.alt = "تصویر پیدا نشد";

    }

}, true);