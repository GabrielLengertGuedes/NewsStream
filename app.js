// 1. Importações de Módulos
const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./database/mysql_db'); // Seu módulo de conexão com o MySQL

// Importe os routers separados
const loginRoutes = require('./routes/login');
const mainRoutes = require('./routes/main'); // O router que conterá as rotas principais (usuário)
//console.log('app.js: mainRoutes importado.'); // LOG: Confirma importação

const app = express();

// 2. Configuração de Middlewares Globais
app.use(session({
    secret: 'newsstream_secret_super_secreto_e_longo_para_producao', // Use uma string mais segura em produção!
    resave: false, // Evita salvar a sessão se não houver modificações
    saveUninitialized: true, // Salva sessões "novas" que não foram modificadas
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 1 dia de duração do cookie da sessão
    }
}));

app.use(express.json()); // Permite que o Express parseie corpos de requisição JSON
app.use(express.urlencoded({ extended: true })); // Permite que o Express parseie corpos de requisição de formulários HTML

// 3. Configuração do Template Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Define a pasta onde estão seus arquivos .ejs

// 4. Servir Arquivos Estáticos
app.use(express.static(path.join(__dirname, 'public'))); 
//console.log('app.js: Servindo arquivos estáticos de /public.'); // LOG: Confirma static files

// 5. Middlewares de Autenticação e Autorização (podem ser movidos para um arquivo separado, ex: 'middlewares/auth.js')
const checkAuth = (req, res, next) => {
    if (!req.session.usuario) {
        // Redireciona para a página de login se o usuário não estiver logado
        return res.redirect('/login');
    }
    next(); // Continua para a próxima função middleware ou rota
};

const checkAdmin = (req, res, next) => {
    // Apenas permite acesso se o usuário estiver logado E for admin
    if (!req.session.usuario || req.session.usuario.isAdmin !== 1) {
        // Retorna um erro 403 (Forbidden) se não for admin
        return res.status(403).send("Acesso não autorizado. Você não é um administrador.");
    }
    next(); // Continua para a próxima função middleware ou rota
};

// Função auxiliar para obter o número de notificações não lidas
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


// 6. Definição das Rotas

// Redirecionamento da raiz para a página de login
app.get('/', (req, res) => res.redirect('/login'));

// **PRIORIDADE 1: Rotas Administrativas MUITO ESPECÍFICAS**
// Estas rotas devem vir ANTES de `app.use('/', mainRoutes);` para evitar conflitos com :id
// Rotas de gerenciamento de notícias (nova, salvar, editar, atualizar, remover, retirar denúncia)
app.get('/nova-noticia', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota /nova-noticia.'); // LOG
    try {
        const [categoriasRows] = await db.promise().query('SELECT nome FROM categorias ORDER BY nome ASC');
        const categoriasDisponiveis = categoriasRows.map(row => row.nome);
        
        const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id); // Obter notificações para o admin
        
        res.render('nova-noticia', { 
            categorias: categoriasDisponiveis,
            currentPath: req.path, // Adicionado currentPath
            numNotifications: numNotifications
        });
    } catch (err) {
        console.error('Erro ao carregar categorias para nova notícia:', err);
        res.status(500).send('Erro ao carregar formulário de nova notícia.');
    }
});

app.post('/salvar-noticia', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /salvar-noticia.'); // LOG
    const { titulo, autor, categoria, conteudo, imagem } = req.body; 

    const imagemUrl = imagem && imagem.trim() !== '' ? imagem : '/images/default.jpg'; 
    const dataAtual = new Date().toISOString().slice(0, 10);

    try {
        await db.promise().execute(
            'INSERT INTO noticias (titulo, resumo, conteudo, categoria, imagemUrl, data_publicacao, autor, denunciado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [titulo, conteudo.substring(0, 200) + '...', conteudo, categoria, imagemUrl, dataAtual, autor, false]
        );
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Erro ao salvar nova notícia no DB:', err);
        res.status(500).send('Erro ao salvar a notícia.');
    }
});

app.get('/editar-noticia/:id', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota /editar-noticia/:id.'); // LOG
    const noticiaId = parseInt(req.params.id);
    try {
        const [noticiaRows] = await db.promise().query('SELECT * FROM noticias WHERE id = ?', [noticiaId]);
        const noticia = noticiaRows[0];

        if (!noticia) {
            return res.status(404).send("Notícia não encontrada para edição.");
        }

        const [categoriasRows] = await db.promise().query('SELECT nome FROM categorias ORDER BY nome ASC');
        const categoriasDisponiveis = categoriasRows.map(row => row.nome);

        const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id); // Obter notificações para o admin

        res.render('editar-noticia', { 
            noticia, 
            categorias: categoriasDisponiveis,
            currentPath: req.path, // Adicionado currentPath
            numNotifications: numNotifications
        });
    } catch (err) {
        console.error('Erro ao carregar notícia para edição:', err);
        res.status(500).send('Erro ao carregar formulário de edição.');
    }
});

app.post('/atualizar-noticia/:id', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /atualizar-noticia/:id.'); // LOG
    const noticiaId = parseInt(req.params.id);
    const { titulo, autor, categoria, conteudo } = req.body;

    try {
        await db.promise().execute(
            'UPDATE noticias SET titulo = ?, autor = ?, categoria = ?, resumo = ?, conteudo = ? WHERE id = ?',
            [titulo, autor, categoria, conteudo.substring(0, 200) + '...', conteudo, noticiaId] 
        );
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Erro ao atualizar notícia no DB:', err);
        res.status(500).send('Erro ao atualizar a notícia.');
    }
});

app.post('/remover-noticia/:id', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /remover-noticia/:id.'); // LOG
    const noticiaId = parseInt(req.params.id);
    try {
        await db.promise().execute('DELETE FROM noticias WHERE id = ?', [noticiaId]);
        console.log(`Notícia ID ${noticiaId} removida do DB.`);
        res.redirect('/noticias'); 
    }
    catch (err) {
        console.error('Erro ao remover notícia do DB:', err);
        res.status(500).send('Erro ao remover a notícia.');
    }
});

app.post('/retirar-denuncia-noticia/:id', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /retirar-denuncia-noticia/:id.');
    const noticiaId = parseInt(req.params.id);
    try {
        const [result] = await db.promise().execute(
            'UPDATE noticias SET denunciado = FALSE, motivoDenuncia = NULL, detalhesDenuncia = NULL WHERE id = ?',
            [noticiaId]
        );

        if (result.affectedRows === 0) {
            console.warn(`Tentativa de retirar denúncia de notícia não encontrada ou não denunciada: ID ${noticiaId}`);
        } else {
            console.log(`Denúncia da Notícia ID ${noticiaId} retirada do DB.`);
        }
        res.redirect('/noticias'); 
    } catch (err) {
        console.error('Erro ao retirar denúncia da notícia no DB:', err);
        res.status(500).send('Erro ao retirar a denúncia da notícia.');
    }
});

// Rotas para as "Consultas Complexas" (relatórios)
app.get('/admin/noticias-mais-curtidas', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota /admin/noticias-mais-curtidas.');
    try {
        const query = `
            SELECT
                n.titulo AS titulo_noticia,
                c.nome AS categoria,
                COUNT(curt.id) AS total_curtidas,
                n.data_publicacao AS data_publicacao
            FROM
                noticias n
            JOIN
                categorias c ON n.categoria = c.nome
            LEFT JOIN
                curtidas curt ON n.id = curt.noticia_id
            WHERE
                n.data_publicacao BETWEEN '2025-01-01' AND '2025-06-30'
            GROUP BY
                n.id, n.titulo, c.nome, n.data_publicacao
            ORDER BY
                total_curtidas DESC, categoria ASC;
        `;
        const [results] = await db.promise().query(query);

        const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id); // Obter notificações para o admin

        res.render('relatorio_noticias_curtidas', {
            relatorio: results,
            usuario: req.session.usuario,
            currentPath: req.path, // Adicionado currentPath
            numNotifications: numNotifications
        });

    } catch (err) {
        console.error("Erro ao gerar relatório de notícias mais curtidas:", err);
        res.status(500).send("Erro ao gerar relatório de notícias mais curtidas.");
    }
});

app.get('/admin/usuarios-engajados', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota /admin/usuarios-engajados.');
    try {
        const query = `
            SELECT DISTINCT
                u.nome AS nome_usuario,
                u.email AS email_usuario,
                n.titulo AS titulo_noticia,
                cat.nome AS categoria_noticia,
                com.texto AS comentario_usuario,
                curt.data_curtida AS data_curtida
            FROM
                usuarios u
            JOIN
                comentarios com ON u.id = com.usuario_id
            JOIN
                noticias n ON com.noticia_id = n.id
            JOIN
                categorias cat ON n.categoria = cat.nome
            JOIN
                categorias_seguidas cs ON u.id = cs.usuario_id AND cat.id = cs.categoria_id
            LEFT JOIN
                curtidas curt ON u.id = curt.usuario_id AND n.id = curt.noticia_id
            WHERE
                com.denunciado = 0
            ORDER BY
                nome_usuario, data_curtida DESC;
        `;
        const [results] = await db.promise().query(query);

        const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id); // Obter notificações para o admin

        res.render('relatorio_usuarios_engajados', {
            relatorio: results,
            usuario: req.session.usuario,
            currentPath: req.path, // Adicionado currentPath
            numNotifications: numNotifications
        });

    } catch (err) {
        console.error("Erro ao gerar relatório de usuários engajados:", err);
        res.status(500).send("Erro ao gerar relatório de usuários engajados.");
    }
});

app.get('/admin/noticias-mais-comentadas', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota /admin/noticias-mais-comentadas.');
    try {
        const query = `
            SELECT
                n.titulo AS titulo_noticia,
                c.nome AS categoria_noticia,
                n.autor AS autor_noticia,
                COUNT(com.id) AS total_comentarios
            FROM
                noticias n
            JOIN
                categorias c ON n.categoria = c.nome
            LEFT JOIN
                comentarios com ON n.id = com.noticia_id
            WHERE
                com.denunciado = 0 OR com.denunciado IS NULL
            GROUP BY
                n.id, n.titulo, c.nome, n.autor
            ORDER BY
                total_comentarios DESC;
        `;
        const [results] = await db.promise().query(query);

        const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id); // Obter notificações para o admin

        res.render('relatorio_noticias_comentadas', {
            relatorio: results,
            usuario: req.session.usuario,
            currentPath: req.path, // Adicionado currentPath
            numNotifications: numNotifications
        });

    } catch (err) {
        console.error("Erro ao gerar relatório de notícias mais comentadas:", err);
        res.status(500).send("Erro ao gerar relatório de notícias mais comentadas.");
    }
});

app.get('/admin/categorias-seguidas-por-usuario', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota /admin/categorias-seguidas-por-usuario.');
    try {
        const [categoriasSeguidasPorUsuario] = await db.promise().query('SELECT * FROM view_usuarios_categorias_seguidas ORDER BY nome_usuario, data_seguida DESC');
        
        const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id); // Obter notificações para o admin

        res.render('relatorio_categorias_seguidas', {
            categoriasSeguidas: categoriasSeguidasPorUsuario,
            usuario: req.session.usuario,
            currentPath: req.path, // Adicionado currentPath
            numNotifications: numNotifications
        });
    } catch (err) {
        console.error('Erro ao carregar categorias seguidas por usuário:', err);
        res.status(500).send('Erro ao carregar relatório.');
    }
});


// **PRIORIDADE 2: Rotas de Autenticação/Cadastro:** Usando o router de login
app.use('/', loginRoutes); 
//console.log('app.js: loginRoutes configurado.'); // LOG: Confirma loginRoutes

// **PRIORIDADE 3: Rotas Principais da Aplicação (Usuários Comuns):** Usando o router mainRoutes
app.use('/', mainRoutes); 
//console.log('app.js: mainRoutes configurado.'); // LOG: Confirma mainRoutes


// **PRIORIDADE 4: Outras Rotas Administrativas (gerais, que não conflitam com :id em mainRoutes)**
// As rotas de admin precisam do middleware checkAdmin
app.get('/dashboard', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota /dashboard.'); // LOG
    try {
        // Consulta para a View de Notícias com Engajamento
        const [noticiasEngajamentoResults] = await db.promise().query('SELECT * FROM view_noticias_engajamento ORDER BY total_curtidas DESC, total_comentarios DESC LIMIT 10'); // Exemplo: top 10

        const [totalUsuariosResult] = await db.promise().query("SELECT COUNT(*) AS totalUsuarios FROM usuarios");
        const totalUsuarios = totalUsuariosResult[0].totalUsuarios;

        const [totalNoticiasPublicadasResult] = await db.promise().query("SELECT COUNT(*) AS totalNoticiasPublicadas FROM noticias");
        const totalNoticiasPublicadas = totalNoticiasPublicadasResult[0].totalNoticiasPublicadas;

        const [totalComentariosDenunciadosResult] = await db.promise().query("SELECT COUNT(*) AS totalComentariosDenunciados FROM comentarios WHERE denunciado = TRUE");
        const totalComentariosDenunciados = totalComentariosDenunciadosResult[0].totalComentariosDenunciados;

        const [todasAsNoticias] = await db.promise().query("SELECT id, titulo, categoria, denunciado, motivoDenuncia FROM noticias ORDER BY data_publicacao DESC");

        const [totalCategoriasResult] = await db.promise().query("SELECT COUNT(*) AS totalCategorias FROM categorias");
        const totalCategorias = totalCategoriasResult[0].totalCategorias;

        const hoje = new Date().toISOString().slice(0, 10);
        const [acessosHojeResult] = await db.promise().query('SELECT total_acessos FROM acessos WHERE data_acesso = ?', [hoje]);
        const acessosHoje = acessosHojeResult.length > 0 ? acessosHojeResult[0].total_acessos : 0;

        const [noticiasPorCategoriaResults] = await db.promise().query(
            'SELECT categoria, COUNT(*) AS total FROM noticias GROUP BY categoria ORDER BY total DESC'
        );
        const noticiasPorCategoriaData = {
            labels: noticiasPorCategoriaResults.map(row => row.categoria),
            data: noticiasPorCategoriaResults.map(row => row.total)
        };

        const [usuariosPorCategoriaResults] = await db.promise().query(
            `SELECT c.nome AS categoria_nome, COUNT(cs.usuario_id) AS total_seguidores
             FROM categorias_seguidas cs
             JOIN categorias c ON cs.categoria_id = c.id
             GROUP BY c.nome
             ORDER BY total_seguidores DESC`
        );
        const usuariosPorCategoriaData = {
            labels: usuariosPorCategoriaResults.map(row => row.categoria_nome),
            data: usuariosPorCategoriaResults.map(row => row.total_seguidores)
        };

        res.render('dashboard', {
            nome: req.session.usuario.nome,
            totalUsuarios: totalUsuarios,
            totalNoticiasPublicadas: totalNoticiasPublicadas,
            totalComentariosDenunciados: totalComentariosDenunciados,
            noticiasDenunciadas: todasAsNoticias,
            totalCategorias: totalCategorias,
            numNotifications: totalComentariosDenunciados + todasAsNoticias.filter(n => n.denunciado).length,
            acessosHoje: acessosHoje,
            noticiasPorCategoriaData: noticiasPorCategoriaData,
            usuariosPorCategoriaData: usuariosPorCategoriaData,
            noticiasEngajamento: noticiasEngajamentoResults,
            currentPath: req.path // Adicionado currentPath
        });
    } catch (err) {
        console.error("Erro ao carregar dados do dashboard do DB:", err);
        res.status(500).send("Erro ao carregar dados do dashboard.");
    }
});

app.get('/noticias', checkAdmin, async (req, res) => { 
    //console.log('app.js: Acessando rota /noticias (admin) - Notícias Denunciadas.'); 
    try {
        const [noticiasDenunciadasAdmin] = await db.promise().query(
            "SELECT id, titulo, categoria, denunciado, motivoDenuncia, detalhesDenuncia FROM noticias WHERE denunciado = TRUE ORDER BY data_publicacao DESC" // <--- Campo 'detalhesDenuncia' adicionado aqui
        );
        
        const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id); // Obter notificações para o admin

        res.render('noticias-admin', {
            todasNoticias: noticiasDenunciadasAdmin,
            nome: req.session.usuario.nome,
            currentPath: req.path, // Adicionado currentPath
            numNotifications: numNotifications
        });
    } catch (err) {
        console.error('Erro ao buscar notícias do DB para admin:', err);
        res.status(500).send('Erro ao carregar notícias para gerenciamento.');
    }
});

app.post('/remover-comentario/:id', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /remover-comentario/:id.'); // LOG
    const comentarioId = parseInt(req.params.id);
    try {
        // 1. Obter detalhes do comentário antes de remover para notificação
        const [comentarioRows] = await db.promise().query('SELECT usuario_id, texto, noticia_id FROM comentarios WHERE id = ?', [comentarioId]);
        const comentario = comentarioRows[0];

        await db.promise().execute('DELETE FROM comentarios WHERE id = ?', [comentarioId]);
        //console.log(`Comentário ID ${comentarioId} removido do DB.`);

        // 2. Inserir notificação para o usuário que fez o comentário
        if (comentario && comentario.usuario_id) {
            const mensagemNotificacao = `Seu comentário "${comentario.texto.substring(0, 50)}..." foi removido por um administrador.`;
            await db.promise().execute(
                'INSERT INTO notificacoes (usuario_id, tipo_notificacao, mensagem, link) VALUES (?, ?, ?, ?)',
                [comentario.usuario_id, 'comentario_removido', mensagemNotificacao, `/noticias/${comentario.noticia_id}`]
            );
        }

        res.redirect('/comentarios'); 
    } catch (err) {
        console.error('Erro ao remover comentário do DB:', err);
        res.status(500).send('Erro ao remover o comentário.');
    }
});

app.post('/retirar-denuncia-comentario/:id', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /retirar-denuncia-comentario/:id.');
    const comentarioId = parseInt(req.params.id);
    try {
        // 1. Obter detalhes do comentário antes de retirar a denúncia para notificação
        const [comentarioRowsBeforeUpdate] = await db.promise().query('SELECT usuario_id, texto, noticia_id FROM comentarios WHERE id = ?', [comentarioId]);
        const comentarioBeforeUpdate = comentarioRowsBeforeUpdate[0];

        const [result] = await db.promise().execute(
            'UPDATE comentarios SET denunciado = FALSE, motivoDenuncia = NULL, detalhesDenuncia = NULL WHERE id = ?',
            [comentarioId]
        );

        if (result.affectedRows === 0) {
            //console.warn(`Tentativa de retirar denúncia de comentário não encontrado ou não denunciado: ID ${comentarioId}`);
        } else {
            //console.log(`Denúncia do Comentário ID ${comentarioId} retirada do DB.`);
            // 2. Inserir notificação para o usuário que fez o comentário (se ele existir e não for o admin denunciando o próprio)
            if (comentarioBeforeUpdate && comentarioBeforeUpdate.usuario_id && comentarioBeforeUpdate.usuario_id !== req.session.usuario.id) {
                const mensagemNotificacao = `A denúncia do seu comentário "${comentarioBeforeUpdate.texto.substring(0, 50)}..." foi retirada.`;
                await db.promise().execute(
                    'INSERT INTO notificacoes (usuario_id, tipo_notificacao, mensagem, link) VALUES (?, ?, ?, ?)',
                    [comentarioBeforeUpdate.usuario_id, 'denuncia_comentario_retirada', mensagemNotificacao, `/noticias/${comentarioBeforeUpdate.noticia_id}`]
                );
            }
        }
        res.redirect('/comentarios'); 
    } catch (err) {
        console.error('Erro ao retirar denúncia do comentário no DB:', err);
        res.status(500).send('Erro ao retirar a denúncia do comentário.');
    }
});

app.get('/comentarios', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota /comentarios (admin).'); // LOG
    try {
        const [comentariosDenunciados] = await db.promise().query('SELECT c.*, n.titulo AS noticiaTitulo FROM comentarios c JOIN noticias n ON c.noticia_id = n.id WHERE c.denunciado = TRUE ORDER BY c.data_comentario DESC');
        comentariosDenunciados.forEach(c => {
            c.data = new Date(c.data_comentario).toLocaleDateString('pt-BR');
        });

        const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id); // Obter notificações para o admin

        res.render('comentarios', { 
            comentariosDenunciados,
            currentPath: req.path, // Adicionado currentPath
            numNotifications: numNotifications
        });
    } catch (err) {
        console.error('Erro ao buscar comentários denunciados do DB:', err);
        res.status(500).send('Erro ao carregar comentários denunciados.');
    }
});

app.get('/usuarios', checkAdmin, async (req, res) => {
    // console.log('app.js: Acessando rota /usuarios (admin).'); // LOG
    try {
        const [usuariosCadastrados] = await db.promise().query("SELECT id, nome, email, isAdmin FROM usuarios ORDER BY id ASC"); 
        
        const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id); // Obter notificações para o admin

        res.render('usuarios', { 
            usuariosCadastrados,
            currentPath: req.path // Adicionado currentPath
        });
    } catch (err) {
        console.error("Erro ao buscar usuários do DB:", err);
        res.status(500).send("Erro ao carregar usuários.");
    }
});

// Rota para atualizar informações de um usuário (incluindo isAdmin)
app.post('/atualizar-usuario/:id', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /atualizar-usuario/:id.');
    const userId = parseInt(req.params.id);
    const { nome, email, senha, isAdmin } = req.body; // Recebe isAdmin do frontend

    try {
        let query = 'UPDATE usuarios SET nome = ?, email = ?, isAdmin = ?'; // Inclui isAdmin na query
        const params = [nome, email, isAdmin]; // Adiciona isAdmin aos parâmetros

        // Se uma nova senha foi fornecida, inclua-a na atualização
        if (senha && senha.trim() !== '') {
            query += ', senha = ?';
            params.push(senha);
        }

        query += ' WHERE id = ?';
        params.push(userId);

        const [result] = await db.promise().execute(query, params);

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: 'Usuário não encontrado ou nenhum dado alterado.' });
        }

        res.json({ success: true, message: 'Usuário atualizado com sucesso!' });

    } catch (err) {
        console.error('Erro ao atualizar usuário no DB:', err);
        // Verifica se o erro é por email duplicado
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Erro: Este e-mail já está em uso por outro usuário.' });
        }
        res.status(500).json({ success: false, message: 'Erro interno do servidor ao atualizar usuário.' });
    }
});


app.post('/remover-usuario/:id', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /remover-usuario/:id.'); // LOG
    const usuarioId = parseInt(req.params.id);
    try {
        if (req.session.usuario.id === usuarioId && req.session.usuario.isAdmin === 1) {
            console.warn(`Tentativa de remover o próprio usuário admin ID ${usuarioId}. Operação não permitida.`);
            return res.status(403).send("Você não pode remover sua própria conta de administrador.");
        }

        const [result] = await db.promise().execute("DELETE FROM usuarios WHERE id = ?", [usuarioId]); 
        //console.log(`Usuário ID ${usuarioId} removido com sucesso. Linhas afetadas: ${result.affectedRows}`); 
        res.redirect('/usuarios'); 
    } catch (err) {
        console.error("Erro ao remover usuário do DB:", err.message);
        res.status(500).send(`Erro ao remover usuário: ${err.message}`);
    }
});

app.get('/categorias', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota /categorias (admin).'); // LOG
    const mensagem = req.session.mensagem;
    const sucesso = req.session.sucesso;

    if (req.session.mensagem) { delete req.session.mensagem; }
    if (req.session.sucesso !== undefined) { delete req.session.sucesso; }

    try {
        const [categoriasRows] = await db.promise().query('SELECT id, nome FROM categorias ORDER BY nome ASC');
        const categoriasDisponiveis = categoriasRows; 
        
        const numNotifications = await getUnreadNotificationsCount(req.session.usuario.id); // Obter notificações para o admin

        res.render('categorias', { 
            categorias: categoriasDisponiveis, 
            mensagem, 
            sucesso,
            currentPath: req.path // Adicionado currentPath
        });
    } catch (err) {
        console.error('Erro ao carregar categorias do DB:', err);
        res.status(500).send('Erro ao carregar categorias.');
    }
});

app.post('/adicionar-categoria', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /adicionar-categoria.'); // LOG
    const { novaCategoriaNome } = req.body;

    if (!novaCategoriaNome || novaCategoriaNome.trim() === '') {
        req.session.mensagem = 'O nome da categoria não pode ser vazio.';
        req.session.sucesso = false;
        return res.redirect('/categorias');
    }

    try {
        const [result] = await db.promise().execute('INSERT IGNORE INTO categorias (nome) VALUES (?)', [novaCategoriaNome.trim()]);
        if (result.affectedRows === 0) {
            req.session.mensagem = `A categoria "${novaCategoriaNome}" já existe.`;
            req.session.sucesso = false;
        } else {
            req.session.mensagem = `Categoria "${novaCategoriaNome}" adicionada com sucesso!`;
            req.session.sucesso = true;
        }
        res.redirect('/categorias');
    } catch (err) {
        console.error('Erro ao adicionar categoria no DB:', err);
        req.session.mensagem = 'Erro ao adicionar categoria.';
        req.session.sucesso = false;
        res.redirect('/categorias');
    }
});

app.post('/remover-categoria', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /remover-categoria.'); // LOG
    const { categoriaParaRemover } = req.body;

    if (!categoriaParaRemover || categoriaParaRemover.trim() === '') {
        req.session.mensagem = 'Nome da categoria inválido para remoção.';
        req.session.sucesso = false;
        return res.redirect('/categorias');
    }

    try {
        const [categoriaRows] = await db.promise().query('SELECT id FROM categorias WHERE nome = ?', [categoriaParaRemover.trim()]);
        if (categoriaRows.length === 0) {
            req.session.mensagem = `Categoria "${categoriaParaRemover}" não encontrada.`;
            req.session.sucesso = false;
            //console.warn(`Tentativa de remover categoria não existente: '${categoriaParaRemover}'`);
        } else {
            req.session.mensagem = `Categoria "${categoriaParaRemover}" removida com sucesso! Notícias associadas foram movidas para 'Outros'.`;
            req.session.sucesso = true;
            //console.log(`Categoria '${categoriaParaRemover}' removida do DB.`);
        }
        res.redirect('/categorias');
    } catch (err) {
        console.error('Erro ao remover categoria do DB:', err);
        req.session.mensagem = 'Erro ao remover categoria.';
        req.session.sucesso = false;
        res.redirect('/categorias');
    }
});

app.post('/editar-categoria', checkAdmin, async (req, res) => {
    //console.log('app.js: Acessando rota POST /editar-categoria.'); // LOG
    const { categoriaAtual, novaCategoria } = req.body;

    if (!novaCategoria || novaCategoria.trim() === '') {
        req.session.mensagem = "O novo nome da categoria não pode estar vazio.";
        req.session.sucesso = false;
        return res.redirect('/categorias');
    }

    try {
        const [existingCategory] = await db.promise().query('SELECT id FROM categorias WHERE nome = ? AND nome != ?', [novaCategoria, categoriaAtual]);
        if (existingCategory.length > 0) {
            req.session.mensagem = `A categoria "${novaCategoria}" já existe. Por favor, escolha outro nome.`;
            req.session.sucesso = false;
            return res.redirect('/categorias');
        }

        const [updateCategoryResult] = await db.promise().execute('UPDATE categorias SET nome = ? WHERE nome = ?', [novaCategoria, categoriaAtual]);

        if (updateCategoryResult.affectedRows === 0) {
            req.session.mensagem = `Categoria "${categoriaAtual}" não encontrada para edição.`;
            req.session.sucesso = false;
            //console.warn(`Tentativa de editar categoria não existente: '${categoriaAtual}'`);
        } else {
            await db.promise().execute('UPDATE noticias SET categoria = ? WHERE categoria = ?', [novaCategoria, categoriaAtual]);
            
            req.session.mensagem = `Categoria "${categoriaAtual}" alterada para "${novaCategoria}" com sucesso!`;
            req.session.sucesso = true;
            //console.log(`Categoria '${categoriaAtual}' alterada para '${novaCategoria}' no DB e notícias associadas atualizadas.`);
        }
        res.redirect('/categorias'); 
    } catch (err) {
        console.error('Erro ao editar categoria no DB:', err);
        req.session.mensagem = 'Erro ao editar categoria.';
        req.session.sucesso = false;
        res.redirect('/categorias');
    }
});

// Nova rota para buscar notificações de um usuário
app.get('/api/notificacoes', checkAuth, async (req, res) => {
    //console.log('app.js: Acessando rota GET /api/notificacoes.');
    const usuarioId = req.session.usuario.id;
    try {
        const [notificacoes] = await db.promise().query(
            'SELECT id, mensagem, link, data_criacao, lida FROM notificacoes WHERE usuario_id = ? ORDER BY data_criacao DESC LIMIT 10',
            [usuarioId]
        );
        res.json({ success: true, notificacoes: notificacoes });
    } catch (err) {
        console.error('Erro ao buscar notificações:', err);
        res.status(500).json({ success: false, message: 'Erro ao buscar notificações.' });
    }
});

// Nova rota para marcar notificações como lidas
app.post('/api/notificacoes/marcar-lida/:id', checkAuth, async (req, res) => {
    //console.log('app.js: Acessando rota POST /api/notificacoes/marcar-lida/:id.');
    const notificacaoId = parseInt(req.params.id);
    const usuarioId = req.session.usuario.id; // Garante que o usuário só possa marcar suas próprias notificações

    try {
        const [result] = await db.promise().execute(
            'UPDATE notificacoes SET lida = TRUE WHERE id = ? AND usuario_id = ?',
            [notificacaoId, usuarioId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Notificação não encontrada ou não pertence ao usuário.' });
        }
        res.json({ success: true, message: 'Notificação marcada como lida.' });
    } catch (err) {
        console.error('Erro ao marcar notificação como lida:', err);
        res.status(500).json({ success: false, message: 'Erro interno ao marcar notificação como lida.' });
    }
});

// NOVO: Rota para limpar todas as notificações de um usuário
app.post('/api/notificacoes/limpar-todas', checkAuth, async (req, res) => {
    //console.log('app.js: Acessando rota POST /api/notificacoes/limpar-todas.');
    const usuarioId = req.session.usuario.id;

    try {
        // Deleta todas as notificações do usuário
        const [result] = await db.promise().execute(
            'DELETE FROM notificacoes WHERE usuario_id = ?',
            [usuarioId]
        );

        res.json({ success: true, message: `Foram limpas ${result.affectedRows} notificações.` });
    } catch (err) {
        console.error('Erro ao limpar todas as notificações:', err);
        res.status(500).json({ success: false, message: 'Erro interno ao limpar notificações.' });
    }
});


// 7. Início do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
