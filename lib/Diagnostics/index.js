import { init } from "../mongodb";
import { ObjectId } from "mongodb";

export const submitDiagnostic = async (payload) => {
  const { db } = await init();
  const diagnosticsCollection = db.collection("diagnostics");
  const res = await diagnosticsCollection.insertOne(payload);
  if (!res) {
    throw new Error("Something went wrong");
  }
  return res;
};

export const getDiagnostics = async (payload) => {
  const { db } = await init();
  const diagnosticsCollection = db.collection("diagnostics");
  const res = await diagnosticsCollection.find({ user: payload }).toArray();
  if (!res) {
    throw new Error("Something went wrong");
  }
  return res;
};

export const confirmDiagnostic = async (payload) => {
  const { db } = await init();
  const diagnosticsCollection = db.collection("diagnostics");
  const res = await diagnosticsCollection.updateOne(
    { _id: new ObjectId(payload.id) },
    { $set: { correct: "true" } }
  );
  if (!res) {
    throw new Error("Something went wrong");
  }
  return res;
};
