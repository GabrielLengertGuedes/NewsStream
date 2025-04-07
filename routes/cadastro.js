const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cadastro');
});

router.post('/', (req, res) => {
  const { nome, email, senha, confirmar, notificacoes } = req.body;

  if (senha !== confirmar) {
    return res.send('As senhas não coincidem!');
  }

  res.send(`Usuário ${nome} cadastrado com sucesso!`);
});

module.exports = router;