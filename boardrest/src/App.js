import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import List from "./board/List";
import Read from "./board/Read";
import Register from "./board/Register";
import Modify from "./board/Modify";

function App() {
  return (
    <div className={"container"}>
      <BrowserRouter>
        <Routes>
          <Route index element={<List />} />
          <Route path="read" element={<Read />} />
          <Route path="register" element={<Register />} />
          <Route path="modify" element={<Modify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
