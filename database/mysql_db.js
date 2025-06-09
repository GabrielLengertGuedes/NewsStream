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
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexão com o banco de dados foi perdida.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Muitas conexões com o banco de dados.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexão com o banco de dados recusada. Verifique se o MySQL está rodando.');
        }
        process.exit(1);
    }
    if (connection) {

        const createTableSql = `
            create table if not exists usuarios (
                id int auto_increment primary key,
                nome varchar(255) not null,
                email varchar(255) unique not null,
                senha varchar(255) not null,
                notificacoes int default 0
            )
        `;
        connection.query(createTableSql, (err, results) => {
            if (err) {
                console.error('Erro ao verificar/criar tabela de usuários no MySQL:', err.message);
            } else {

            }
            connection.release();
        });
    }
});

module.exports = pool;