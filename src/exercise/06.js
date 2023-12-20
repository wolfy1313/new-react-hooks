// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {useState, useEffect} from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)
  // 🐨 Have state for the pokemon (null)

  useEffect(() => {
    async function nameChange() {
      setPokemon(null)
      if (!pokemonName) {
        return
      }
      let pokemon = await fetchPokemon(pokemonName => {
        setPokemon(pokemon)
      })
    }
    nameChange()
  }, [pokemonName])

  if (!pokemonName) {
    return
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    PokemonDataView = pokemon
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
