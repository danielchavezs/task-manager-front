import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ManageTask from './components/ManageTasks';
import TaskDetail from './components/TaskDetail';
import CreateTask from './components/CreateTask';
import Loader from './components/Loader';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className='flex flex-col bg-indigo-300 min-h-full'>
          <Routes>
            <Route path='/' element={<ManageTask/>}/>
            <Route path='/id/:id' element={<TaskDetail/>}/>
            <Route path='/new-task' element={<CreateTask/>}/>
            <Route path='/loader' element={<Loader/>}/>
          </Routes>
        </div>

      </Router>
    </Provider>

  );
}

export default App
