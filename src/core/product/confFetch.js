import express from "express";
import { connDatabase } from "../../db.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function confFetch(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is empty." });
  }

  const conn = await connDatabase();
  const stmt = await conn.prepare("SELECT * FROM `config` WHERE id = ?");
  const row = await stmt.get([ id ]);

  if (!row) {
    return res.status(401).json({ error: "Unathorized." });
  }

  stmt.finalize();
  conn.close();

  return res.status(200).json({ id: id, n1t1: row.n1t1, n1bc: row.n1bc, n1bt: row.n1bt, n1tc: row.n1tc, n2t2: row.n2t2, n2bc: row.n2bc, n2bt: row.n2bt, n2tc: row.n2tc, n3t3: row.n3t3, n3bc: row.n3bc, n3bt: row.n3bt, n3tc: row.n3tc, n4t4: row.n4t4, n4bc: row.n4bc, n4bt: row.n4bt, n4tc: row.n4tc, });
}
