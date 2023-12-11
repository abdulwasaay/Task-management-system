import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignupForm from './pages/Signupform';
import LoginForm from './pages/Loginform';
import NotFound from './pages/notfound';
import Admin from './pages/Admin';
import Home from './pages/User';
import AllTasks from './pages/Tasks';
import AllUsers from './pages/usersWithRoles';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/users/tasks' element={<AllTasks />}/>
    <Route path='/signup' element={<SignupForm />}/>
    <Route path='/login' element={<LoginForm />}/>
    <Route path='/admins' element={<Admin />}/>
    <Route path='/admin/tasks' element={<AllTasks />}/>
    <Route path='/admin/users' element={<AllUsers />}/>
    <Route path='/*' element={<NotFound />}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App;
