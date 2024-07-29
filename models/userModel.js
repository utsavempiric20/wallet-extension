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
  networkId: {
    type: String,
    require: true,
  },
  accounts: [
    {
      address: String,
      publicKey: String,
      privateKey: String,
    },
  ],
});

export default mongoose.model("users", usersSchema);
