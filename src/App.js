import React, { Component } from "react";
import Formulario from "./Componentes/Formulario";
import Usuario from "./Componentes/Usuario";
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import "./CSS/menu.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: []
        };
    }

    componentDidMount() {
        this.ListarUsuarios();
        
    }

    AgregarUsuarioFormulario = (nombre, usuario, correo) => {
        const usuarioNuevo = {
            id: this.state.usuarios.length + 1,
            name: nombre,
            username: usuario,
            email: correo,
        }
        this.AgregarUsuarioJPH(usuarioNuevo)

        this.setState({ usuarios: [...this.state.usuarios, usuarioNuevo] })
    }

    ListarUsuarios = () => {
        const URL = 'https://jsonplaceholder.typicode.com/users'
        fetch(URL).then((response) => response.json())
            .then((usuariosJSON) => this.setState({ usuarios: usuariosJSON }))
            .catch((e) => alert(e))
            .finally((e) => console.log('Termino el llamado'));
    }

    AgregarUsuarioJPH = (usuarioNuevo) => {
        const URL = "https://jsonplaceholder.typicode.com/users"
        const HEADER = {
            method: "POST",
            body: JSON.stringify({
                usuarioNuevo,
            }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }
        fetch(URL, HEADER)
        .then((response) => response.json())
        .then((usuarioJSON) => console.log(usuarioJSON))
        .catch(e => alert(e))
    }

    render() {
        return (
            <BrowserRouter>

            <nav className="menu">
                <NavLink to="/" className="enlace" activeClassName="activo" exact>Inicio</NavLink>
                <NavLink to="/formulario" className="enlace" activeClassName="activo">Formulario</NavLink>
                <NavLink to="/usuarios" className="enlace" activeClassName="activo">Usuarios</NavLink>
            </nav>


                <Switch>
                    
                    <Route path="/formulario">
                        <Formulario FuncionAgregar={this.AgregarUsuarioFormulario} />
                        
                    </Route>
                    <Route path="/usuarios">
                        {this.state.usuarios.map((e) => (
                            <Usuario
                                id={e.id}
                                key={e.id}
                                nombre={e.name}
                                usuario={e.username}
                                correo={e.email}
                            />
                        ))}
                    </Route>
                    <Route path="/" exact>
                        <Formulario FuncionAgregar={this.AgregarUsuarioFormulario} />
                        {this.state.usuarios.map((e) => (
                            <Usuario
                                id={e.id}
                                key={e.id}
                                nombre={e.name}
                                usuario={e.username}
                                correo={e.email}
                            />
                        ))}
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}