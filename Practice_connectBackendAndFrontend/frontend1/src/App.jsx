import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
// import cors from 'cors'




function App() {
  const [jokes,setJokes] = useState([])

  useEffect(() =>{
    axios.get('/api/jokes')
    .then((response) =>{
      setJokes(response.data)
    })
    .catch((error) =>{
      console.log(error) 
    })
  })

  return (
    <>
      <h1>Faizan Full Stack Work</h1>
      <p>JOKES: {jokes.length}</p>

      {
        jokes.map((joke,index) => (
          <div key={joke.id}>
            <h2>{joke.id}</h2>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        ))
      }


    </>
  )
}

export default App
