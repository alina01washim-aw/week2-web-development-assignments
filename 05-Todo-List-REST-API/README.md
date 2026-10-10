# To-Do List REST API

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` (in PowerShell, run `Copy-Item .env.example .env`).
3. In `.env`, set `MONGO_URI` to the connection string from MongoDB Atlas. Replace the username, password, and cluster host placeholders. Use a **database user**'s credentials, and URL-encode special characters in the password.
4. In MongoDB Atlas, add your current public IP address under **Network Access**. Do not use `0.0.0.0/0` for a permanent allowlist entry.
5. Start the API with `npm run dev`.

The server listens on `http://localhost:5000` by default. Set `PORT` in `.env` to use a different port. Check `http://localhost:5000/` to confirm the API is running.

If Node.js reports an `ECONNREFUSED` error while looking up the Atlas SRV record, set `MONGO_DNS_SERVERS` in `.env` to a comma-separated list of DNS resolver IPs that your network allows. Leave it unset when the system DNS resolver works.

The `.env` file contains credentials and should not be committed.
