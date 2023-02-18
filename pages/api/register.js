import { registerUser } from "lib/Users";

export default async function register(req, res) {
  try {
    if (req.method === "POST") {
      const response = await registerUser({ ...req.body });
      return res.status(200).send({ success: true, response });
    } else {
      return res.status(405).send({ success: false });
    }
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
}
