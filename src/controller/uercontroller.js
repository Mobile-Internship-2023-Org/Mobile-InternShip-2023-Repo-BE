const conection = require("../config/connecttion");

const getUser = (req, res) => {
  conection.execute("select * from nguoiDung", (err, result) => {
    if (err) throw err;
    res.send("ok");
  });
};

// const portLogIn = (req,res) => {
//   const username = req.params.username;
//   const password = req.params.password;
// }

module.exports = {
  getUser,
};
