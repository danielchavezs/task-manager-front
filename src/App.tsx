import ManageTask from './components/ManageTasks';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TaskDetail from './components/TaskDetail';
import CreateTask from './components/CreateTask';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className='flex flex-col p-6 bg-indigo-300'>
          <Routes>
            <Route path='/' element={<ManageTask/>}/>
            <Route path='/id/:id' element={<TaskDetail/>}/>
            <Route path='/new-task' element={<CreateTask/>}/>
          </Routes>
        </div>

      </Router>
    </Provider>

  );
}

export default App
