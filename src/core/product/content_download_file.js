import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param id
 * @param {string} n
 * @param {string} fName
 */
export function download_file(req, res, id, n, fName) {
  if (!req || !res || !id || !n || !fName) {
    return res.status(200).json({ error: "Query fields is empty." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const directory = path.resolve(__dirname, "../../../storage");
  const file = path.resolve(directory, n, id, fName);

  if (fs.existsSync(file)) {
    delete req.headers['if-none-match'];
    delete req.headers['if-modified-since'];

    return res.download(file);
  } else {
    return res.status(400).json({ error: "File not found" });
  }
}

