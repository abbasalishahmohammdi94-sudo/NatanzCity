let deferredPrompt;

window.addEventListener("DOMContentLoaded", () => {

    const installBtn = document.getElementById("installBtn");

    window.addEventListener("beforeinstallprompt", (e) => {

        console.log("قابل نصب شد ✅");

        e.preventDefault();

        deferredPrompt = e;

        installBtn.style.display = "block";

    });


    installBtn.addEventListener("click", async () => {

        console.log("دکمه نصب زده شد");

        if (!deferredPrompt) {

            alert("PWA هنوز آماده نصب نیست");
            return;

        }


        deferredPrompt.prompt();


        const choice = await deferredPrompt.userChoice;


        console.log(choice);


        deferredPrompt = null;

    });

});
