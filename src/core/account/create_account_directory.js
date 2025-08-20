import express from "express";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export function create_account_directory(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID was not found." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const storage = path.resolve(__dirname, '../../../storage');

  const file_1 = path.resolve(__dirname, `../../../storage/n1/${id}`);
  const file_2 = path.resolve(__dirname, `../../../storage/n2/${id}`);
  const file_3 = path.resolve(__dirname, `../../../storage/n3/${id}`);
  const file_4 = path.resolve(__dirname, `../../../storage/n4/${id}`);

  if (!fs.existsSync(storage)) {
    fs.mkdirSync(storage, { recursive: true });
  }

  if (!fs.existsSync(file_1)) {
    fs.mkdirSync(file_1, { recursive: true });
  }
  if (!fs.existsSync(file_2)) {
    fs.mkdirSync(file_2, { recursive: true });
  }
  if (!fs.existsSync(file_3)) {
    fs.mkdirSync(file_3, { recursive: true });
  }
  if (!fs.existsSync(file_4)) {
    fs.mkdirSync(file_4, { recursive: true });
  }

  return res.status(200).json({ ok: "Created account directory successfully." });
}
