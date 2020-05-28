const jwt = require("jsonwebtoken");
module.exports = {
    index: (req, res) => {
        //res.send("rota ok");
        res.json(req.headers);

        //verificar se existe um campo Authorization nos headers

        //capturar o token

        //levantar qual o usuário é o dono do token

        //levantar as tarefas desse usuario

        // mandar as tarefas com req.status(200).json(tarefas)


    }
}