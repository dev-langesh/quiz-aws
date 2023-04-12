import { convertLength } from "@mui/material/styles/cssUtils";
import { User } from "../../models/user.model";

export default async function isStartedQuiz(req, res) {
  if (req.method === "POST") {
    const { id } = JSON.parse(req.body);

    const user = await User.findById(id);

    const isStarted = user.started;

    if (!isStarted) {
      await User.findByIdAndUpdate(id, {
        $set: { started: true },
      });
    }

    res.json({ isStarted });
  }
}
