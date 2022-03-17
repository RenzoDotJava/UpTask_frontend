import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        repertirPassword: ''
    })
    const [alerta, setAlerta] = useState({})

    const handleChangeUsuario = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const { nombre, email, password, repertirPassword } = usuario

    const { msg } = alerta

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, email, password, repertirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        if (password !== repertirPassword) {
            setAlerta({
                msg: 'Los password no son iguales',
                error: true
            })
            return
        }

        if (password.length < 6) {
            setAlerta({
                msg: 'El password es muy corto, agrega mínimo 6 caracteres',
                error: true
            })
            return
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios`, usuario);

            setAlerta({
                msg: data.msg,
                error: false
            })

            setUsuario({
                nombre: '',
                email: '',
                password: '',
                repertirPassword: ''
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu Cuenta y Administra tus
                <span className="text-slate-700"> proyectos</span>
            </h1>
            {msg && <Alerta alerta={alerta} />}
            <form
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="nombre"
                    >Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Tu Nombre"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        name="nombre"
                        value={nombre}
                        onChange={handleChangeUsuario}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        name="email"
                        value={email}
                        onChange={handleChangeUsuario}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                    >Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        name="password"
                        value={password}
                        onChange={handleChangeUsuario}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="repertirPassword"
                    >Repetir Password</label>
                    <input
                        id="repertirPassword"
                        type="password"
                        placeholder="Repetir tu Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        name="repertirPassword"
                        value={repertirPassword}
                        onChange={handleChangeUsuario}
                    />
                </div>
                <input
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/"
                >¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/olvide-password"
                >Olvide Mi Password</Link>
            </nav>
        </>
    )
}

export default Registrar