import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { connDatabase } from "../../db.js";

dotenv.config();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function login(req, res) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Please make sure all fields are filled." })
  }

  const conn = await connDatabase();
  const stmt = await conn.prepare("SELECT * FROM users WHERE email = ?");

  if (!stmt) {
    return res.status(400).json({ error: "Email is already in use." });
  }

  const rows = await stmt.get([ email.trim() ]);

  if (!rows || !await bcrypt.compare(password, rows.password)) {
    return res.status(401).json({ error: "Email or password is incorrect." });
  }

  stmt.finalize();
  
  const JWT_TOKEN = process.env.JWT_TOKEN;
  const token = jwt.sign({ id: rows.id, email: email }, JWT_TOKEN, { expiresIn: "30d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",   
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  conn.close();

  return res.status(200).json({ ok: "Successfully logged in." });
}
