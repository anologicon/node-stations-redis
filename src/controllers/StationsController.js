const Redis = require("ioredis");

module.exports = {
  
  /**
   * Persist the temperatures
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async post(req, res) {
    
    const redisIo = new Redis();

    const { idStation } = req.params;

    const { temperatures } = req.body;

    const jsonEncoded = JSON.stringify(temperatures);

    const keyStationsRedi = "temperatures-" + idStation;

    const response = await redisIo.set(keyStationsRedi, jsonEncoded);

    return res.json(response);
  },

  /**
   * Get the temperatures
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async get(req, res) {

    const redisIo = new Redis();    

    const { idStation } = req.params;

    const keyStationsRedi = "temperatures-" + idStation;

    const temperaturaJsonEncoded = await redisIo.get(keyStationsRedi);

    const responseApi = {
      "temperatura": JSON.parse(temperaturaJsonEncoded)
    };

    return res.json(responseApi);
  }
};