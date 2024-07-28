import { Request, Response } from "express";

type UserType = {
  id: number;
  fname: string;
  lname: string;
  age: number;
};

let users: UserType[] = [{ id: 1, fname: "vikas", lname: "singh", age: 25 }];

let getAllUser = async (req: Request, res: Response) => {
  res.status(200).json(users);
};

let getSingleUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (user) {
    return res.status(200).json({ success: true, data: user });
  }
  return res.status(404).json({ success: false, message: "User not found" });
};

let createUser = async (req: Request, res: Response) => {
  const { fname, lname, age }: UserType = req.body;
  if (fname && lname && age) {
    const newUser: UserType = {
      id: Math.floor(Math.random() * 10000),
      fname,
      lname,
      age,
    };
    users.push(newUser);
    return res.status(201).json({ success: true, data: newUser });
  }
  return res.status(400).json({ success: false, message: "Invalid user data" });
};

let updateUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const { fname, lname, age }: Partial<UserType> = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    if (fname) users[userIndex].fname = fname;
    if (lname) users[userIndex].lname = lname;
    if (age) users[userIndex].age = age;

    return res
      .status(200)
      .json({ success: true, message: "User successfully updated" });
  }

  return res.status(404).json({ success: false, message: "User not found" });
};

let deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return res
      .status(200)
      .json({ success: true, message: "User successfully deleted" });
  }

  return res.status(404).json({ success: false, message: "User not found" });
};

export { getAllUser, getSingleUser, createUser, updateUser, deleteUser };
