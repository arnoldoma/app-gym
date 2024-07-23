import React, { useEffect, useReducer, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../Components/Dashboard'
import { ListApp } from '../Components/ListApp'
import { AddForm } from '../Components/AddForm'
import { EditForm } from '../Components/EditForm'
import { ErrorPage } from '../Components/ErrorPage'
import { gymReducer } from '../Reducers/gymReducers'
import { NavbarApp } from '../Components/NavbarApp'

const init = () => {
  return JSON.parse(localStorage.getItem("story")) || [];
}

export const RouterHome = () => {

  //Inicializador
  const [story, dispatch] = useReducer(gymReducer, [], init);
  // Cargar datos
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

  // *** EDITAR ***
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
      setEditStory({
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

  // Recibo los datos para editar y lo pasamos a setEditName
  const handleEdit = (id) => {
    setEditIndex(id);
  }

  // *** ACTUALIZAR ***
  // Creamos la funcion actualizar y pasamos los parametros id y callback updateUser
  const handleUpdate = (id, updateData) => {
    let upData = {
      id: id,
      actividad: updateData.actividad,
      jornada: updateData.jornada,
      duracion: updateData.duracion,
      distancia: updateData.distancia
    };
    // Enviamos a reducer
    const action = {
      type: "edit",
      payload: upData
    };
    dispatch(action);
    // Resetear index a editar
    setEditIndex(null)
  }

  // *** ELIMINAR ***
  const handleDelete = id => {
    const action = {
      type: "delete",
      payload: id
    };
    dispatch(action);
  }

  // Configuracion Grafico de barra
  const barData = {
    labels: story.map(stor => stor.actividad ),
    datasets: [
      {
        label: 'Distancia en km',
        data: story.map(stor => stor.distancia),
        backgroundcolor: 'blue'
      },
      {
        label: 'Duracion tiempo',
        data: story.map(stor => stor.duracion),
        backgroundcolor: 'yellow'
      }
    ]
  };

  // Configuracion Grafico circular
  const barPie = {
    labels: story.map(stor => stor.jornada),
    datasets: [
      {
        label: 'Duracion',
        data: story.map(stor => stor.duracion),
        backgroundcolor: [
          'yellow',
          'red',
          'ble',
          'green',
          'brown'
        ]
      }
    ]
  };

  return (
    <>
      <NavbarApp />
      <section className="container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard barData={barData} barPie={barPie} />}></Route>
          <Route path="/historial/*" element={<ListApp story={story} handleDelete={handleDelete} handleEdit={handleEdit} />}></Route>
          <Route path="/historial/lista" element={<ListApp story={story} handleDelete={handleDelete} handleEdit={handleEdit} />}></Route>
          <Route path="/historial/create" element={<AddForm handleAdd={handleAdd} />}></Route>
          <Route path="/historial/:id" element={<EditForm editStory={editStory} handleUpdate={handleUpdate} />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </section>
    </>
  )
}
