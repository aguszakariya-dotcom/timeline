const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sovana'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
    app.get('/', (req, res) => {
        const sql = 'SELECT * FROM timeline';
        db.query(sql, (err, result) => {
            // JSON.parser
            const users = JSON.parse(JSON.stringify(result));
            res.render('index', { users: users, title: 'Timeline' })
        });
    });
    app.post('/tambah', (req, res) => {
        const sql = `INSERT INTO timeline (customer, style, qty, finish_at, keterangan) VALUES ('${req.body.customer}', '${req.body.style}', '${req.body.qty}', '${req.body.finish_at}', '${req.body.keterangan}')`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.redirect('/');
        });
    });
});

module.exports = { db };