import * as R from "ramda";
import { IUser, User } from "./model";

export interface ICreateUserRequest {
  name: string;
}

export interface IUpdateUserRequest {
  name: string;
}

// helpers

const saveUser = async (user: IUser): Promise<IUser> => await user.save();

const requestToUser = (req: ICreateUserRequest): IUser => {
  return new User({ id: Math.random(), name: req.name });
};

const applyUpdates = R.curry(
  (req: IUpdateUserRequest, user: IUser): IUser => {
    user.name = req.name;
    return user;
  }
);

// exported

export type getUserFn = (userId: string) => Promise<IUser>;
export type findFn = typeof User.find;
export type findOneFn = typeof User.findOne;
export type deleteOneFn = typeof User.deleteOne;

export const getAllUsers = (find: findFn) => async () => await find({});

export const getUser = R.curry(
  async (findOne: findOneFn, userId: string) => await findOne({ id: userId })
);

export const updateUser = R.curry(
  (getUser: getUserFn, userId: string, req: IUpdateUserRequest) =>
    R.compose(R.then(saveUser), R.then(applyUpdates(req)), getUser)(userId)
);

export const deleteUser = R.curry(
  (getUser: getUserFn, deleteOne: deleteOneFn) =>
    R.compose(
      R.then(async (user: IUser) => {
        await deleteOne({ id: user.id });
        return user;
      }),
      getUser
    )
);

export const createUser = R.compose(saveUser, requestToUser);
