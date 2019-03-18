import React, { useState, useEffect } from 'react'
import noteService from './services/notes'


  const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
       setPersons(initialNotes)
    })
   
  }, [])

  const deletePerson = (event) => {
    const note = persons.find(n => n.id === event.taget.value)
    
    noteService
       .delOne(note)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = { name: newName, number: newNumber}
    

    noteService
    .create(noteObject)
    .then(returnedNote => {
      setPersons(persons.concat(returnedNote))
      setNewName('')
      setNewNumber('')
    })
  
    console.log('nappia painettu', event.target)
   
}
  const handleChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }
  const Numbers = ({persons}, {del})  =>  
    <ul> {persons.map(person => <li key={person.name}> {person.name} {person.number} <button onClick={del}>poista</button></li>)} </ul>

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi: 
          <input value={newName}
          onChange={handleChange}/>
        </div>
        <div>
          numero: 
          <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <Numbers persons = {persons}  del = {deletePerson}/>

      <div></div>
        
    </div>
  )

}
export default App


