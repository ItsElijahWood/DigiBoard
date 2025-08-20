import express from "express";
import { connDatabase } from "../../db.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function fetch_url_from_id_1(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is missing." });
  }

  const conn = await connDatabase();

  const stmt = await conn.prepare("SELECT n1 FROM users WHERE id = ?");
  const stmt_2 = await conn.prepare("SELECT n2 FROM users WHERE id = ?");
  const stmt_3 = await conn.prepare("SELECT n3 FROM users WHERE id = ?");
  const stmt_4 = await conn.prepare("SELECT n4 FROM users WHERE id = ?");
  const result = await stmt.get([ id ]);
  const result_2 = await stmt_2.get([ id ]);
  const result_3 = await stmt_3.get([ id ]);
  const result_4 = await stmt_4.get([ id ]);

  if (!result || !result_2 || !result_3 || !result_4) {
    return res.status(401).json({ error: "URL unathorized."});
  }

  stmt.finalize();
  stmt_2.finalize();
  stmt_3.finalize();
  stmt_4.finalize();
  conn.close();

  return res.status(200).json({ n1: result, n2: result_2, n3: result_3, n4: result_4 });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function fetch_id_from_url_1(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL missing." });
  }

  const conn = await connDatabase();

  const stmt = await conn.prepare("SELECT id FROM users WHERE n1 = ?");
  const result = await stmt.get([ url ]);

  if (!result) {
    return res.status(401).json({ error: "URL unathorized."});
  } 

  stmt.finalize();
  conn.close();

  return res.status(200).json({ ok: result.id });
}

export async function fetch_id_from_url_2(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL missing." });
  }

  const conn = await connDatabase();

  const stmt = await conn.prepare("SELECT id FROM users WHERE n2 = ?");
  const result = await stmt.get([ url ]);

  if (!result) {
    return res.status(401).json({ error: "URL unathorized."});
  } 

  stmt.finalize();
  conn.close();

  return res.status(200).json({ ok: result.id });
}

export async function fetch_id_from_url_3(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL missing." });
  }

  const conn = await connDatabase();

  const stmt = await conn.prepare("SELECT id FROM users WHERE n3 = ?");
  const result = await stmt.get([ url ]);

  if (!result) {
    return res.status(401).json({ error: "URL unathorized."});
  } 

  stmt.finalize();
  conn.close();

  return res.status(200).json({ ok: result.id });
}

export async function fetch_id_from_url_4(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL missing." });
  }

  const conn = await connDatabase();

  const stmt = await conn.prepare("SELECT id FROM users WHERE n4 = ?");
  const result = await stmt.get([ url ]);

  if (!result) {
    return res.status(401).json({ error: "URL unathorized."});
  } 

  stmt.finalize();
  conn.close();

  return res.status(200).json({ ok: result.id });
}
