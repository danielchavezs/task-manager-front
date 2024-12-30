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

    const params: Record<string, any> = {};

    if (filter === 'true') {
      params.completed = true;
    } else if (filter === 'false') {
      params.completed = false;
    }

    // const fetchTasks = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await axios.get(`${BACKEND_URL}/api/tasks`, { params });
    //     setTasks(response.data);
    //     setApiError(false);
    //   } catch (error) {
    //     setApiError(true);
    //   }
    //   setLoading(false);
    // };

    useEffect(() => {
      // fetchTasks();
      dispatch(getFilteredTasks(params))
    }, [filter, dispatch]);

    if (loading){
      return (
        <Loader/>
      )
    } else return (
        
        <div className='flex flex-col items-center bg-white h-full rounded-md p-7'>
          <div className='flex justify-between border-0 border-red-500 w-full mb-10 mt-5'>
          <h1 className='font-bold text-5xl'>Gestor de Tareas</h1>
            <Link
                  to={"/new-task"}
                  className="text-lg font-semibold bg-purple-500 text-white py-1 px-3 rounded-md h-fit"
              >
              Nueva Tarea +
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
              />
            ))}
          </div>
        </div>
    );
};