import express from "express";
import dotenv from "dotenv";
import { connDatabase } from "../../db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

dotenv.config();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function password_reset(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Required fields empty." });
  }

  const conn = await connDatabase();

  const stmt = await conn.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!stmt) {
    return res.status(400).json({ error: "Email not found." });
  }

  const hashed_password = await bcrypt.hash(password, 10);
  const rng_code = crypto.randomInt(0, 1000000).toString().padStart(6, '0');

  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: "elijah.wood@elijahwood.co.uk",
      pass: process.env.EMAIL_PASS, 
    },
  });

  await transporter.sendMail({
    from: '"DigiBoard" <noreply@elijahwood.co.uk>',
    to: email,
    subject: "Password Reset",
    html:`
      <div>
        <p style="font-size: 25px;">DigiBoard Account Password Reset</p>
        <p style="font-size: 19px;">Hi there,</p>
        <p style="font-size: 19px;">You requested to reset your password for your <b>DigiBoard</b> account.</p>
        <p style="font-size: 19px;">Your verification code is:</p>
        <div style="background-color: darkgrey; color: white; padding: 15px; font-size: 30px; width: 100px; border-radius: 10px; display: flex; align-content: center; justify-content: center; text-align: center;">
          ${rng_code}
        </div>
        <p style="font-size: 19px;">If you did not request this, you can just ignore this message.</p>
        <p style="font-size: 19px;">- The DigiBoard Team</p>
      </div>
    `
  });

  await conn.run(`
    INSERT INTO temp_password (name, email, password, code) VALUES (?, ?, ?, ?)
  `, [stmt.name, email, hashed_password, rng_code])

  return res.status(200).json({ error: "Verification code sent to email." });
}
