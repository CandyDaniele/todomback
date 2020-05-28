//importando model de usuario
const { Usuario } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
    login: async (req, res) => {
        //console.log(req.body);
        //res.send(req.body);

        //ler dados do body para variáveis email e senha
        let {email, senha} = req.body;    

        //usar o model usuário para achar um usuário com o email dado

        const u = await Usuario.findOne({where: {email}});

        //verificar se o usuario existe, caso não existir:
        // res.status(403).json({erro: "Login inválido"})
        if(!u){
            return res.status(403).json({error:"Login inválido"})
        }

        //verificar a senha passada versus a senha do banco (encrypted)
        //caso senha não bata:
        //res.status(403).json({error:"Login inválido"})
        if(!bcrypt.compareSync(senha, u.senha)){
            return res.status(403).json({error:"Login inválido"})
        }

        //removendo a senha para que ela não seja enviada de volta
        u.senha = undefined;

        //criando o token
        let token = jwt.sign({usuario: u}, "segredo");

        //se chegar até aqui: res.status(200).json({msg:"sucesso!"});
        //return res.status(200).json({msg:"sucesso!"});
        return res.status(200).json({usuario: u, token});
    }
};

module.exports = AuthController;