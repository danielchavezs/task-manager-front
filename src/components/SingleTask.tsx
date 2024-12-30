import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/utils";

export default function SingleTask ({id, title, description, completed, createdAt}: {id: string, title: string, description: string, completed: boolean, createdAt: string}) {

    const [showing, setShowing] = useState(false);

    const status = () => {
        if(completed){
            return "Completado"
        } else return "Pendiente"
    };

    const newDate = new Date(createdAt);
    const creationDate = newDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    const toogleState = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const newState = () =>{
            let state = null;

            if(completed){
                state = false;
            } else {
                state = true;
            }
            return state;
        }

        const newTask = {
            completed: newState()
        };

        try {
            console.log("Param pasado a la API:", newTask)
            const response = await axios.put(`${BACKEND_URL}/api/tasks/${id}`, newTask);
            if (response.status === 200){
                console.log("RESPUESTA EN CLIENTE:", response);
                window.alert("Tarea actualizada exitosamente");
            } else { window.alert("Error actualizando la tarea.") }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div 
        // "flex border-2 min-w-72 bg-slate-400 rounded-md p-2"
            className={ completed? "flex border-2 min-w-[270px] rounded-md p-2 bg-green-300 border-slate-800 h-fit" : 
                "flex border-2 min-w-[270px] rounded-md p-2 bg-orange-400 border-slate-800 h-fit"     
            }
            onMouseEnter={() => setShowing(true)}
            onMouseLeave={() => setShowing(false)}
        >
            
            <Link to={`/id/${id}`} className="w-full">
                <div className="flex flex-col space-y-2 w-full">
                    
                    <h2 className="font-bold text-lg">{title}</h2>
                    <p className="font-semibold">{status()}</p>
                    {/* <div className={`flex flex-col mt-4 transition-all duration-1000 ease-in-out ${showing ? 'max-h-fit opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                        <p>Creado: {creationDate}</p>
                        <p>{description}</p>  
                    </div> */}
                    <div
                        className={`flex flex-col mt-4 overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out ${
                            showing ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        >
                        <p className="font-semibold">Creado: {creationDate}</p>
                        <p className="font-semibold">{description}</p>
                    </div>

                </div>
            </Link>

            <button
                    type="button"
                    onClick={toogleState}
                    className= "bg-slate-700 w-fit py-1 h-fit px-3 m-auto rounded-md text-white font-semibold transition-all transform hover:scale-105 hover:bg-slate-600 hover:shadow-md" 
                >
                Marcar
            </button>
        </div>
    )
};