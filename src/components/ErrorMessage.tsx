import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

export default function ErrorMessage() {
    const { error } = useSelector((state: RootState) => state);

    // Mostrar solo si hay un error activo
    if (error.success) return (
        <div className="flex flex-col items-center md:my-52 sm:my-36 space-y-8">
            <h2 className="sm:text-2xl md:text-3xl text-white text-center font-bold">No hay errores</h2>
            <Link
                to={"/"}
                className="text-lg md:text-xl font-bold mb-20 transition-all transform hover:scale-105 hover:text-2xl"
            >
             🏡 Inicio
            </Link>
        </div>
    );

    return (
        <div className="flex flex-col w-full h-full justify-center items-center md:py-52 sm:py-36 text-white">

            <div className="flex items-center justify-center w-16 h-16 bg-red-700 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.29 3.86L1.82 19.02a2 2 0 001.71 2.98h16.94a2 2 0 001.71-2.98L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01"
                    />
                </svg>
            </div>
            <p className="mt-4 text-lg font-semibold">
                Se ha generado un error: <span className="font-bold">{error.message}</span>
            </p>
            {error.code && (
                <p className="mt-2 text-sm font-medium">
                    Código de error: <span className="font-bold">{error.code}</span>
                </p>
            )}

            <Link
                to={"/"}
                className="text-lg md:mt-20 sm:mt-12 md:text-xl font-bold mb-20 transition-all transform hover:scale-105 hover:text-2xl"
            >
             🏡 Inicio
            </Link>
        </div>
    );
}
