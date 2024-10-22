import React, { useEffect, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([])
    useEffect(() => {
        localStorage.removeItem('userLogin');
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user')) || null
        setUser(data)
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const loginUser = (data, e) => {
        e.preventDefault();

        if (user.email === data.email && user.password === data.password) {
            alert("Iniciaste sesion");
            localStorage.setItem('userLogin', JSON.stringify(data))
            navigate('/dashboard', { replace: true })
        } else {
            alert("Error al iniciar sesion");
        }
    }

    return (
        <Col sm={6} md={6}  lg={5}  xl={4} className="m-auto justify-content-center align-items-center">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

            <Form onSubmit={handleSubmit(loginUser)}>
                <h1 className="text-center">INICIAR SESION</h1>
                <br />
                <br />
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
                        Iniciar sesión
                    </Button>
                         { user?.email ?
                            <span></span> :
                             <Link to={`/registrarse`} className="btn btn-danger mx-1" >Registrarse</Link>
                         }
                </div>
            </Form>
        </Col>
    )
}
