var crypto = require("crypto");
const connection = require("../config/dbconfig");

function change_pass(params, callback) {
  connection.query(
    "SELECT `email`,`auth_token`,`password` FROM `login_details` WHERE `email` = '" +
      params.email +
      "';",
    (err, details, fields) => {
      if (err) {
        return callback("pass-fail");
      } else {
        if (params.auth_token == details[0].auth_token) {
          var old_pass = crypto
            .createHash("sha512")
            .update(params.oldpass)
            .digest("hex");
          var new_pass = crypto
            .createHash("sha512")
            .update(params.newpass)
            .digest("hex");
          if (old_pass === details[0].password) {
            connection.query(
              'UPDATE  `login_details` SET `password` = "' +
                new_pass +
                '" WHERE (`email`= "' +
                params.email +
                '");',
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  return callback("server-fail");
                } else {
                  return callback(results);
                }
              }
            );
          } else {
            return callback("pass-fail");
          }
        } else {
          return callback("pass-fail");
        }
      }
    }
  );
}
module.exports = { change_pass: change_pass };
