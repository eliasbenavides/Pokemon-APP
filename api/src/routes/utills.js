

// Normalizar info que le llega a la base de datos!
normalizeDataDb = (newPokemon) => {
  const typesNormalized = newPokemon.dataValues.types?.map(
    (type) => type.name.charAt(0).toUpperCase() + type.name.slice(1)
  );
  return { // retorna solo lo que necesito!
    name: newPokemon.name.charAt(0).toUpperCase() + newPokemon.name.slice(1),
    types: typesNormalized,
    urlImg: newPokemon.urlImg,
    id: newPokemon.id,
    height: newPokemon.height,
    weight: newPokemon.weight,
    hp: newPokemon.hp,
    attack: newPokemon.attack,
    defense: newPokemon.defense,
    speed: newPokemon.speed,
    createInDb: newPokemon.createInDb,
  };
};

//Función para normalizar la respuesta que llega de la api
normalizeDataApi = (responseAPI) => {
  return {
    name:
      responseAPI.data.name.charAt(0).toUpperCase() +
      responseAPI.data.name.slice(1),
    types: responseAPI.data.types.map((elem) => {
      return elem.type.name.charAt(0).toUpperCase() + elem.type.name.slice(1);
    }),
    urlImg: responseAPI.data.sprites.other.dream_world.front_default,
    id: responseAPI.data.id,
    height: responseAPI.data.height,
    weight: responseAPI.data.weight,
    ...responseAPI.data.stats.reduce(
      //El metodo reduce me retorna un objeto: {hp: , speed: , attack:  , defense: }
      // retornar un OBJ!!
      (prevValue, actualValue) => ({
        ...prevValue,
        [actualValue.stat.name]: actualValue.base_stat,
      }),
      {}),
    createInDb: false,
  };
};

normalizeDataTypes = (types) => {
  return types?.map((type) => {
    return {
      ...type.dataValues,
      name: type.dataValues.name.charAt(0).toUpperCase() + type.name.slice(1),
    };
  });
};

module.exports = { normalizeDataApi, normalizeDataDb, normalizeDataTypes };