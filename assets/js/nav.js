document.addEventListener("DOMContentLoaded", function () {
  //Active slidebar nav
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;
      }

      document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
        elm.innerHTML = xhttp.responseText;
      });

      document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
        elm.addEventListener("click", function (event) {
          //   Tutup sidenav
          let sidenav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenav).close();

          //   Muat konten haaman yang dipanggil
          page = event.target.getAttribute("href").substr(1);
          loadPage(page);
        });
      });
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  //   Load Page Content
  let page = window.location.hash.substr(1);
  let path = window.location.pathname.substr(1);

  if ((page === "" && path === "") || (page === "#" && path === "")) {
    page = "home";
  }
  loadPage(page);
  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      let content = document.querySelector("#body-content");
      if (this.readyState === 4) {
        if (page === "home") {
          getKlasmenData();
        } else if (page === "matches") {
          getMatchData();
        } else if (page === "teamFav") {
          getDataFav();
        }

        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan</p>";
        } else {
          content.innerHTML = "<p>ups.. halaman tidak dapat diakses</p>";
        }
      }
    };

    if (path === "") {
      xhttp.open("GET", "pages/" + page + ".html", true);
      xhttp.send();
    }
  }
});
