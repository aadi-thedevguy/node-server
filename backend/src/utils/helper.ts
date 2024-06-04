import { Types } from "mongoose";
import { sign } from "hono/jwt";

const helpers = {
  generateToken: async (id: Types.ObjectId) => {
    return await sign({ id }, process.env.JWT_SECRET as string);
  },
};

export default helpers;
