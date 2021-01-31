const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fileService = require('./service/file.service');
const revenueService = require('./service/revenue.service')

const app = express();
const port = 3000;
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})

const totalRevenues = {};

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('src/public'));



app.listen(port, () => console.log('Server start on port 3000'));


var cpUpload = upload.fields([{ name: 'basic', maxCount: 1 }, { name: 'delux', maxCount: 1 }, { name: 'total', maxCount: 1 }]);
app.post('/files', cpUpload, async (req, res) => {
  const basicFile =  req.files['basic'][0].buffer.toString();
  const deluxeFile = req.files['delux'][0].buffer.toString();
  const totalFile = req.files['total'][0].buffer.toString();
  
  fileService.processBasicFile(basicFile)
  .then(dateToNumbers => revenueService.calculateBasicRevenueTotals(dateToNumbers))
  .then(basicRevenues => {
    totalRevenues.basic = basicRevenues;
  });
  fileService.processDeluxeFile(deluxeFile)
  .then(dateToNumbers => revenueService.calculateDeluxeRevenueTotals(dateToNumbers))
  .then(deluxeRevenues => {
    totalRevenues.deluxe = deluxeRevenues;
  });
  fileService.processTotalFile(totalFile)
  .then(dateToNumbers => revenueService.calculateDailyTotalRevenuesTotals(dateToNumbers))
  .then(totalRevenues => {
    totalRevenues.total = totalRevenues;
  });
  
  
  res.json({response: 'files sent to server'});
});

app.get('/revenue', (req, res) => {

  res.send(totalRevenues);

})