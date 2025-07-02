const express = require('express');
const router = express.Router();
const db = require('../database/mysql_db'); 

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

router.post('/cadastro', async (req, res) => {
    const { nome, email, senha, confirmar } = req.body; // Removi 'notificacoes' daqui, pois não está no seu DB
    const isAdmin = (email === 'admin@newsstream.com') ? 1 : 0; // Define admin na criação

    if (senha !== confirmar) {
        return res.render('acesso', {
            tela: 'cadastro',
            mensagem: 'As senhas não coincidem!',
            mostrarCadastro: true,
            sucesso: false
        });
    }

    try {
        // Verifica se o email já existe
        const [existingUser] = await db.promise().query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.render('acesso', {
                tela: 'cadastro',
                mensagem: 'Erro ao cadastrar! E-mail já está em uso.',
                mostrarCadastro: true,
                sucesso: false
            });
        }

        // Insere o novo usuário
        const [result] = await db.promise().execute('INSERT INTO usuarios (nome, email, senha, isAdmin) VALUES (?, ?, ?, ?)', [nome, email, senha, isAdmin]);
        console.log('Usuário cadastrado no MySQL com ID:', result.insertId); 
        res.render('acesso', {
            tela: 'login',
            mensagem: 'Cadastro realizado com sucesso! Faça o login.',
            mostrarCadastro: false,
            sucesso: true
        });
    } catch (err) {
        console.error('Erro ao cadastrar usuário no MySQL:', err.message);
        return res.render('acesso', {
            tela: 'cadastro',
            mensagem: 'Erro ao cadastrar! Tente novamente.',
            mostrarCadastro: true,
            sucesso: false
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const [results] = await db.promise().query('SELECT id, nome, email, isAdmin FROM usuarios WHERE email = ? AND senha = ?', [email, senha]); 
        const usuario = results[0]; [[]]

        if (!usuario) {
            return res.render('acesso', {
                tela: 'login',
                mensagem: 'E-mail ou senha inválidos!',
                mostrarCadastro: false,
                sucesso: false
            });
        }

        // Armazena informações na sessão
        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            isAdmin: usuario.isAdmin // Armazena o status de admin na sessão
        };

        return res.redirect('/main');
    } catch (err) {
        console.error('Erro no login do MySQL:', err.message);
        return res.render('acesso', {
            tela: 'login',
            mensagem: 'Erro no servidor!',
            mostrarCadastro: false,
            sucesso: false
        });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;