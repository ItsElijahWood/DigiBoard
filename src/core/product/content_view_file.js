import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param id
 * @param {string} n
 * @param {string} fName
 */
export function return_file(req, res, id, n, fName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (!req || !res || !id || !n || !fName) {
    return res.status(400).json({ error: "Required querys missing." });
  }

  switch (n) {
    case "n1":
      const directory = path.resolve(__dirname, "../../../storage");
      const file_directory = path.resolve(directory, n, id, fName);

      if (!file_directory.startsWith(directory)) {
        return res.status(403).json({ error: "Access denied." });
      }

      if (fs.existsSync(file_directory)) {
        res.sendFile(file_directory);
      } else {
        res.status(400).json({ error: "File not found." });
      }

      break;
    case "n2":
      const directory_2 = path.resolve(__dirname, "../../../storage");
      const file_directory_2 = path.resolve(directory_2, n, id, fName);

      if (!file_directory_2.startsWith(directory_2)) {
        return res.status(403).json({ error: "Access denied." });
      }

      if (fs.existsSync(file_directory_2)) {
        res.sendFile(file_directory_2);
      } else {
        res.status(400).json({ error: "File not found." });
      }
      break;
    case "n3":
      const directory_3 = path.resolve(__dirname, "../../../storage");
      const file_directory_3 = path.resolve(directory_3, n, id, fName);

      if (!file_directory_3.startsWith(directory_3)) {
        return res.status(403).json({ error: "Access denied." });
      }

      if (fs.existsSync(file_directory_3)) {
        res.sendFile(file_directory_3);
      } else {
        res.status(400).json({ error: "File not found." });
      }

      break;
    case "n4":
      const directory_4 = path.resolve(__dirname, "../../../storage");
      const file_directory_4 = path.resolve(directory_4, n, id, fName);

      if (!file_directory_4.startsWith(directory_4)) {
        return res.status(403).json({ error: "Access denied." });
      }

      if (fs.existsSync(file_directory_4)) {
        res.sendFile(file_directory_4);
      } else {
        res.status(400).json({ error: "File not found." });
      }

      break;
    default:
      return res.status(400).json({ error: "&n not a valid value" });
  }
}

