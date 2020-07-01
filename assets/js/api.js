const config = {
  token: "1f32be996b4940be901464c04e771a21",
  base_url: "https://api.football-data.org/v2",
  kode_liga: 2014,
  get endpoint() {
    return {
      klasmen: `${this.base_url}/competitions/${this.kode_liga}/standings?standingType=TOTAL`,
      team: `${this.base_url}/teams`,
      upComing: `${this.base_url}/competitions/${this.kode_liga}/matches?status=SCHEDULED`,
      detail: `${this.base_url}/matches`
    };
  }
};

const { token, endpoint } = config;

function fetchData(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": token
    }
  });
}

async function getKlasmenData() {
  if ("caches" in window) {
    try {
      const res = await caches.match(endpoint.klasmen);
      if (res) {
        const data = await res.json();
        Show.showKlasemen(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const res = await fetchData(endpoint.klasmen);
    const data = await res.json();
    Show.showKlasemen(data);
  } catch (err) {
    console.log(err);
  }
}

async function getMatchData() {
  if ("caches" in window) {
    try {
      const res = await caches.match(endpoint.upComing);
      if (res) {
        const data = await res.json();
        Show.showMatchData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const res = await fetchData(endpoint.upComing);
    const data = await res.json();
    Show.showMatchData(data)
  } catch (err) {
    console.log(err);
  }
}

async function getTeamByID() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  if ("caches" in window) {
    const res = await caches.match(`${endpoint.team}/${idParam}`);
    if (res) {
      const data = await res.json();
      Show.showTeamById(data);
    }
  }

  const res = await fetchData(`${endpoint.team}/${idParam}`);
  const data = await res.json();
  Show.showTeamById(data);
}

async function dataTeamIDB() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  try {
    const res = await fetchData(`${endpoint.team}/${idParam}`);
    const data = await res.json();
    return data;
  } catch {
    throw new Error();
  }
}


