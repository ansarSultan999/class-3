
import jwt from "jsonwebtoken";

class JwtService {
  static sign(
    payload,
    expiry = "1h",
    secret = process.env.JWT_SECRET
  ) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
}
export default JwtService;
