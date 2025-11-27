var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photos/add', function(req, res, next) {
  res.render('fotos_formulario', {title: 'Express'})
});

router.post('/photos/save', async function(req, res, next) {
  let {title, description, rate} = req.body
  const URL = 'http://localhost:3000/fotos/save'
  let data = {
    titulo: title,
    descripcion: description, 
    calificacion: rate,
    ruta: ''
  }
  const config = {
    proxy: {
      host: 'localhost',
      port: 3000
    }
  }
  const response = await axios.post(URL, data, config);
  if(response.status == '200' && response.statusText == 'OK'){
    res.redirect('/photos/add')
  } else {
    res.redirect('/')
  }
});
module.exports = router;
