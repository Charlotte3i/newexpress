var express = require('express');
var router = express.Router();
var multer = require('multer');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:E6u5iKE3eWeJ6xPc@loadsever.rnwvwyh.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  if (err != null){
    console.log(err.toString())
  }else {
    console.log("Ket noi thanhc ong")
  }
});

var storage = multer.diskStorage({destination: function (req,file,cb){

  cb(null,'upload');
  },

  //----------------------//


  filename: function (req,file,cb){
  cb(null,file.filename + '_' + Date.now());
  },

  fileFilter: function (req,file,cb){

    var file = req.file.originalname;
    var kichthuot = file.length;

    if(file.indexOf('.ipg') > -1){
      cb(null,true)
    }else {
      cb(null, false)
    }
  }
})

var upload = multer({dest:'uploads/'}),
    limit = {fileSize: 2 * 1024 * 1024};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', upload.single('file'),
    function (req,res){

  var email = req.body.email;
  var file = req.file.originalname;
  var kichthuot = file.length;

  res.send('upload thanh cong '+ file);


})
module.exports = router;
