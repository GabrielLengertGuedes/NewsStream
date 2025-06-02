const express = require('express');
const router = express.Router();
const db = require('../database/mysql_db'); // Certifique-se que o caminho está correto

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

  // **ALTERAÇÃO AQUI: PARA MySQL**
  const sql = 'INSERT INTO usuarios (nome, email, senha, notificacoes) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, email, senha, 0], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário no MySQL:', err.message);
      let mensagemErro = 'Erro ao cadastrar!';
      if (err.code === 'ER_DUP_ENTRY') { // Código de erro para entrada duplicada no MySQL
        mensagemErro = 'Erro ao cadastrar! E-mail já está em uso.';
      }
      return res.render('acesso', {
        tela: 'cadastro',
        mensagem: mensagemErro,
        mostrarCadastro: true,
        sucesso: false
      });
    }
    console.log('Usuário cadastrado no MySQL com ID:', result.insertId); // Para MySQL, use result.insertId
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
  // **ALTERAÇÃO AQUI: PARA MySQL**
  const sql = 'SELECT id, nome, email, notificacoes FROM usuarios WHERE email = ? AND senha = ?'; // Incluído 'notificacoes'
  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro no login do MySQL:', err.message);
      return res.render('acesso', {
        tela: 'login',
        mensagem: 'Erro no servidor!',
        mostrarCadastro: false,
        sucesso: false
      });
    }

    const usuario = results[0]; // O primeiro elemento do array é o usuário, se encontrado

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
      notificacoes: usuario.notificacoes // Certifique-se que o campo notificacoes está sendo salvo na sessão
    };

    return res.redirect('/main');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;