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
  try {
    const dbase = await db(idb);
    const tx = await dbase.transaction("team_fav", "readonly");
    const store = await tx.objectStore("team_fav");
    const data = await store.getAll();
    Show.showDataFav(data);
  } catch (e) {
    return new Error(e);
  }
}
