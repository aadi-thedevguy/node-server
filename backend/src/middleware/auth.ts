import type { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { User } from "../models/user.model";
import { Env } from "../utils/env";

export const protect = async (c: Context, next: Next) => {
  let token: string | undefined;
  const header = c.req?.header("Authorization");
  if (header && header.startsWith("Bearer")) {
    try {
      // get token from header
      token = header.split(" ")[1];

      // check if token exists
      if (!token || token.length < 500) {
        c.json("Not Authorized, No Token Available", 401);
      }
      // verify token
      const decoded = await verify(token!!, Env.JWT_SECRET);
      // Get the user ID from the token payload
      let user = await User.findById(decoded?.id).select("-password");

      if (!user) {
        return c.json("No user Found", 404);
      }

      if (user) c.set("user", user);
      // if (user) c.set("user", user)
      await next();
    } catch (err) {
      // console.log(err);
      if (err instanceof Error && err.name === "JwtTokenExpired") {
        return c.json("Token has expired", 401);
      }
      if (err instanceof Error && err.name === "JwtTokenInvalid") {
        return c.json("Token is Invalid", 401);
      }
      c.json("Internal Server Error", 500);
    }
  }
};
