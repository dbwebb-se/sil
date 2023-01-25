require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const comments = require('./routes/comments');
const admin = require('./routes/admin');
const web = require('./routes/web');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));

app.disable('x-powered-by');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/comments", comments);
app.use("/admin", admin);
app.use("/", web);

const port = process.env.port || 8771;

const server = app.listen(port, () => {
    console.log('Content passport listening on port ' + port);
});

module.exports = server;
