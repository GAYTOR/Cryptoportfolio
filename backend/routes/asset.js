const router = require("express").Router();
const axios = require("axios");
const User = require("../models/user");

const searchByName = (coinList, searchTerm) => {
  const searchResults = coinList
    .filter((coin) => coin.name === searchTerm)
    .map((coin) => coin.id);
  console.log(searchResults);
  console.log(searchTerm);
  // console.log(coinList);
  if (searchResults.length === 0) {
    return null;
  }
  return searchResults.join(",");
};

router.route("/").get(async (req, res) => {
  try {
    const coinListResponse = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );
    const coinList = coinListResponse.data;
    const username = req.query.username;
    const user = await User.findOne({ username });
    const assets = user.asset || []; // Initialize with an empty array if undefined
    const tokens = assets.map((asset) => asset.token);
    const assetIds = await Promise.all(
      tokens.map((token) => searchByName(coinList, token))
    );

    let totalValue = 0;

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const assetId = assetIds[i];

      if (assetId) {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${assetId}&vs_currencies=usd`
        );
        const price = response.data[assetId].usd;

        asset.price = price;
        asset.totalValue = Math.round(price * asset.quantity);
        asset.allocation = 0; // Initialize allocation as 0
        totalValue += asset.totalValue;
      }
    }

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      asset.allocation = Math.round((asset.totalValue / totalValue) * 100);
    }

    // Modify the assets array to include the desired properties
    const modifiedAssets = assets.map((asset) => ({
      token: asset.token,
      quantity: asset.quantity,
      allocation: asset.allocation,
      price: asset.price,
      total_value: asset.totalValue,
    }));

    res.json(modifiedAssets);
  } catch (err) {
    res.status(400).json("ERROR: " + err);
  }
})


router.route("/assets").post((req, res) => {
  const username = req.body.username;
  const token = req.body.token;
  const quantity = req.body.quantity;

  User.findOne({ username })
    .then((user) => {
      const assets = user.asset || []; // Initialize with an empty array if undefined
      const existingAsset = assets.find((asset) => asset.token === token);
      if (existingAsset) {
        // If the token already exists, update the quantity
        existingAsset.quantity = quantity;
      } else {
        // If the token doesn't exist, add a new asset
        assets.push({ token, quantity });
      }
      user.assets = assets; // Assign the updated assets back to the user object
      return user.save();
    })
    .then(() => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "*");
      res.json("Asset has been added/updated");
    })
    .catch((err) => res.status(400).json("ERROR: " + err));
});
router.route("/delete").post((req, res) => {
  const username = req.body.username;
  const token = req.body.token;

  User.findOne({ username })
    .then((user) => {
      const assets = user.asset || []; // Initialize with an empty array if undefined
      const updatedAssets = assets.filter((asset) => asset.token !== token);

      user.asset = updatedAssets; // Assign the updated assets back to the user object
      return user.save();
    })
    .then(() => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "*");
      res.json("Asset has been deleted");
    })
    .catch((err) => res.status(400).json("ERROR: " + err));
});


module.exports = router;
