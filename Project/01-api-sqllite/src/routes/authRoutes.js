import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// register a new user at /auth/register
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  //   the username and password is saved as an irreversible password
  const hashedPassword = bcrypt.hashSync(password, 8);

  //   using try and catch box to insert the user and create a default todo-task
  try {
    const insertUser = db.prepare(`INSERT INTO users (username, password)
        VALUES (?, ?)`);
    const result = insertUser.run(username, hashedPassword);

    // Give a default todo to the new user
    const defaultTodo = `Hello :) Add your first todo!`;
    const insertTodo = db.prepare(
      `INSERT INTO todo (user_id, task) VALUES (?, ?)`
    );

    // you can get the user_id from the result after insertUser has been run
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // create a token (key)
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.json({
      token: token,
      id: result.lastInsertRowid,
      username: username,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(501);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  try {
    // get user
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username);

    // If user is not found
    if (!user) {
      return res
        .status(404)
        .send({ message: `No username : ${username} found` });
    }
    console.log(`Username : ${user.username} found`);

    // if password is invalid
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .send({ message: `Password for ${user} is invalid ` });
    }
    console.log("Password authenticated");
    console.log(user);

    // if user and password match. Generate a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(501);
  }
});
export default router;
