import {
  getUser as makeGetUser,
  deleteUser as makeDeleteUser,
  getAllUsers as makeGetAllUsers,
  updateUser as makeUpdateUser
} from "./query";
import { User } from "./model";

export { createUser } from "./query";

export const getAllUsers = makeGetAllUsers(User.find.bind(User));
export const getUser = makeGetUser(User.findOne.bind(User));
export const deleteUser = makeDeleteUser(getUser, User.deleteOne.bind(User));
export const updateUser = makeUpdateUser(getUser);
