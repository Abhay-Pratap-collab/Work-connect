var express = require('express');
var router = express.Router();
var pool = require('./pool')


/* GET users listing. */

router.post('/check_user_mobileno', function (req, res, next) {
  pool.query("select * from users where mobileno=?", [req.body.mobileno], function (error, result) {
    if (error) {
      res.json({ message: 'error', status: false })
    }
    else {
      if (result.length == 1) {

        res.json({ message: 'success', data: result[0], status: true })
      }
      else {
        res.json({ message: 'fail', status: false })


      }
    }

  }

  )
});

// console.log("create_user route loaded");
router.post("/create_user", function (req, res) {
  // console.log("create_user API called");
  pool.query("insert into users (mobileno) values(?)", [req.body.mobileno], function (error, result) {
    // console.log(req.body.mobileno)
    if (error) {
      res.json({ message: 'error', status: false })


    }
    else {
      res.json({ message: 'succesfully', status: true })
    }
  })
})
router.post("/create_address", function (req, res) {
  pool.query(
    `INSERT INTO address
    (
     mobileno,
      typeaddress,
      houseno,
      area,
      landmark,
      city,
      state,
      pincode,
      latitude,
      longitude,
      fulladdress
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      req.body.mobileno,
      req.body.typeaddress,
      req.body.houseno,
      req.body.area,
      req.body.landmark,
      req.body.city,
      req.body.state,
      req.body.pincode,
      req.body.latitude,
      req.body.longitude,
      req.body.fulladdress,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.json({ status: false, message: error.message });
      }

      return res.json({
        status: true,
        message: "Address saved successfully",

      });
    }
  );
});
router.get('/fetch_address/:mobileno', function (req, res) {
  pool.query(
    "SELECT * FROM address WHERE mobileno=?",
    [req.params.mobileno],
    function (error, result) {
      if (error) {
        res.json({ message: "error", status: false });
      } else {
        res.json({
          message: "success",
          status: true,
          data: result,
        });
      }
    }
  );
});
router.post('/delete_address', function (req, res) {
  pool.query("delete from address where addressid=?", [req.body.addressid], function (error, result) {
    if (error) {
      res.json({ message: 'error', status: false })
    }
    else {
      res.json({ message: 'succefully', status: true })

    }
  })
})
router.post('/update_address', function (req, res) {

  console.log(req.body);

  pool.query(
    `UPDATE address
         SET
            typeaddress=?,
            houseno=?,
            area=?,
            landmark=?,
            city=?,
            state=?,
            pincode=?,
            latitude=?,
            longitude=?,
            fulladdress=?
         WHERE addressid=?`,
    [
      req.body.typeaddress,
      req.body.houseno,
      req.body.area,
      req.body.landmark,
      req.body.city,
      req.body.state,
      req.body.pincode,
      req.body.latitude,
      req.body.longitude,
      req.body.fulladdress,
      req.body.addressid
    ],
    function (error, result) {

      if (error) {
        console.log(error);
        res.json({
          status: false,
          message: "Database Error"
        });
      }
      else {
        res.json({
          status: true,
          message: "Address Updated Successfully"
        });
      }

    }
  );

});

module.exports = router;
