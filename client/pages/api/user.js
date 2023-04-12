import { connectDB } from "../../utils/connectDB";
import { User } from "../../models/user.model";

connectDB();

export default async function user(req, res) {
  if (req.method === "POST") {
    try {
      const { name, rollNo } = JSON.parse(req.body);

      const user = await User.create({ name, rollNo });

      return res.json(user);
    } catch (err) {
      console.log(err);
      if (err) return res.json({ error: "Invalid Credentials" });
    }
  }

  res.send("Hello world");
}
