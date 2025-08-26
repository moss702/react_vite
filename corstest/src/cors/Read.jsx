import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";


export default function Read(props) {
  const [noteDTO, setNoteDTO] = useState({
    num : "",
    title : "",
    content : "",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // token이란 이름으로 저장된ㄴ 녀석 가져오기
    axios.get("http://localhost:8080/notes/7", {
      headers : {
        'Authorization' : `Bearer ${token}`,
      }
    })
        .then(res => {
          console.log(res.data);
          setNoteDTO(res.data);
        })
        .catch(e => {
          console.log(e);
        })
  }, []);

  return (
    <div>
      <p>num: {noteDTO.num}</p>
      <p>title: {noteDTO.title}</p>
      <p>content: {noteDTO.content}</p>
    </div>
  );
}
