var db = require('./database');
const session = require('express-session');
var express = require('express');
const flash = require('connect-flash');
var bodyParser = require('body-parser');
var md5 = require('MD5')
const multer = require('multer');

var router = express.Router();
const app = express();
const port = process.env.PORT || 5000;
var path = require('path');
var indexRouter = require('./routes/admin_route');
// Set the default templating engine to ejs
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'suraj'}));
app.use(flash());

app.use(function(req, res, next) {
  res.locals.user = req.session.username;
  next();
});

const DIR = './public/images';
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, DIR);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
 
let upload = multer({storage: storage});

// console.log that your server is up and running

// create a GET route
app.use('/', indexRouter);



module.exports = router;
app.listen(port, () => console.log(`Listening on port ${port}`));