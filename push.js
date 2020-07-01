let webPush = require('web-push');

const vapidKeys = {
  "publicKey": "BF3Cn7AGubzI207mW-oR3cq-HJpYv_cgAMqj1V09dypGDqdvGIIHEuf7XvIzwPtSyvEAb4RfqRdTKbNfyAo_lkk",
  "privateKey": "SUIOpVG0GhmmvqOijY3PYLrtnVtEECbXPWBicdeYicU"
};

webPush.setVapidDetails(
  'mailto:rofynadzir1@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
let pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/dN52YB9bmOc:APA91bFs7lhnJGdiWGE1krdDr9-HY7y0y3-eaMMsdDHuZckrOZ9DX6cN73wUF9gyk7L5lIiIhlgKpSs0ZjW_WbKyQN6Tu0i34jR2wfYOszsLgLNInJtl8crSSYlDZPXuEqrtVpI7X2kz",
  "keys": {
    "p256dh": "BHAb0KMkK/0Kae+L6fkmSxsp4Ttoem4Sqcprea6nuEkqJMdbl9YSmVV/DUQVgMrUyEZQeK9wUGu3dza/g94dCJQ=",
    "auth": "QQdUCLUGda+QlZtVfVAgmQ=="
  }
};
let payload = 'Selamat! Aplikasi anda sudah dapat menerima push notification';

let options = {
  gcmAPIKey: "304987405417",
  TTL: 60
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options
).catch(err => console.log(err))

// =======================================

// Public Key:
// BIY3Vb73v7a4lBdRIyqakw2HUV3rBgsEqPoEFMFk-KrgQ1F0pTKYy4LwMOjavLOAzm69MVHevoZvZu41xLvaJLE

// Private Key:
// QBvtkqaeGKjqouqEmgM9miaGkMYzsDR5ErkVwNMTjBY

// =======================================