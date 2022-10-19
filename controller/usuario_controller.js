const usuarioRepository = require('../repository/usuario_repository');

const jwt = require('jsonwebtoken');

exports.listar = (req, res) => {    
    usuarioRepository.listar((err, listaUsuarios) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(listaUsuarios);
        }
    })
}


exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    usuarioRepository.buscarPorId (id, (err, usuarioEncontrado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else if(usuarioEncontrado) {
            res.json(usuarioEncontrado);
        }
        else {
            res.status(404).json({msg:"Usuário não encontrado"});
        }    
    });
}

exports.buscarPorUsername = (req, res) => {
    const query = req.query;
    if(query && query.username){
        usuarioRepository.buscarPorUsername (query.username, (err, usuarioEncontrado) => {
            if(err) { 
                res.status(500).json({ msg: err }) 
            }
            else if(usuarioEncontrado) {
                res.json(usuarioEncontrado);
            }
            else {
                res.status(404).json({msg:"Usuário não encontrado"});
            }    
        });
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Faltou a query username"});
    }
}

exports.inserir = (req, res) => {
    let usuario = req.body;
    if(usuario && usuario.username && usuario.senha) {
        usuarioRepository.inserir(usuario, (err, usuarioInserido) => {
            if(err) { 
                res.status(500).json({ msg: err.msg }) 
            }
            else {
                res.status(201).send(usuarioInserido);
            }
        });    
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados inválida"});
    }
}

exports.validarUsuario = (req, res) =>
{
    const userLogin = req.body;
    if(userLogin && userLogin.username && userLogin.senha) {
        usuarioRepository.buscarPorUsername(userLogin.username, (err, usuario) => {
            if(err) { 
                res.status(401).json({ msg: "Usuário inválido" }) 
            }
            else if(usuario) {
                if(usuario.senha == userLogin.senha) {
                    const token = jwt.sign({
                        id: usuario.id,
                        nome: usuario.nome
                    }, "@cervO2021", { expiresIn: '1h'});
                    res.status(201).json({"token":token});
                }
                else {
                    res.status(401).json({msg:"Senha inválida"});
                }
            }
            else {
                res.status(401).json({msg:"Usuário inválido"});
            }    
        })
    }
    else {
        res.status(401).json("Usuário ou senha inválidos");
    }
}


exports.validarToken = (req, res, next) => {
    const token = req.get('Authorization');
    if(token) {
        jwt.verify(token, "@cervO2021", (err, payload) => {
            if(err) {
                res.status(403).json({erro:"Não tem token de acesso"});
            }
            else {
                console.log("ID do usuário: "+payload.id);
                next();
            }
        })
        
    }
    else {
        res.status(403).json({erro:"Não tem token de acesso"});
    }
}