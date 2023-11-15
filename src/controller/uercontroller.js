const conection = require("../config/connecttion");

const getUser = (req, res) => {
  conection.execute("select * from nguoiDung", (err, result) => {
    if (err) throw err;
    res.send("ok");
  });
};

module.exports = {
  getUser,
};
