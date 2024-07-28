import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

type usersType = {
  id: number;
  fname: string;
  lname: string;
  age: number;
};

let users: usersType[] = [{ id: 1, fname: "vikash", lname: "singh", age: 25 }];

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("welcome to users page");
});

app.get("/users", async (req: Request, res: Response) => {
  res.status(200).json(users);
});

// get single user details
app.get("/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (id) {
    const data = users.filter((user) => user.id === Number(id));
    if (data.length > 0) {
      return res.status(200).json({ success: true, data });
    }
  }
  return res.status(404).json({ success: false, message: "user not found" });
});

// create new user
app.post("/user/", (req: Request, res: Response) => {
  const body: usersType = req.body;
  if (body) {
    const updatedObj = { ...body };
    updatedObj.id = Math.floor(Math.random()*10000) ;        
    
    users.push(updatedObj);
    return res.status(200).json({ success: true, data: body });
  }
  return res
    .status(404)
    .json({ success: true, message: "something went wrong" });
});

// Edit user
// app.patch("/user/:id", (req: Request, res: Response) => {
//     const { id } = req.params;
//     const body = req.body;
//     if (id && body) {
//       const data = users.filter((user) => user.id === Number(id));
//       return res.status(200).json(users);
//     }
//     return res.status(404).json({ message: "user not found" });
// });

// Delete user
app.delete("/user/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = Number(id);
  
    if (!isNaN(userId)) {
      const userIndex = users.findIndex((user) => user.id === userId);
  
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return res
          .status(200)
          .json({ success: true, message: "User successfully deleted" });
      }
    }
  
    return res.status(404).json({ success: false, message: "User not found" });
  });

// app.delete("/user/:id", (req: Request, res: Response) => {
//   const { id } = req.params;
//   console.log({id})
//   if (id) {
//     const ifPresent = users.includes((user) => user.id == Number(id));
//     console.log("index", index);
//     if (index > 0) {
//       return res
//         .status(200)
//         .json({ success: true, message: "user successfully deleted" });
//     }
//   }

//   return res.status(404).json({ success: true, message: "user not found" });
// });

app.listen(PORT, () => {
  console.log("sever is running at " + PORT);
});
