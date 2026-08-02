document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      // جلوگیری از اجرای دوباره
      if (this.dataset.fallback) return;

      this.dataset.fallback = "true";

      const slide = this.closest(".carousel-item");

      // اگر عکس داخل Carousel بود
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
        // اگر عکس معمولی بود
        this.src = "assets/images/not-found.webp";
        this.alt = "تصویر پیدا نشد";
      }
    });

    // عکس‌هایی که قبل از اجرای JS خراب شده‌اند
    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event("error"));
    }
  });
});
