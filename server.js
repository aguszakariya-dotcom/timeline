const express = require('express');
const mysql = require('mysql');
const Swal = require('sweetalert2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

// database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sovana'
});
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
    app.get('/', (req, res) => {
        const sql = 'SELECT * FROM timeline ORDER BY id DESC';
        db.query(sql, (err, result) => {
            // JSON.parser
            const users = JSON.parse(JSON.stringify(result));
            res.render('index', { users: users, title: 'Timeline' })
        });
    });
    app.post('/tambah', (req, res) => {
        Swal.fire({
            position: 'top-middle',
            type: 'success',
            title: 'Data Berhasil Ditambahkan',
            showConfirmButton: false,
            timer: 1500
        })
        const sql = `INSERT INTO timeline (customer, style, qty, keterangan, finish_at) VALUES ('${req.body.customer}', '${req.body.style}', '${req.body.qty}', '${req.body.keterangan}', '${req.body.finish_at}')`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            if(result) {
            Swal.fire({
                position: 'top-middle',
                type: 'success',
                title: 'Data Berhasil Ditambahkan',
                showConfirmButton: false,
                timer: 1500
            })
            }
            res.redirect('/');
        });
    });

    // delete data
    app.get('/hapus/:id', (req, res) => {
        const sql = `DELETE FROM timeline WHERE id = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            if(result) {
                Swal.fire({
                    position: 'top-middle',
                    type: 'success',
                    title: 'Data Berhasil Dihapus',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            res.redirect('/');
        }
        );
    }
    );

    // edit data
    app.get('/edit/:id', (req, res) => {
        const sql = `SELECT * FROM timeline WHERE id = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            const user = JSON.parse(JSON.stringify(result));
            res.render('edit', { user: user[0] });
        }
        );
    }
    );
    app.post('/edit/:id', (req, res) => {
        Swal.fire({
            title: 'Data Berhasil di update1',
            showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
        })

        const sql = `UPDATE timeline SET customer = '${req.body.customer}', style = '${req.body.style}', qty = '${req.body.qty}', keterangan = '${req.body.keterangan}', finish_at = '${req.body.finish_at}' WHERE id = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            res.redirect('/');
        }
        );
    }
    );

});

app.listen(8000, () => console.log('listening on port 8000'));

