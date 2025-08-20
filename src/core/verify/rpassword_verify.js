import express from "express";
import { connDatabase } from "../../db.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function rpassword_verify(req, res) {
  const { code, email } = req.body;

  const conn = await connDatabase();
  const stmt = await conn.prepare("SELECT * FROM temp_password WHERE email = ?");
  const row = await stmt.get([ email.trim() ]);

  if (!row) {
    return res.status(400).json({ error: "No verification request found for this email." });
  }

  if (code.trim() === row.code) {
    await conn.run("DELETE FROM temp_password WHERE email = ?", [email.trim()]);
    await conn.run("UPDATE users SET password = ? WHERE email = ?", [row.password, email.trim()])

    stmt.finalize();

    return res.status(200).json({ ok: "Account password reset successfully." });
  } else {
    await conn.run("DELETE FROM temp_password WHERE email = ?", [email.trim()]);

    stmt.finalize();
    
    return res.status(401).json({ error: "Code does not match." });
  }
}
