import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  password: {
    type: String,
    require: [true, "Please enter password"],
    minLength: [8, "Password must be greater than 8 characters"],
  },
  seed: {
    type: String,
    require: true,
  },
  accounts: [
    {
      accountName: String,
      address: String,
      publicKey: String,
      privateKey: String,
      balance: Number,
      isImported: { type: Number, default: 0 }, // 0 : unImported , 1 : imported
    },
  ],
  isWalletLock: {
    type: Number,
    default: 0, // 0 : unlocked , 1 : locked
  },
});

export default mongoose.model("users", usersSchema);
