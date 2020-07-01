function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Regsitrasi Service Worker
function registerServiceWorker() {
  try {
    const register = navigator.serviceWorker.register("./service-worker.js");
    console.log("Register service worker berhasil");
    return register;
  } catch (err) {
    console.error("Register service worker gagal", err);
  }
}

//   Request Notification API
async function requestNotification() {
  try {
    const res = await Notification.requestPermission();
    if (res === "denied") {
      console.log("Fitur Notifikasi tidak diijinkan");
      return;
    } else if (res === "default") {
      console.log("Pengguna menutup kotak dialog request");
      return;
    } else {
      if ("PushManager" in window) {
        try {
          const reg = await navigator.serviceWorker.getRegistration();
          const pushSub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BF3Cn7AGubzI207mW-oR3cq-HJpYv_cgAMqj1V09dypGDqdvGIIHEuf7XvIzwPtSyvEAb4RfqRdTKbNfyAo_lkk"
            )
          });

          const subscribe = await pushSub;

          console.log(
            "Berhasil Melukukan subscribe dengan endpoint",
            subscribe.endpoint
          );
          console.log(
            "Berhasil Melakukan subscribe dengan p256dh key :",
            btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("p256dh"))
              )
            )
          );
          console.log(
            "Berhasil Melakukan subscribe dengan auth key :",
            btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("auth"))
              )
            )
          );
        } catch (e) {
          console.error("Tidak dapat melakukan subscribe", e.message);
        }
      }
    }
  } catch (rr) {
    throw new Error(err);
  }
}

if (!("serviceWorker" in navigator)) {
  console.log("Service Worker Tidak didukung browser");
} else {
  registerServiceWorker();
}

navigator.serviceWorker.ready.then(() => {
  if ("Notification" in window) {
    requestNotification();
  } else {
    console.log("Browser tidak mendukung notifikasi");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let page = window.location.hash.substr(1);
});