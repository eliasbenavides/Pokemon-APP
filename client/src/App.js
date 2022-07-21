import './App.css';
import Inicio from './components/inicio/Inicio';
import { Route, Switch} from 'react-router-dom'
import Home from './components/home/Home';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={ Inicio }/>
        <Route exact path={"/home"} component={ Home }/>
        <Route exact path={"/createPokemon"} component={ CreatePokemon }/>
        <Route exact path={"/pokemon/:id"} component={ PokemonDetail }/>
      </Switch>
    </div>
  );
}

export default App;
