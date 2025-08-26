import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import {decode} from "base-64";
import {useNavigate} from "react-router-dom";

export default function Register(props) {
  const navigate = useNavigate();

  const [noteDTO, setNoteDTO] = useState({
    title : "",
    content : "",
  });

  const handleChange = (e) => {

    const {name, value} = e.target;
    setNoteDTO((prev) => ({
      ...prev, [name] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    axios.post(`http://localhost:8080/notes/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
        .then(res => {
          console.log(res.data);
          setNoteDTO(res.data);
        })
        .catch(e => {
          console.log("e : ", e);
        })
  };

  useEffect(() => {
    // 세션 스토리지에 있는 토큰값 가져오기
    const token = sessionStorage.getItem("token");

    // JWT에서 많이 쓰는 토큰 : Header, Payload, Signature
    console.log(token);

    // 비로그인 상태라면 로그인 페이지로 보내버리기.
    if (token == null || token === "") {
      navigate("/login");
    } else { // 토큰을 갖고 파싱처리. 토큰 잘게 쪼개서 변수에 각 담기
      const tokenParts = token.split('.');
      const payload = tokenParts[1];
      const decodedPayload = decode(payload)
      const payloadObj = JSON.parse(decodedPayload);

      const email = payloadObj.sub;

      console.log(email);
    }
  });

      return (
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" onChange={handleChange} placeholder="제목 입력"></input>
            <p></p>
            <textarea name="content" onChange={handleChange} placeholder="내용 입력"></textarea>
            <p></p>
            <button type="submit">등록</button>
          </form>
      );


}