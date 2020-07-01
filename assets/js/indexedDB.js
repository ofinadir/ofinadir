function checkData(storeName, id) {
  return new Promise(function (resolve, reject) {
    db(idb)
      .then(function (db) {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(function (data) {
        if (data !== undefined) {
          resolve("data favorit");
        } else {
          reject("bukan data favorit");
        }
      });
  });
}

function createDataFav(dataType, data) {
  let storeName = "";
  let dataToCreate = {};

  if (dataType === "team") {
    storeName = "team_fav";
    dataToCreate = {
      id: data.id,
      name: data.name,
      shortName: data.shortName,
      address: data.address,
      phone: data.phone,
      website: data.website,
      email: data.email,
      founded: data.founded,
      clubColors: data.clubColors
    };
  }

  console.log("data " + dataToCreate);
  db(idb)
    .then(db => {
      const tx = db.transaction(storeName, "readwrite");
      tx.objectStore(storeName).put(dataToCreate);

      return tx.complete;
    })
    .then(function () {
      M.toast({
        html: "Data berhasil difavoritkan!"
      });
    })
    .catch(function () {
      M.toast({
        html: "terjadi kesalahan"
      });
    });
}

function deleteDatafav(storeName, data) {
  db(idb)
    .then(function (db) {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.delete(data);
      return tx.complete;
    })
    .then(function () {
      console.log("Item deleted");

      M.toast({
        html: "Data berhasil dihapus dari favorit!"
      });
    })
    .catch(function () {
      M.toast({
        html: "terjadi kesalahan"
      });
    });
}

async function getDataFav() {
  let dataFav = "";
  try {
    const dbase = await db(idb);
    const tx = await dbase.transaction("team_fav", "readonly");
    const store = await tx.objectStore("team_fav");
    const data = await store.getAll();

    if (data.length) {
      data.map((datas, i) => {
        console.log(datas)
        dataFav += `
        <div class="col s6 m4 l4">
          <div class="card blue-grey lighten-1">
            <div class="card-content">
              <div center-align>
                <h5 class="center-align">
                  <span class="blue-grey-text text-darken-4">
                    <a href="../team.html?id=${datas.id}" class="light-blue-text text-lighten-5
                    ">${datas.name}</a>
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        `;
      });
    } else {
      dataFav += `<h5 class="grey-text text-darken-1">Ups.. Kamu Tidak Memiliki Team Favorite</h5>`;
    }

    return document.querySelector("#favorites").innerHTML = dataFav;
  } catch (e) {
    return new Error(e);
  }
}
