import { UserModel, IUser, User } from "../../users/model";
import { ICreateUserRequest, IUpdateUserRequest } from "../../users";

export class UserService {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  async getUser(userId: string): Promise<IUser> {
    return this.userModel.findOne({ id: userId });
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userModel.find({});
  }

  async createUser(req: ICreateUserRequest): Promise<IUser> {
    const user = new User({ id: Math.random(), name: req.name });
    return await user.save();
  }

  async updateUser(userId: string, req: IUpdateUserRequest): Promise<IUser> {
    const user = await this.getUser(userId);

    user.name = req.name;

    return await user.save();
  }

  async deleteUser(userId: string): Promise<IUser> {
    const user = await this.getUser(userId);
    await this.userModel.deleteOne({ id: userId });

    return user;
  }
}
