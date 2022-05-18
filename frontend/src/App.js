
import React, {useEffect} from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from 'react-router-dom';
import Stats from './pages/stats/stats';
import Home from './pages/Home/home';
import Register from './pages/register/register';
import AddJob from './pages/addJob/addJob';
import Profile from './pages/profile/profile';
import AllJobs from './pages/allJobs/allJobs';
import jwt_decode from 'jwt-decode';
import PrivateRoute from './hocs/privateRoute/privateRoute';
import { setLogin } from './state/authReducer';
import { useDispatch } from 'react-redux';


//TODO: 1) LOADER, DINAMIC, STATS, CHECKFORERRORS, PRODUCTION
const App = () => {

  const dispatch = useDispatch();

  const isAuth = () =>{
    let user = localStorage.getItem('user');
    let decoded = null;

    if(user){
      user = JSON.parse(user);
      const {token, email, name} = user;
      try{
        decoded = jwt_decode(token);
      }
      catch (e){
        console.log(e);
      }

      if (decoded && decoded.exp > (Date.now() / 1000) ) {
        dispatch(setLogin({email, name, token})); 
      }
      else{
        localStorage.clear();
      }
    }
  }

  isAuth();
  
  return (
    <>
    <ToastContainer/>
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route path='/stats' element={<PrivateRoute> <Stats/> </PrivateRoute>}/>
        <Route path='/add-job' element={<PrivateRoute> <AddJob/> </PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute> <Profile/> </PrivateRoute>}/>
        <Route path='/all-jobs' element={<PrivateRoute> <AllJobs/> </PrivateRoute>}/>
    </Routes>
    </>
      
  );
}

export default App;
