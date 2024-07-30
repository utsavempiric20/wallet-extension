import networkModel from "../models/networkModel.js";
import userModel from "../models/userModel.js";

const addNetwork = async (req, res) => {
  const {
    userId,
    network_name,
    rpc_url,
    chain_id,
    symbol,
    block_explorer,
    isLock,
  } = req.body;
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(401).json({
      success: 0,
      data: "Invalid User",
    });
  }

  const network = await networkModel.create({
    userId: userId,
    networkName: network_name,
    rpcUrl: rpc_url,
    chainId: chain_id,
    symbol: symbol,
    blockExplorer: block_explorer,
    isLock: isLock,
  });

  return res.status(200).json({
    success: 1,
    data: network,
  });
};

const getNetwork = async (req, res) => {
  const { userId, netWorkId } = req.body;
  const netWorkData = await networkModel.find({
    userId: userId,
    _id: netWorkId,
  });

  if (!netWorkData) {
    return res.status(400).json({
      success: 0,
      data: "Data not found",
    });
  }
  if (netWorkData.length == 0) {
    return res.status(400).json({
      success: 0,
      data: "Network dosen't exist",
    });
  } else {
    return res.status(200).json({
      success: 1,
      data: netWorkData,
    });
  }
};

const getAllNetwork = async (req, res) => {
  const { userId } = req.body;
  const netWorkData = await networkModel.find({ userId });

  if (!netWorkData) {
    return res.status(400).json({
      success: 0,
      data: "Data not found",
    });
  }
  if (netWorkData.length == 0) {
    return res.status(400).json({
      success: 0,
      data: "Network doesn't exist",
    });
  } else {
    return res.status(200).json({
      success: 1,
      data: netWorkData,
    });
  }
};

const updateNetwork = async (req, res) => {
  const {
    userId,
    netWorkId,
    network_name,
    rpc_url,
    chain_id,
    symbol,
    block_explorer,
  } = req.body;
  const netWorkData = await networkModel.findOne({
    userId: userId,
    _id: netWorkId,
    isLock: 0,
  });

  if (!netWorkData) {
    return res.status(400).json({
      success: 0,
      data: "Network doesn't exist",
    });
  } else {
    const updateData = await networkModel.updateOne(
      { userId: userId, _id: netWorkId },
      [
        {
          $set: {
            networkName: network_name,
            rpcUrl: rpc_url,
            chainId: chain_id,
            symbol: symbol,
            blockExplorer: block_explorer,
          },
        },
      ]
    );
    // if (updateData.modifiedCount == 0) {
    //   return res.status(200).json({
    //     success: 1,
    //     data: "Network already updated",
    //   });
    // }
    return res.status(200).json({
      success: 1,
      data: "Network update successfully",
    });
  }
};

const deleteNetwork = async (req, res) => {
  const { userId, netWorkId } = req.body;
  const netWorkData = await networkModel.findOne({
    userId: userId,
    _id: netWorkId,
    isLock: 0,
  });

  if (!netWorkData) {
    return res.status(400).json({
      success: 0,
      data: "Network doesn't exist",
    });
  } else {
    const deleteData = await networkModel.deleteOne({
      userId: userId,
      _id: netWorkId,
    });

    // if (deleteData.deletedCount == 0) {
    //   return res.status(400).json({
    //     success: 0,
    //     data: "Network already deleted",
    //   });
    // } else {
    return res.status(200).json({
      success: 1,
      data: "Network Delete Successfully",
    });
    // }
  }
};

export default {
  addNetwork,
  getNetwork,
  getAllNetwork,
  updateNetwork,
  deleteNetwork,
};
