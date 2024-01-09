import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import Document from './pages/Document/Document';
import Documents from './pages/Documents/Documents';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Loading from './components/Loading/Loading';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';


import { Suspense, useState, useEffect } from 'react';
import { AppBar } from './components'


function App() {

  const [currentRoute, setCurrentRoute] = useState('/')

  return (
    <Router>
        {
          currentRoute !== '/login' && currentRoute !=='/register' && currentRoute !== '/' && currentRoute !== '/not-found' ? <AppBar/> : ''
        }
        <Suspense suspense = {<Loading/>}/>
        <Routes>
          <Route path="*" element={<NotFound setCurrentRoute={setCurrentRoute}/>}/>
          <Route path="/not-found" element={<NotFound setCurrentRoute={setCurrentRoute}/>}/>
          <Route path="/home/" element={<Home setCurrentRoute={setCurrentRoute}/>}/>
          <Route path="" element={<Home setCurrentRoute={setCurrentRoute}/>}/>
          <Route path="/" element={<Home setCurrentRoute={setCurrentRoute}/>}/>
          <Route path="/documents" element={<Documents setCurrentRoute={setCurrentRoute}/>}/>
          <Route path="/document/:id" element={<Document setCurrentRoute={setCurrentRoute}/>}/>
          <Route path="/document/" element={<Document setCurrentRoute={setCurrentRoute}/>}/>
          <Route path="/login" element={<Login setCurrentRoute={setCurrentRoute}/>}/>
          <Route path="/register" element={<Register setCurrentRoute={setCurrentRoute}/>}/>
        </Routes>
    </Router>

  );
}

export default App;
