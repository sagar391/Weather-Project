const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,resp)
      {
        resp.sendFile( __dirname + "/index.html" );

      });

app.post("/", function(req,resp)
        {
          const query = req.body.cityName;
          const apiKey = "b57c8c826caac68693b98c3b88bd3860";
          const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey  ;
          https.get(url, function(response)
          {
              console.log(response.statusCode);
              response.on("data", function(data)
                          {
                            const WeatherData = JSON.parse(data);
                            const temp = WeatherData.main.temp;
                            const weatherDescription = WeatherData.weather[0].description;

                            resp.write("<h1> The temperature in " + query + " is " + temp +" degree Fahrenheit.</h1>");
                            resp.write("<p> The condition of weather in " + query + " is " + weatherDescription  +" </p>");
                            resp.send();
                          });
            });
        });
      //  resp.send("Server is running successfully");









app.listen(process.env.PORT || 3000 , function()
{
  console.log("Server is running at port 3000.");
});
