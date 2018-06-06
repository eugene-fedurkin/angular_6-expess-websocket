const socket = io.connect('http://localhost:4000');

var output = document.getElementById('output'),
handle = document.getElementById('handle'),
message = document.getElementById('message'),
btn = document.getElementById('send');

console.log(socket);

btn.addEventListener('click', function() {
  socket.emit('chat', {
    handle: handle.value,
    message: message.value
  });
});

socket.on('chat', function(data) {
  const message = document.createElement('p');
  message.innerHTML = data.handle + data.message;
  output.appendChild(message);
});