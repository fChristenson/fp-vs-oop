import * as express from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
  createUser,
  updateUser
} from "./libs/users";
import {
  return200JsonResponse,
  return201JsonResponse,
  return202JsonResponse,
  return404JsonResponse,
  return500JsonResponse
} from "./libs/requests";

export const app = express();

app.use(express.json());

app.get(
  "/users",
  return200JsonResponse(() => {
    return getAllUsers();
  })
);

app.post(
  "/users",
  return201JsonResponse(req => {
    return createUser(req.body);
  })
);

app.delete(
  "/users",
  return202JsonResponse(() => {
    throw new Error("omg you can't delete all users!");
  })
);

app.get(
  "/users/:id",
  return200JsonResponse(req => {
    return getUser(req.params.id);
  })
);

app.put(
  "/users/:id",
  return200JsonResponse(req => {
    return updateUser(req.params.id, req.body);
  })
);

app.delete(
  "/users/:id",
  return202JsonResponse(req => {
    return deleteUser(req.params.id);
  })
);

app.all(
  "*",
  return404JsonResponse(() => {
    return { msg: 404 };
  })
);

app.use((err, req, res, next) => {
  return return500JsonResponse(() => ({ msg: err.message }), req, res, next);
});
