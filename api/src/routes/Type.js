const { Router } = require('express');
const axios = require('axios')
const { Type } = require('../db');
const { normalizeDataTypes } = require('./utills');
const router = Router();


router.get('/', async ( req, res, next ) => {
  try {
   const typesDataApi = await axios.get('https://pokeapi.co/api/v2/type');
   const typesApi = typesDataApi.data.results.map((type) => type.name.toLowerCase())
   const typesDbPromise = await typesApi.map(async (type) => {
     return await Type.findOrCreate({
       where: { name: type }
      });
    });
    
  await Promise.all(typesDbPromise);

   const typesDb = await Type.findAll();
   const typeNormal = normalizeDataTypes(typesDb); // Type con la primer letra en mayus

  res.status(201).json(typeNormal)
  } catch (error) {
    next(error)
  }
});


module.exports = router;
