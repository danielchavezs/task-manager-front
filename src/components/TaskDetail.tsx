import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/utils";

export default function TaskDetail () {
   
    const { id } = useParams();
    const [task, setTask] = useState<any>({});
    const [deleteAction, setDeleteAction] = useState(false);
    const [taskModified, setTaskModified] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        completed: false,
    });


    const getTask = async (id: string | undefined) => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/tasks/${id}`);
        setTask(response.data);
        setTaskModified(false);
        return response.data;
      } catch (error) {
        // setError(error.message)
        console.error("Error obteniendo la publicación:", error);
        alert(error);
      }
    };
    

    useEffect (() => {
        getTask(id);
    }, [id, taskModified]);

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

    const deleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDeleteAction(true);
    };

    const confirmDeleteButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/tasks/${id}`);

            if (response.status === 200){
                window.alert("Tarea eliminada exitosamente");
                navigate('/');
            } else { window.alert("Error eliminando la tarea.") }
        } catch (error) {
            console.error(error);
        }
    };

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTask = taskUpdate();
        try {
            const response = await axios.put(`${BACKEND_URL}/api/tasks/${id}`, newTask);
            if (response.status === 200){
                setTaskModified(true);
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
            <Link
                to={"/"}
                className="text-lg font-bold mb-20"
            >
             {"<--"} Inicio
            </Link>
            <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 mt-4 md:space-x-5 sm:space-x-0">
                <div className="flex flex-col justify-between md:w-3/5 border-0">
                    <div>
                        <h1 className="font-bold text-6xl mb-10">{task.title}</h1>

                        <div className="flex flex-col space-y-1 w-full">
                            <p>Estado: {status()}</p>                   
                            <p>Creado: {creationDate}</p>
                            <p>{task.description}</p>  
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={deleteButton}
                        className= { 
                            deleteAction? "hidden" : "bg-red-600 w-fit py-1 px-4 rounded-md text-white font-semibold"} 
                    >
                        Borrar Tarea
                    </button>

                    <div
                        className= { 
                        deleteAction ? "block mt-8" : "hidden"} 
                    >

                        <p className="text-sm font-semibold">¿Confirmar borrado de tarea? Esta acción no se puede deshacer.</p>

                        <div className="flex gap-2 mt-1">
                            <button
                                type="button"
                                onClick={confirmDeleteButton}
                                className= "bg-red-600 w-fit py-1 px-4 rounded-md text-white font-semibold"
                            >
                                Confirmar
                            </button>
                            <button
                                type="button"
                                onClick={() => setDeleteAction(false)}
                                className= "bg-slate-400 w-fit py-1 px-4 rounded-md text-white font-semibold"
                            >
                                Cancelar
                            </button>    
                        </div>    
                    </div>
                </div>

                <form
                    onSubmit={submitHandler}
                    className="flex flex-col md:w-2/5 justify-between bg-slate-300 p-5 rounded-md min-h-80"
                >
                    <h2 className="font-bold text-xl mb-4">Actualizar tarea</h2>

                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-3">
                            <label
                                className="font-semibold"
                                htmlFor="completed_update"
                            >
                                Completado: <span className="text-red-600">*</span>
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

                        <div className="flex flex-col space-y-3">
                            <label
                                className="font-semibold"
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

                        <div className="flex flex-col space-y-3">
                            <label
                                className="font-semibold"
                                htmlFor="description_update"
                            >
                                Descripción:
                            </label>

                            <textarea
                                className="min-h-24"
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
                    </div>

                </form>

            </div>
        </div>
    )
};