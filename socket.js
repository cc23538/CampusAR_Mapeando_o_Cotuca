const users = {}; 

// Função para configurar o Socket.io
function configureSocket(io) {
  io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id);

    // Enviar a lista de usuários para o novo usuário
    socket.emit('user list', Object.values(users));

    // Definir o personagem do usuário
    socket.on('set character', (character) => {
      users[socket.id] = character;
      io.emit('update character', { userId: socket.id, character });
    });

    // Remover o usuário quando ele desconectar
    socket.on('disconnect', () => {
      console.log(`Usuário desconectado: ${socket.id}`);
      delete users[socket.id];
      io.emit('user list', Object.values(users));
    });
  });
}

module.exports = configureSocket;
