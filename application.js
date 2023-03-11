const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('cross-spawn');
const multer  = require('multer');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage: storage });

  app.use(express.static(path.join(__dirname, 'public')));



app.get("/", function(req, res){
    res.sendFile(__dirname+"/p.html");
})



app.post('/', upload.single('file'),(req, res) => {
    const Rainfall = Number(req.body.Rainfall);
    const temperature = Number(req.body.temperature);
    const Wind = Number(req.body.Wind);
    const Sunlight = Number(req.body.Sunlight);
    const Soil = Number(req.body.soilcondition);
    const AmountOfFertiliser = Number(req.body.AmountOfFertiliser);
    var filePresent = "No";
    var fileName = "Default";

    const file = req.file;
    if (file) {
        var filePresent = "Yes";
        fileName = file.originalname;
    }

    const input = {
        R : Rainfall,
        T : temperature,
        W : Wind,
        S : Sunlight,
        So : Soil,
        Af : AmountOfFertiliser,
        File : filePresent,
        FileName : fileName
    }

    console.log(input);

  
    const pythonProcess = spawn('python3', [__dirname+'/l.py'], { stdio: 'pipe' });

    pythonProcess.on('error', (err) => {
        console.error('Failed to start python process:', err);
      });
    pythonProcess.stdin.write(JSON.stringify(input)+"\n");
  
  let result = '';
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.send("<html><head><title>Form Submission Results</title></head><body><h1>Form Submission Results</h1><p>Thank you for submitting the form. Here are the results:</p><p>The final crop yeild with the values given are: "+result+" tons</p></body></html>");
    } else {
        console.error(`Python script exited with code ${code}`);
      res.status(500).send(`Python script exited with code ${code}`);
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
