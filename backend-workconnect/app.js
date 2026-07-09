var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var cityRouter = require("./routes/cities")
var placeRouter = require("./routes/places")
var categoryRouter = require("./routes/category")
var subcategoryRouter = require("./routes/subcategory")
var expertsRouter = require("./routes/experts")
var includesRouter = require("./routes/includes")
var adminRouter = require('./routes/admins')
var userinterfaceRouter = require('./routes/userinterface')
var pricingRouter = require("./routes/pricing")
var checkPhoneRouter = require("./routes/checkphone");
var usersRouter = require("./routes/users")
var cors = require("cors")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cities', cityRouter)
app.use('/places', placeRouter)
app.use('/category', categoryRouter)
app.use('/subcategory', subcategoryRouter)
app.use('/experts', expertsRouter)
app.use('/includes', includesRouter)
app.use('/admins', adminRouter)
app.use('/userinterface', userinterfaceRouter)
app.use('/pricing', pricingRouter)
app.use("/checkphone", checkPhoneRouter);
app.use("/users",usersRouter)


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
