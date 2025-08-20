import express from "express";
import { connDatabase } from "../../db.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function noticeboard_config_fetch_1(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID missing." });
  }

  const conn = await connDatabase();
  const stmt = await conn.prepare("SELECT n1bc, n1t1, n1tc, n1bt, n2bt, n3bt, n4bt, n2t2, n3t3, n4t4 FROM config WHERE id = ?");

  const result = await stmt.get([id]);

  stmt.finalize();
  conn.close();

  return res.status(200).json({ title: result.n1t1, bc: result.n1bc, tc: result.n1tc, bt: result.n1bt, bt2: result.n2bt, bt3: result.n3bt, bt4: result.n4bt, title2: result.n2t2, title3: result.n3t3, title4: result.n4t4 });
}

export async function noticeboard_config_fetch_2(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID missing." });
  }

  const conn = await connDatabase();
  const stmt = await conn.prepare("SELECT n2bc, n2t2, n2tc, n1t1, n3t3, n4t4, n1bt, n2bt, n3bt, n4bt FROM config WHERE id = ?");

  const result = await stmt.get([id]);

  stmt.finalize();
  conn.close();

  return res.status(200).json({ title: result.n1t1, bc: result.n2bc, tc: result.n2tc, title2: result.n2t2, title3: result.n3t3, title4: result.n4t4, bt: result.n1bt, bt2: result.n2bt, bt3: result.n3bt, bt4: result.n4bt });
}

export async function noticeboard_config_fetch_3(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID missing." });
  }

  const conn = await connDatabase();
  const stmt = await conn.prepare("SELECT n3bc, n3tc, n3t3, n1t1, n2t2, n4t4, n1bt, n2bt, n3bt, n4bt FROM config WHERE id = ?");

  const result = await stmt.get([id]);

  stmt.finalize();
  conn.close();

  return res.status(200).json({ title3: result.n3t3, title: result.n1t1, title2: result.n2t2, title4: result.n4t4, bc: result.n3bc, tc: result.n3tc, bt: result.n1bt, bt2: result.n2bt, bt4: result.n4bt, bt3: result.n3bt });
}

export async function noticeboard_config_fetch_4(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID missing." });
  }

  const conn = await connDatabase();
  const stmt = await conn.prepare("SELECT n4bc, n4t4, n4tc, n1bt, n2bt, n3bt, n4bt, n1t1, n2t2, n3t3 FROM config WHERE id = ?");

  const result = await stmt.get([id]);

  stmt.finalize();
  conn.close();

  return res.status(200).json({ title4: result.n4t4, bc: result.n4bc, tc: result.n4tc, bt4: result.n4bt, bt: result.n1bt, bt2: result.n2bt, bt3: result.n3bt, title: result.n1t1, title2: result.n2t2, title3: result.n3t3 });
}
