const express = require('express');
const router = express.Router();
const db = require('../database/mysql_db'); 

const checkAuth = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    next();
};

router.get('/main', checkAuth, async (req, res) => {
    const categoriaSelecionadaNome = req.query.categoria || 'Todas';
    let noticias;
    let categoriasDB; 

    try {
        const hoje = new Date().toISOString().slice(0, 10);
        await db.promise().execute(
            'INSERT INTO acessos (data_acesso, total_acessos) VALUES (?, 1) ON DUPLICATE KEY UPDATE total_acessos = total_acessos + 1',
            [hoje]
        );

        const [categoriasRows] = await db.promise().query('SELECT id, nome FROM categorias ORDER BY nome ASC');
        categoriasDB = categoriasRows;

        if (categoriaSelecionadaNome === 'Todas') {
            [noticias] = await db.promise().query('SELECT * FROM noticias ORDER BY data_publicacao DESC, id DESC');
        } else {
            [noticias] = await db.promise().query('SELECT * FROM noticias WHERE categoria = ? ORDER BY data_publicacao DESC, id DESC', [categoriaSelecionadaNome]);
        }

        const noticiasComStatusCurtida = await Promise.all(noticias.map(async (noticia) => {
            const [curtida] = await db.promise().query(
                'SELECT * FROM curtidas WHERE noticia_id = ? AND usuario_id = ?',
                [noticia.id, req.session.usuario.id]
            );
            return { ...noticia, curtidoPeloUsuario: curtida.length > 0 };
        }));

        const categoriasComStatusSeguindo = await Promise.all(categoriasDB.map(async (cat) => {
            const [seguindo] = await db.promise().query(
                'SELECT * FROM categorias_seguidas WHERE categoria_id = ? AND usuario_id = ?',
                [cat.id, req.session.usuario.id]
            );
            return { ...cat, seguidaPeloUsuario: seguindo.length > 0 };
        }));

        let numNotifications = 0;
        if (req.session.usuario) { 
            numNotifications = await getUnreadNotificationsCount(req.session.usuario.id);
        }
        
        if (req.session.usuario && req.session.usuario.isAdmin === 1) {
            const [comentariosDenunciadosCount] = await db.promise().query('SELECT COUNT(*) AS total FROM comentarios WHERE denunciado = TRUE');
            const [noticiasDenunciadasCount] = await db.promise().query('SELECT COUNT(*) AS total FROM noticias WHERE denunciado = TRUE');
            numNotifications += comentariosDenunciadosCount[0].total + noticiasDenunciadasCount[0].total;
        }

        res.render('main', {
            nome: req.session.usuario.nome,
            usuario: req.session.usuario,
            categorias: categoriasComStatusSeguindo,
            noticias: noticiasComStatusCurtida,
            selecionada: categoriaSelecionadaNome,
            numNotifications: numNotifications,
            currentPath: req.path 
        });

    } catch (err) {
        console.error("Erro ao carregar main do DB:", err);
        res.status(500).send("Erro ao carregar a página principal.");
    }
});

router.get('/noticias/:id', checkAuth, async (req, res) => {
    const noticiaId = parseInt(req.params.id);
    const usuarioId = req.session.usuario.id;

    try {
        const [noticiaRows] = await db.promise().query('SELECT * FROM noticias WHERE id = ?', [noticiaId]);
        const noticia = noticiaRows[0];

        if (!noticia) {
            return res.status(404).send("Notícia não encontrada.");
        }

        const [curtidaResults] = await db.promise().query(
            'SELECT * FROM curtidas WHERE usuario_id = ? AND noticia_id = ?',
            [usuarioId, noticiaId]
        );
        noticia.curtidoPeloUsuario = curtidaResults.length > 0;

        const [comentariosDaNoticia] = await db.promise().query(
            'SELECT c.id, c.autor_nome AS autor, c.texto, c.data_comentario AS data FROM comentarios c WHERE c.noticia_id = ? ORDER BY c.data_comentario DESC',
            [noticiaId]
        );
        comentariosDaNoticia.forEach(c => {
            c.data = new Date(c.data).toLocaleDateString('pt-BR');
        });

        const [categoriaDetalhesRows] = await db.promise().query(
            'SELECT id, nome FROM categorias WHERE nome = ?',
            [noticia.categoria]
        );
        let categoriaDetalhes = null;
        if (categoriaDetalhesRows.length > 0) {
            categoriaDetalhes = categoriaDetalhesRows[0];
            const [seguindoResults] = await db.promise().query(
                'SELECT * FROM categorias_seguidas WHERE usuario_id = ? AND categoria_id = ?',
                [usuarioId, categoriaDetalhes.id]
            );
            categoriaDetalhes.seguidaPeloUsuario = seguindoResults.length > 0;
        }

        let numNotifications = 0;
        if (req.session.usuario) { 
            numNotifications = await getUnreadNotificationsCount(req.session.usuario.id);
        }
        
        if (req.session.usuario && req.session.usuario.isAdmin === 1) {
            const [comentariosDenunciadosCount] = await db.promise().query('SELECT COUNT(*) AS total FROM comentarios WHERE denunciado = TRUE');
            const [noticiasDenunciadasCount] = await db.promise().query('SELECT COUNT(*) AS total FROM noticias WHERE denunciado = TRUE');
            numNotifications += comentariosDenunciadosCount[0].total + noticiasDenunciadasCount[0].total;
        }
        
        res.render('noticia', {
            noticia: noticia,
            comentarios: comentariosDaNoticia,
            usuario: req.session.usuario,
            numNotifications: numNotifications,
            curtidoPeloUsuario: noticia.curtidoPeloUsuario,
            seguindoCategoriaPeloUsuario: categoriaDetalhes ? categoriaDetalhes.seguidaPeloUsuario : false,
            categoriaNoticiaDetalhes: categoriaDetalhes,
            currentPath: req.path 
        });

    } catch (err) {
        console.error('Erro ao carregar notícia individual do DB:', err);
        res.status(500).send('Erro ao carregar a notícia.');
    }
});

router.post('/api/noticia/:noticiaId/curtir', checkAuth, async (req, res) => {
    const noticiaId = parseInt(req.params.noticiaId);
    const usuarioId = req.session.usuario.id;

    try {
        const [results] = await db.promise().query(
            'SELECT * FROM curtidas WHERE usuario_id = ? AND noticia_id = ?',
            [usuarioId, noticiaId]
        );

        if (results.length > 0) {
            await db.promise().execute('DELETE FROM curtidas WHERE usuario_id = ? AND noticia_id = ?', [usuarioId, noticiaId]);
            res.json({ message: 'Notícia descurtida!', curtido: false, success: true });
        } else {
            await db.promise().execute('INSERT INTO curtidas (usuario_id, noticia_id) VALUES (?, ?)', [usuarioId, noticiaId]);
            res.json({ message: 'Notícia curtida!', curtido: true, success: true });
        }
    } catch (err) {
        console.error('Erro ao curtir/descurtir notícia no DB:', err);
        res.status(500).json({ success: false, message: 'Erro interno do servidor ao curtir/descurtir.' });
    }
});

router.post('/api/categoria/:categoriaId/seguir', checkAuth, async (req, res) => {
    const categoriaId = parseInt(req.params.categoriaId);
    const usuarioId = req.session.usuario.id;

    try {
        const [categoriaExists] = await db.promise().query('SELECT id FROM categorias WHERE id = ?', [categoriaId]);
        if (categoriaExists.length === 0) {
            return res.status(404).json({ success: false, message: 'Categoria não encontrada ou inválida.' });
        }

        const [results] = await db.promise().query(
            'SELECT * FROM categorias_seguidas WHERE usuario_id = ? AND categoria_id = ?',
            [usuarioId, categoriaId]
        );

        if (results.length > 0) {
            await db.promise().execute('DELETE FROM categorias_seguidas WHERE usuario_id = ? AND categoria_id = ?', [usuarioId, categoriaId]);
            res.json({ message: 'Deixou de seguir categoria!', seguindo: false, success: true });
        } else {
            await db.promise().execute('INSERT INTO categorias_seguidas (usuario_id, categoria_id) VALUES (?, ?)', [usuarioId, categoriaId]);
            res.json({ message: 'Categoria seguida!', seguindo: true, success: true });
        }
    } catch (err) {
        console.error('Erro ao seguir/deixar de seguir categoria no DB:', err);
        res.status(500).json({ success: false, message: 'Erro interno do servidor ao seguir/deixar de seguir categoria.' });
    }
});

router.post('/comentar/:id', checkAuth, async (req, res) => {
    const noticiaId = parseInt(req.params.id);
    const textoComentario = req.body.comentario;
    const usuarioId = req.session.usuario.id;
    const autorComentario = req.session.usuario.nome;

    if (!textoComentario || textoComentario.trim() === '') {
        return res.redirect(`/noticias/${noticiaId}`);
    }

    try {
        await db.promise().execute(
            'INSERT INTO comentarios (noticia_id, usuario_id, autor_nome, texto) VALUES (?, ?, ?, ?)',
            [noticiaId, usuarioId, autorComentario, textoComentario]
        );
        
        res.redirect(`/noticias/${noticiaId}`);
    } catch (err) {
        console.error('Erro ao salvar comentário no DB:', err);
        res.status(500).send('Erro ao comentar a notícia.');
    }
});

router.get('/denunciar-comentario/:noticiaId/:comentarioId', checkAuth, async (req, res) => {
    const noticiaId = parseInt(req.params.noticiaId);
    const comentarioId = parseInt(req.params.comentarioId);

    try {
        const [comentarioRows] = await db.promise().query('SELECT texto FROM comentarios WHERE id = ? AND noticia_id = ?', [comentarioId, noticiaId]);
        const comentarioEncontrado = comentarioRows[0];

        if (!comentarioEncontrado) {
            return res.status(404).send("Comentário não encontrado para denúncia.");
        }

        res.render('denunciar', {
            comentarioDenunciado: comentarioEncontrado.texto,
            noticiaId: noticiaId,
            comentarioId: comentarioId,
            currentPath: req.path 
        });
    } catch (err) {
        console.error('Erro ao carregar comentário para denúncia:', err);
        res.status(500).send('Erro ao carregar formulário de denúncia.');
    }
});

router.post('/denunciar-comentario/:noticiaId/:comentarioId', checkAuth, async (req, res) => {
    const { noticiaId, comentarioId } = req.params;
    const { motivo, detalhes } = req.body; 

    try {
        const [comentarioRowsBeforeUpdate] = await db.promise().query('SELECT usuario_id, texto, noticia_id FROM comentarios WHERE id = ?', [comentarioId]);
        const comentarioBeforeUpdate = comentarioRowsBeforeUpdate[0];

        const [result] = await db.promise().execute(
            'UPDATE comentarios SET denunciado = TRUE, motivoDenuncia = ?, detalhesDenuncia = ? WHERE id = ? AND noticia_id = ?',
            [motivo, detalhes || null, comentarioId, noticiaId]
        );

        if (result.affectedRows === 0) {
            // Nenhum registro afetado
        } else {
            if (comentarioBeforeUpdate && comentarioBeforeUpdate.usuario_id && comentarioBeforeUpdate.usuario_id !== req.session.usuario.id) {
                const mensagemNotificacao = `Seu comentário "${comentarioBeforeUpdate.texto.substring(0, 50)}..." foi denunciado.`;
                await db.promise().execute(
                    'INSERT INTO notificacoes (usuario_id, tipo_notificacao, mensagem, link) VALUES (?, ?, ?, ?)',
                    [comentarioBeforeUpdate.usuario_id, 'comentario_denunciado', mensagemNotificacao, `/noticias/${comentarioBeforeUpdate.noticia_id}`]
                );
            }
        }

        res.render('denuncia-confirmada', {
            currentPath: req.path 
        }); 
    } catch (err) {
        console.error('Erro ao denunciar comentário no DB:', err);
        res.status(500).send('Erro ao denunciar o comentário.');
    }
});

router.get('/denunciar-noticia/:id', checkAuth, async (req, res) => {
    const noticiaId = parseInt(req.params.id);
    try {
        const [noticiaRows] = await db.promise().query('SELECT titulo, id FROM noticias WHERE id = ?', [noticiaId]); 
        const noticia = noticiaRows[0];

        if (!noticia) {
            return res.status(404).send("Notícia não encontrada para denúncia.");
        }
        
        res.render('denunciar-noticia', { 
            noticia,
            currentPath: req.path 
        });
    } catch (err) {
        console.error('Erro ao carregar notícia para denúncia:', err);
        res.status(500).send('Erro ao carregar formulário de denúncia.');
    }
});

router.post('/denunciar-noticia/:id', checkAuth, async (req, res) => {
    const noticiaId = parseInt(req.params.id);
    const { motivo, detalhes } = req.body;

    try {
        const [noticiaInfo] = await db.promise().query('SELECT autor FROM noticias WHERE id = ?', [noticiaId]);
        const autorNoticia = noticiaInfo[0] ? noticiaInfo[0].autor : 'NewsStream'; 

        const [result] = await db.promise().execute(
            'CALL DenunciarNoticia(?, ?, ?)', 
            [noticiaId, motivo, detalhes || null] 
        );

        if (result.affectedRows === 0) {
            return res.redirect('/denuncia-confirmada?status=warning&message=Notícia já estava denunciada ou não encontrada.');
        } else {
            if (autorNoticia !== 'NewsStream') {
                const [autorUsuario] = await db.promise().query('SELECT id FROM usuarios WHERE nome = ?', [autorNoticia]);
                if (autorUsuario.length > 0) {
                    const usuarioIdAutor = autorUsuario[0].id;
                    const mensagemNotificacao = `Sua notícia "${noticia.titulo.substring(0, 50)}..." foi denunciada.`;
                    await db.promise().execute(
                        'INSERT INTO notificacoes (usuario_id, tipo_notificacao, mensagem, link) VALUES (?, ?, ?, ?)',
                        [usuarioIdAutor, 'noticia_denunciada', mensagemNotificacao, `/noticias/${noticiaId}`]
                    );
                }
            }
            return res.redirect('/denuncia-confirmada?status=success');
        }
    } catch (err) {
        console.error('Erro ao chamar stored procedure DenunciarNoticia no DB:', err);
        return res.redirect('/denuncia-confirmada?status=error&message=Erro interno do servidor ao processar denúncia via SP.');
    }
});

router.get('/denuncia-confirmada', checkAuth, async (req, res) => { 
    const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id);
    res.render('denuncia-confirmada', {
        currentPath: req.path,
        numNotifications: numNotifications
    });
});

async function getUnreadNotificationsCount(usuarioId) {
    if (!usuarioId) return 0;
    try {
        const [rows] = await db.promise().query('SELECT COUNT(*) AS total FROM notificacoes WHERE usuario_id = ? AND lida = FALSE', [usuarioId]);
        return rows[0].total;
    } catch (err) {
        console.error('Erro ao buscar contagem de notificações não lidas:', err);
        return 0;
    }
}

module.exports = router;