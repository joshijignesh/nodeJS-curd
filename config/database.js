require('dotenv').config()
const { createPool } = require('mysql')

const pool = createPool({
        port : process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DATABASE,
        connectionLimit : 100
})

module.exports = pool;