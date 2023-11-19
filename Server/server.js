const express = require('express');
const bodyParser = require('body-parser');
//const handlebars = require('express-handlebars');
//const Sequelize = require ('sequelize')
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
//const db = require("../db");

const port = 3000;
const router = express.Router();

//configurações
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
    //Template Engine
    // app.engine('handlebars',handlebars.engine({defaultLayout: 'main'}))
    // app.set('view engine', 'handlebars')


// Middleware personalizado
app.use((req, res, next) => {
    console.log('Middleware executado.');
    next();
});


app.get('/', (req, res) => {
    res.redirect('/login');
});

//routes
//app.use('/admin', admin);
app.get('/login',(req, res)=>{
     res.sendFile(__dirname + "/public/login.html");
 })

// app.get('/login',(req, res)=>{
//     res.render("login");
// })

// app.post('/login', (req, res)=>{
//     var erros =[]
//     if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
//         erros.push({texto: "Nome inválido"})
//     }

//     if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
//         erros.push({texto: "Senha inválido"})
//     }

//     if (req.body.senha.length < 4 ){
//         erros.push({texto: "Senha muito curta"})
//     }

//     if (erros.length >0){
//         res.render(__dirname + "/public/login.html", {erros: erros})
//     } else{
//         //depois
//     }
// })

app.post('/sensor-light', (req, res) => {
    const sensorData = req.body;
    console.log("Dados do sensor de luz recebidos:", sensorData);
    io.emit('sensorData', sensorData);
    res.json(sensorData);
});

app.get('/dashboard',(req,res) => {
    res.sendFile(__dirname + "/public/dashboard.html")
})


app.post('/sensor-temperatura', (req, res) => {
    const sensorData = req.body;
    console.log("Dados do sensor de temperatura recebidos:", sensorData);
    io.emit('sensorData', sensorData);
    res.json(sensorData);
});

app.post('/sensor-movimento', (req, res) => {
    const sensorData = req.body;
    console.log("Dados do sensor de movimento recebidos:", sensorData);
    io.emit('sensorData', sensorData);
    res.json(sensorData);
});



//outros
server.listen(port, () => {
    console.log("Servidor está rodando na porta " + port);
});