import { ethers } from "ethers";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const createPasswordForWallet = async (req, res) => {
  let { password, confirm_password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  if (password != confirm_password) {
    return res.json({
      success: 0,
      data: "Confirm Password must be same as password",
    });
  } else {
    password = bcrypt.hashSync(password, salt);
    const user = await userModel.create({ password });
    return res.status(200).json({
      success: 1,
      data: user,
    });
  }
};

const createSeedPhrase = async (req, res) => {
  const user = await userModel.findById(req.query.id);
  if (!user) {
    return res.json({
      success: 0,
      data: "Invalid user",
    });
  }
  console.log(user);
  const seedData = ethers.Mnemonic.fromEntropy(ethers.randomBytes(16));
  //   const walletData = ethers.HDNodeWallet.fromPhrase(seedData.phrase);
  await userModel.updateOne({ _id: user.id }, [
    { $set: { seed: `${seedData.phrase}` } },
  ]);

  return res.status(200).json({
    success: 1,
    seed: seedData.phrase,
  });
};

export default { createPasswordForWallet, createSeedPhrase };
