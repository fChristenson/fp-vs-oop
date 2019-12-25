import { UserService } from "..";
import { UserModel } from "../../../users/model";

describe("Test", () => {
  it("Should be possible to getAllUsers", async () => {
    const findFunc = jest.fn().mockReturnValue([]);
    const model: UserModel = {
      find: findFunc
    } as any;
    const service = new UserService(model);
    const result = await service.getAllUsers();
    expect(result).toEqual([]);
  });

  it("Should be possible to getUser", async () => {
    const findFunc = jest.fn().mockReturnValue(Promise.resolve({ id: 1 }));
    const model: UserModel = {
      findOne: findFunc
    } as any;
    const service = new UserService(model);
    const result = await service.getUser("userId");
    expect(result).toEqual({ id: 1 });
  });

  it("Should be possible to updateUser", async () => {
    const saveFunc = jest.fn().mockReturnThis();
    const findFunc = jest
      .fn()
      .mockReturnValue(Promise.resolve({ id: 1, save: saveFunc }));
    const model: UserModel = {
      findOne: findFunc
    } as any;
    const service = new UserService(model);
    const result = await service.updateUser("userId", { name: "foobar" });
    expect(saveFunc).toBeCalledTimes(1);
    expect(result).toEqual({ id: 1, name: "foobar", save: saveFunc });
  });

  it("Should be possible to deleteUser", async () => {
    const findFunc = jest.fn().mockReturnValue(Promise.resolve({ id: 1 }));
    const deleteFunc = jest.fn();
    const model: UserModel = {
      findOne: findFunc,
      deleteOne: deleteFunc
    } as any;
    const service = new UserService(model);
    const result = await service.deleteUser("userId");
    expect(result).toEqual({ id: 1 });
  });
});
