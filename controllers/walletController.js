import { ethers } from "ethers";
import bcrypt from "bcrypt";

const createPasswordForWallet = (req, res) => {
  const body = req.body;
  const salt = bcrypt.genSaltSync(10);
  if (body.password != body.confirm_password) {
    return res.json({
      success: 0,
      data: "Confirm Password must be same as password",
    });
  } else {
    body.password = bcrypt.hashSync(body.password, salt);
    console.log(body.password);
    return res.status(200).json({
      success: 1,
      data: "Password created.",
    });
  }
};

const createWallet = (req, res) => {
  const seedData = ethers.Mnemonic.fromEntropy(ethers.randomBytes(16));
  const walletData = ethers.HDNodeWallet.fromPhrase(seedData.phrase);

  return res.status(200).json({
    success: 1,
    seed: seedData.phrase,
    address: walletData.address,
    publicKey: walletData.publicKey,
    privateKey: walletData.privateKey,
  });
};

export default { createPasswordForWallet, createWallet };
