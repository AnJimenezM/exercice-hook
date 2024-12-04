import PropTypes from 'prop-types'
import { Person } from './Person'
import { useState } from 'react'
export const People = ({persons, setPersons}) => {

  const[editingId , setEditingId] = useState(null)

  const [editedPerson, setEditedPerson] = useState({
    name: '',
    role: '',
    img: ''
  })
  const [isEditing, setIsEditing] = useState(false)

  const[personToDelete, setPersonToDelete] = useState(null)
    const handleChange = (e) =>{
      const { name, value  } = e.target
      setEditedPerson(prevState =>({
        ...prevState,
        [name]: value
      }))
    }

    const handleCreate = (e) =>{
      e.preventDefault()
      setPersons([...persons,{id: persons.length +1, ...editedPerson }])
      setEditedPerson({name: '', role:'', img:''})
    }
    const handleEdit = (id, e) =>{
     
      setEditingId(id)
      setIsEditing(true)
      const personToEdit = persons.find(person => person.id === id)

      setEditedPerson({...personToEdit})
    

    }
    const handleSave = (e) => {
      e.preventDefault()
      const updatedPersons = persons.map(person => person.id === editingId ? editedPerson : person)

      setPersons(updatedPersons)
      setIsEditing(false)
      setEditingId(null)
      setEditedPerson({name: "", role: "", img: ""})

    }


    const handleDelete = (id) =>{
      setPersonToDelete(id)
    }

    const confirmDelete = () =>{
      setPersons(persons.filter(person => person.id !== personToDelete))
      setPersonToDelete(null)
    }
    
    const cancelDelete = () =>{
      setPersonToDelete(null)
    }






  return (
    <div>
        <h2 className='text-center my-4'>bIT team</h2>
        <div className='container'>
       <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
            {persons.map((person)=>{
            return(
            <div key={person.id}>
                <Person 
                id={person.id}
                name={person.name}
                role={person.role}
                img={person.img}
                handleEdit={() => handleEdit(person.id)}
                handleDelete={handleDelete}
                />
            </div>
          )
          })}
       </div>
        </div>
        <div className='container mt-4 row p-2'>
            <h2 className='text-center my-4'>{isEditing ? 'actualizar empleado' : 'Crear nuevo empleado'}</h2>
        <form className='border border-dark rounder p-4'>
        <div className="mb-3">
          <label className="form-label">Nombres</label>
          <input type="text" name='name' value={editedPerson.name} onChange={handleChange} className="form-control" aria-describedby="nombre" />
        </div>
        <div className="mb-3">
          <label className="form-label">Cargo</label>
          <input type="text" name='role' value={editedPerson.role} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Avatar</label>
          <input type="text" name='img' value={editedPerson.img} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={isEditing ? handleSave : handleCreate}>{isEditing ? 'Modificar' : 'Crear'}</button>
      </form>
        </div>
        <div id="deleteModal" className='modal fade' tabIndex="-1">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Confirmar Eliminación</h4>
              <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close" onClick={cancelDelete}></button>
            </div>
            <div className='modal-body'>
              <p>¿Estás seguro de eliminar a {persons.find(person => person.id === personToDelete)?.name}</p>
            </div>
            <div className='modal-footer'>
              <button type="button" className='btn btn-secondary' data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
              <button type="button" className='btn btn-danger' data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

People.propTypes ={

    persons: PropTypes.array,
    setPersons: PropTypes.func
  
}
