var http = require("http");

init();

function init() {
  findIp().then(ip => {
    saveOnDb(ip).then(() => {
      timer();
    });
  });
}

function timer() {
  setTimeout(() => {
    init();
  }, 30000);
}

function findIp() {
  return new Promise((resolve, reject) => {
    http.get("http://bot.whatismyipaddress.com?see=1", function(res) {
      res.setEncoding("utf8");
      res.on("data", function(chunk) {
        resolve(chunk);
      });
    });
  });
}

function saveOnDb(ip) {
  return new Promise((resolve, reject) => {
    http.get(
      "http://minhasprovasonline.aguiaexpresspi.com.br?ip=" + ip,
      function(res) {
        res.setEncoding("utf8");
        resolve(true);
      }
    );
  });
}
