//========= importing modules ==========
var express = require('express'),
 path = require('path'),
 bodyParser = require('body-parser'),
 routes = require('./server/routes/web'), //web routes
 apiRoutes = require('./server/routes/api'), //api routes
 connection = require("./server/config/db"); //mongodb connection
var multer = require('multer');
 
// creating express server
var app = express();
 
//========= configuration ==========
 
//===== get all the data from the body (POST)
app.set('view engine', 'ejs'); 
// parse application/json 
app.use(bodyParser.json());
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// setting static files location './app' for angular app html and js
app.use(express.static(path.join(__dirname, 'app')));
// setting static files location './node_modules' for libs like angular, bootstrap
app.use(express.static('node_modules'));
 
// configure our routes
app.use('/', routes);
app.use('/api', apiRoutes);

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './app/uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '_' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
    /** API path that will upload the files */
    app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,imgFilename:req.file.filename,err_desc:null});
        });
    }); 
// setting port number for running server
var port = process.env.port || 3000;
 
// starting express server
app.listen(port, function() {
 console.log("Server is running at : http://localhost:" + port);
});