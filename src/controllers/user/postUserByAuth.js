import { User } from "../../database/index.js";
import {
  bcryptHelpers,
  emailHelpers,
  randomStringHelpers,
} from "../../helpers/index.js";

const registerUser = async (req, res) => {
  const { mail, name, phone } = req.body;
  try {
    const randomPassword = randomStringHelpers.generateCode();
    console.log(randomPassword);
    const hashedPassword = await bcryptHelpers.hashPassword(randomPassword);

    const user = await User.create({
      mail,
      name,
      phone,
      password: hashedPassword,
    });

    emailHelpers.sendTemporalyPassword(mail, name, randomPassword);
    return res.status(200).json({
      message: "Éxito",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error: " + error.message,
    });
  }
};

export default registerUser;
