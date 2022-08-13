const express      = require('express');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const routes       = require('./routes');
const app          = express();
const port         = 5001;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/v1/', routes);

module.exports = app;

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});