const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");

  //res.send("Server is up and running!");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "APIKEY";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +apiKey+ "&units=" + units;
    https.get(url, function(response){
      //console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageurl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

        //console.log(description);


        res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1> ");
        res.write("<h2>The weather is currently " + description + "</h2>")
        res.write("<img src=" + imageurl + ">")
        res.send();
      });
    });

})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
