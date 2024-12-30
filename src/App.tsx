import ManageTask from './components/ManageTasks';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className='flex flex-col p-6 bg-orange-200'>
          <Routes>
            <Route path='/' element={<ManageTask/>}/>
            
          </Routes>
        </div>

      </Router>
    </Provider>

  );
}

export default App
