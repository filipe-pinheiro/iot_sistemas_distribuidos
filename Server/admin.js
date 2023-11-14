const express = require('express');
const router = express.Router();




//Rotas admin
router.get('/admin',(req, res)=>{
  res.render(__dirname + "/public/login.html");
})





module.exports = router;