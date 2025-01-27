import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/utils";

export default function SingleTask ({id, title, description, completed, createdAt, onUpdate}: {id: string, title: string, description: string, completed: boolean, createdAt: string, onUpdate: () => void}) {

    // Estado usado para esconder y mostrar con una animación de CSS
    // la fecha de creación y la descripción en la tarjeta de cada tarea.
    const [showing, setShowing] = useState(false);

    const status = () => (completed ? "Completado" : "Pendiente");

    // Formateo de la fecha para que sea compatible con MongoDB
    const newDate = new Date(createdAt);
    const creationDate = newDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    // Actualizar 'showing' en función del tamaño de la pantalla
    useEffect(() => {
        const updateShowingForScreenSize = () => {
        const isSmallScreen = window.matchMedia("(max-width: 720px)").matches; // Hasta tamaño `sm`
        setShowing(isSmallScreen);
    };

    updateShowingForScreenSize(); // Configurar al cargar el componente
    window.addEventListener("resize", updateShowingForScreenSize); // Escuchar cambios de tamaño

    return () => window.removeEventListener("resize", updateShowingForScreenSize); // Limpiar evento
  }, []);

    // Función encargada de cambiar "completed" directamente desde la lista de las tareas, usando estado local
    // pero también haciendo una solicitud a la API y la base de datos.
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
            const response = await axios.put(`${BACKEND_URL}/api/tasks/${id}`, newTask);
            if (response.status === 200){
                window.alert("Tarea actualizada exitosamente");
                onUpdate(); // Llama al método del padre para forzar el re-fetch
            } else { window.alert("Error actualizando la tarea.") }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div 
            className=
            { completed? "flex shadow-lg border-0 min-w-[270px] rounded-md p-2 bg-slate-900 border-slate-800 h-fit transition-all transform hover:shadow-md hover:shadow-green-900" :
                "flex shadow-lg border-0 min-w-[270px] rounded-md p-2 bg-slate-900 border-slate-800 h-fit transition-all transform hover:shadow-md hover:shadow-orange-900"     
            }
            onMouseEnter={() => setShowing(true)}
            onMouseLeave={() => setShowing(false)}
        >
            
            <Link to={`/id/${id}`} className="w-full mr-2">
                <div className="flex flex-col space-y-1 w-full">
                    
                    <h2 className="font-bold lg:text-lg">{title}</h2>
                    {/* <p className="font-semibold lg:text-base sm:text-sm">{status()}</p> */}
                    <p className="font-semibold lg:text-base sm:text-sm">{creationDate}</p>
                    <div
                        className={`flex flex-col mt-4 overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out ${
                            showing ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        >
                        <p className="font-semibold lg:text-base sm:text-sm mt-4">{description}</p>
                    </div>

                </div>
            </Link>

            {/* <button
                    type="button"
                    onClick={toogleState}
                    className= "bg-slate-700 w-fit py-1 h-fit px-3 m-auto rounded-md text-white font-semibold lg:text-base sm:text-sm transition-all transform hover:scale-105 hover:bg-slate-600 hover:shadow-md" 
                >
                Marcar
            </button> */}
            <button
                    type="button"
                    onClick={toogleState}
                    className={ completed? "border border-green-500 w-fit py-1 h-fit px-3 m-auto rounded-md text-white font-semibold lg:text-base sm:text-sm transition-all transform hover:scale-105 hover:bg-green-700 hover:shadow-md" : 
                        "border border-orange-600 w-fit py-1 h-fit px-3 m-auto rounded-md text-white font-semibold lg:text-base sm:text-sm transition-all transform hover:scale-105 hover:bg-orange-700 hover:shadow-md"     
                    }
                >
                {status()}
            </button>
        </div>
    )
};