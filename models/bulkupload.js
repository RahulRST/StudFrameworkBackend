/** @format */

const readXlsxFile = require("read-excel-file/node");
const connection = require("../config/dbconfig");

let academic_details = require("../models/academic_details");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = function (app) {
  // -> Express Upload RestAPIs
  // Upload Courses
  app.post("/bulkupload", upload.single("excel"), (req, res) => {
    importExcelData2MySQLCourses(__dirname + "/uploads/" + req.file.filename);
    // console.log("uploaded");
    res.send("Success");
  });

  function importExcelData2MySQLCourses(filePath) {
    // File path.
    readXlsxFile(filePath).then((rows) => {
      for (var i = 1; i < rows.length; i++) {
        let current_marks_record = {};
        for (var j = 0; j < rows[i].length; j++) {
          current_marks_record[rows[0][j]] = rows[i][j];
        }
        console.log(current_marks_record);
        academic_details.sample_insert_academic_details(
          current_marks_record,
          (results) => console.log(results)
        );
      }
    });
  }
};
