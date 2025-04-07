const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Configurações básicas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Conexão com banco de dados
const db = new sqlite3.Database('./usuarios.db', (err) => {
  if (err) return console.error(err.message);
  console.log("Conectado ao banco SQLite.");
});

// Criação da tabela (se não existir)
db.run(`
  create table if not exists usuarios (
    id integer primary key autoincrement,
    nome text not null,
    email text unique not null,
    senha text not null,
    notificacoes integer
  )
`);

// Redirecionamento padrão
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Exibe tela de login
app.get('/login', (req, res) => {
  res.render('acesso', {
    mensagem: null,
    sucesso: false,
    mostrarCadastro: false
  });
});

// Exibe tela de cadastro
app.get('/cadastro', (req, res) => {
  res.render('acesso', {
    mensagem: null,
    sucesso: false,
    mostrarCadastro: true
  });
});

// Processa login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get("SELECT * FROM usuarios WHERE email = ? AND senha = ?", [email, senha], (err, usuario) => {
    if (err) {
      console.error(err.message);
      return res.render('acesso', {
        mensagem: "Erro no servidor",
        sucesso: false,
        mostrarCadastro: false
      });
    }

    if (usuario) {
      res.render('acesso', {
        mensagem: "Login realizado com sucesso!",
        sucesso: true,
        mostrarCadastro: false
      });
    } else {
      res.render('acesso', {
        mensagem: "E-mail ou senha inválidos!",
        sucesso: false,
        mostrarCadastro: false
      });
    }
  });
});

// Processa cadastro
app.post('/cadastro', (req, res) => {
  const { nome, email, senha, confirmar, notificacoes } = req.body;

  if (senha !== confirmar) {
    return res.render('acesso', {
      mensagem: "As senhas não coincidem.",
      sucesso: false,
      mostrarCadastro: true
    });
  }

  db.run(
    "INSERT INTO usuarios (nome, email, senha, notificacoes) VALUES (?, ?, ?, ?)",
    [nome, email, senha, notificacoes ? 1 : 0],
    function (err) {
      if (err) {
        console.error(err.message);
        const mensagemErro = err.message.includes("UNIQUE")
          ? "E-mail já cadastrado."
          : "Erro ao cadastrar.";
        return res.render('acesso', {
          mensagem: mensagemErro,
          sucesso: false,
          mostrarCadastro: true
        });
      }

      res.render('acesso', {
        mensagem: "Cadastro realizado com sucesso! Faça login.",
        sucesso: true,
        mostrarCadastro: false
      });
    }
  );
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});