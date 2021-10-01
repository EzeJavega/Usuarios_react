import React, { Component } from "react";
import '../CSS/form.css';
import '../CSS/button.css'

export default class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            usuario: "",
            correo: "",
        };
    }

    AgregarUsuario = (e) => {
        e.preventDefault();

        this.props.FuncionAgregar(this.state.nombre,this.state.usuario,this.state.correo);

        this.InicializarEstado();
    };

    InicializarEstado = () => {
        this.setState({ nombre: "", usuario: "", correo: "" })
    }

    AsignarEstado = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <form id="FormularioUsuario" onSubmit={this.AgregarUsuario}>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Ingrese el nombre de usuario"
                        required={true}
                        value={this.state.nombre}
                        onChange={this.AsignarEstado}
                    />
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Ingrese el usuario"
                        required={true}
                        value={this.state.usuario}
                        onChange={this.AsignarEstado}
                    />
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        placeholder="usuario@dominio.ext"
                        required={true}
                        value={this.state.correo}
                        onChange={this.AsignarEstado}
                    />
                    <div>
                        <button className="success" type="submit">Agregar usuario</button>
                        <button className="warning" type="reset">Limpiar</button>
                    </div>
                </form>
            </div>
        );
    }
}