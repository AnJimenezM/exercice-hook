import { useState } from 'react'
import './App.css'
import { People } from './components/People';

function App() {
  const [persons, setPersons] = useState([
    {
        id: 1,
        name: "Carolina",
        role: "Frontend Developer",
        img: "https://bootdey.com/img/Content/avatar/avatar2.png"
    },
    {
        id: 2,
        name: "Carlos",
        role: "Frontend Developer",
        img: "https://bootdey.com/img/Content/avatar/avatar4.png"
    },
    {
        id: 3,
        name: "Pedro",
        role: "Frontend Developer",
        img: "https://bootdey.com/img/Content/avatar/avatar3.png"
    }
]);
  return (
    <>
      <div className='container'>
        <div className="row">
            <People 
            persons={persons} 
            setPersons={setPersons} />
          </div>
      </div>
      
    </>
  )
}

export default App
//persons={persons} setPersons={setPersons}