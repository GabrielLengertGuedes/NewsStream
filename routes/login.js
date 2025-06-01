const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/login', (req, res) => {
  res.render('acesso', {
    tela: 'login',
    mensagem: null,
    mostrarCadastro: false,
    sucesso: false
  });
});

router.get('/cadastro', (req, res) => {
  res.render('acesso', {
    tela: 'cadastro',
    mensagem: null,
    mostrarCadastro: true,
    sucesso: false
  });
});

router.post('/cadastro', (req, res) => {
  const { nome, email, senha, confirmar } = req.body;

  if (senha !== confirmar) {
    return res.render('acesso', {
      tela: 'cadastro',
      mensagem: 'As senhas não coincidem!',
      mostrarCadastro: true,
      sucesso: false
    });
  }

  const sql = 'insert into usuarios (nome, email, senha) values (?,?,?)';
  db.run(sql, [nome, email, senha], err => {
    if (err) {
      return res.render('acesso', {
        tela: 'cadastro',
        mensagem: 'Erro ao cadastrar! E-mail já está em uso.',
        mostrarCadastro: true,
        sucesso: false
      });
    }
    res.render('acesso', {
      tela: 'login',
      mensagem: 'Cadastro realizado com sucesso! Faça o login.',
      mostrarCadastro: false,
      sucesso: true
    });
  });
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'select * from usuarios where email = ? and senha = ?';

  db.get(sql, [email, senha], (err, usuario) => {
    if (err) {
      return res.render('acesso', {
        tela: 'login',
        mensagem: 'Erro no servidor!',
        mostrarCadastro: false,
        sucesso: false
      });
    }

    if (!usuario) {
      return res.render('acesso', {
        tela: 'login',
        mensagem: 'E-mail ou senha inválidos!',
        mostrarCadastro: false,
        sucesso: false
      });
    }

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      notificacoes: usuario.notificacoes
    };

    return res.redirect('/main');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
