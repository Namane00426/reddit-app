import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import MainLayout from './components/MainLayout';


function App() {

  return (
    <>
    <Header />
    <Routes >
      <Route path="/*" element={<MainLayout/>} />
    </Routes>
    </>
   )
}

    

export default App;
