import React from 'react'
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Registrarse = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const loginUser = (data, e) => {
        e.preventDefault();

        if (data.email !== '' && data.password !== '') {
            alert("Registro realizado correctamente");
            localStorage.setItem('user', JSON.stringify(data))
            navigate('/', { replace: true })
        } else {
            alert("Error al Registrar usuario");
        }
    }

    return (
        <Col xl={3} className="m-auto justify-content-center align-items-center">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <Form onSubmit={handleSubmit(loginUser)}>
                <h1 className="text-center">Registrarse</h1>
                <br />
                <br />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="nombre"
                        placeholder="Nombre y apellido"
                        {...register('nombre',
                            {
                                required: { value: true, message: 'Por favor ingrese un nombre.' }
                            }
                        )}
                    />
                    <Form.Text className="text-secondary">
                        {errors?.nombre?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo eléctronico</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Correo eléctronico"
                        {...register('email',
                            {
                                required: { value: true, message: 'Por favor ingrese un email.' }
                            }
                        )}
                    />
                    <Form.Text className="text-secondary">
                        {errors?.email?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        {...register('password',
                            {
                                required: { value: true, message: 'Por favor ingrese el password.' }
                            }
                        )}
                    />
                    <Form.Text className="text-secondary">
                        {errors?.password?.message}
                    </Form.Text>
                </Form.Group>

                <br />
                <br />
                <div className="mb-3 d-flex justify-content-center">
                    <Button variant="primary" type="submit" >
                        Registrarse
                    </Button>
                </div>
            </Form>
        </Col>
    )
}
