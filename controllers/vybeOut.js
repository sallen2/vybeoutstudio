const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const mongodbURI = 'mongodb://sallen20:a12345@ds251287.mlab.com:51287/vybeout';

const conn = mongoose.createConnection(mongodbURI);

// gridfs stream init
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// mongodb storage engine
const storage = new GridFsStorage({
  url: mongodbURI,
  file: (req, file) => new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return reject(err);
      }
      const filename = buf.toString('hex') + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'uploads',
      };
      resolve(fileInfo);
    });
  }),
});

const upload = multer({ storage });
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/view', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (err) throw new Error('Something went wrong');
    console.log(files[0].filename);
    res.render('view', { files });
  });
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.get('/contribute', (req, res) => {
  res.render('contribute');
});

router.post('/create', upload.single('audio'), (req, res) => {
  console.log(req.file);
  res.status(201).end();
});

// route that streams audio from mongodb SUPER COOL!!!
router.get('/audio/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (err) throw new Error('file not there or something went wrong');
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

module.exports = router;
