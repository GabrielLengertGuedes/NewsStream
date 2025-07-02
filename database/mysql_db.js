const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newsstream_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao pool de MySQL:', err.stack);
        if (err.code === 'protocol_connection_lost') {
            console.error('Conexão com o banco de dados foi perdida.');
        }
        if (err.code === 'er_con_count_error') {
            console.error('Muitas conexões com o banco de dados.');
        }
        if (err.code === 'econnrefused') {
            console.error('Conexão com o banco de dados recusada. Verifique se o MySQL está rodando.');
        }
        process.exit(1);
    }
    if (connection) {
        const createUsuariosTableSql = `
            create table if not exists usuarios (
                id int auto_increment primary key,
                nome varchar(255) not null,
                email varchar(255) unique not null,
                senha varchar(255) not null,
                isAdmin tinyint(1) default 0
            )
        `;
        const createNoticiasTableSql = `
            create table if not exists noticias (
                id int auto_increment primary key,
                titulo varchar(255) not null,
                resumo text not null,
                conteudo longtext not null,
                categoria varchar(100) not null,
                imagemurl varchar(255),
                data_publicacao date not null,
                autor varchar(255) not null default 'NewsStream',
                denunciado boolean default false,
                motivodenuncia varchar(255),
                detalhesdenuncia text
            )
        `;
        const createComentariosTableSql = `
            create table if not exists comentarios (
                id int auto_increment primary key,
                noticia_id int not null,
                usuario_id int not null,
                autor_nome varchar(255) not null,
                texto text not null,
                data_comentario datetime default current_timestamp,
                denunciado boolean default false,
                motivodenuncia varchar(255),
                detalhesdenuncia text,
                foreign key (noticia_id) references noticias(id) on delete cascade,
                foreign key (usuario_id) references usuarios(id) on delete cascade
            )
        `;
        const createCurtidasTableSql = `
            create table if not exists curtidas (
                 id int auto_increment primary key,
                noticia_id int not null,
                usuario_id int not null,
                data_curtida datetime default current_timestamp,
                unique (noticia_id, usuario_id),
                foreign key (noticia_id) references noticias(id) on delete cascade,
                foreign key (usuario_id) references usuarios(id) on delete cascade
            )
        `;
        const createCategoriasSeguidasTableSql = `
            create table if not exists categorias_seguidas (
                id int auto_increment primary key,
                usuario_id int not null,
                categoria_nome varchar(100) not null,
                data_seguida datetime default current_timestamp,
                unique (usuario_id, categoria_nome),
                foreign key (usuario_id) references usuarios(id) on delete cascade
            )
        `;
        const createCategoriasTableSql = `
            create table if not exists categorias (
                id int auto_increment primary key,
                nome varchar(100) not null unique
            )
        `;

        connection.query(createUsuariosTableSql, (err) => {
            if (err) console.error('Erro ao verificar/criar tabela de usuários:', err.message);
            connection.query(createNoticiasTableSql, (err) => {
                if (err) console.error('Erro ao verificar/criar tabela de notícias:', err.message);
                connection.query(createComentariosTableSql, (err) => {
                    if (err) console.error('Erro ao verificar/criar tabela de comentários:', err.message);
                    connection.query(createCurtidasTableSql, (err) => {
                        if (err) console.error('Erro ao verificar/criar tabela de curtidas:', err.message);
                        connection.query(createCategoriasSeguidasTableSql, (err) => {
                            if (err) console.error('Erro ao verificar/criar tabela de categorias seguidas:', err.message);
                            connection.query(createCategoriasTableSql, (err) => {
                                if (err) console.error('Erro ao verificar/criar tabela de categorias:', err.message);
                                connection.release();
                            });
                        });
                    });
                });
            });
        });
    }
});

module.exports = pool;