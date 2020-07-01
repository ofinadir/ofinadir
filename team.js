
// Register Service Worker
function registerServiceWorker() {
  try {
    const register = navigator.serviceWorker.register("./service-worker.js");
    console.log("Register service worker berhasil");
    return register;
  } catch (err) {
    console.error("Register service worker gagal", err);
  }
}

if (!("serviceWorker" in navigator)) {
  console.log("Service Worker Tidak didukung browser");
} else {
  registerServiceWorker();
}

document.addEventListener("DOMContentLoaded", async function () {
  console.log(window.location);
  await getTeamByID();

  let btnFav = document.querySelector("#addFav");
  let urlParams = new URLSearchParams(window.location.search);
  let id = Number(urlParams.get("id"));
  let isFav = false;
  checkData("team_fav", id)
    .then(msg => {
      btnFav.classList.remove("blue-grey-text");
      btnFav.classList.add("red-text");
      isFav = true;
    })
    .catch(msg => {
      btnFav.classList.remove("red-text");
      btnFav.classList.add("blue-grey-text");
      isFav = false;
    });

  btnFav.addEventListener("click", async function () {
    if (isFav) {
      deleteDatafav("team_fav", id);
      btnFav.classList.remove("red-text");
      btnFav.classList.add("blue-grey-text");
      isFav = false;
    } else {
      const res = await dataTeamIDB();
      const data = await res;
      createDataFav("team", data);
      btnFav.classList.remove("blue-grey-text");
      btnFav.classList.add("red-text");
      isFav = true;
    }
  });
});