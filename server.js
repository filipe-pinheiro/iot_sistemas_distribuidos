const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
//const Sequelize = require ('sequelize')
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const { sequelize, User } = require("./db"); // Inclua o modelo User

const port = 3000;
const router = express.Router();

//configurações
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
    //Template Engine
     app.engine('handlebars',handlebars.engine({defaultLayout: 'main'}))
     app.set('view engine', 'handlebars')


// Middleware personalizado
app.use((req, res, next) => {
    console.log('Middleware executado.');
    next();
});


//routes
//app.use('/admin', admin);
// app.get('/login',(req, res)=>{
//      res.sendFile(__dirname + "/public/login.html");
//  })

app.get('/login',(req, res)=>{
    res.render("login");
})

app.get('/dashboard',(req, res)=>{
    res.render("dashboard");
})



app.post('/login', async (req, res) => {
     const { email, senha } = req.body;

     try {
         const user = await User.findOne({ where: { email, senha } });

         if (user) {
             // Authentication successful
             // Redirect to the dashboard route
             res.redirect('/dashboard');
         } else {
             // Authentication failed
             // Include an error message in the response
             res.render('login', { error: 'credenciais inválidas' });
         }
     } catch (error) {
         console.error('Erro durante o login:', error);
         // Include an error message in the response
         res.render('login', { error: 'An error occurred during login' });
     }
 });


app.post('/sensor-light', (req, res) => {
    const sensorData = req.body;
    console.log("Dados do sensor de luz recebidos:", sensorData);
    io.emit('sensorData', sensorData);
    res.json(sensorData);
});



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

sequelize.sync().then(()=> {
       console.log("Banco de Dados conectado!")
     }).catch(err => {
       console.error("Erro ao conectar ao banco de dados", err)
     })

//outros
server.listen(port, () => {
    console.log("Servidor está rodando na porta " + port);
});
