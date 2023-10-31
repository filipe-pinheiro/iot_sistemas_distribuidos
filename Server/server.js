const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

// Middleware personalizado
app.use((req, res, next) => {
    console.log('Middleware executado.');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/sensor-light', (req, res) => {
    const sensorData = req.body;
    console.log("Dados do sensor de luz recebidos:", sensorData);
    io.emit('sensorData', sensorData);
    res.json(sensorData);
});

server.listen(port, () => {
    console.log("Servidor está rodando na porta " + port);
});
