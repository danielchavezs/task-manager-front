import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/utils";
import { getByID } from "../redux/actions/actions";
import { useSelector } from "react-redux";
import { RootState } from '../redux/reducer';
import { useAppDispatch } from "../redux/hook";
import Loader from "./Loader";

export default function TaskDetail () {
   
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [deleteAction, setDeleteAction] = useState(false);
    const [taskModified, setTaskModified] = useState(false);
    const { singleTask, loading } = useSelector((state: RootState) => state);
    const navigate = useNavigate();

    // Estado incial para el formulario de actualización
    const [form, setForm] = useState({
        title: "",
        description: "",
        completed: false,
    });   

    // Volvemos a realziar el fetch de los datos de la tarea al ejecutarse algún cambio.
    useEffect (() => {
        dispatch(getByID(id));
    }, [id, taskModified]);

    if (!singleTask) {
        return null; // O muestro un mensaje de carga o error
    }

    const status = () => {
        if(singleTask?.completed){
            return "Completado"
        } else return "Pendiente"
    };

    const newDate = new Date(singleTask.createdAt);
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

    // Su función es generar un nivel adicional de protección y evitar que se borren datos por accidente.
    const deleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDeleteAction(true);
    };

    // Función que realmente ejecuta la llamada a la API para eliminar la tarea
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
    
    if (loading){
        return (
            <Loader/>
        )
    } else return (
        <div className="p-4">
            <Link
                to={"/"}
                className="text-lg md:text-xl font-bold mb-20 transition-all transform hover:scale-105 hover:text-2xl"
            >
             🏡 Inicio
            </Link>
            <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:mt-16 sm:mt-8 md:space-x-8 sm:space-x-0">
                <div className="flex flex-col justify-between lg:w-3/5 md:w-1/2 border-0">
                    <div>
                        <h1 className="font-bold lg:text-5xl md:text-4xl sm:text-2xl mb-10">{singleTask.title}</h1>

                        <div className="flex flex-col space-y-1 w-full text-lg font-semibold">
                            <p className="text-base md:text-lg">Estado: {status()}</p>                   
                            <p className="text-base md:text-lg">Creado: {creationDate}</p>
                            <p className="text-base md:text-lg">{singleTask.description}</p>  
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={deleteButton}
                        className= { 
                            deleteAction? "hidden" : "mt-10 bg-red-700 sm:text-sm md:text-base w-fit py-1 px-4 rounded-md text-white font-bold transition-all transform hover:scale-105 hover:bg-red-600 hover:shadow-md"} 
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
                                className= "bg-red-700 sm:text-sm md:text-base w-fit py-1 px-4 rounded-md text-white font-bold transition-all transform hover:scale-105 hover:bg-red-600 hover:shadow-md"
                            >
                                Confirmar
                            </button>
                            <button
                                type="button"
                                onClick={() => setDeleteAction(false)}
                                className= "bg-slate-500 sm:text-sm md:text-base w-fit py-1 px-4 rounded-md text-white font-bold transition-all transform hover:scale-105 hover:bg-slate-400 hover:shadow-md"
                            >
                                Cancelar
                            </button>    
                        </div>    
                    </div>
                </div>

                <form
                    onSubmit={submitHandler}
                    className="flex flex-col shadow-xl lg:w-2/5 md:w-1/2 justify-between bg-slate-300 p-5 rounded-md min-h-80"
                >
                    <h2 className="font-bold sm:text-xl md:text-2xl mb-4">Actualizar tarea</h2>

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
                            className="bg-green-600 sm:text-sm md:text-base w-fit py-1 px-4 rounded-md text-white font-bold transition-all transform hover:scale-105 hover:bg-green-500 hover:shadow-md"
                        >
                            Actualizar
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
};