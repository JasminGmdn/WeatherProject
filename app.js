import express from "express";
import { get } from "https";
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.send(__dirname + "/index.html");
});


app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "25b94f3352a777e81de259816b2cb7aa";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&key=" + apiKey + "&units="+ units;

  get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data); 
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      res.write(">h1>The temperature in" + query + "is " + temp + "degrees Celcius.</h1>")
      res.write("<h3>The weather is currently" + weatherDescription + "</h3>")
      res.send()
    })
  })
});

app.listen(3000, function(){
  console.log("Server is running on port 3000.")
});
