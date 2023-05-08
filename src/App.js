import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
          <Route index element={<Home/>} />
          <Route path="*" element={<div>404 notfound</div>} />

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
