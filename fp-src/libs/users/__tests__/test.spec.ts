import { getAllUsers, getUser, deleteUser, updateUser } from "../query";

describe("Test", () => {
  it("Should be possible to getAllUsers", async () => {
    const findFunc = jest.fn().mockReturnValue([]);
    const result = await getAllUsers(findFunc)();
    expect(result).toEqual([]);
  });

  it("Should be possible to getUser", async () => {
    const findFunc = jest.fn().mockReturnValue(Promise.resolve({ id: 1 }));
    const result = await getUser(findFunc, "userId");
    expect(result).toEqual({ id: 1 });
  });

  it("Should be possible to updateUser", async () => {
    const saveFunc = jest.fn().mockReturnThis();
    const findFunc = jest
      .fn()
      .mockReturnValue(Promise.resolve({ id: 1, save: saveFunc }));
    const result = await updateUser(findFunc, "userId", { name: "foobar" });
    expect(saveFunc).toBeCalledTimes(1);
    expect(result).toEqual({ id: 1, name: "foobar", save: saveFunc });
  });

  it("Should be possible to deleteUser", async () => {
    const findFunc = jest.fn().mockReturnValue(Promise.resolve({ id: 1 }));
    const deleteFunc = jest.fn();
    const result = await deleteUser(findFunc, deleteFunc)("userId");
    expect(result).toEqual({ id: 1 });
  });
});
