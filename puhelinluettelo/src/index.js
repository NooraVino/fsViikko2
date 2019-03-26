
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Filter = (props) => {
return (
    <div> rajaa <input value={props.filter}  onChange={props.handleFilterChange}/> </div>
)}

const Persons = (props) => {
  return (
    props.persons.map(person =>
      <div key={person.name}>
        {person.name} {person.number}
      </div>
    )
  )
}

const AddNewPersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
    <div> nimi:  <input value={props.newName}  onChange={props.handleNameChange}/></div>
    <div> numero:  <input value={props.newNumber}  onChange={props.handleNumberChange}/></div>
    <div><button type="submit">lisää</button></div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '030-34553' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    const person = {
        name: newName,
        number: newNumber
    }
  if (persons.find(p => p.name === person.name)) {
  window.alert(`${person.name} on jo luettelossa`)
  }
  else {
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

    
  const showAll = filter.length === 0
    ? persons 
    : persons.filter(person => person.name.includes(filter))

  
  return (
    <div>
      <Filter handleFilterChange= {handleFilterChange} value={filter}/>
      <h2>Puhelinluettelo</h2>
      <AddNewPersonForm newName={newName} handleNameChange={handleNameChange}
                    newNumber={newNumber} handleNumberChange = {handleNumberChange}
                    addName={addName}/>
     
      <h2>Numerot</h2>
      <Persons persons={showAll}/>
    </div>
  )
  }
  ReactDOM.render(<App />, document.getElementById('root'))