import jwt from "jsonwebtoken";
// User Authentication
const authUser = async (req, res, next) => {
  const token = req.headers.token;
  
  console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
  console.log("Received Token:", token);
  
  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized Access Login Again",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Middleware Problem ' + error.message });
  }
};

export default authUser;

