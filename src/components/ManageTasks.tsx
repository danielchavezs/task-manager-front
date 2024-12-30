import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SingleTask from './SingleTask';
import { Task } from '../assets/types';
import { BACKEND_URL } from '../assets/utils';
import loaderUrl from '../assets/loader.svg'

export default function ManageTask (){

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState (false);

    const fetchTasks = async () => {
      setLoading(true);
      try {
        // setTimeout(() => {
        //   console.log("Mensaje después de 2 segundos");
        // }, 10000);
        const response = await axios.get(`${BACKEND_URL}/api/tasks`);
        setTasks(response.data);
        setApiError(false);
      } catch (error) {
        setApiError(true);
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchTasks();
    }, []);

    if (loading){
      return (
        <div className='flex flex-col w-full h-full justify-center align-middle'>
          <embed src={loaderUrl} type="image/svg+xml" width={50} height={50} />
          <p>CARGANDO</p>
        </div>
      )
    } else return (
        
        <div className='flex flex-col space-y-20 items-center bg-slate-300 border-2 border-red-700 h-full'>
          <h1 className='font-bold'>MANAGE TASKS</h1>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full border-blue-500 border'>
            {tasks.map((task: Task) => (
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