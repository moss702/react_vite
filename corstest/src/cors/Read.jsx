import React from "react";
import {useState, useEffect} from "react";
import {useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Read(props) {
  const { num } = useParams();
  const [noteDTO, setNoteDTO] = useState({
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // token이란 이름으로 저장된ㄴ 녀석 가져오기
    axios.get(`http://localhost:8080/notes/${num}`, {
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
  }, [num]);


  // 글 삭제 이벤트 핸들러
  const handleDelete = () => {
    const token = localStorage.getItem("token");

    if(window.confirm("정말 삭제할까요?")) {
      axios.delete(`http://localhost:8080/notes/${num}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
          .then(res => {
            console.log(res.data);
            alert("삭제되었습니다!");
            navigate("/list");
          })
          .catch(e => {
            console.log("삭제 실패함!!! : ", e);
          });
    }
  };

  return (
      <div>
        <h3>{noteDTO.title}</h3>
        <p>{noteDTO.content}</p>
        <p>작성자: {noteDTO.writerEmail}</p>
        <button onClick={() => navigate("/list")}>◀ 글목록으로</button>
        <button onClick={() => navigate(`/modify/${num}`)}>글수정</button>
        <button onClick={handleDelete}>글삭제</button>
      </div>
  );
}
