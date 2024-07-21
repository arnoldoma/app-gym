import React from 'react'
import { Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ListApp = ({ story, handleDelete, handleEdit }) => {

  console.log(story);
  return (
    <Col>
      <h3 className="text-center">Listado de actividades</h3>
      <br />
      <Link to="/historial/create" className="btn btn-primary">Nuevo registro</Link>
      <br />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Actividad</th>
            <th>Jornada</th>
            <th>Duración (Horas) </th>
            <th>Distancia (Metros)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            story && story.length > 0 ?
              story.map(stry => (
                <tr key={stry.id}>
                  <td>{stry.actividad}</td>
                  <td>{stry.jornada}</td>
                  <td>{stry.duracion}</td>
                  <td>{stry.distancia}</td>
                  <td>
                    <Link to={`/historial/${stry.id}`} className="btn btn-primary mx-1" onClick={() => (handleEdit(stry.id))}>Editar</Link>
                    <Link className="btn btn-danger mx-1" onClick={() => (handleDelete(stry.id))}>Eliminar</Link>
                  </td>
                </tr>
              )) : //Si es falso
              (<tr>
                <td colSpan={5} className="text-center">No hay registros</td>
              </tr>
              )
          }
        </tbody>
      </Table>
    </Col>
  )
}
