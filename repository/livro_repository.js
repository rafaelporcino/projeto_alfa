const { Client } = require('pg');

const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'acervo_rpg',
    user: 'postgres',
    password: 'postgres'
};

//Conexao com banco de dados
exports.listar = (callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT * FROM livro', (err, res) => {
        callback(err,res.rows);
        cliente.end();
    });
}

exports.inserir = (livro, callback) => {
    const sql = "INSERT INTO livro(titulo, capa) VALUES ($1, $2) RETURNING *";
    const values = [livro.titulo, livro.capa];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM livro WHERE id=$1";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
            const error = "Livro não encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (id, livro, callback) => {
    const sql = "UPDATE livro SET titulo=$1, capa=$2 WHERE id=$3 RETURNING *";
    const values = [livro.titulo, livro.capa, id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
            const error = "Livro não encontrado";
            callback(error, null);
        }
        cliente.end();
    });    
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM livro WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rowCount > 0) {
            callback(null, res.rows[0]);
        }
        else {
            const error = "Livro não encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}