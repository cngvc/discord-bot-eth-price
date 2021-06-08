const axios = require("axios");
require("dotenv").config();

const NOMICS_API = "https://api.nomics.com/v1";

const getPrice = async () => {
  const results = await axios.get(`${NOMICS_API}/currencies/ticker?key=${process.env.NOMICS_API_KEY}&ids=ETH`)
  return results.data[0].price
};

module.exports = { getPrice };
