import { ethers } from "ethers";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

const createPasswordForWallet = async (req, res) => {
  let { password, confirm_password } = req.body;

  if (password != confirm_password) {
    return res.status(400).json({
      success: 0,
      data: "Confirm Password must be same as password",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    const seedData = ethers.Mnemonic.fromEntropy(ethers.randomBytes(16));
    const walletData = ethers.HDNodeWallet.fromPhrase(seedData.phrase);

    const user = await userModel.create({
      password: password,
      seed: seedData.phrase,
      accounts: [
        {
          accountName: "Account1",
          address: walletData.address,
          publicKey: walletData.publicKey,
          privateKey: walletData.privateKey,
          balance: 0,
        },
      ],
    });

    return res.status(200).json({
      success: 1,
      data: user,
    });
  }
};

const createSeedPhrase = async (req, res) => {
  //   const user = await userModel.findById(req.params.id);
  //   if (!user) {
  //     return res.status(401).json({
  //       success: 0,
  //       data: "Invalid user",
  //     });
  //   }
  //   const seedData = ethers.Mnemonic.fromEntropy(ethers.randomBytes(16));
  //   await userModel.updateOne({ _id: user.id }, [
  //     { $set: { seed: `${seedData.phrase}` } },
  //   ]);
  //   return res.status(200).json({
  //     success: 1,
  //     seed: seedData.phrase,
  //   });
};

const checkSeedPhrase = async (req, res) => {
  const { seedPhrase, password, confirm_password } = req.body;
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(401).json({
      success: 0,
      data: "Invalid user",
    });
  }
  if (password != confirm_password) {
    return res.status(400).json({
      success: 0,
      data: "Confirm Password must be same as password",
    });
  } else {
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (seedPhrase !== user.seed) {
      return res.status(400).json({
        success: 0,
        data: "Seed not match",
      });
    }
    if (!comparePassword) {
      return res.status(400).json({
        success: 0,
        data: "Invalid password",
      });
    } else {
      return res.status(200).json({
        success: 1,
        data: "successfully match",
      });
    }
  }
};

const assignChainAndAccount = async (req, res) => {
  // const { userId, networkId } = req.body;
  // const user = await userModel.findById(userId);
  // if (!user) {
  //   return res.status(401).json({
  //     success: 0,
  //     data: "Invalid user",
  //   });
  // }
  // const walletData = ethers.HDNodeWallet.fromPhrase(user.seed);
  // await userModel.updateOne({ _id: user.id }, [
  //   {
  //     $set: {
  //       networkId: networkId,
  //       accounts: [
  //         {
  //           address: walletData.address,
  //           publicKey: walletData.publicKey,
  //           privateKey: walletData.privateKey,
  //         },
  //       ],
  //     },
  //   },
  // ]);
  // return res.status(200).json({
  //   success: 1,
  //   data: {
  //     address: walletData.address,
  //     publicKey: walletData.publicKey,
  //     privateKey: walletData.privateKey,
  //   },
  // });
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
  const { accountName } = req.body;
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
            accountName: accountName,
            address: walletData.address,
            publicKey: walletData.publicKey,
            privateKey: walletData.privateKey,
            balance: 0,
          },
        },
      }
    );
    return res.status(200).json({
      success: 1,
      data: {
        accountName: accountName,
        address: walletData.address,
        publicKey: walletData.publicKey,
        privateKey: walletData.privateKey,
        balance: 0,
      },
    });
  }
};

const revealSecretData = async (req, res) => {
  const {
    userId,
    accountAddress,
    password,
    confirm_password,
    isSecretSeedInfo,
  } = req.body;
  // const user = await userModel.findById({
  //   $and: [
  //     { _id: userId },
  //     { accounts: { $elemMatch: { address: accountAddress } } },
  //   ],
  // });
  const user = await userModel.findById({ _id: userId });
  const userAccount = await userModel.findById(
    { _id: userId },
    { accounts: { $elemMatch: { address: accountAddress } } }
  );
  // const user = await userModel.aggregate([
  //   {
  //     $match: { _id: userId },
  //   },
  //   // { $group: { _id: "$_id" } },
  // ]);

  // return res.status(200).json({
  //   success: 1,
  //   data: user,
  // });

  if (!user) {
    return res.status(401).json({
      success: 0,
      data: "Invalid user",
    });
  }
  if (userAccount.accounts.length == 0) {
    return res.status(400).json({
      success: 0,
      data: "Invalid address",
    });
  }
  if (password != confirm_password) {
    return res.status(400).json({
      success: 0,
      data: "Confirm Password must be same as password",
    });
  } else {
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: 0,
        data: "Invalid password",
      });
    } else {
      return res.status(200).json({
        success: 1,
        data:
          isSecretSeedInfo == 1
            ? user.seed
            : userAccount.accounts[0].privateKey,
      });
    }
  }
};

const forgotPassword = async (req, res) => {
  let { seedPhrase, password, confirm_password } = req.body;
  const user = await userModel.findOne({ seed: seedPhrase });

  if (!user || seedPhrase != user.seed) {
    return res.status(400).json({
      success: 0,
      data: "Invalid seed phrase",
    });
  }
  if (password != confirm_password) {
    return res.status(400).json({
      success: 0,
      data: "Confirm Password must be same as password",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    await userModel.updateOne({ _id: user._id }, { $set: { password } });
    return res.status(200).json({
      success: 1,
      data: "password update successfully",
    });
  }
};

const importWallet = async (req, res) => {
  let { seedPhrase, password, confirm_password } = req.body;

  const user = await userModel.findOne({ seed: seedPhrase });
  if (!user || seedPhrase != user.seed) {
    return res.status(400).json({
      success: 0,
      data: "Invalid seed phrase",
    });
  }
  if (password != confirm_password) {
    return res.status(400).json({
      success: 0,
      data: "Confirm Password must be same as password",
    });
  } else {
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: 0,
        data: "Invalid password",
      });
    } else {
      return res.status(200).json({
        success: 1,
        data: user.accounts,
      });
    }
  }
};

const importAccount = async (req, res) => {
  const { userId, privateKey } = req.body;
  const user = await userModel.findOne(
    {
      accounts: {
        $elemMatch: {
          privateKey: privateKey,
        },
      },
    },
    {
      accounts: {
        $elemMatch: {
          privateKey: privateKey,
        },
      },
    }
  );

  if (!user || user.accounts.length == 0) {
    return res.status(400).json({
      success: 0,
      data: "Invalid user",
    });
  }
  if (user.accounts.length === 10) {
    return res.status(400).json({
      success: 0,
      data: "You reach account limit 10",
    });
  } else {
    await userModel.updateOne(
      { _id: userId },
      {
        $push: {
          accounts: {
            accountName: user.accounts[0].accountName,
            address: user.accounts[0].address,
            publicKey: user.accounts[0].publicKey,
            privateKey: user.accounts[0].privateKey,
            balance: 0,
          },
        },
      }
    );
    return res.status(200).json({
      success: 1,
      data: user,
    });
  }
};

export default {
  createPasswordForWallet,
  checkSeedPhrase,
  getAllAccounts,
  getAccountDetails,
  addUserAccount,
  revealSecretData,
  forgotPassword,
  importWallet,
  importAccount,
};
