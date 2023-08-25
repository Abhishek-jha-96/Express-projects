const express = require('express');
const router = express.Router();
const createDB = require('./config/db');
const Url = require('./config/models/urlModel');
// const { nanoid } = require('nanoid'); // Use regular nanoid package
const baseUrl = "http://localhost:3000/urlapi/";

createDB.sync().then(() => {
  console.log('Database is running');
});

router.post('/', async (req, res) => {
  try {
    const { longUrl } = req.body;
    const shortId = baseUrl + Math.random(); // Use nanoid directly

    const storetUrl = await Url.create({
      longUrl,
      shortUrl: shortId,
    });

    return res.status(200).json({
      status: "ok",
      shortUrl: storetUrl.shortUrl,
    });

  } catch (err) {
    console.log(err);
    return res.send(err.message);
  }
});

router.get('/:short', async (req, res) => {
  let shortId = req.params.short;
  let url = await Url.findOne({
    where: { shortUrl: `${baseUrl}${shortId}` }
  });

  if (!url) {
    res.status(404).send("Enter valid code");
  }

  res.redirect(url.longUrl);
});

module.exports = router;
