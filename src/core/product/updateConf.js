import express from "express";
import { connDatabase } from "../../db.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function updateConf(req, res) {
  const { id, Title1, BColour1, NBT1, TC1, Title2, BColour2, NBT2, TC2, Title3, BColour3, NBT3, TC3, Title4, BColour4, NBT4, TC4 } = req.body;

  if (!Title1 && !BColour1 && !NBT1 && !TC1 && !Title2 && !BColour2 && !NBT2 && !TC2 && !Title3 && !BColour3 && !NBT3 && !TC3 && !Title4 && !BColour4 && !NBT4 && !TC4) {
    return res.status(400).json({ error: "Nothing to change." });
  } 

  const conn = await connDatabase();
  const stmt = await conn.prepare("UPDATE 'config' SET n1t1 = ?, n1bc = ?, n1bt = ?, n1tc = ?, n2t2 = ?, n2bc = ?, n2bt = ?, n2tc = ?, n3t3 = ?, n3bc = ?, n3bt = ?, n3tc = ?, n4t4 = ?, n4bc = ?, n4bt = ?, n4tc = ? WHERE id = ?");
  const row = await stmt.run([ Title1, BColour1, NBT1, TC1, Title2, BColour2, NBT2, TC2, Title3, BColour3, NBT3, TC3, Title4, BColour4, NBT4, TC4, id ]);

  if (row.changes === 0) {
    return res.status(404).json({ error: "ID not found in database." });
  }

  stmt.finalize();
  conn.close();

  return res.status(200).json({ ok: "Updated." });
}
