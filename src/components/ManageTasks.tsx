import { useState, useEffect } from 'react';
import SingleTask from './SingleTask';
import { Task } from '../assets/types';
import { Link } from 'react-router-dom';
import { getFilteredTasks } from '../redux/actions/actions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';
import { useAppDispatch } from '../redux/hook';
import Loader from './Loader';

export default function ManageTask (){

  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string| undefined>(undefined);
  const { filteredTasks, loading } = useSelector((state: RootState) => state);
  const [updateTrigger, setUpdateTrigger] = useState(false);  // Usado para pasar prop al hijo y forzar el re-render en el padre.

    // Conversión de los strings del formulario en los tipos de datos requeridos por el filtro de la API.
    const params: Record<string, any> = {};

    if (filter === 'true') {
      params.completed = true;
    } else if (filter === 'false') {
      params.completed = false;
    }

    const triggerUpdate = () => {
      setUpdateTrigger(prev => !prev); // Cambia el estado para forzar el re-fetch
    };

    useEffect(() => {
      dispatch(getFilteredTasks(params))
    }, [filter, dispatch, updateTrigger]);

    // Las actions en redux también manejan un estado loading que presenta un spinner mientras se resuelve la solicitud.
    if (loading){
      return (
        <Loader/>
      )
    } else return (
        
        <div className='flex flex-col items-center bg-white h-full rounded-md p-7'>
          <div className='flex justify-between space-x-4 w-full mb-10 mt-5'>
          <h1 className='font-bold lg:text-6xl md:text-5xl sm:text-3xl'>Gestor de Tareas</h1>
            <Link
                  to={"/new-task"}
                  className="md:text-lg sm:text-sm text-center font-semibold bg-purple-800 text-white py-1 md:px-3 sm:px-1 my-auto rounded-md h-fit max-h-fit w-fit max-w-32 transition-all transform hover:scale-105 hover:bg-purple-600 hover:shadow-md"
              >
              Nueva Tarea
            </Link>
          </div>

          <div className='flex gap-2 font-semibold mr-auto mb-8'>
            <label
              htmlFor='completed_filter'
              className='text-lg'
            >
              Filtrar:
            </label>
            <select
            className='px-4 rounded-md border border-slate-300'
              id='completed_filter'
              name="completed_filter"
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value)
              }}
            >
              <option value=''>Todas las tareas</option>
              <option value='true'>Completadas</option>
              <option value='false'>Pendientes</option>
            </select>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
            {filteredTasks.map((task: Task) => (
              <SingleTask
                key={task._id}
                id={task._id}
                title={task.title}
                completed={task.completed}
                description={task.description}
                createdAt={task.createdAt}
                onUpdate={triggerUpdate} // Pasamos el método al hijo
              />
            ))}
          </div>
        </div>
    );
};