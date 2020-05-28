var express = require("express");
var router = express.Router();
const TarefasController = require("../controllers/TarefasController");
router.get("/tarefas", TarefasController.index);

module.exports = router;