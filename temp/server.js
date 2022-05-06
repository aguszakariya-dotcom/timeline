const express = require('express');
const mysql = require('mysql');

const BodyParser = require('body-parser');
const { default: Swal } = require('sweetalert2');
const app = express();
const sweetalert2 = require('sweetalert2');

app.set('view engine', 'ejs');
app.set('views', 'views');
//  database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sovana'
});

db.connect((err) => {
    if (err) throw err;
    console.log('database connected');
    
    const sql = "SELECT * FROM timeline ORDER BY id DESC";
    db.query(sql, (err, result) => {
        const times = JSON.stringify(result);
        if (err) throw err;
        console.log("isi database ->", times);
        app.get('/', (req, res) => {
            res.render('index', { times: times, title: 'Timeline' });
        });
    });

    
});




// app.use(BodyParser.urlencoded({ extended: true }));
// app.use(express.json())
// app.set('views', 'views');
// app.set('view engine', 'ejs');












app.listen(8000, () => {
    console.log('listening on port 8000');
});

