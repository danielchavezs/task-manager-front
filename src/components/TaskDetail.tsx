import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../assets/utils";

export default function TaskDetail () {
   
    const { id } = useParams();
    const [task, setTask] = useState<any>({});
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        completed: false,
    });

    const getTask = async (id: string | undefined) => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/tasks/${id}`);
        setTask(response.data);
        return response.data;
      } catch (error) {
        // setError(error.message)
        console.error("Error obteniendo la publicación:", error);
        alert(error);
      }
    };
    

    useEffect (() => {
        getTask(id);
    }, [id]);

    const status = () => {
        if(task.completed){
            return "Completado"
        } else return "Pendiente"
    };

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
            const response = await axios.put(`${BACKEND_URL}/api/tasks/${id}`, newTask);
            if (response.status === 200){
                window.alert("Tarea actualizada exitosamente");
            } else { window.alert("Error actualizando la tarea..") }
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
            <h1 className="font-bold text-4xl mb-8">{task.title}</h1>

            <div className="flex flex-col border-2 space-y-2 w-full border-fuchsia-400">
                <p>Estado: {status()}</p>                   
                <p>Creado: {creationDate}</p>
                <p>{task.description}</p>  
            </div>

            <form
                onSubmit={submitHandler}
                className="flex flex-col justify-between bg-slate-300 mt-20 p-4 rounded-md min-h-72"
            >
                <h2 className="font-bold text-xl mb-10">Actualizar tarea</h2>
                <div className="flex space-x-3">
                    <label
                        className=""
                        htmlFor="title_update"
                    >
                        Título:
                    </label>

                    <input
                        id="title_update"
                        name="title"
                        type="text"
                        value={form.title} 
                        onChange={(e) => {
                            changeHandlder(e);
                        }}   
                    >
                    </input>
                </div>
                <div className="flex space-x-3">
                    <label
                        className=""
                        htmlFor="completed_update"
                    >
                        Completado:
                    </label>

                    <input
                        id="completed"
                        name="completed_update"
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

                <div className="flex space-x-3">
                    <label
                        className=""
                        htmlFor="description_update"
                    >
                        Descripción:
                    </label>

                    <textarea
                        id="description_update"
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
                    Actualizar
                </button>
            </form>

        </div>
    )
};