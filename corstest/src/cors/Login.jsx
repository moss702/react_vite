import React from "react";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login(props){
  const [loginInfo, setLoginInfo] = useState(
      {email: "", pw: ""} );
  const navigate = useNavigate();

  const handelChange = (e) => {
    const {name, value} = e.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo, [name]: value
    }));
  }

  // Content-Type
  // - text/html
  // - text/plain : String(문자열)
  // - application/json
  // - application/xml
  // - application/x-www-form-urlencoded
  // - multipart/form-data

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.get(`http://localhost:8080/api/login?email=${loginInfo.email}&pw=${loginInfo.pw}`)
    axios.post(`http://localhost:8080/api/login`, loginInfo, {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    })
        .then((res) => {
          console.log("==== 받은 데이터 : " , res.data);
          sessionStorage.setItem("token", res.data); // jjwt 토큰을 세션에 저장
          navigate('/read');
        })
        .catch((e) =>{
          console.log("=== error ===", e);
        })
  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <p>
            <input type="text" value={loginInfo.email} name="email"
              onChange={handelChange}
            />
          </p>
          <p>
            <input type="password" value={loginInfo.pw} name="pw"
               onChange={handelChange}
            />
          </p>
          <p>
            <button type="submit">로그인</button>
          </p>
        </form>
      </div>
  )
}
