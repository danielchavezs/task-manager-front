import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/utils";

export default function CreateTask () {
   
    const [task, setTask] = useState<any>({});
    const navigate = useNavigate();

    // Valores iniciales del formulario para crear una tarea
    const [form, setForm] = useState({
        title: "",
        description: "",
        completed: false,
    });

    // Formateo de la fecha para que sea compatible con MongoDB
    const newDate = new Date(task.createdAt);
    const creationDate = newDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    // Esta función convierte los strings del formulario en los tipos de datos requeridos por la API.
    const taskUpdate = () => {
        let task = {};

        if (form.completed === true || form.completed === false ){
            task = {...task, completed: form.completed}
        } if (form.title) {
            task = {...task, title: form.title}
        } if (form.description){
            task = {...task, description: form.description}
        }
        return task;
    };

    const changeHandlder = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm((prevParameters) => ({
            ...prevParameters,
            [property]: value,
        }));
    };


    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Se ejecuta el formateo de los datos del formulario
        const newTask = taskUpdate();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/tasks/`, newTask);
            console.log("Client response - POST: ", response);
            if (response.status === 200){
                window.alert("Tarea creada exitosamente");
                navigate(`/`)
            } else { window.alert("Error creando la tarea.") }
        } catch (error) {
            console.error(error);
        }
    };

    console.log("FORM:", form);

    if (!task){
        return (
            <div>
                <p>ERROR OBTENIENDO LA TAREA</p>
            </div>
        )
    } else return (
        <div className="p-4">
            <Link
                to={"/"}
                className="text-lg md:text-xl font-bold mb-20 transition-all transform hover:scale-105 hover:text-2xl"
            >
             🏡 Inicio
            </Link>
            <div className="flex flex-col justify-center md:flex-row space-y-10 md:space-y-0 mt-16 md:space-x-5 sm:space-x-0">
                
                <form
                    onSubmit={submitHandler}
                    className="flex flex-col shadow-xl md:w-3/5 lg:w-2/5 justify-between bg-slate-300 sm:p-3 md:p-5 rounded-md min-h-80"
                >
                    <h2 className="font-bold lg:text-3xl sm:text-xl text-center sm:mb-8 md:mb-12">Crear Nueva Tarea</h2>

                    <div className="flex flex-col space-y-4 sm:text-sm md:text-base">
                        <div className="flex space-x-3">
                            <label
                                className="font-semibold"
                                htmlFor="completed_create"
                            >
                                Completado:
                            </label>

                            <input
                                id="completed"
                                name="completed_create"
                                type="checkbox"
                                checked={form.completed}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        completed: event.target.checked
                                    })
                                }}   
                            >
                            </input>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label
                                className="font-semibold"
                                htmlFor="title_create"
                            >
                                Título: <span className="text-red-600">*</span>
                            </label>

                            <input
                                required
                                id="title_create"
                                name="title"
                                type="text"
                                value={form.title} 
                                onChange={(e) => {
                                    changeHandlder(e);
                                }}   
                            >
                            </input>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label
                                className="font-semibold"
                                htmlFor="description_create"
                            >
                                Descripción:
                            </label>

                            <textarea
                                className="min-h-24"
                                id="description_create"
                                name="description"
                                value={form.description} 
                                onChange={(event) => {
                                    changeHandlder(event);
                                }}   
                            >
                            </textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 sm:text-sm md:text-base w-fit py-1 px-4 rounded-md text-white font-semibold transition-all transform hover:scale-105 hover:bg-green-500 hover:shadow-md"
                        >
                            Crear Tarea
                        </button>
                    </div>

                </form>

            </div>
            <p className="text-center md:text-sm sm:text-xs mt-3">Recuerda que el título es obligatorio para crear una nueva tarea.</p>

        </div>
    )
};