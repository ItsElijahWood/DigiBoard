import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export function fetch_file_1(req, res) {
  const { file, id } = req.body;

  if (!file || !id) {
    return res.status(400).json({ error: "Required field not found in params." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const file_path = path.resolve(__dirname, `../../../storage/n1/${id}/${file}`);

  if (!fs.existsSync(file_path)) {
    return res.status(404).json({ error: `File not found.` });
  }

  return res.sendFile(file_path);
}

export function fetch_file_2(req, res) {
  const { file, id } = req.body;

  if (!file || !id) {
    return res.status(400).json({ error: "Required field not found in params." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const file_path = path.resolve(__dirname, `../../../storage/n2/${id}/${file}`);

  if (!fs.existsSync(file_path)) {
    return res.status(404).json({ error: `File not found.` });
  }

  return res.sendFile(file_path);
}

export function fetch_file_3(req, res) {
  const { file, id } = req.body;

  if (!file || !id) {
    return res.status(400).json({ error: "Required field not found in params." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const file_path = path.resolve(__dirname, `../../../storage/n3/${id}/${file}`);

  if (!fs.existsSync(file_path)) {
    return res.status(404).json({ error: `File not found.` });
  }

  return res.sendFile(file_path);
}

export function fetch_file_4(req, res) {
  const { file, id } = req.body;

  if (!file || !id) {
    return res.status(400).json({ error: "Required field not found in params." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const file_path = path.resolve(__dirname, `../../../storage/n4/${id}/${file}`);

  if (!fs.existsSync(file_path)) {
    return res.status(404).json({ error: `File not found.` });
  }

  return res.sendFile(file_path);
}
