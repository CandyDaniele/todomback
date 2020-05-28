const jwt = require("jsonwebtoken");
const { Tarefa } = require("../models");
module.exports = {
    index: async (req, res) => {
        //res.send("rota ok");
        //res.json(req.headers);
        //res.json(req.headers.authorization);

        //verificar se existe um campo Authorization nos headers
        if (!req.headers.authorization) {
            return res.status(403).json({
                error: "Token Inválido"
            });
        }

        //capturar o token
        let token = req.headers.authorization.substring(7); //substring para tirar o "Bearer "

        // Verifica o token
        let decode
        try {
            // Aqui se o segredo for diferente ele dá erro e vai pro catch.
            // Acredito que o segredo é usado só na assinatura, 
            // pois o jwt tem um metodo .decode(token [, options])
            // que decodifica sem validar a assinatura.
            decode = jwt.verify(token, "segredo");
        } catch (err) {
            return res.status(403).json({
                error: "Token Inválido"
            });
        };

        //levantar qual o usuário é o dono do token
        let usuario = decode.usuario;

        //levantar as tarefas desse usuario
        const tarefas = await Tarefa.findAll({
            where: {
                usuario_id: usuario.id
            }
        });

        // mandar as tarefas com req.status(200).json(tarefas)
        return res.status(200).json(tarefas);

    }
}