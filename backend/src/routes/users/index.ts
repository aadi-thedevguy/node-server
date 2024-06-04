import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as bcrypt from "bcryptjs";
import { signupValidator, loginValidator } from "../../validators/user";
import { User } from "../../models/user.model";
import helpers from "../../utils/helper";
const router = new Hono();

// router.post('/', (c) => c.json('create an author', 201))
// router.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

router.post("/signup", zValidator("json", signupValidator), async (c) => {
  const body = c.req.valid("json");

  const { name, email, password } = body;
  try {
    // check if user exists
    const userExits = await User.findOne({ email });

    if (userExits) {
      return c.json({ error: "User Already Exits" }, 400);
    }
    // Hash Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return c.json(
        {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: await helpers.generateToken(user._id),
        },
        201
      );
    } else {
      return c.json({ error: "Invalid Credentials" }, 401);
    }
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

router.post("/login", zValidator("json", loginValidator), async (c) => {
  const body = c.req.valid("json");
  const { email, password } = body;

  try {
    const user = await User.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return c.json(
        {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: await helpers.generateToken(user._id),
        },
        201
      );
    } else {
      return c.json({ error: "Invalid Credentials" }, 400);
    }
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default router;
