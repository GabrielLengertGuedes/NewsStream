const mysql = require('mysql2');

// Configurações do pool de conexões com o banco de dados MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newsstream_db',
    waitForConnections: true, // Se todas as conexões estiverem em uso, espera por uma livre
    connectionLimit: 10,     // Número máximo de conexões no pool
    queueLimit: 0            // Número máximo de requisições pendentes, 0 para ilimitado
});

// Evento para quando uma conexão é estabelecida no pool
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
        process.exit(1); // Encerra o processo Node.js se a conexão inicial falhar
    }
    if (connection) {
        console.log('Conectado ao pool de MySQL com o ID da conexão:', connection.threadId);

        // Verifica/Cria a tabela 'usuarios'
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                notificacoes INT DEFAULT 0
            )
        `;
        connection.query(createTableSql, (err, results) => {
            if (err) {
                console.error('Erro ao verificar/criar tabela de usuários no MySQL:', err.message);
            } else {
                console.log('Tabela "usuarios" verificada/criada (se não existia).');
            }
            connection.release(); // Libera a conexão de volta para o pool
        });
    }
});

// Exporte o pool de conexões em vez da conexão direta
module.exports = pool;