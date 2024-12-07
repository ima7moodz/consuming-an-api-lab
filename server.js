const express = require("express")
const axios = require("axios")
require("dotenv").config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

const PORT = 3000

//routes
app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.post("/weather", (req, res) => {
  const zipCode = req.body.zip
  const apiKey = process.env.API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${apiKey}`

  axios
    .get(url)
    .then((response) => {
      const weatherData = response.data
      res.render("weather/show", {
        city: weatherData.name,
        temp: weatherData.main.temp,
        description: weatherData.weather[0].description,
      })
    })
    .catch((error) => {
      console.log(error)
      res.redirect("/")
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}.`)
})
