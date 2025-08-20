import { connDatabase } from "../../db.js";
import express from "express";
import crypto from "crypto";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function email_verify(req, res) {
  const { code, email } = req.body;

  const conn = await connDatabase();
  const stmt = await conn.prepare("SELECT * FROM temp_signup WHERE email = ?");

  const row = await stmt.get([email.trim()]);

  if (!row) {
    return res.status(400).json({ error: "No verification request found for this email." });
  }

  if (code.trim() === row.code) {
    await conn.run("DELETE FROM temp_signup WHERE email = ?", [email.trim()]);

    // Generates a random number till it can't find one in database
    async function generateRandomNumber(conn) {
      while (true) {
        const num = crypto.randomInt(0, 1_000_000_000_000).toString().padStart(12, '0');
        const exists = await conn.get(`
          SELECT 1 from users WHERE n1 = ? OR n2 = ? OR n3 = ? OR n4 = ? LIMIT 1
        `, num, num, num, num);

        if (!exists) return num;
      }
    }

    const n1 = await generateRandomNumber(conn);
    const n2 = await generateRandomNumber(conn);
    const n3 = await generateRandomNumber(conn);
    const n4 = await generateRandomNumber(conn);

    await conn.run("INSERT INTO users (name, email, password, n1, n2, n3, n4) VALUES (?, ?, ?, ?, ?, ?, ?)", [row.name, row.email, row.password, n1, n2, n3, n4]);

    await conn.run("INSERT INTO config (n1t1, n1bc, n1bt, n1tc, n2t2, n2bc, n2bt, n2tc, n3t3, n3bc, n3bt, n3tc, n4t4, n4bc, n4bt, n4tc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ["Noticeboard 1", "#ffffff", "true", "#000000", "Noticeboard 2", "#ffffff", "false", "#000000", "Noticeboard 3", "#ffffff", "false", "#000000", "Noticeboard 4", "#ffffff", "false", "#000000"]);

    const stmt2 = await conn.prepare("SELECT id FROM users WHERE email = ?");
    const result = await stmt2.get([email.trim()]);

    stmt.finalize();
    stmt2.finalize();

    return res.status(200).json({ ok: "Account created successfully.", id: result.id });
  } else {
    await conn.run("DELETE FROM temp_signup WHERE email = ?", [email.trim()]);

    return res.status(401).json({ error: "Code does not match." });
  }
}
