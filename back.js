const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('cross-spawn');
// const multer  = require('multer');
// const path = require('path');
// const multer = require('multer');
// const upload = multer({ dest: __dirname }); // specify directory where you want to save the file

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/p3.html");
})


app.post('/', (req, res) => {
    const Rainfall = Number(req.body.Rainfall);
    const temperature = Number(req.body.temperature);
    const Wind = Number(req.body.Wind);
    const Sunlight = Number(req.body.Sunlight);
    const Soil = Number(req.body.soilcondition);
    const AmountOfFertiliser = Number(req.body.AmountOfFertiliser);

    const input = {
        R : Rainfall,
        T : temperature,
        W : Wind,
        S : Sunlight,
        So : Soil,
        Af : AmountOfFertiliser
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
      res.send("<html><body><h1>"+result+"</h1></body></html>");
    } else {
        console.error(`Python script exited with code ${code}`);
      res.status(500).send(`Python script exited with code ${code}`);
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
