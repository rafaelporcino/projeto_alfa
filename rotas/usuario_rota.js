const express = require('express');
const rota = express.Router();

const usuarioController = require('../controller/usuario_controller');

rota.get('/', usuarioController.listar);
rota.post('/', usuarioController.inserir);
rota.get('/busca', usuarioController.buscarPorUsername);
rota.get('/:id', usuarioController.buscarPorId);

module.exports = rota;