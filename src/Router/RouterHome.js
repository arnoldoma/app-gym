import React, { useEffect, useReducer, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { Login } from '../Components/Login'
import { Dashboard } from '../Components/Dashboard'
import { ListApp } from '../Components/ListApp'
import { AddForm } from '../Components/AddForm'
import { EditForm } from '../Components/EditForm'
import { ErrorPage } from '../Components/ErrorPage'
import { gymReducer } from '../Reducers/gymReducers'

const init = () => {
  return JSON.parse(localStorage.getItem("story")) || [];
}
export const RouterHome = () => {
  //Inicializador
  const [story, dispatch] = useReducer(gymReducer, [], init);
  // Cargar las tareas
  useEffect(() => {
    localStorage.setItem("story", JSON.stringify(story));
  }, [story]);

  // Obtener registro formulario y guardar
  const handleAdd = (data) => {
    let newData = {
      id: new Date().getTime(),
      actividad: data.actividad,
      jornada: data.jornada,
      duracion: data.duracion,
      distancia: data.distancia
    };
    const action = {
      type: "create",
      payload: newData
    }
    dispatch(action);
  }

  // *** EDITAR USUARIO ***
  const [editIndex, setEditIndex] = useState(null);
  const [editStory, setEditStory] = useState({
    id: null,
    actividad: '',
    jornada: '',
    duracion: '',
    distancia: ''
  });

  useEffect(() => {
    if (editIndex !== null) {
      const data = story.filter(data => data.id === editIndex);
      // Pasamos los valores recibidos para editar
      setEditStory(
        {
        id: data[0].id,
        actividad: data[0].actividad,
        jornada: data[0].jornada,
        duracion: data[0].duracion,
        distancia: data[0].distancia
        });
    } else {
      setEditStory('');
    }
  }, [editIndex, story]);

  console.log(editStory);
  // Recibo los datos para editar y lo pasamos a setEditName
  const handleEdit = (id) => {
    setEditIndex(id);
  }
  // *** ACTUALIZAR TAREA ***
  // Creamos la funcion actualizar y pasamos los parametros id y callback updateUser
  const handleUpdate = (id, updateData) => {
    console.log( updateData );
    let data =  {
      id: id,
      actividad: updateData.actividad,
      jornada: updateData.jornada,
      duracion: updateData.duracion,
      distancia: updateData.distancia
      };
    // Enviamos a reducer
    const action = {
      type: "edit",
      payload: data
    };
    dispatch(action);
    // Resetear index a editar
    setEditIndex(null)
  }

  // *** ELIMINAR TAREA ***
  const handleDelete = id => {
    const action = {
      type: "delete",
      payload: id
    };
    dispatch(action);
  }

  return (
    <BrowserRouter>
      <header >
        <nav className="container">
          <ul className="menu-area">
            <li>
              <NavLink to="/dashboard"
                className={({ isActive }) => isActive ? "activado" : ""}
              >Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/historial"
                className={({ isActive }) => isActive ? "activado" : ""}
              >Actividades</NavLink>
            </li>
            <li>
              <NavLink to="/historial/create"
                className={({ isActive }) => isActive ? "activado" : ""}
              >Nuevo registro</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <hr></hr>

      <section className="container">

        <Routes>
          <Route path="/" element={<Login />}></Route>

          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/historial" element={<ListApp story={story} handleDelete={handleDelete} handleEdit={handleEdit} />}></Route>
          <Route path="/historial/create" element={<AddForm handleAdd={handleAdd} />}></Route>
          <Route path="/historial/:id" element={<EditForm editStory={editStory} handleUpdate={handleUpdate} />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </section>
    </BrowserRouter>
  )
}
