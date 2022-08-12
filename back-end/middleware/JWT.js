const JWT_SECRET = "congphi";
const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   console.log("req verify", req.body);
//   try {
//     const token = req.body.token;
//     if (!token) {
//       throw new Error("Authentication failed!");
//     }
//     const decodeToken = jwt.verify(token, JWT_SECRET);
//     console.log("decodeToken.email", decodeToken.email);
//     next();
//   } catch (err) {
//     console.log("error when decode");
//     const error = { message: "Authentication failed!", code: 401 };
//     return next(error);
//   }
// };

module.exports = (token) => {
  try {
    if (!token) {
      throw new Error("Authentication failed!");
    }
    
  } catch (err) {
    console.log("error when decode");
    const error = { message: "Authentication failed!", code: 401 };
    return "";
  }
};
