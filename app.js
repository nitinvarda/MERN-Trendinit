var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var artic = require('./routes/Schema');
var crypto = require('crypto');
var cors = require('cors');
var GridFsStorage = require('multer-gridfs-storage');


var session = require("express-session");
var passport = require("passport");
require("./passport")(passport);

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


// database connection
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
var gfs;
mongoose.connection
  .once("open", () => {
    console.log("connection established:", mongoose.connection.readyState);
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });

  })
  .on("error", (error) => {
    console.log("connection error:", error);
  });






var usersRouter = require('./routes/users');
var home = require('./routes/homePage');

var edit = require('./routes/edit');
var byadmin = require('./routes/byadmin');


var article = require('./routes/article');

var checkAuth = require("./routes/checkauth");
var adminhome = require("./routes/adminhome");

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileupload());
app.use(
  session({
    secret: "thesecret",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());



var storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage }).single("myImage");






// this is add route //
app.post('/add', upload, (req, res) => {


  // res.json(req.body.title);
  var newpost = new artic({
    title: req.body.title,
    by: req.body.by,
    date: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    desc: req.body.desc,
    imagename: req.file.filename,
    category: req.body.category
  });
  newpost.save(err => {
    if (err) return console.error(err);

  })
  return res.send("success");


});


app.get("/image/:filename", function (req, res) {
  gfs.find({ filename: req.params.filename }).toArray((err, file) => {

    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'no files exist'
      });
    }

    const readStream = gfs.openDownloadStreamByName(req.params.filename);
    readStream.pipe(res);
  })

})



// this is update route //
app.post('/update/:id', upload, function (req, res, next) {

  artic.findOne({ _id: req.params.id }, (err, data) => {
    console.log(data);
    if (err) return console.error(err);

    gfs.find({ filename: data.imagename }).toArray((err, file) => {
      console.log(file[0]);
      if (!file || file[0].length === 0) {
        return res.status(404).json({
          err: 'no files exist'
        });
      }

      else {
        gfs.delete(file[0]._id, (err, complete) => {
          if (err) {
            return console.error(err);

          }

        })
      }
    })
  })



  var update = {
    title: req.body.title,
    by: req.body.by,
    category: req.body.category,
    date: req.body.date,
    desc: req.body.desc,
    imagename: req.file.filename
  }
  artic.findByIdAndUpdate(req.params.id, update, function (err) {
    if (err) return console.log(err);
    res.json("success");
  })

})




// this is delete route //
app.post('/delete/:id', (req, res) => {

  artic.find({ _id: req.params.id }, (err, data) => {
    if (err) return console.error(err);

    gfs.find({ filename: data[0].imagename }).toArray((err, file) => {

      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'no files exist'
        });
      }

      else {
        gfs.delete(file[0]._id, (err, complete) => {
          if (err) {
            return console.error(err);

          }

        })
      }
    })
  })
  artic.findByIdAndDelete(req.params.id, function (err) {
    if (err) return console.log(err);
    else {
      res.send("deleted successfully");
    }
  })



})





// app.use('/', indexRouter);
app.use('/home', home);
app.use('/checkauth', checkAuth);
app.use('/adminhome', adminhome);

app.use('/users', usersRouter);

app.use(byadmin);
app.use('/edit', edit);

app.use('/article', article);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
