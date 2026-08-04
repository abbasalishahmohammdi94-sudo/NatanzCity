let businesses = [];

const searchInput = document.querySelector("#business-search");
const container = document.querySelector("#business-list");
const loadingText = document.querySelector("#search-loading");

// گرفتن اطلاعات از JSON
fetch("../assets/json/businesses.json")
  .then((response) => response.json())
  .then((data) => {
    businesses = data;
  })
  .catch((error) => {
    console.error("خطا در دریافت اطلاعات:", error);
  });

// سیستم جستجو
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.trim().toLowerCase();

  // اگر سرچ خالی بود
  if (searchValue === "") {
    container.style.display = "none";
    container.innerHTML = "";

    loadingText.style.display = "none";

    return;
  }

  // پیدا کردن نتایج
  const results = businesses.filter((business) => {
    return (
      business.name.toLowerCase().includes(searchValue) ||
      business.category.toLowerCase().includes(searchValue) ||
      business.description.toLowerCase().includes(searchValue) ||
      business.address.toLowerCase().includes(searchValue)
    );
  });

  // نمایش پیام جستجو
  loadingText.style.display = "block";

  // مخفی کردن کارت تا پایان زمان
  container.style.display = "none";
  container.innerHTML = "";

  setTimeout(() => {
    showBusinesses(results);

    container.style.display = "flex";

    loadingText.style.display = "none";
  }, 1000);
});

// ساخت کارت‌ها
function showBusinesses(data) {
  container.innerHTML = "";

  // اگر چیزی پیدا نشد
  if (data.length === 0) {
    container.innerHTML = `

        <div class="text-center mt-5">

            <h5>
                چیزی پیدا نشد 😔
            </h5>

            <p>
                شاید هنوز این کسب‌وکار در NatanzCity ثبت نشده باشد.
            </p>

        </div>

        `;

    return;
  }

  data.forEach((business) => {
    container.innerHTML += `


        <div class="col-lg-4 col-md-6">


            <div class="card business-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">



                <img 
                src="../${business.image}"
                class="card-img-top"
                height="230"
                style="object-fit:cover"
                alt="${business.name}">





                <div class="card-body">



                    <h5 class="fw-bold">
                        ${business.name}
                    </h5>




                    <span class="badge bg-success">
                        ${business.category}
                    </span>




                    <p class="text-muted mt-3">
                        ${business.description}
                    </p>




                    <p>
                        📍 ${business.address}
                    </p>

                    <p>
                        🕰️ ${business.workTime}
                    </p>


                    <a href="tel:${business.phone}" class="btn call-btn">
                        📞 تماس
                    </a>


                </div>



            </div>


        </div>



        `;
  });
}
