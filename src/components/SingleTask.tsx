export default function SingleTask ({title, description, completed, createdAt}: {title: string, description: string, completed: boolean, createdAt: string}) {

    const status = () => {
        if(completed){
            return "Completado"
        } else return "Pendiente"
    };

    const newDate = new Date(createdAt);
    const creationDate = newDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <div className="flex border-2 min-w-72 border-red-400">
            <div className="flex flex-col border-2 space-y-2 w-full border-fuchsia-400">
                <h2 className="font-semibold">{title}</h2>
                <p>Estado: {status()}</p>
                <p>Creado: {creationDate}</p>
                <p>{description}</p>  
            </div>
            <div className="border-2 border-green-500 p-2 m-auto">
                botón
            </div>
        </div>
    )
};