import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import users from "./src/routes/users";
import tasks from "./src/routes/tasks";
import connectToDB from "./src/utils/db";

const app = new Hono();

await connectToDB();

app.use(logger());
app.use(prettyJSON());
app.use(secureHeaders());

const apiRoutes = app
  .basePath("/api")
  .route("/auth", users)
  .route("/tasks", tasks);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
