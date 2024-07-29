import mongoose from "mongoose";

const networkModel = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  networkName: {
    type: String,
    require: [true, "Please Enter network name"],
  },

  rpcUrl: {
    type: String,
    require: [true, "Please Enter rpc url"],
  },

  chainId: {
    type: String,
    require: [true, "Please Enter chain id"],
  },

  symbol: {
    type: String,
    require: [true, "Please Enter symbol"],
  },

  blockExplorer: {
    type: String,
  },
  isLock: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("network", networkModel);
