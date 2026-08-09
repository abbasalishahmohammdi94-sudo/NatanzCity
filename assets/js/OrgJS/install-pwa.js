let deferredPrompt;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("قابل نصب شد ✅");

  e.preventDefault();

  deferredPrompt = e;

  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) {
    alert("PWA هنوز آماده نصب نیست");
    return;
  }

  deferredPrompt.prompt();

  const choice = await deferredPrompt.userChoice;

  if (choice.outcome === "accepted") {
    console.log("نصب شد 🎉");
  } else {
    console.log("لغو شد");
  }

  deferredPrompt = null;
});
