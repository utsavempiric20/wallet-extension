import networkModel from "../models/networkModel.js";

const addNetwork = async (req, res) => {
  const { network_name, rpc_url, chain_id, symbol, block_explorer, isLock } =
    req.body;

  const network = await networkModel.create({
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
  const { netWorkId } = req.body;
  const netWorkData = await networkModel.findOne({
    _id: netWorkId,
  });

  if (!netWorkData) {
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
  const { netWorkId } = req.body;
  const netWorkData = await networkModel.findOne({ _id: netWorkId });

  if (!netWorkData) {
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
    return res.status(200).json({
      success: 1,
      data: "Network Delete Successfully",
    });
  }
};

export default {
  addNetwork,
  getNetwork,
  getAllNetwork,
  updateNetwork,
  deleteNetwork,
};
