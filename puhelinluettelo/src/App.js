
import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Filter = (props) => {
return (
    <div> rajaa <input value={props.filter}  onChange={props.handleFilterChange}/> </div>
)}

const Persons = (props) => {
  return (
    props.persons.map(person =>
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() =>props.deletePerson(person.id)}>poista</button>
      </div>
    )
  )
}


const AddNewPersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <div> nimi:  <input value={props.newName}  onChange={props.handleNameChange}/></div>
    <div> numero:  <input value={props.newNumber}  onChange={props.handleNumberChange}/></div>
    <div><button type="submit">lisää</button></div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
 
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Poistetaanko ${person.name}`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
        name: newName,
        number: newNumber
    }
    const oldPerson = persons.find(p => p.name === newPerson.name)
  
  
    if (oldPerson && window.confirm(`${newPerson.name} on jo luettelossa`)) {
    personService
    .update(oldPerson.id, newPerson)
   .then(response => {
    setPersons(persons.concat(response.data))})
   
return
   }
   personService
   .create({
    name: newName,
    number: newNumber
  })
  .then(response =>{
    setPersons(persons.concat(response.data))
    setNewName('')
    setNewNumber('')
    })
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
                    addPerson={addPerson}/>
     
      <h2>Numerot</h2>
      <Persons persons={showAll} deletePerson={deletePerson}/>
    </div>
  )
  }
  export default App