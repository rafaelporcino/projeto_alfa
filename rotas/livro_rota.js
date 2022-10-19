//Rota: /livros (localhost:3000/livros)

const express = require('express');
const rota = express.Router();

const livroController = require('../controller/livro_controller');

rota.get('/', livroController.listar);
rota.post('/', livroController.inserir);
rota.get('/:id', livroController.buscarPorId);
rota.put('/:id', livroController.atualizar);
rota.delete('/:id', livroController.deletar);

module.exports = rota;