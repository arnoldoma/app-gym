import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [user, setUser] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userLogin'))
        setUser(data);
    }, [])
    const validate  = ()=>{
            navigate('/historial')
    }
    const loginUser = (data, e) =>{
        e.preventDefault(); 
        localStorage.setItem('userLogin',JSON.stringify(data))
        validate()
    }


    
    return (
        <Form onSubmit={handleSubmit(loginUser)}>
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
            <Button variant="primary" type="submit" >
                Login
            </Button>
        </Form>)
}
