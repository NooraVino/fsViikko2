
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    const person = {
        name: newName
    }
    setPersons(persons.concat(person))

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

 
  



  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        <div>
          nimi: 
          <input 
            value={newName}  
            onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
    
    </div>
  )
  }
  ReactDOM.render(<App />, document.getElementById('root'))