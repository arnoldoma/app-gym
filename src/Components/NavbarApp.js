import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavbarApp = () => {
    const user = JSON.parse(localStorage.getItem('user')) || null

    return (
        <>
            <header >
                <nav className="nav-app">
                    <ul className="menu-area">
                        <li>
                            <NavLink to="/dashboard"
                                className={({ isActive }) => isActive ? "activado" : ""}
                            >Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/historial/lista'}
                                className={({ isActive }) => isActive ? "activado" : ""}
                            >Actividades</NavLink>
                        </li>
                        <li>
                            <NavLink to="/historial/create" className={({ isActive }) => isActive ? "activado" : ""}
                            >Nuevo registro</NavLink>
                        </li>
                    </ul>
                    <ul className="menu-area">
                        <li>
                            <NavLink to="/perfil"
                                className={({ isActive }) => isActive ? "activado" : ""}
                            >{user?.nombre}</NavLink>
                        </li>
                        <li>
                            <NavLink to="/"
                                className={({ isActive }) => isActive ? "activado" : ""}
                            >Cerrar Sesion</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
