const Redis = require("ioredis");

module.exports = {
  async post(req, res) {
    const redisIo = new Redis();

    const { temperatures } = req.body;

    const jsonEncoded = JSON.stringify(temperatures);

    const response = await redisIo.set("temperatures", jsonEncoded);

    return res.json(response);
  },

  async get(req, res) {
    const redisIo = new Redis();    

    const temperaturaJsonEncoded = await redisIo.get("temperatures");

    const responseApi = {
      "temperatura": JSON.parse(temperaturaJsonEncoded)
    };

    return res.json(responseApi);
  }
};