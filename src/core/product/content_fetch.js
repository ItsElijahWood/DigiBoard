import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function content_fetch_1(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "No ID found." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const n1_files = fs.readdirSync(path.resolve(__dirname, `../../../storage/n1/${id}`));

  if (!n1_files) {
    return res.status(500).json({ error: "Cannot find path to storage noticeboards." });
  }

  const files = [];
  n1_files.forEach((file) => {
    const file_path = path.resolve(__dirname, `../../../storage/n1/${id}/${file}`);

    if (fs.existsSync(file_path)) {
      files.push(file);
    }
  });

  res.status(200).json({ files_array: files });
}

export async function content_fetch_2(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "No ID found." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const n2_files = fs.readdirSync(path.resolve(__dirname, `../../../storage/n2/${id}`));

  if (!n2_files) {
    return res.status(500).json({ error: "Cannot find path to storage noticeboards." });
  }

  const files = [];
  n2_files.forEach((file) => {
    const file_path = path.resolve(__dirname, `../../../storage/n2/${id}/${file}`);

    if (fs.existsSync(file_path)) {
      files.push(file);
    }
  });

  res.status(200).json({ files_array: files });
}

export async function content_fetch_3(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "No ID found." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const n3_files = fs.readdirSync(path.resolve(__dirname, `../../../storage/n3/${id}`));

  if (!n3_files) {
    return res.status(500).json({ error: "Cannot find path to storage noticeboards." });
  }

  const files = [];
  n3_files.forEach((file) => {
    const file_path = path.resolve(__dirname, `../../../storage/n3/${id}/${file}`);

    if (fs.existsSync(file_path)) {
      files.push(file);
    }
  });

  res.status(200).json({ files_array: files });
}

export async function content_fetch_4(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "No ID found." });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const n4_files = fs.readdirSync(path.resolve(__dirname, `../../../storage/n4/${id}`));

  if (!n4_files) {
    return res.status(500).json({ error: "Cannot find path to storage noticeboards." });
  }

  const files = [];
  n4_files.forEach((file) => {
    const file_path = path.resolve(__dirname, `../../../storage/n4/${id}/${file}`);

    if (fs.existsSync(file_path)) {
      files.push(file);
    }
  });

  res.status(200).json({ files_array: files });
}
