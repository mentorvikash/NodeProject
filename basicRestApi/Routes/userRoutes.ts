import { Router } from "express";
import {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from "./../controller/userController";

const router = Router();

router.get("/users", getAllUser);

// Get single user details
router.get("/user/:id", getSingleUser);

// Create new user
router.post("/user", createUser);

// Edit user
router.patch("/user/:id", updateUser);

// Delete user
router.delete("/user/:id", deleteUser);

export default router;
