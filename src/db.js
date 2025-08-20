import { open } from "sqlite";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

function getEnv(name) {
  const env = process.env[name];

  if (env === undefined) {
    throw new Error(`Invalid env: ${name}`);
  }

  return env;
}

export async function confDb() {
  const conn = await connDatabase();

  conn.exec(`CREATE TABLE IF NOT EXISTS 'users' (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    password VARCHAR NOT NULL,
    n1 VARCHAR UNIQUE NOT NULL,
    n2 VARCHAR UNIQUE NOT NULL,
    n3 VARCHAR UNIQUE NOT NULL,
    n4 VARCHAR UNIQUE NOT NULL
  )`)

  // n = noticeboard
  // t = title
  // bc = background colour
  // bt = button toggle true / false
  conn.exec(`CREATE TABLE IF NOT EXISTS 'config' (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    n1t1 VARCHAR NOT NULL,
    n1bc VARCHAR NOT NULL,
    n1bt VARCHAR NOT NULL,
    n1tc VARCHAR NOT NULL,
    n2t2 VARCHAR NOT NULL,
    n2bc VARCHAR NOT NULL,
    n2bt VARCHAR NOT NULL,
    n2tc VARCHAR NOT NULL,
    n3t3 VARCHAR NOT NULL,
    n3bc VARCHAR NOT NULL,
    n3bt VARCHAR NOT NULL,
    n3tc VARCHAR NOT NULL,
    n4t4 VARCHAR NOT NULL,
    n4bc VARCHAR NOT NULL,
    n4bt VARCHAR NOT NULL,
    n4tc VARCHAR NOT NULL
  )`)

  const n1 = "example1";
  const n2 = "example2";
  const n3 = "example3";
  const n4 = "example4";

  const hash_pass = await bcrypt.hash(getEnv("ADMIN_ACCOUNT_PASSCODE"), 10);
  const email = getEnv("ADMIN_ACCOUNT_EMAIL");
  const exists = await conn.get("SELECT * from users WHERE email = ?", [email]);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (!fs.existsSync(path.resolve(__dirname, "../storage/n1/1"))) {
    const filePaths = [
      path.resolve(__dirname, "../storage/n1/1"), 
      path.resolve(__dirname, "../storage/n2/1"), 
      path.resolve(__dirname, "../storage/n3/1"), 
      path.resolve(__dirname, "../storage/n4/1")
    ];

    for (let i = 0; i < filePaths.length; i++) {
      fs.mkdirSync(filePaths[i], { recursive: true });
    }
  }

  if (!exists) {
    await conn.run("INSERT INTO users (name, email, password, n1, n2, n3, n4) VALUES (?, ?, ?, ?, ?, ?, ?)", ["admin", email, hash_pass, n1, n2, n3, n4]);
  }

  const existsConf = await conn.get("SELECT * from config LIMIT 1");

  if (!existsConf) {
    await conn.run("INSERT INTO config (n1t1, n1bc, n1bt, n1tc, n2t2, n2bc, n2bt, n2tc, n3t3, n3bc, n3bt, n3tc, n4t4, n4bc, n4bt, n4tc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ["Example Noticeboard", "#ffffff", "true", "#000000", "Noticeboard 2", "#ffffff", "false", "#000000", "Noticeboard 3", "#ffffff", "false", "#000000", "Noticeboard 4", "#ffffff", "false", "#000000"]);
  }


  // Copy all exmaple images into the example noticeboards
  if (fs.existsSync(path.resolve(__dirname, "../storage/n1/1"))) {
    const files = fs.readdirSync(path.resolve(__dirname, "../storage/n1/1"));

    if (files.length <= 0) {
     const temp_files = fs.readdirSync(path.resolve(__dirname, "./temp"));

     temp_files.forEach((file) => {
      fs.copyFileSync(path.resolve(__dirname, `./temp/${file}`), path.resolve(__dirname, `../storage/n1/1/${file}`));
     });
    };
  }

  conn.exec(`CREATE TABLE IF NOT EXISTS 'temp_signup' (
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    code VARCHAR NOT NULL
  )`)

  conn.exec(`CREATE TABLE IF NOT EXISTS 'temp_password' (
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    code VARCHAR NOT NULL
  )`)

  console.log("Started database.");
}

/**
 * Returns database connection
 */
export async function connDatabase() {
  const db = await open({
    filename: './db/digiboard.db',
    driver: sqlite3.Database
  });

  return db;
}
