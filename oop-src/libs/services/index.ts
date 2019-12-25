import { UserService } from "./userService";
import { User } from "../users/model";

export const userService = new UserService(User);
