var express = require('express');
var router = express.Router();
const app = express();
const multer = require('multer');
app.use('/*', router);
const DIR = './public/images';
var path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, DIR);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
 
let upload = multer({storage: storage});

var admin_controller = require('../controllers/AdminController');

// GET Login page.
router.get('/', admin_controller.index);
router.post('/authentication', admin_controller.authenticate);
router.get('/dashboard', admin_controller.dashboard);
router.get('/logout', admin_controller.signout);
router.get('/profile', admin_controller.profile);
router.post('/update_profile',upload.single('image'), admin_controller.updateProfile);
router.post('/update_password', admin_controller.updatePassword);



module.exports = router;