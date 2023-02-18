import { loginUser } from "lib/Users";

export default async function login(req, res) {
  try {
    if (req.method === "POST") {
      const response = await loginUser({ ...req.body });
      if (response.result) {
        return res
          .status(200)
          .send({ success: true, existingUser: { ...response.existingUser } });
      } else {
        return res
          .status(406)
          .send({ success: false, message: "Passwords do not match." });
      }
    } else {
      return res.status(405).send({ success: false });
    }
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
}
