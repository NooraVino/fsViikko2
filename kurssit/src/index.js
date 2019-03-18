import React from 'react'
import ReactDOM from 'react-dom'



const Header = (props) => {
    console.log("Header", props.header)
    return (
        <h3>{props.header}</h3>
       
        
    ) 
     
 }
const Course = (props) => {
    return (
        <ul>
         {props.courses.map(c => <li key={c.id}> 
         <Header header= {c.name}/> 
         <Content content= {c.parts}/> </li>)}
        </ul>
    )
}

const Content = (props) => {
  return (
    <ul>
    <Part part={props.content.map(nota =>
         <li key={nota.id}> {nota.name} {nota.exercises} </li>)}/> 
    </ul>
    )
}

const Part = (props) => {
    console.log("Part", props.part)
    return (  
         props.part      
    )
}

const Total = (props) => {
    const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    return   <p> yhteensä {total} tehtävää </p>
    
        }


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
            exercises: 10,
            id: 1
          },
        {
            name: 'Reactin perusteet',
            exercises: 10,
            id: 2
          }  
        ]
    },
    {
        name: "Toinen kurssi",
        id: 3,
        parts: [
           {
               name: 'Reactin perusteet',
               exercises: 10,
               id: 1
             },
           {
               name: 'Reactin perusteet',
               exercises: 10,
               id: 2
             }  
           ]
       }
    ]
    

    return (
      <Course courses={courses}/>
    )
  }
  
  ReactDOM.render(
  <App/>,document.getElementById('root'))