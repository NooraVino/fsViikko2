
import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const Filter = (props) => {
  return (
    <div> rajaa <input value={props.filter} onChange={props.handleFilterChange} /> </div>
  )
}

const Persons = (props) => {
  return (
    props.persons.map(person =>
      <div className= 'text' key={person.name}>
        {person.name} {person.number}
        <button className='buttonStyle' onClick={() => props.deletePerson(person.id)}>poista</button>
      </div>
    )
  )
}


const AddNewPersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div> nimi:  <input value={props.newName} onChange={props.handleNameChange} /></div>
      <div> numero:  <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      <div><button className='buttonStyle' type="submit">lisää</button></div>
    </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)


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
            setMessage(`Poistettu ${person.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          setPersons(persons.filter(p => p.id !== id))  
        })
        .catch(error => {
          setMessage(
            `muistiinpano "'${person.name}'" on jo valitettavasti poistettu palvelimelta`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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


    if (oldPerson && window.confirm(`${newPerson.name} on jo luettelossa. Haluatko korvata vanhan numeron?`)) {
      setMessage(`Korvattu ${oldPerson.name}. Uusi numero on ${newNumber}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      personService
        .update({...oldPerson, number:newNumber})
        .then(response => {
        setPersons(persons.map(p => p.name === newName ? response.data : p))
        setNewName('')
        setNewNumber('')
      })


      return
    }
    setMessage(`Lisätty ${newPerson.name} numerolla ${newNumber}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    personService
      .create(newPerson)
      .then(response => {
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
      <Notification message={message}/>
      <Filter handleFilterChange={handleFilterChange} value={filter} />
      <h2 className='h2'>Puhelinluettelo</h2>
      <AddNewPersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        addPerson={addPerson} />

      <h2 className='h2'>Numerot</h2>
      <Persons persons={showAll} deletePerson={deletePerson} />
    </div>
  )
}
export default App