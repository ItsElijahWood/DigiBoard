import express from "express";
import nodemailer from "nodemailer";
import { connDatabase } from "../../db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please make sure all fields are filled." });
  }
  
  const conn = await connDatabase();
  
  const stmt = await conn.get("SELECT * FROM users WHERE email = ?", [email]);
  if (stmt) {
    return res.status(400).json({ error: "Email is already in use." });
  }

  const hash_password = await bcrypt.hash(password, 10);
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
    subject: "Email Verification",
    html:`
      <div>
        <p style="font-size: 25px;">DigiBoard Email Authentication</p>
        <p style="font-size: 20px;">Hi there,</p>
        <p style="font-size: 20px;">Thanks you for signing up for <b>DigiBoard</b></p>
        <p style="font-size: 20px;">Your verification code is:</p>
        <div style="background-color: darkgrey; color: white; padding: 15px; font-size: 30px; width: 100px; border-radius: 10px; display: flex; align-content: center; justify-content: center; text-align: center;">
          ${rng_code}
        </div>
        <p style="font-size: 20px;">If you did not request this, you can just ignore this message.</p>
        <p style="font-size: 20px;">- The DigiBoard Team</p>
      </div>
    `
  });

  await conn.run(`
    INSERT INTO temp_signup (name, email, password, code) VALUES (?, ?, ?, ?)
  `, [name, email, hash_password, rng_code]);

  conn.close();

  return res.status(200).json({ ok: "Verification code sent to email." });
}
