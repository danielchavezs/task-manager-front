import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ManageTask from './components/ManageTasks';
import TaskDetail from './components/TaskDetail';
import CreateTask from './components/CreateTask';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className='flex flex-col bg-slate-900 min-h-full'>
          <Routes>
            <Route path='/' element={<ManageTask/>}/>
            <Route path='/id/:id' element={<TaskDetail/>}/>
            <Route path='/new-task' element={<CreateTask/>}/>
            <Route path='/loader' element={<Loader/>}/>
            <Route path='/error' element={<ErrorMessage/>}/>
          </Routes>
        </div>

      </Router>
    </Provider>
  );
}

export default App
