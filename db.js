const Sequelize = require ('sequelize')
const dotenv = require ('dotenv');
dotenv.config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword,{
  dialect: "mysql",
  host: dbHost,
})


// sequelize.sinc().then(()=> {
//   console.log("Banco de Dados conectado!")
// }).catch(err => {
//   console.error("Erro ao conectar ao banco de dados", err)
// })




//model

 const User = sequelize.define('User', {
   nome: {
     type: Sequelize.STRING,
     required: true

   },
   email: {
     type: Sequelize.STRING,
     required: true
   },
   senha: {
     type: Sequelize.STRING,
     required: true
   }
 });

 sequelize.sync({
   force:true
 })




module.exports = {sequelize};