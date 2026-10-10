import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
    <Route/>  
    </Routes>
    <Footer/>
 </Router>
  );
}

export default App;
