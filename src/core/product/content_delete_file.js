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
export function delete_file(req, res, id, n, fName) {
  if (!req || !res || !id || !n || !fName) {
    return res.status(400).json({ error: "Missing body fields." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  switch (n) {
    case "n1":
      const directory = path.resolve(__dirname, "../../../storage");
      const file = path.resolve(directory, n, id, fName);

      if (!file.startsWith(directory)) {
        return res.status(400).json({ error: "Access Denied." });
      }

      if (fs.existsSync(file)) {
        fs.rm(file, (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }

          return res.status(200).json({ ok: "Deleted file successfully." });
        });
      }

      break;

    case "n2":
      const directory_2 = path.resolve(__dirname, "../../../storage");
      const file_2 = path.resolve(directory_2, n, id, fName);

      if (!file_2.startsWith(directory_2)) {
        return res.status(400).json({ error: "Access Denied." });
      }

      if (fs.existsSync(file_2)) {
        fs.rm(file_2, (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }

          return res.status(200).json({ ok: "Deleted file successfully." });
        });
      }

      break;

    case "n3":
      const directory_3 = path.resolve(__dirname, "../../../storage");
      const file_3 = path.resolve(directory_3, n, id, fName);

      if (!file_3.startsWith(directory_3)) {
        return res.status(400).json({ error: "Access Denied." });
      }

      if (fs.existsSync(file_3)) {
        fs.rm(file_3, (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }

          return res.status(200).json({ ok: "Deleted file successfully." });
        });
      }

      break;

    case "n4":
      const directory_4 = path.resolve(__dirname, "../../../storage");
      const file_4 = path.resolve(directory_4, n, id, fName);

      if (!file_4.startsWith(directory_4)) {
        return res.status(400).json({ error: "Access Denied." });
      }

      if (fs.existsSync(file_4)) {
        fs.rm(file_4, (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }

          return res.status(200).json({ ok: "Deleted file successfully." });
        });
      }

      break;

    default:
      return res.status(400).json({ error: "N body invalid." });
      break;
  }
}
