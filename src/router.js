import express from "express";
import dotenv from "dotenv";
import { authMiddleware } from "./authMiddleware.js";
import { register } from "./core/account/register.js";
import { login } from "./core/account/login.js";
import { rpassword_verify } from "./core/verify/rpassword_verify.js";
import { email_verify } from "./core/verify/email_verify.js";
import { password_reset } from "./core/account/password_reset.js";
import { confFetch } from "./core/product/confFetch.js";
import { updateConf } from "./core/product/updateConf.js";
import { create_account_directory } from "./core/account/create_account_directory.js";
import { noticeboard_config_fetch_1, noticeboard_config_fetch_2, noticeboard_config_fetch_3, noticeboard_config_fetch_4 } from "./core/product/noticeboardConfFetch.js";
import { fetch_id_from_url_4, fetch_id_from_url_3, fetch_id_from_url_2, fetch_id_from_url_1, fetch_url_from_id_1 } from "./core/product/fetch_id_from_url.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { noticeboard_fetch_4, noticeboard_fetch_3, noticeboard_fetch_2, noticeboard_fetch_1 } from "./core/product/noticeboard_fetch.js";
import { fetch_file_1, fetch_file_2, fetch_file_3, fetch_file_4 } from "./core/product/noticeboard_fetch_file.js";
import { content_fetch_4, content_fetch_3, content_fetch_2, content_fetch_1 } from "./core/product/content_fetch.js";
import { return_file } from "./core/product/content_view_file.js";
import { delete_file } from "./core/product/content_delete_file.js";
import { download_file } from "./core/product/content_download_file.js";

dotenv.config();

/**
   * @param {express.Express} app
   */
export default function router(app) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const storage_1 = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = req.query.i || 'null';
      const uploadPath = path.join(__dirname, `../storage/n1/${folder}`);

      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const folder = req.query.i;
      const count = fs.readdirSync(path.resolve(__dirname, `../storage/n1/${folder}`));


      let idx = 0;
      count.forEach((file) => {
        idx += 1;
      });
      idx += 1;

      const filename = `${idx}_${file.originalname}`;
      cb(null, filename);
    }
  });
  const storage_2 = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = req.query.i || 'null';
      const uploadPath = path.join(__dirname, `../storage/n2/${folder}`);

      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  const storage_3 = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = req.query.i || 'null';
      const uploadPath = path.join(__dirname, `../storage/n3/${folder}`);

      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  const storage_4 = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = req.query.i || 'null';
      const uploadPath = path.join(__dirname, `../storage/n4/${folder}`);

      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const upload_1 = multer({ storage: storage_1 });
  const upload_2 = multer({ storage: storage_2 });
  const upload_3 = multer({ storage: storage_3 });
  const upload_4 = multer({ storage: storage_4 });

  // Register.js
  app.post('/api/auth/register', async (req, res) => {
    register(req, res);
  });
  app.post('/api/auth/email/verify', async (req, res) => {
    email_verify(req, res);
  });
  app.post('/api/account/mkdir', async (req, res) => {
    create_account_directory(req, res);
  })

  // Login.js
  app.post('/api/auth/login', async (req, res) => {
    login(req, res);
  });
  app.post('/api/auth/password/reset', async (req, res) => {
    password_reset(req, res);
  });
  app.post('/api/auth/password/reset/verify', async (req, res) => {
    rpassword_verify(req, res);
  });

  // Content.js
  app.get('/api/auth/me', authMiddleware, (req, res) => {
    const id = req.user.id;
    return res.status(200).json({ ok: id });
  });
  app.post('/api/noticeboard/id/url/fetch', (req, res) => {
    fetch_url_from_id_1(req, res);
  });
  app.post('/api/content/file_1', (req, res) => {
    content_fetch_1(req, res);
  });
  app.post('/api/content/file_2', (req, res) => {
    content_fetch_2(req, res);
  });
  app.post('/api/content/file_3', (req, res) => {
    content_fetch_3(req, res);
  });
  app.post('/api/content/file_4', (req, res) => {
    content_fetch_4(req, res);
  });
  app.post('/api/content/delete', (req, res) => {
    const { id_string, n, fName } = req.body;

    delete_file(req, res, id_string, n, fName);
  });
  app.post('/api/content/view', (req, res) => {
    const { i, n, f } = req.query;

    return_file(req, res, i, n, f);
  });
  app.get('/api/content/download', (req, res) => {
    const { i, n, f } = req.query;

    download_file(req, res, i, n, f);
  });
  app.post('/api/content/upload_1', upload_1.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");
    return res.status(200).send("File uploaded successfully.");
  });
  app.post('/api/content/upload_2', upload_2.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");
    return res.status(200).send("File uploaded successfully.");
  });
  app.post('/api/content/upload_3', upload_3.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");
    return res.status(200).send("File uploaded successfully.");
  });
  app.post('/api/content/upload_4', upload_4.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");
    return res.status(200).send("File uploaded successfully.");
  });

  // Conf.js
  app.post('/api/noticeboard/config', (req, res) => {
    confFetch(req, res);
  });
  app.post('/api/noticeboard/config/update', (req, res) => {
    updateConf(req, res);
  });

  // Noticeboard.js
  app.post('/api/noticeboard/config/fetch_1', (req, res) => {
    noticeboard_config_fetch_1(req, res);
  });
  app.post('/api/noticeboard/config/fetch_2', (req, res) => {
    noticeboard_config_fetch_2(req, res);
  });
  app.post('/api/noticeboard/config/fetch_3', (req, res) => {
    noticeboard_config_fetch_3(req, res);
  });
  app.post('/api/noticeboard/config/fetch_4', (req, res) => {
    noticeboard_config_fetch_4(req, res);
  });
  app.post('/api/noticeboard/id/from-url', (req, res) => {
    fetch_id_from_url_1(req, res);
  });
  app.post('/api/noticeboard/id/from-url_2', (req, res) => {
    fetch_id_from_url_2(req, res);
  });
  app.post('/api/noticeboard/id/from-url_3', (req, res) => {
    fetch_id_from_url_3(req, res);
  });
  app.post('/api/noticeboard/id/from-url_4', (req, res) => {
    fetch_id_from_url_4(req, res);
  });
  app.post('/api/noticeboard/fetch_1', (req, res) => {
    noticeboard_fetch_1(req, res);
  });
  app.post('/api/noticeboard/fetch_2', (req, res) => {
    noticeboard_fetch_2(req, res);
  });
  app.post('/api/noticeboard/fetch_3', (req, res) => {
    noticeboard_fetch_3(req, res);
  });
  app.post('/api/noticeboard/fetch_4', (req, res) => {
    noticeboard_fetch_4(req, res);
  });
  app.post('/api/noticeboard/fetchfile_1', (req, res) => {
    fetch_file_1(req, res);
  });
  app.post('/api/noticeboard/fetchfile_2', (req, res) => {
    fetch_file_2(req, res);
  });
  app.post('/api/noticeboard/fetchfile_3', (req, res) => {
    fetch_file_3(req, res);
  });
  app.post('/api/noticeboard/fetchfile_4', (req, res) => {
    fetch_file_4(req, res);
  });
}
