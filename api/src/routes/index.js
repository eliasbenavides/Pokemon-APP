const { Router } = require('express');
const PokemonsRoute = require('./Pokemons')
const TypesRoute = require('./Type')

const router = Router();

router.use('/pokemons', PokemonsRoute)
router.use('/types', TypesRoute)


module.exports = router;
