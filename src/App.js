import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';


function App() {

  return (
    <div className='font-bodyFont w-screen min-h-screen'>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
