require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const vybeOut = require('./controllers/vybeOut');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', vybeOut);

app.listen(process.env.PORT || 8080, () => console.log('server up on http://localhost:8080'));
