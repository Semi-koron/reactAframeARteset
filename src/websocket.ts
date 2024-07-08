var connection = new WebSocket("ws://localhost:8080");

//通信が接続された場合
connection.onopen = function (e) {
  connection.send("Hello Server!");
};

//エラーが発生した場合
connection.onerror = function (error) {
  console.log("WebSocket Error " + error);
};

//メッセージを受け取った場合
connection.onmessage = function (e) {
  console.log(e.data);
};

//通信が切断された場合
connection.onclose = function () {
  console.log("通信が切断されました。");
};
