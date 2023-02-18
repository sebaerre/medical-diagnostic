import { init } from "../mongodb";
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
  const { db } = await init();
  const usersCollection = db.collection("users");
  const userExists = await usersCollection.findOne({ email: payload.email });
  if (userExists) {
    throw new Error("User with that email already exists");
  }
  const rounds = 8;
  let newUser = { ...payload };
  return bcrypt
    .hash(payload.password, rounds)
    .then(async (hash) => {
      newUser.password = hash;
      const res = await usersCollection.insertOne(newUser);
      return res;
    })
    .catch(() => {
      throw new Error("Unexpected error hashing the password");
    });
};

export const loginUser = async (payload) => {
  const { db } = await init();
  const usersCollection = db.collection("users");
  const existingUser = await usersCollection.findOne({ email: payload.email });
  if (!existingUser) {
    throw new Error("User does not exist");
  }

  const result = await bcrypt.compare(payload.password, existingUser.password);
  if (!result) {
    throw new Error("Passwords do not match");
  }
  return { result, existingUser };
};
