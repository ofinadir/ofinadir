function db(idb) {
  let dbPromise = idb.open("pwa_submission_2", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("team_fav")) {
      let indexTeamFavorite = upgradeDb.createObjectStore("team_fav", {
        keyPath: "id"
      });
      indexTeamFavorite.createIndex("namaTeam", "name", {
        unique: false
      });
    }
  });

  return dbPromise;
}