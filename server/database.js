const { response } = require('express')
const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    password: "postgrespassword",
    host: "localhost",
    port: 5432,
    database: "zoning"
})

// pool.query("CREATE DATABASE zoning;").then((Response) => {
//     console.log("Database Created")
//     console.log(response)
// })
// .catch((err) => {
//     console.log(err);
// });

module.exports = pool;