import React from 'react'
import { Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';


export const EditForm = ({ editStory, handleUpdate }) => {
    // Variable de navegacion
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm(
        { defaultValues: editStory }
    );

    // Seteamos los valores al formulario
    setValue('actividad', editStory.actividad);
    setValue('jornada', editStory.jornada);
    setValue('duracion', editStory.duracion);
    setValue('distancia', editStory.distancia);

    // Obtener registro formulario
    const OnSubmit = (data, e) => {
        // Enviar Datos
        handleUpdate(editStory.id, data);
        // Limpiar los campos
        reset();
        navigate('/historial');
    }

    return (
        <>
            <Col sm={12} md={6}  lg={6}  xl={4}  className=" m-auto justify-content-center">
                <Form onSubmit={handleSubmit(OnSubmit)}>
                    <h1>Actualizar Registro</h1>
                    <br />
                    {/* Tipo de actividad */}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Tipo de actividades</Form.Label>
                        <Form.Select aria-label="Default select example"
                            {...register('actividad',
                                {
                                    required: { value: true, message: 'Por favor ingrese una actividad.' }
                                }
                            )}
                        >
                            <option>Selecciona una actividad</option>
                            <option value="Correr">Correr</option>
                            <option value="Caminar">Caminar</option>
                            <option value="Nadar">Nadar</option>
                            <option value="Ciclismo">Ciclismo</option>
                        </Form.Select>
                        <Form.Text className="text-secondary">
                            {errors?.actividad?.message}
                        </Form.Text>
                    </Form.Group>
                    {/* Jornada */}
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                        <Form.Label>Jornada</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            {...register('jornada',
                                {
                                    required: { value: true, message: 'Por favor ingrese una jornada.' }
                                }
                            )}
                        >
                            <option>Selecciona una jornada</option>
                            <option value="En la mañana">En la mañana</option>
                            <option value="En la tarde">En la tarde</option>
                            <option value="En la noche">En la noche</option>
                        </Form.Select>
                        <Form.Text className="text-secondary">
                            {errors?.jornada?.message}
                        </Form.Text>
                    </Form.Group>
                    {/* Duracion */}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Duracion en horas</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Duración en horas"
                            {...register('duracion',
                                {
                                    required: { value: true, message: 'Por favor ingrese una duracion.' }
                                }
                            )}
                        />
                        <Form.Text className="text-secondary">
                            {errors?.duracion?.message}
                        </Form.Text>
                    </Form.Group>
                    {/* Distancia */}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Distancia en kilometros</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Distancia recorrido"
                            {...register('distancia',
                                {
                                    required: { value: true, message: 'Por favor ingrese una distancia.' }
                                }
                            )}
                        />
                        <Form.Text className="text-secondary">
                            {errors?.distancia?.message}
                        </Form.Text>
                    </Form.Group>

                    <div className="mb-3 d-flex justify-content-center">
                        <Button variant="primary" type="submit" >
                        Actualizar
                        </Button>
                        <Link to={`/historial`} className="btn btn-danger mx-1" >Cancelar</Link>
                    </div>
                </Form>
            </Col>
        </>
    )
}
