const Pool = require('pg').Pool
const pool = new Pool({
    "host": 'localhost',
    "port": 5432,
    "user": "postgres",
    "password": "1234",
    "database": "laba6"
})

function shutdown() {
  console.log('Shutting down...');
  pool.end(() => {
    console.log('PostgreSQL pool has ended');
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown();
});

module.exports = pool