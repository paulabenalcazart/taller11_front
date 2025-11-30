var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page - Redirigir a lista de fotos */
router.get('/', function (req, res, next) {
  res.redirect('/photos/list');
});

router.get('/photos/add', function (req, res, next) {
  res.render('fotos_formulario', { title: 'Agregar Foto' });
});

router.post('/photos/save', async function (req, res, next) {
  let { title, description, rate } = req.body;
  const URL = 'http://localhost:3000/fotos/save';
  let data = {
    titulo: title,
    descripcion: description,
    calificacion: rate,
    ruta: ''
  };
  const config = {
    proxy: {
      host: 'localhost',
      port: 3000
    }
  };
  
  try {
    const response = await axios.post(URL, data, config);
    if (response.status == 200 && response.statusText == 'OK') {
      res.redirect('/photos/add');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error al guardar:', error);
    res.redirect('/');
  }
});

router.get('/findAll/json', async function(req, res, next) {
  const URL = 'http://localhost:3000/fotos/findAll/json';
  const config = {
    proxy: {
      host: 'localhost',
      port: 3000
    }
  };
  
  try {
    const response = await axios.get(URL, config);
    res.json(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/findAllById/:id/json', async function(req, res, next) {
  let id = req.params.id;
  const URL = `http://localhost:3000/fotos/findAllById/${id}/json`;
  const config = {
    proxy: {
      host: 'localhost',
      port: 3000
    }
  };
  
  try {
    const response = await axios.get(URL, config);
    res.json(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/findAllByRate/json', async function(req, res, next) {
  let lower = req.query.lower;
  let higher = req.query.higher;
  const URL = `http://localhost:3000/fotos/findAllByRate/json?lower=${lower}&higher=${higher}`;
  const config = {
    proxy: {
      host: 'localhost',
      port: 3000
    }
  };
  
  try {
    const response = await axios.get(URL, config);
    res.json(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/update', async function(req, res, next) {
  const URL = 'http://localhost:3000/fotos/update';
  let data = req.body;
  const config = {
    proxy: {
      host: 'localhost',
      port: 3000
    }
  };
  
  try {
    const response = await axios.put(URL, data, config);
    res.json(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/delete/:id', async function(req, res, next) {
  let id = req.params.id;
  const URL = `http://localhost:3000/fotos/delete/${id}`;
  const config = {
    proxy: {
      host: 'localhost',
      port: 3000
    }
  };
  
  try {
    const response = await axios.delete(URL, config);
    res.json(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/photos/list', function (req, res, next) {
  res.render('fotos_lista', { 
    title: 'Lista de Fotos',
    message: req.query.message || null,
    error: req.query.error || null
  });
});

router.get('/photos/edit/:id', function (req, res, next) {
  res.render('fotos_formulario_edit', { 
    title: 'Editar Foto',
    id: req.params.id
  });
});

router.get('/photos/search', function (req, res, next) {
  res.render('fotos_buscar', { 
    title: 'Buscar Fotos'
  });
});

module.exports = router;