var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
      io.emit('chat message', "[a user] " + msg);

    var negativeWords = ["死","凹","さびしい","寂","淋","リスカ","病","困","迷"];
    for (var i = 0; i < negativeWords.length; i++){
        if(msg.indexOf(negativeWords[i]) > -1){
            io.emit('chat message', '[bot] 元気出して!');
        }
    }
  });
});

io.on('connection', function(socket){
  console.log('connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

