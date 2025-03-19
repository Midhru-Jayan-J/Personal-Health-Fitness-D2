const { Pool } = require('pg');


module.exports = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'user',
    password: '6',
    port: 5432,
});