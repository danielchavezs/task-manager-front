export default function SingleTask ({title, description, completed}: {title: string, description: string, completed: boolean}) {

    return (
        <div className="flex border-2 bprder-red w-full">
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{completed}</p>
        </div>
    )
};