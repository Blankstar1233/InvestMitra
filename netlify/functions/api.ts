import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ensureSchema, isDbConfigured } from "../../server/db";
import { handleDemo } from "../../server/routes/demo";
import { login, register, me, logout } from "../../server/routes/auth";
import { getPortfolio, placeOrder, getOrders, resetPortfolio, requireUser } from "../../server/routes/trading";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ type: "*/*" }));
app.use(express.urlencoded({ extended: true }));
app.use((req, _res, next) => {
  const anyReq: any = req as any;
  if (Buffer.isBuffer(anyReq.body)) {
    try { anyReq.body = JSON.parse(anyReq.body.toString("utf8") || "{}"); } catch { anyReq.body = {}; }
  } else if (typeof anyReq.body === "string") {
    try { anyReq.body = JSON.parse(anyReq.body || "{}"); } catch { anyReq.body = {}; }
  }
  next();
});
app.use(cookieParser());

let schemaReady: Promise<void> | null = null;
async function ensureSchemaOnce() {
  if (!schemaReady) schemaReady = ensureSchema().catch((e) => { schemaReady = null; throw e; });
  return schemaReady;
}

app.use(async (_req, _res, next) => {
  try {
    if (isDbConfigured()) await ensureSchemaOnce();
  } catch (e: any) {
    console.error("Schema init failed:", e?.message || e);
  }
  next();
});

const api = express.Router();

api.get("/ping", (_req, res) => {
  const ping = process.env.PING_MESSAGE ?? "ping";
  res.json({ message: ping });
});

api.post("/echo", (req, res) => {
  res.json({ ok: true, headers: req.headers, body: (req as any).body ?? null });
});

api.get("/health", (_req, res) => {
  res.json({
    ok: true,
    config: {
      jwtConfigured: Boolean(process.env.JWT_SECRET),
      dbConfigured: Boolean(process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.NETLIFY_DATABASE_URL || process.env.NETLIFY_DATABASE_URL_UNPOOLED || process.env.POSTGRES_URL || process.env.PG_CONNECTION_STRING),
    },
  });
});

api.get("/demo", handleDemo);

api.post("/auth/register", register);
api.post("/auth/login", login);
api.get("/auth/me", me);
api.post("/auth/logout", logout);

api.get("/portfolio", requireUser, getPortfolio);
api.post("/orders", requireUser, placeOrder);
api.get("/orders", requireUser, getOrders);
api.post("/portfolio/reset", requireUser, resetPortfolio);

app.use("/api", api);
app.use("/.netlify/functions/api", api);

export const handler = serverless(app);
