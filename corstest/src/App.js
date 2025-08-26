import logo from './logo.svg';
import './App.css';
import Login from "./cors/Login.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Read from "./cors/Read";
import List from "./cors/List";
import Register from "./cors/Register";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="read" element={<Read />} />
          <Route path="list" element={<List />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
