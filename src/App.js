import React, {useEffect} from 'react';
import {Routes, Route, Link, useLocation, Outlet, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Products from './pages/Products';
import './App.css';
import Api from './api'
import Login from './pages/Login';
import Registration from './pages/Registration';
import AdminPage from './pages/AdminPage';
import AuthProvider from './contexts/AuthContexts';
import { useAuth } from './contexts/AuthContexts'
import Profile from './pages/Profile';
import Header from './component/Header';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';

const PrivateRoutes = () => {
  const { currentUser, admin } = useAuth()
  const location = useLocation();
  return currentUser.uid === admin ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace/>
}

function App() {

  // const queryObject = {
  //   'category': 'Футбол',
  //   'subcategory': "М'ячі"
  // }

  return (
    <div className="App">
      
      <AuthProvider>
    
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/update' element={<UpdateProfile />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/admin' element={<AdminPage />} />
          </Route>
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
