var express = require('express');
var router = express.Router();
var pool = require('./pool')
const upload = require('./multer');
router.get("/fetch_all_state", function (req, res) {
    pool.query("select * from expertstate", function (error, result) {
        if (error) {
            console.log(error)

            res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })

        }
        else {
            res.status(200).json({ status: true, data: result })
        }
    })
})

router.get("/fetch_all_city", function (req, res) {
    var stateid = req.query.stateid;

    pool.query("select * from expertcity where stateid=?", [stateid], function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: false, message: 'error' });
        } else {
            return res.status(200).json({ status: true, data: result });
        }
    });
});

router.post('/add_experts', upload.any(), function (req, res) {
    try {

        const aadharfile = req.files[0] ? req.files[0].filename : "";
        const panfile = req.files[1] ? req.files[1].filename : "";
        const photograph = req.files[2] ? req.files[2].filename : "";
        const licensefile = req.files[3] ? req.files[3].filename : "";

        const q = "INSERT INTO experts (categoryid, subcategoryid, firstname, lastname, fathername, dob, gender, emailid, mobileno, aadharid, aadharfile, panno, panfile, photograph, vehicleno, vehicletype, license, licensefile, currentstate, currentcity, currentpincode, permanentstate, permanentcity, permanentpincode,currentaddress,permanentaddress) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        const values = [
            req.body.categoryid,
            req.body.subcategoryid,
            req.body.firstname,
            req.body.lastname,
            req.body.fathername,
            req.body.dob,
            req.body.gender,
            req.body.emailid,
            req.body.mobileno,
            req.body.aadharid,
            aadharfile,
            req.body.panno,
            panfile,
            photograph,
            req.body.vehicleno,
            req.body.vehicletype,
            req.body.license,
            licensefile,
            req.body.currentstate,
            req.body.currentcity,
            req.body.currentpincode,
            req.body.permanentstate,
            req.body.permanentcity,
            req.body.permanentpincode,
            req.body.currentaddress,
            req.body.permanentaddress
        ];

        pool.query(q, values, function (error, result) {
            if (error) {
                console.log("Database Error:", error);
                return res.status(500).json({ status: false, message: 'Database error occurred' });
            } else {
                return res.status(200).json({ status: true, message: 'Expert added successfully' });
            }
        });

    } catch (e) {
        console.log("Server Error:", e);
        return res.status(500).json({ status: false, message: 'Server error occurred' });
    }
});


router.get('/fetch_experts', function (req, res) {
    const query = `
        SELECT 
            e.*, 
            c.categoryname, 
            sc.subcategoryname, 
            st1.statename AS currentstatename,
            ci1.cityname AS currentcityname,
            st2.statename AS permanentstatename,
            ci2.cityname AS permanentcityname
        FROM experts e
        LEFT JOIN category c ON e.categoryid = c.categoryid
        LEFT JOIN subcategory sc ON e.subcategoryid = sc.subcategoryid
        LEFT JOIN expertstate st1 ON e.currentstate = st1.stateid
        LEFT JOIN expertcity ci1 ON e.currentcity = ci1.cityid
        LEFT JOIN expertstate st2 ON e.permanentstate = st2.stateid
        LEFT JOIN expertcity ci2 ON e.permanentcity = ci2.cityid
    `;

    pool.query(query, (error, result) => {
        if (error) {
            console.log("SQL ERROR:", error.sqlMessage);
            return res.status(500).json({ status: false, message: 'Database query failed' });
        }
        res.status(200).json({ status: true, data: result });
    });
});

router.post('/delete_experts', function (req, res, next) {
    console.log(req.body)
    pool.query("delete from experts where expertid=?", [req.body.expertid], function (error, result) {
        if (error) {
            console.log("xxxxx", error)
            res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
        }
        else {
            res.status(200).json({ status: true, message: 'City Deleted Successfully...' })
        }

    })
})

router.post('/edit_experts', function (req, res, next) {
    // 1. Added the missing 4 fields (currentstate, currentcity, permanentstate, permanentcity) to the SET clause
    const sql = `UPDATE experts SET 
        firstname=?, lastname=?, fathername=?, mobileno=?, emailid=?, 
        aadharid=?, panno=?, vehicleno=?, vehicletype=?, license=?, 
        currentpincode=?, permanentpincode=?, categoryid=?, subcategoryid=?, 
        gender=?, dob=?, currentstate=?, currentcity=?, permanentstate=?, 
        permanentcity=? 
        WHERE expertid=?`;

    // 2. Used req.body for every single field to avoid "undefined" errors
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.fathername,
        req.body.mobileno,
        req.body.emailid,
        req.body.aadharid,
        req.body.panno,
        req.body.vehicleno,
        req.body.vehicletype,
        req.body.license,
        req.body.currentpincode,
        req.body.permanentpincode,
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.gender,
        req.body.dob,
        req.body.currentstate,   // Added
        req.body.currentcity,    // Added
        req.body.permanentstate, // Added
        req.body.permanentcity,  // Added
        req.body.expertid       // Must be last for the WHERE clause
    ];

    pool.query(sql, values, function (error, result) {
        if (error) {
            console.log("Database Error:", error);
            res.status(500).json({ status: false, message: 'Pls Contact to DBA...' });
        } else {
            res.status(200).json({ status: true, message: 'Record Edited Successfully...' });
        }
    });
});






// 1. Photo Update
router.post('/edit_photo', upload.single('photograph'), function (req, res) {
    pool.query("update experts set photograph=? where expertid=?", [req.file.filename, req.body.expertid], function (err, result) {
        if (err) return res.status(500).json({ status: false, message: 'Error' });
        res.status(200).json({ status: true, message: 'Photo Updated' });
    });
});

// 2. Aadhaar Update
router.post('/edit_adhar', upload.single('aadharfile'), function (req, res) {
    pool.query("update experts set aadharfile=? where expertid=?", [req.file.filename, req.body.expertid], function (err, result) {
        if (err) return res.status(500).json({ status: false, message: 'Error' });
        res.status(200).json({ status: true, message: 'Aadhaar Updated' });
    });
});

// 3. PAN Update
router.post('/edit_pan', upload.single('panfile'), function (req, res) {
    pool.query("update experts set panfile=? where expertid=?", [req.file.filename, req.body.expertid], function (err, result) {
        if (err) return res.status(500).json({ status: false, message: 'Error' });
        res.status(200).json({ status: true, message: 'PAN Updated' });
    });
});


// 4. License Update
router.post('/edit_license', upload.single('licensefile'), function (req, res) {
    pool.query("update experts set licensefile=? where expertid=?", [req.file.filename, req.body.expertid], function (err, result) {
        if (err) return res.status(500).json({ status: false, message: 'Error' });
        res.status(200).json({ status: true, message: 'License Updated' });
    });
});

module.exports = router