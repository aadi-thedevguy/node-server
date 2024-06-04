import app from "./app";
import { Env } from "./src/utils/env";

const server = Bun.serve({
  port: Env.PORT,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

console.log("server running", server.port);
