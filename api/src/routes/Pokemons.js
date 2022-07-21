const { Router } = require('express');
const axios = require('axios')
const { Pokemons, Type } = require('../db')
const router = Router();
const {normalizeDataApi, normalizeDataDb} = require('./utills') 


router.get('/', async ( req, res, next ) => {
  try {
    const { name } = req.query;
    if(name){
      const nameMinuscula = name.trim().toLowerCase()
      const pokemonDb = await Pokemons.findOne({
        where: { name: nameMinuscula },
        include: Type
      })
      if(pokemonDb !== null){ // true === tiene Algo!
        return res.status(200).json(normalizeDataDb(pokemonDb))
      }else{ // pokemonDb === null
        const consultaApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameMinuscula}`)
        const pokemonApi = normalizeDataApi(consultaApi)
        return res.status(200).json(pokemonApi)
      }
    }
    
      const dataApi = await Promise.all([
      axios.get("https://pokeapi.co/api/v2/pokemon"), // pokemons del 0 al 19
      axios.get("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"), // pokemons del 20 al 39
    ]);
    // console.log(datApi) ---> [{ data: {results:[] } }, { data:{results:[] } }]
    dataArr1 = dataApi[0].data.results;
    dataArr2 = dataApi[1].data.results;

    const pokemonsDataApi = dataArr1.concat(dataArr2); //[{name, url}, {name2, url2}, ...]
    const pokemonsDataApiPromises = pokemonsDataApi?.map((pokemon) => { 
      // [{pokemon1: info}, {pokemon2: info}]
      return axios
        .get(pokemon.url)
        .then((response) => {
          // const { name, types, urlImg, createInDb } = normalizeDataApi(response);
          return { ...normalizeDataApi(response) };
        })
        .catch((e) => console.log(e));
    });
      
      const pokemonsApi = await Promise.all(pokemonsDataApiPromises) // info de cada pokemon
      const pokemonsDb = await Pokemons.findAll({
        include:{
          model: Type,
          attributes: ['name'],
          through: {attributes: [] }
        }})

        //Normalizar los datos de la db
      const pokemonsDbNormalizado = pokemonsDb.map((pokemon) => {
          return normalizeDataDb(pokemon)
        })
      
      const TodosLosPokemons = [...pokemonsDbNormalizado, ...pokemonsApi]
      res.status(201).json(TodosLosPokemons)

  } catch (error) {
      next(error)
    }
});

router.get('/:idPokemon', async (req, res, next) => {
  const { idPokemon } = req.params;

  try {
    const pokemonDb = await Pokemons.findByPk( idPokemon, {include: Type} )
    if(pokemonDb === null){
      return res.status(404).json('id invalido, no existe pokemon con ese id')
    }return res.status(200).json(normalizeDataDb(pokemonDb))
  } catch (error) {
    try {
      const consultaPokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
      const pokemonApi = normalizeDataApi(consultaPokeApi)
      res.status(200).json(pokemonApi)
    } catch (error) {
      next(error)
    }
  }
})

 router.post('/', async ( req, res, next ) => {
  try {
    let { name, types, urlImg, height, weight, hp, attack, defense, speed } =
      req.body;
    if (!name) return res.status(404).send("Necessary parameters not found");
    if (name) {
      if (!hp) hp = 1;
      if (!attack) attack = 1;
      if (!defense) defense = 1;
      if (!speed) speed = 1;
      if (!height) height = 1;
      if (!weight) weight = 1;

      //Lo almaceno con minuscula en Db, así estan en la API
      const nameLower = name.trim().toLowerCase(); 

      
      const pokemonCreated = await Pokemons.create({
        name: nameLower,
        urlImg,
        height,
        weight,
        hp,
        attack,
        defense,
        speed,
      });
      
      // Paso todos los types a minuscula para buscarlo en la base de datos
      //para agarrar su id y hacer la relacion!!!
      const typesLower = types.map((type) => type.toLowerCase());
      const typesDb = await Type.findAll({where: {name: typesLower}})
      const typeDbId = typesDb?.map((p) => p.dataValues.id);
      await pokemonCreated.addTypes(typeDbId);

      const newPokemon = await Pokemons.findOne({
        where: { name: nameLower },
        include: Type,
      });

      const newPokemonNormalized = normalizeDataDb(newPokemon);
      return res.json(newPokemonNormalized);
     }
   }catch(error){
     next(error)
   }
 })

// router.delete('/:id', async ( req, res, next ) => {
//   try {
//     const { id } = req.params
//     const pokemon = await Pokemons.findByPk(id);
//     if(pokemon !== null){
//       await pokemon.destroy();
//       res.status(200).json('El Pokemon ha sido eliminado correctamente')
//     }
//   } catch (error) {
//     next(error)
//   }
// });


module.exports = router;
