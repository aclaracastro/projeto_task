require('dotenv').config();
const express = require('express');
const path = require("path");
const routes = require('./routes/routes');
const conectToDb = require('./database/db');

conectToDb();
const app = express();
const port = 3000;



app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(routes)


/*app.get('/home', function (req, res) {
    res.render('index');
});*/

//app.listen(3000);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})