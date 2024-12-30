import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/utils";

export default function CreateTask () {
   
    const [task, setTask] = useState<any>({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        completed: false,
    });

 
    const newDate = new Date(task.createdAt);
    const creationDate = newDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

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
        <div>
            <Link
                to={"/"}
                className="text-lg font-bold mb-20"
            >
             {"<--"} Inicio
            </Link>
            <div className="flex flex-col justify-center md:flex-row space-y-10 md:space-y-0 mt-4 md:space-x-5 sm:space-x-0">
                
                <form
                    onSubmit={submitHandler}
                    className="flex flex-col md:w-2/5 justify-between bg-slate-300 p-5 rounded-md min-h-80"
                >
                    <h2 className="font-bold text-xl mb-4">Crear Nueva Tarea</h2>

                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-3">
                            <label
                                className="font-semibold"
                                htmlFor="completed_create"
                            >
                                Completado: <span className="text-red-600">*</span>
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
                                Título:
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
                            className="bg-green-500 w-fit py-1 px-4 rounded-md text-white font-semibold"
                        >
                            Crear Tarea
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
};