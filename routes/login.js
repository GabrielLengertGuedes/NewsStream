const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  res.render('auth', { tela: 'login', mensagem: null });
});

router.get('/cadastro', (req, res) => {
  res.render('auth', { tela: 'cadastro', mensagem: null });
});

router.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.run(query, [nome, email, senha], function (err) {
    if (err) {
      return res.render('auth', {
        tela: 'cadastro',
        mensagem: 'Erro ao cadastrar! E-mail já está em uso.',
      });
    }
    res.render('auth', {
      tela: 'login',
      mensagem: 'Cadastro realizado com sucesso! Faça o login.',
    });
  });
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.get(query, [email, senha], (err, row) => {
    if (err) {
      return res.send('Erro no servidor.');
    }

    if (row) {
      res.render('sucesso', { nome: row.nome });
    } else {
      res.render('auth', {
        tela: 'login',
        mensagem: 'E-mail ou senha inválidos!',
      });
    }
  });
});

module.exports = router;
