import { ethers } from "ethers";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const createPasswordForWallet = async (req, res) => {
  let { password, confirm_password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  if (password != confirm_password) {
    return res.status(400).json({
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
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(401).json({
      success: 0,
      data: "Invalid user",
    });
  }

  const seedData = ethers.Mnemonic.fromEntropy(ethers.randomBytes(16));

  await userModel.updateOne({ _id: user.id }, [
    { $set: { seed: `${seedData.phrase}` } },
  ]);

  return res.status(200).json({
    success: 1,
    seed: seedData.phrase,
  });
};

const checkSeedPhrase = async (req, res) => {
  const { seed } = req.body;
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(401).json({
      success: 0,
      data: "Invalid user",
    });
  }
  if (seed !== user.seed) {
    return res.status(400).json({
      success: 0,
      data: "Seed not match",
    });
  } else {
    return res.status(200).json({
      success: 1,
      data: "successfully match",
    });
  }
};

const assignChainAndAccount = async (req, res) => {
  const { userId, networkId } = req.body;
  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(401).json({
      success: 0,
      data: "Invalid user",
    });
  }

  const walletData = ethers.HDNodeWallet.fromPhrase(user.seed);

  await userModel.updateOne({ _id: user.id }, [
    {
      $set: {
        networkId: networkId,
        accounts: [
          {
            address: walletData.address,
            publicKey: walletData.publicKey,
            privateKey: walletData.privateKey,
          },
        ],
      },
    },
  ]);

  return res.status(200).json({
    success: 1,
    data: {
      address: walletData.address,
      publicKey: walletData.publicKey,
      privateKey: walletData.privateKey,
    },
  });
};

const getAllAccounts = async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return res.status(401).json({
      success: 0,
      data: "Invalid user",
    });
  } else {
    return res.status(200).json({
      success: 1,
      data: user.accounts,
    });
  }
};

const getAccountDetails = async (req, res) => {
  let { userId, accountAddress } = req.body;

  const user = await userModel.findOne(
    { _id: userId },
    { accounts: { $elemMatch: { address: accountAddress } } }
  );

  if (!user) {
    return res.status(401).json({
      success: 0,
      data: "Invalid user",
    });
  }
  if (user.accounts.length === 0) {
    return res.status(400).json({
      success: 0,
      data: "Invalid address",
    });
  } else {
    return res.status(200).json({
      success: 1,
      data: user,
    });
  }
};

const addUserAccount = async (req, res) => {
  const MAX_ACCOUNTS = 10;
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return res.status(401).json({
      success: 0,
      data: "Invalid user",
    });
  }

  if (user.accounts.length == 10) {
    return res.status(400).json({
      success: 0,
      data: "You reach account limit 10",
    });
  }
  for (let index = user.accounts.length; index < MAX_ACCOUNTS; index++) {
    const walletData = ethers.HDNodeWallet.fromPhrase(user.seed).derivePath(
      `${index}`
    );
    await userModel.updateOne(
      { _id: user.id },
      {
        $push: {
          accounts: {
            address: walletData.address,
            publicKey: walletData.publicKey,
            privateKey: walletData.privateKey,
          },
        },
      }
    );
    return res.status(200).json({
      success: 1,
      data: {
        address: walletData.address,
        publicKey: walletData.publicKey,
        privateKey: walletData.privateKey,
      },
    });
  }
};

export default {
  createPasswordForWallet,
  createSeedPhrase,
  checkSeedPhrase,
  assignChainAndAccount,
  getAllAccounts,
  getAccountDetails,
  addUserAccount,
};
