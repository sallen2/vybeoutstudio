const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const vybeOut = require('./controllers/vybeOut');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', vybeOut);

app.listen(process.env.PORT || 8080, () => console.log('server up on port 8080'));
