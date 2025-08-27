import React from "react";
import {useAuth} from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout(){
  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
      <div>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
  );
}