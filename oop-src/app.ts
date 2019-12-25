import * as express from "express";
import { userService } from "./libs/services";

export const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  res.json(await userService.getAllUsers());
});

app.post("/users", async (req, res) => {
  res.status(201).json(await userService.createUser(req.body));
});

app.delete("/users", async (req, res) => {
  throw new Error("omg you can't delete all users!");
});

app.get("/users/:id", async (req, res) => {
  res.json(await userService.getUser(req.params.id));
});

app.put("/users/:id", async (req, res) => {
  res.json(await userService.updateUser(req.params.id, req.body));
});

app.delete("/users/:id", async (req, res) => {
  res.status(202).json(await userService.deleteUser(req.params.id));
});

app.all("*", (req, res) => {
  res.status(404).json({ msg: 404 });
});

app.use((err, req, res, next) => {
  return res.status(500).json({ msg: err.message });
});
