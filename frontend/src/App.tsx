import { FC, ReactElement } from 'react'
import {Routes, Route} from 'react-router-dom'
import { Dashboard } from './pages/dashboard/dashboard';
import { Signup } from './pages/auth/Signup';
import { Login } from './pages/auth/Login';

const App: FC = (): ReactElement => {

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default App;
