

// routes/main.js
const express = require('express');
const router = express.Router();
const todasNoticias = require('../data/todas-noticias');

// Comentários por notícia (adicione outros conforme necessário)
const comentariosPorNoticia = {
  1: [
    "Maria Silva: Ótima notícia! A reforma vai simplificar impostos.",
    "Carlos Gonçalves: Resta ver se trará benefícios reais.",
    "Juliana Mendes: Aprovada! Vamos acompanhar os efeitos."
  ]
};

router.get('/main', (req, res) => {
    if (!req.session || !req.session.usuario) {
      return res.redirect('/login');
    }
  
    // renderiza o arquivo noticias.ejs com todas as notícias
    res.render('noticias', {
      todasNoticias,
      nome: req.session.usuario.nome
    });
  });

// Página de uma notícia
router.get('/noticias/:id', (req, res) => {
  const noticiaId = parseInt(req.params.id);
  const noticia = todasNoticias.find(n => n.id === noticiaId);
  if (!noticia) return res.status(404).send('Notícia não encontrada');

  const comentarios = comentariosPorNoticia[noticiaId] || [];

  res.render('noticia', {
    noticia,
    comentarios,
    usuario: req.session.usuario
  });
});

module.exports = router;