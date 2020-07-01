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
  "endpoint": "https://fcm.googleapis.com/fcm/send/cwtnf2K_aw4:APA91bHAqYu9BvtK3b4wVgp8dyzaBvf3p2Ky44kKYeX0--iUSSAVZoXbFpnxeQNd1_4bDPBAbZToLxhYcI6Zcv1nSXa2RYD2Zvy9m-kxEzyYDaKOZ2PKs44xTbFc-4rgzfXW0hiF-TCQ",
  "keys": {
    "p256dh": "BKLjzp0CUZnYKr7cY06e++Xm4P3knvVlUTih1bNi+3p7+/2cZGOHHYwD0+hyzB9trsdxOGEH2Dpic+DkL4dXgnE=",
    "auth": "xshdpdHmMu6cd/qGGzVa/A=="
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