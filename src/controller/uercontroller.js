const conection = require("../config/connecttion");

const getUser = (req, res) => {
  conection.execute("select * from nguoiDung", (err, result) => {
    if (err) throw err;
    res.send("ok");
  });
};


const getUserByEmail = (req, res) => {
  const email = req.params.email;
  conection.execute(
    "select * from nguoiDung where email = ?",
    [email],
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result[0]);
    }
  );
};


module.exports = {
  getUser,
  getUserByEmail,
};
