// /api/user/by-email.js
import User from "../../../models/user";

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { email },
  } = req;

  if (req.method === "GET") {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
