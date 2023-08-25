const express = require('express');
const app = express();
const shortUrl = require('./routes/url');
const homeRoute = require('./routes/home');

//
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use('/urlapi', shortUrl);
app.use('/', homeRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("App is running");
})