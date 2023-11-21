// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useEffect, useState} from 'react'

function useLocalStorageState(key, initialState = '') {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) || initialState,
  )

  useEffect(() => {
    JSON.stringify(window.localStorage.setItem(key, state))
  }, [key, state])

  return [state, setState]
}
function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)
  return (
    <>
      <button
        onClick={() => {
          setCount(previousCount => previousCount + 1)
        }}
      >
        {count}
      </button>
      <Greeting initialName="Grogonn" />
    </>
  )
}

export default App
