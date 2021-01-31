const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = 3000;
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));



app.listen(port, () => console.log('Server start on port 3000'));


var cpUpload = upload.fields([{ name: 'basic', maxCount: 1 }, { name: 'delux', maxCount: 1 }, { name: 'total', maxCount: 1 }])
app.post('/files', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
  console.log(req.files['basic'][0]);
  console.log(req.files['delux'][0]);
  console.log(req.files['total'][0]);
  res.json({response: 'files sent to server'});
})