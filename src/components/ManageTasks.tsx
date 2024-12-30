import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SingleTask from './SingleTask';
import { Task } from '../assets/types';
import { BACKEND_URL } from '../assets/utils';

export default function ManageTask (){

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState (false);

    const fetchTasks = async () => {
      setLoading(true);
      try {
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

    // console.log("Corriendo ManageTasks")
    return (
        
        <div className='bg-slate-400 border-2 border-red-700'>
          <h1 className='text-red-400'>MANAGE TASKS</h1>

          {tasks.map((task: Task) => (
            <SingleTask
              key={task._id}
              title={task.title}
              description={task.description}
              completed={task.completed}
            />
          ))}
        </div>
    );
};