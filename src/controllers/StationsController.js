const Redis = require("ioredis");

module.exports = {
  
  /**
   * Persist the temperatures
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async post(req, res) {

    console.log('Salvando o Json');

    const redisIo = new Redis();

    const { idStation } = req.params;

    const { temperatures } = req.body;

    const jsonEncoded = JSON.stringify(temperatures);

    const keyStationsRedis = "temperatures-" + idStation;

    const response = await redisIo.set(keyStationsRedis, jsonEncoded);

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

    console.log('Recuperando o Json');

    const { idStation } = req.params;

    const keyStationsRedis = "temperatures-" + idStation;

    const temperaturaJsonEncoded = await redisIo.get(keyStationsRedis);

    const responseApi = {
      "temperatura": JSON.parse(temperaturaJsonEncoded)
    };

    return res.json(responseApi);
  }
};