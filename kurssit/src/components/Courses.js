import React from 'react'


const Header = ({course}) => (
        <h3>{course.name}</h3>   
    )    
 
const Course = ({course}) => (   
        <div> 
         <Header course= {course}/> 
         <Content parts= {course.parts}/> 
         <Total parts= {course.parts}/>
        </div>  
    )


const Content = ({parts}) => (
    <div>
        {parts.map(part => 
    <Part key={part.id} part={part}/>)}
    </div>
    )

const Part = ({part}) => (
    <div>{part.name} {part.exercises}</div>    
    )


const Total = ({parts}) => {
    const total = parts.reduce((accumulator, currentValue) => currentValue.exercises + accumulator, 0)
      return <p> yhteensä {total} tehtävää </p>
    
}

export default Course

