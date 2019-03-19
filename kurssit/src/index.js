import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Courses'


const App = () => {
    const courses =  [
        {
        name: 'Half Stack -sovelluskehitys',
        id: 1,
        parts:  [
          {
            name: 'Reactin perusteet',
            exercises: 10,
            id: 1
          },
    
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7,
            id: 2
          },
          {   
            name: 'Komponenttien tila',
            exercises: 14,
            id: 3
          }
        ]
    },
    {
     name: "Toinen kurssi",
     id: 2,
     parts: [
        {
            name: 'Reactin perusteet',
            exercises: 30,
            id: 1
          },
        {
            name: 'Jotain muuta',
            exercises: 40,
            id: 2
          }  
        ]
    },
    {
        name: "Kolmas kurssi",
        id: 3,
        parts: [
           {
               name: 'Reactin jatko',
               exercises: 2,
               id: 1
             },
           {
               name: 'Jotain muuta lisää',
               exercises: 70,
               id: 2
             }  
           ]
       }
    ]
    

    return (
      <div>
      <h1>Opetusohjelma: </h1>
      {courses.map(course =>
        <Course course={course} key={course.id}/>)}
      </div>
)
}

  ReactDOM.render(
  <App/>,document.getElementById('root'))