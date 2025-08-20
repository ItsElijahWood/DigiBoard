import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

/**
 * 
 * @param {express.Request} req
 * @param {express.Response} res 
 */
export function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token not found." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token." });
  }
}
