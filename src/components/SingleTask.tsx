import { useState } from "react";
import { Link } from "react-router-dom";

export default function SingleTask ({id, title, description, completed, createdAt}: {id: string, title: string, description: string, completed: boolean, createdAt: string}) {

    const [showing, setShowing] = useState(false);

    const status = () => {
        if(completed){
            return "Completado"
        } else return "Pendiente"
    };

    const newDate = new Date(createdAt);
    const creationDate = newDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div 
            className="flex border-2 min-w-72 bg-slate-400 rounded-md p-2"
            onMouseEnter={() => setShowing(true)}
            onMouseLeave={() => setShowing(false)}
        >
            
            <Link to={`/id/${id}`} className="w-full">
                <div className="flex flex-col space-y-2 w-full">
                    
                    <h2 className="font-semibold">{title}</h2>
                    <p>Estado: {status()}</p>
                    {/* flex flex-col border border-cyan-200 */}
                    <div className={`flex flex-col mt-4 transition-all duration-700 ease-in-out ${showing ? 'max-h-fit opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                        <p>Creado: {creationDate}</p>
                        <p>{description}</p>  
                    </div>
                </div>
            </Link>
            <div className="p-2 m-auto">
                botón
            </div>
        </div>
    )
};