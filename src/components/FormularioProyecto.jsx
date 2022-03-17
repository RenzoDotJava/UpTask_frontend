import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioProyecto = () => {
    const [proyectoForm, setProyectoForm] = useState({
        nombre: '',
        descripcion: '',
        fechaEntrega: '',
        cliente: ''
    })

    const params = useParams()

    const { mostrarAlerta, alerta, submitProyecto, proyecto, cargando } = useProyectos();

    useEffect(() => {
        if (params.id) {
            setProyectoForm({
                nombre: proyecto.nombre,
                descripcion: proyecto.descripcion,
                fechaEntrega: proyecto.fechaEntrega?.split('T')[0],
                cliente: proyecto.cliente
            })
        }
    }, [params])

    const handleChangeProyecto = e => {
        setProyectoForm({
            ...proyectoForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }

        await submitProyecto(proyectoForm, params.id)

        setProyectoForm({
            nombre: '',
            descripcion: '',
            fechaEntrega: '',
            cliente: ''
        })
    }

    const { msg } = alerta

    const { nombre, descripcion, fechaEntrega, cliente } = proyectoForm

    return (
        <form
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre"
                >Nombre Proyecto</label>
                <input
                    id="nombre"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Proyecto"
                    name="nombre"
                    value={nombre}
                    onChange={handleChangeProyecto}
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="descripcion"
                >Descripción</label>
                <textarea
                    id="descripcion"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripción del Proyecto"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChangeProyecto}
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="fecha-entrega"
                >Fecha Entrega</label>
                <input
                    id="fecha-entrega"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="fechaEntrega"
                    value={fechaEntrega}
                    onChange={handleChangeProyecto}
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="cliente"
                >Nombre Cliente</label>
                <input
                    id="cliente"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Cliente"
                    name="cliente"
                    value={cliente}
                    onChange={handleChangeProyecto}
                />
            </div>

            <input
                type="submit"
                value={params.id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}

export default FormularioProyecto