import AddExpense from 'pages/AddExpense';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import UpdateExpense from 'pages/UpdateExpense';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Navbar from 'components/UI/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

interface IProps {
  isLoggedIn: boolean;
}

export const ProtectedRoutes: React.FC<IProps> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
};

export default function AppRouter() {
  const { isLoggedIn, name } = useSelector((state: RootState) => state.user);
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} name={name} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path='/' element={<Home />} />
          <Route path='/add-expense' element={<AddExpense />} />
          <Route path='/update-expense' element={<UpdateExpense />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}
