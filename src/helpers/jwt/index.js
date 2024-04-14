import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/index.js";

const { sign, verify } = jwt;

const generateToken = (payload) => {
  return sign(payload, SECRET_KEY);
};

const verifyToken = (token) => {
  return verify(token, SECRET_KEY);
};

export default { generateToken, verifyToken };
